<!--
 * @Descripttion: (用户扩展信息表/sys_user_extend)
 * @Author: (admin)
 * @Date: (2025-06-11)
-->
<template>
	<div>
	  <el-form :model="queryParams" label-position="right" inline ref="queryRef" v-show="showSearch" @submit.prevent>
		<el-form-item>
		  <el-button icon="search" type="primary" @click="handleQuery">{{ $t('btn.search') }}</el-button>
		  <el-button icon="refresh" @click="resetQuery">{{ $t('btn.reset') }}</el-button>
		</el-form-item>
	  </el-form>
	  <!-- 工具区域 -->
	  <el-row :gutter="15" class="mb10">
		<right-toolbar v-model:showSearch="showSearch" @queryTable="getList" :columns="columns"></right-toolbar>
	  </el-row>
  
	  <el-table
		:data="dataList"
		v-loading="loading"
		ref="table"
		border
		header-cell-class-name="el-table-header-cell"
		highlight-current-row
		@sort-change="sortChange"
		>
		<el-table-column prop="userId" label="用户ID，主键" align="center" :show-overflow-tooltip="true" v-if="columns.showColumn('userId')"/>
		<el-table-column prop="promotePhone" label="宣传手机号" align="center" :show-overflow-tooltip="true" v-if="columns.showColumn('promotePhone')"/>
		<el-table-column prop="promoteWechat" label="宣传微信" align="center" :show-overflow-tooltip="true" v-if="columns.showColumn('promoteWechat')"/>
		<el-table-column prop="promoteQq" label="宣传QQ" align="center" :show-overflow-tooltip="true" v-if="columns.showColumn('promoteQq')"/>
		<el-table-column prop="promoteKakao" label="宣传Kakao" align="center" :show-overflow-tooltip="true" v-if="columns.showColumn('promoteKakao')"/>
		<el-table-column prop="promoteEmail" label="宣传邮箱" align="center" :show-overflow-tooltip="true" v-if="columns.showColumn('promoteEmail')"/>
		<el-table-column prop="promoteOther" label="宣传其他联系方式" align="center" :show-overflow-tooltip="true" v-if="columns.showColumn('promoteOther')"/>
		<el-table-column prop="level" label="级别" align="center" :show-overflow-tooltip="true" v-if="columns.showColumn('level')"/>
		<el-table-column prop="gold" label="金币" align="center" :show-overflow-tooltip="true" v-if="columns.showColumn('gold')"/>
		<el-table-column prop="experience" label="经验" align="center" :show-overflow-tooltip="true" v-if="columns.showColumn('experience')"/>
		<el-table-column prop="qaScore" label="问答分数" align="center" :show-overflow-tooltip="true" v-if="columns.showColumn('qaScore')"/>
		<el-table-column prop="lifePhotos" label="生活照" align="center" v-if="columns.showColumn('lifePhotos')">
		  <template #default="scope">
			<ImagePreview :src="scope.row.lifePhotos"></ImagePreview>
		  </template>
		</el-table-column>
		<el-table-column prop="companyName" label="企业名称" align="center" :show-overflow-tooltip="true" v-if="columns.showColumn('companyName')"/>
		<el-table-column prop="corporateCountry" label="企业所在国" align="center" :show-overflow-tooltip="true" v-if="columns.showColumn('corporateCountry')"/>
		<el-table-column prop="enterpriseQualifications" label="企业资质图片" align="center" :show-overflow-tooltip="true" v-if="columns.showColumn('enterpriseQualifications')"/>
		<el-table-column prop="enterpriseZoneId" label="企业验证版区" align="center" v-if="columns.showColumn('enterpriseZoneId')">
		  <template #default="scope">
			<dict-tag :options=" options.frontend_category " :value="scope.row.enterpriseZoneId"  />
		  </template>
		</el-table-column>
		<el-table-column prop="relationshipStatus" label="情感状态" align="center" v-if="columns.showColumn('relationshipStatus')">
		  <template #default="scope">
			<dict-tag :options=" options.frontend_emotionalstate " :value="scope.row.relationshipStatus"  />
		  </template>
		</el-table-column>
		<el-table-column prop="interests" label="兴趣爱好" align="center" :show-overflow-tooltip="true" v-if="columns.showColumn('interests')"/>
		<el-table-column prop="birthday" label="出生年月日" :show-overflow-tooltip="true"  v-if="columns.showColumn('birthday')"/>
		<el-table-column prop="realName" label="真实姓名" align="center" :show-overflow-tooltip="true" v-if="columns.showColumn('realName')"/>
		<el-table-column prop="idCardNumber" label="身份证号码" align="center" :show-overflow-tooltip="true" v-if="columns.showColumn('idCardNumber')"/>
		<el-table-column prop="educationLevel" label="学历" align="center" v-if="columns.showColumn('educationLevel')">
		  <template #default="scope">
			<dict-tag :options=" options.frontend_education " :value="scope.row.educationLevel"  />
		  </template>
		</el-table-column>
		<el-table-column prop="introduction" label="简介" align="center" :show-overflow-tooltip="true" v-if="columns.showColumn('introduction')"/>
		<el-table-column prop="currentAddress" label="现住地址" align="center" v-if="columns.showColumn('currentAddress')"/>
		<el-table-column prop="hometown" label="故乡" align="center" v-if="columns.showColumn('hometown')"/>
		<el-table-column prop="detailVerified" label="详细信息验证（0否，1是）" align="center" :show-overflow-tooltip="true" v-if="columns.showColumn('detailVerified')"/>
		<el-table-column prop="phoneVerified" label="手机号码验证状态" align="center" :show-overflow-tooltip="true" v-if="columns.showColumn('phoneVerified')"/>
		<el-table-column prop="idCardVerified" label="身份证验证状态" align="center" :show-overflow-tooltip="true" v-if="columns.showColumn('idCardVerified')"/>
		<el-table-column prop="lifePhotoVerified" label="生活照验证状" align="center" :show-overflow-tooltip="true" v-if="columns.showColumn('lifePhotoVerified')"/>
		<el-table-column prop="enterpriseVerified" label="企业验证信息状态" align="center" :show-overflow-tooltip="true" v-if="columns.showColumn('enterpriseVerified')"/>
		<el-table-column prop="createdAt" label="创建时间" :show-overflow-tooltip="true"  v-if="columns.showColumn('createdAt')"/>
		<el-table-column prop="updatedAt" label="更新时间" :show-overflow-tooltip="true"  v-if="columns.showColumn('updatedAt')"/>
		<el-table-column label="操作" width="160">
		  <template #default="scope">
			<el-button type="success" size="small" icon="edit" title="编辑" v-hasPermi="['sysUserExtend:edit']" @click="handleUpdate(scope.row)"></el-button>
		  </template>
		</el-table-column>
	  </el-table>
	  <pagination :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
  
  
	  <el-dialog :title="title" :lock-scroll="false" v-model="open" >
		<el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
		  <el-row :gutter="20">
  
  
			<el-col :lg="12">
			  <el-form-item label="宣传手机号" prop="promotePhone">
				<el-input v-model="form.promotePhone" placeholder="请输入宣传手机号" />
			  </el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="宣传微信" prop="promoteWechat">
				<el-input v-model="form.promoteWechat" placeholder="请输入宣传微信" />
			  </el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="宣传QQ" prop="promoteQq">
				<el-input v-model="form.promoteQq" placeholder="请输入宣传QQ" />
			  </el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="宣传Kakao" prop="promoteKakao">
				<el-input v-model="form.promoteKakao" placeholder="请输入宣传Kakao" />
			  </el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="宣传邮箱" prop="promoteEmail">
				<el-input v-model="form.promoteEmail" placeholder="请输入宣传邮箱" />
			  </el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="宣传其他联系方式" prop="promoteOther">
				<el-input v-model="form.promoteOther" placeholder="请输入宣传其他联系方式" />
			  </el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="级别" prop="level">
				<el-input v-model="form.level" placeholder="请输入级别" />
			  </el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="金币" prop="gold">
				<el-input v-model="form.gold" placeholder="请输入金币" />
			  </el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="经验" prop="experience">
				<el-input v-model="form.experience" placeholder="请输入经验" />
			  </el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="问答分数" prop="qaScore">
				<el-input v-model="form.qaScore" placeholder="请输入问答分数" />
			  </el-form-item>
			</el-col>
  
			<el-col :lg="24">
			  <el-form-item label="生活照" prop="lifePhotos">
				<UploadImage v-model="form.lifePhotos" :data="{ uploadType: 1 }" />
			  </el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="企业名称" prop="companyName">
				<el-input v-model="form.companyName" placeholder="请输入企业名称" />
			  </el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="企业所在国" prop="corporateCountry">
				<el-input-number v-model.number="form.corporateCountry" :controls="true" controls-position="right" placeholder="请输入企业所在国" />
			  </el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="企业资质图片" prop="enterpriseQualifications">
				<el-input v-model="form.enterpriseQualifications" placeholder="请输入企业资质图片" />
			  </el-form-item>
			</el-col>
			  
			<el-col :lg="12">
			  <el-form-item label="企业验证版区" prop="enterpriseZoneId">
				<el-select v-model="form.enterpriseZoneId"  placeholder="请选择企业验证版区">
				  <el-option
					v-for="item in options.frontend_category" 
					:key="item.dictValue" 
					:label="item.dictLabel" 
					:value="parseInt(item.dictValue)"></el-option>
				</el-select>
			  </el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="情感状态" prop="relationshipStatus">
				<el-radio-group v-model="form.relationshipStatus">
				  <el-radio v-for="item in options.frontend_emotionalstate" :key="item.dictValue" :value="item.dictValue">
					{{item.dictLabel}}
				  </el-radio>
				</el-radio-group>
			  </el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="兴趣爱好" prop="interests">
				<el-input v-model="form.interests" placeholder="请输入兴趣爱好" />
			  </el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="出生年月日" prop="birthday">
				<el-date-picker
				  v-model="form.birthday"
				  type="datetime"
				  placeholder="选择日期时间"
				  value-format="YYYY-MM-DD HH:mm:ss">
				</el-date-picker>
			  </el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="真实姓名" prop="realName">
				<el-input v-model="form.realName" placeholder="请输入真实姓名" />
			  </el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="身份证号码" prop="idCardNumber">
				<el-input-number v-model.number="form.idCardNumber" :controls="true" controls-position="right" placeholder="请输入身份证号码" />
			  </el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="学历" prop="educationLevel">
				<el-radio-group v-model="form.educationLevel">
				  <el-radio v-for="item in options.frontend_education" :key="item.dictValue" :value="item.dictValue">
					{{item.dictLabel}}
				  </el-radio>
				</el-radio-group>
			  </el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="简介" prop="introduction">
				<el-input v-model="form.introduction" placeholder="请输入简介" />
			  </el-form-item>
			</el-col>
			  
			<el-col :lg="12">
			  <el-form-item label="现住地址" prop="currentAddress">
				<el-input v-model.number="form.currentAddress" placeholder="请输入现住地址" />
			  </el-form-item>
			</el-col>
			  
			<el-col :lg="12">
			  <el-form-item label="故乡" prop="hometown">
				<el-input v-model.number="form.hometown" placeholder="请输入故乡" />
			  </el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="详细信息验证（0否，1是）" prop="detailVerified">
				<el-switch v-model="form.detailVerified" :active-value='1' :inactive-value='0' />
			  </el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="手机号码验证状态" prop="phoneVerified">
				<el-switch v-model="form.phoneVerified" :active-value='1' :inactive-value='0' />
			  </el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="身份证验证状态" prop="idCardVerified">
				<el-switch v-model="form.idCardVerified" :active-value='1' :inactive-value='0' />
			  </el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="生活照验证状" prop="lifePhotoVerified">
				<el-switch v-model="form.lifePhotoVerified" :active-value='1' :inactive-value='0' />
			  </el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="企业验证信息状态" prop="enterpriseVerified">
				<el-switch v-model="form.enterpriseVerified" :active-value='1' :inactive-value='0' />
			  </el-form-item>
			</el-col>
  
  
		  </el-row>
		</el-form>
		<template #footer v-if="opertype != 3">
		  <el-button text @click="cancel">{{ $t('btn.cancel') }}</el-button>
		  <el-button type="primary" :loading="state.submitLoading" @click="submitForm">{{ $t('btn.submit') }}</el-button>
		</template>
	  </el-dialog>
	</div>
  </template>
  
  <script setup name="sysuserextend">
  import { listsysUserExtend,updatesysUserExtend,getsysUserExtend, } 
  from '@/api/system/sysuserextend.js'
  const { proxy } = getCurrentInstance()
  const ids = ref([])
  const loading = ref(false)
  const showSearch = ref(true)
  const queryParams = reactive({
	pageNum: 1,
	pageSize: 10,
	sort: '',
	sortType: 'asc',
  })
  const columns = ref([
	{ visible: true, align: 'center', type: '', prop: 'userId', label: '用户ID，主键'  ,showOverflowTooltip: true  },
	{ visible: true, align: 'center', type: '', prop: 'promotePhone', label: '宣传手机号'  ,showOverflowTooltip: true  },
	{ visible: true, align: 'center', type: '', prop: 'promoteWechat', label: '宣传微信'  ,showOverflowTooltip: true  },
	{ visible: true, align: 'center', type: '', prop: 'promoteQq', label: '宣传QQ'  ,showOverflowTooltip: true  },
	{ visible: true, align: 'center', type: '', prop: 'promoteKakao', label: '宣传Kakao'  ,showOverflowTooltip: true  },
	{ visible: true, align: 'center', type: '', prop: 'promoteEmail', label: '宣传邮箱'  ,showOverflowTooltip: true  },
	{ visible: true, align: 'center', type: '', prop: 'promoteOther', label: '宣传其他联系方式'  ,showOverflowTooltip: true  },
	{ visible: true, align: 'center', type: '', prop: 'level', label: '级别'  ,showOverflowTooltip: true  },
	{ visible: false, align: 'center', type: '', prop: 'gold', label: '金币'  ,showOverflowTooltip: true  },
	{ visible: false, align: 'center', type: '', prop: 'experience', label: '经验'  ,showOverflowTooltip: true  },
	{ visible: false, align: 'center', type: '', prop: 'qaScore', label: '问答分数'  ,showOverflowTooltip: true  },
	{ visible: false, align: 'center', type: 'img', prop: 'lifePhotos', label: '生活照'  ,showOverflowTooltip: true  },
	{ visible: false, align: 'center', type: '', prop: 'companyName', label: '企业名称'  ,showOverflowTooltip: true  },
	{ visible: false, align: 'center', type: '', prop: 'corporateCountry', label: '企业所在国'  ,showOverflowTooltip: true  },
	{ visible: false, align: 'center', type: '', prop: 'enterpriseQualifications', label: '企业资质图片'  ,showOverflowTooltip: true  },
	{ visible: false, align: 'center', type: 'dict', prop: 'enterpriseZoneId', label: '企业验证版区'   ,dictType: 'frontend_category' },
	{ visible: false, align: 'center', type: 'dict', prop: 'relationshipStatus', label: '情感状态'  ,showOverflowTooltip: true  ,dictType: 'frontend_emotionalstate' },
	{ visible: false, align: 'center', type: '', prop: 'interests', label: '兴趣爱好'  ,showOverflowTooltip: true  },
	{ visible: false, align: 'center', type: '', prop: 'birthday', label: '出生年月日'  ,showOverflowTooltip: true  },
	{ visible: false, align: 'center', type: '', prop: 'realName', label: '真实姓名'  ,showOverflowTooltip: true  },
	{ visible: false, align: 'center', type: '', prop: 'idCardNumber', label: '身份证号码'  ,showOverflowTooltip: true  },
	{ visible: false, align: 'center', type: 'dict', prop: 'educationLevel', label: '学历'  ,showOverflowTooltip: true  ,dictType: 'frontend_education' },
	{ visible: false, align: 'center', type: '', prop: 'introduction', label: '简介'  ,showOverflowTooltip: true  },
	{ visible: false, align: 'center', type: '', prop: 'currentAddress', label: '现住地址'   },
	{ visible: false, align: 'center', type: '', prop: 'hometown', label: '故乡'   },
	{ visible: false, align: 'center', type: '', prop: 'detailVerified', label: '详细信息验证（0否，1是）'  ,showOverflowTooltip: true  },
	{ visible: false, align: 'center', type: '', prop: 'phoneVerified', label: '手机号码验证状态'  ,showOverflowTooltip: true  },
	{ visible: false, align: 'center', type: '', prop: 'idCardVerified', label: '身份证验证状态'  ,showOverflowTooltip: true  },
	{ visible: false, align: 'center', type: '', prop: 'lifePhotoVerified', label: '生活照验证状'  ,showOverflowTooltip: true  },
	{ visible: false, align: 'center', type: '', prop: 'enterpriseVerified', label: '企业验证信息状态'  ,showOverflowTooltip: true  },
	{ visible: false, align: 'center', type: '', prop: 'createdAt', label: '创建时间'  ,showOverflowTooltip: true  },
	{ visible: false, align: 'center', type: '', prop: 'updatedAt', label: '更新时间'  ,showOverflowTooltip: true  },
	//{ visible: false, prop: 'actions', label: '操作', type: 'slot', width: '160' }
  ])
  const total = ref(0)
  const dataList = ref([])
  const queryRef = ref()
  const defaultTime = ref([new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)])
  
  
  var dictParams = [
	"frontend_category",
	"frontend_emotionalstate",
	"frontend_education",
  ]
  
  proxy.getDicts(dictParams).then((response) => {
	response.data.forEach((element) => {
	  state.options[element.dictType] = element.list
	})
  })
  
  function getList(){
	loading.value = true
	listsysUserExtend(queryParams).then(res => {
	  const { code, data } = res
	  if (code == 200) {
		dataList.value = data.result
		total.value = data.totalNum
		loading.value = false
	  }
	})
  }
  
  // 查询
  function handleQuery() {
	queryParams.pageNum = 1
	getList()
  }
  
  // 重置查询操作
  function resetQuery(){
	proxy.resetForm("queryRef")
	handleQuery()
  }
  // 自定义排序
  function sortChange(column) {
	var sort = undefined
	var sortType = undefined
  
	if (column.prop != null && column.order != null) {
	  sort = column.prop
	  sortType = column.order
  
	}
	queryParams.sort = sort
	queryParams.sortType = sortType
	handleQuery()
  }
  
  /*************** form操作 ***************/
  const formRef = ref()
  const title = ref('')
  // 操作类型 1、add 2、edit 3、view
  const opertype = ref(0)
  const open = ref(false)
  const state = reactive({
	single: true,
	multiple: true,
	submitLoading: false,
	form: {},
	rules: {
	  userId: [{ required: true, message: "用户ID，主键不能为空", trigger: "blur"     }],
	},
	options: {
	  // 企业验证版区 选项列表 格式 eg:{ dictLabel: '标签', dictValue: '0'}
  frontend_category: [],
	  // 情感状态 选项列表 格式 eg:{ dictLabel: '标签', dictValue: '0'}
  frontend_emotionalstate: [],
	  // 学历 选项列表 格式 eg:{ dictLabel: '标签', dictValue: '0'}
  frontend_education: [],
	}
  })
  
  const { form, rules, options, single, multiple } = toRefs(state)
  
  // 关闭dialog
  function cancel(){
	open.value = false
	reset()
  }
  
  // 重置表单
  function reset() {
	form.value = {
	  userId: null,
	  promotePhone: null,
	  promoteWechat: null,
	  promoteQq: null,
	  promoteKakao: null,
	  promoteEmail: null,
	  promoteOther: null,
	  level: null,
	  gold: null,
	  experience: null,
	  qaScore: null,
	  lifePhotos: null,
	  companyName: null,
	  corporateCountry: null,
	  enterpriseQualifications: null,
	  enterpriseZoneId: null,
	  relationshipStatus: null,
	  interests: null,
	  birthday: null,
	  realName: null,
	  idCardNumber: null,
	  educationLevel: null,
	  introduction: null,
	  currentAddress: null,
	  hometown: null,
	  detailVerified: null,
	  phoneVerified: null,
	  idCardVerified: null,
	  lifePhotoVerified: null,
	  enterpriseVerified: null,
	  createdAt: null,
	  updatedAt: null,
	};
	proxy.resetForm("formRef")
  }
  
  
  // 修改按钮操作
  function handleUpdate(row) {
	reset()
	const id = row.userId || ids.value
	getsysUserExtend(id).then((res) => {
	  const { code, data } = res
	  if (code == 200) {
		open.value = true
		title.value = '修改用户扩展信息表'
		opertype.value = 2
  
		form.value = {
		  ...data,
		}
	  }
	})
  }
  
  // 添加&修改 表单提交
  function submitForm() {
	proxy.$refs["formRef"].validate((valid) => {
	  if (valid) {
		state.submitLoading = true
  
		if (form.value.userId != undefined && opertype.value === 2) {
		  updatesysUserExtend(form.value).then((res) => {
			proxy.$modal.msgSuccess("修改成功")
			open.value = false
			getList()
		  })
		} else {
		}
	  }
	})
  }
  
  handleQuery()
  </script>