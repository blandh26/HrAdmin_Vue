<template>
  <div class="upload-file">
    <el-upload
      multiple
      :action="uploadFileUrl"
      :before-upload="handleBeforeUpload"
      v-model:file-list="fileList"
      :limit="limit"
      :on-error="handleUploadError"
      :on-exceed="handleExceed"
      :on-success="handleUploadSuccess"
      :show-file-list="false"
      :data="uploadData"
      :drag="drag"
      :headers="headers"
      :auto-upload="autoUpload"
      class="upload-file-uploader"
      ref="fileUpload"
      v-if="!disabled">
      <!-- 拖拽上传 -->
      <template v-if="drag">
        <el-icon class="el-icon--upload">
          <upload-filled />
        </el-icon>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </template>
      <!-- 上传按钮 -->
      <el-button type="primary" icon="upload" v-if="!drag">选取文件</el-button>
      <!-- 上传提示 -->
      <template v-slot:tip>
        <div class="el-upload__tip" v-if="showTip">
          <slot name="tip">
            <template v-if="fileSize">
              大小不超过 <b class="text-danger">{{ fileSize }}MB</b>
            </template>
            <template v-if="fileType && fileType.length > 0">
              格式为 <b class="text-danger">{{ fileType.join('/') }}</b>
            </template>
          </slot>
        </div>
      </template>
    </el-upload>
    <!-- 文件列表 -->
    <transition-group class="upload-file-list el-upload-list el-upload-list--text" name="el-fade-in-linear" tag="ul">
      <li :key="file.uid" class="el-upload-list__item ele-upload-list__item-content" v-for="(file, index) in fileList">
        <el-link :href="`${file.url}`" :underline="false" target="_blank">
          <svg-icon class-name="doc-icon" name="documentation" />
          {{ file.name }}
        </el-link>
        <div class="ele-upload-list__item-content-action" v-if="!disabled">
          <el-link :underline="false" @click="handleDelete(index)" type="danger">删除</el-link>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script setup>
import { getToken } from '@/utils/auth'

const props = defineProps({
  modelValue: [String, Object, Array],
  // 数量限制
  limit: {
    type: Number,
    default: 5
  },
  // 大小限制(MB)
  fileSize: {
    type: Number,
    default: 5
  },
  // 文件类型, 例如['png', 'jpg', 'jpeg']
  fileType: {
    type: Array,
    default: () => ['doc', 'xls', 'ppt', 'txt', 'pdf']
  },
  // 是否显示提示
  isShowTip: {
    type: Boolean,
    default: true
  },
  // 是否拖拽
  drag: {
    type: Boolean,
    default: false
  },
  // 自动上传
  autoUpload: {
    type: Boolean,
    default: true
  },
  // 上传携带的参数
  data: {
    type: Object
  },
  // 禁用组件（仅查看文件）
  disabled: {
    type: Boolean,
    default: false
  }
})

const { proxy } = getCurrentInstance()
const emit = defineEmits()
const number = ref(0)
const uploadList = ref([])
const baseUrl = import.meta.env.VITE_APP_BASE_API
const uploadFileUrl = ref(baseUrl + import.meta.env.VITE_APP_UPLOAD_URL) // 上传的图片服务器地址
const headers = ref({ Authorization: 'Bearer ' + getToken() })
const fileList = ref([])
const showTip = computed(() => props.isShowTip && (props.fileType || props.fileSize))
const uploadData = computed(() => props.data)

watch(
  () => props.modelValue,
  (val) => {
    if (val) {
      let temp = 1
      // 首先将值转为数组
      const list = Array.isArray(val) ? val : props.modelValue.split(',')
      // 然后将数组转为对象数组
      fileList.value = list.map((item) => {
        var fileName = item.slice(item.lastIndexOf('/') + 1)
        if (typeof item === 'string') {
          item = { name: fileName, url: item }
        }
        item.uid = item.uid || new Date().getTime() + temp++
        return item
      })
    } else {
      fileList.value = []
      return []
    }
  },
  { deep: true, immediate: true }
)

// 上传前校检格式和大小
function handleBeforeUpload(file) {
  // 校检文件类型
  if (props.fileType.length) {
    let fileExtension = ''
    if (file.name.lastIndexOf('.') > -1) {
      fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1)
    }
    const isTypeOk = props.fileType.some((type) => {
      if (file.type.indexOf(type) > -1) return true
      if (fileExtension && fileExtension.indexOf(type) > -1) return true
      return false
    })
    if (!isTypeOk) {
      proxy.$modal.msgError(`文件格式不正确, 请上传${props.fileType.join('/')}格式文件!`)
      return false
    }
  }
  // 校检文件大小
  if (props.fileSize) {
    const isLt = file.size / 1024 / 1024 < props.fileSize
    if (!isLt) {
      proxy.$modal.msgError(`上传文件大小不能超过 ${props.fileSize} MB!`)
      return false
    }
  }
  proxy.$modal.loading('正在上传文件，请稍候...')
  number.value++
  return true
}

// 文件个数超出
function handleExceed() {
  proxy.$modal.msgError(`上传文件数量不能超过 ${props.limit} 个!`)
}

// 上传失败
function handleUploadError(err) {
  proxy.$modal.msgError('上传失败')
  proxy.$modal.closeLoading()
}

// 上传成功回调
function handleUploadSuccess(response, uploadFile) {
  if (response.code != 200) {
    fileList.value = []
    proxy.$modal.msgError(`上传失败，原因:${response.msg}!`)
    proxy.$modal.closeLoading()
    return
  }
  const { fileName, url, fileId } = response.data
  const tempFile = { name: fileName, url: url }
  uploadList.value.push(tempFile)
  if (number.value > 0 && uploadList.value.length === number.value) {
    fileList.value = fileList.value.filter((f) => f.url !== undefined).concat(uploadList.value)
    uploadList.value = []
    number.value = 0
    emit('update:modelValue', listToString(fileList.value))
    emit('success', listToString(fileList.value))
    proxy.$modal.closeLoading()
  }
}

// 删除文件
function handleDelete(index) {
  fileList.value.splice(index, 1)
  emit('update:modelValue', listToString(fileList.value))
}

// 获取文件名称
function getFileName(name) {
  if (name.lastIndexOf('/') > -1) {
    return name.slice(name.lastIndexOf('/') + 1).toLowerCase()
  } else {
    return ''
  }
}

// 对象转成指定字符串分隔
function listToString(list, separator) {
  let strs = ''
  separator = separator || ','

  list.forEach((element) => {
    if (element) {
      strs += element.url + separator
    }
  })
  return strs != '' ? strs.substr(0, strs.length - 1) : ''
}
// 手动提交上传
function submitUpload() {
  proxy.$refs.fileUpload.submit()
}
defineExpose({
  submitUpload
})
</script>

<style scoped lang="scss">
.upload-file-uploader {
  margin-bottom: 5px;
}
.upload-file-list .el-upload-list__item {
  border: 1px solid #e4e7ed;
  line-height: 2;
  margin-bottom: 10px;
  position: relative;
}
.upload-file-list .ele-upload-list__item-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: inherit;
}
.ele-upload-list__item-content-action .el-link {
  margin-right: 10px;
}
.doc-icon {
  margin: 0 10px;
}
</style>
