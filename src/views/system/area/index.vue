<!--
 * @Descripttion: (行政区域/sys_area)
 * @Author: (admin)
 * @Date: (2025-06-10)
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
	  <el-row :gutter="10" class="mb8">
		<el-col :span="1.5">
		  <el-button type="primary" v-hasPermi="['area:add']" plain icon="plus" @click="handleAdd">
			{{ $t('btn.add') }}
		  </el-button>
		</el-col>
		 <el-col :span="1.5">
		  <el-button type="info" plain icon="sort" @click="toggleExpandAll">展开/折叠</el-button>
		</el-col>
		<el-col :span="1.5">
		  <el-button type="warning" plain icon="download" @click="handleExport" v-hasPermi="['area:export']">
			{{ $t('btn.export') }}
		  </el-button>
		</el-col>
		<right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
	  </el-row>
  
	  <!-- 数据区域 -->
	  <el-table
		v-if="refreshTable"
		:data="dataList"
		v-loading="loading"
		ref="tableRef"
		border
		highlight-current-row
		@selection-change="handleSelectionChange"
		:default-expand-all="isExpandAll"
		row-key="level"
		:tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
		<el-table-column type="selection" width="50" align="center"/>
		<el-table-column prop="id" label="主键ID" align="center" :show-overflow-tooltip="true" />
		<el-table-column prop="country" label="所属国家ID" align="center" :show-overflow-tooltip="true" />
		<el-table-column prop="parentId" label="父级区域ID" align="center" :show-overflow-tooltip="true" />
		<el-table-column prop="level" label="区域等级" align="center" :show-overflow-tooltip="true" />
		<el-table-column prop="name" label="区域名称" align="center" :show-overflow-tooltip="true" />
		<el-table-column prop="wholeName" label="完整名称" align="center" :show-overflow-tooltip="true" />
		<el-table-column prop="areaCode" label="行政区编码" align="center" :show-overflow-tooltip="true" />
		<el-table-column prop="order" label="排序" align="center" :show-overflow-tooltip="true" />
  
		<el-table-column label="操作" align="center" width="140">
		  <template #default="scope">
			<el-button v-hasPermi="['area:edit']" type="success" icon="edit" title="编辑" 
			  @click="handleUpdate(scope.row)"></el-button>
		  </template>      
		</el-table-column>
	  </el-table>
  
	  <!-- 添加或修改行政区域对话框 -->
	  <el-dialog :title="title" :lock-scroll="false" v-model="open" >
		<el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
		  <el-row :gutter="20">
  
			<el-col :lg="12" v-if="opertype == 2">
			  <el-form-item label="主键ID">{{form.id}}</el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="所属国家ID" prop="country">
				<el-input v-model="form.country" placeholder="请输入所属国家ID" />
			  </el-form-item>
			</el-col>
  
			<el-col :lg="24">
			  <el-form-item label="父级id" prop="parentId">
				<el-cascader
				  class="w100"
				  :options="dataList"
				  :props="{ checkStrictly: true, value: 'level', label: 'name', emitPath: false }"
				  placeholder="请选择上级菜单"
				  clearable
				  v-model="form.parentId"
				>
				  <template #default="{ node, data }">
					<span>{{ data.name }}</span>
					<span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
				  </template>
				</el-cascader>
			  </el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="区域等级" prop="level">
				<el-input v-model="form.level" placeholder="请输入区域等级（如1=国家，2=省，3=市，4=区）" />
			  </el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="区域名称" prop="name">
				<el-input v-model="form.name" placeholder="请输入区域名称（如：北京）" />
			  </el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="完整名称" prop="wholeName">
				<el-input v-model="form.wholeName" placeholder="请输入完整名称（如：中国北京市朝阳区）" />
			  </el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="行政区编码" prop="areaCode">
				<el-input v-model="form.areaCode" placeholder="请输入行政区编码" />
			  </el-form-item>
			</el-col>
  
			<el-col :lg="12">
			  <el-form-item label="排序值" prop="order">
				<el-input v-model="form.order" placeholder="请输入排序值，越小越靠前" />
			  </el-form-item>
			</el-col>
		  </el-row>
		</el-form>
		<template #footer>
		  <div class="dialog-footer">
			<el-button text @click="cancel">{{ $t('btn.cancel') }}</el-button>
			<el-button type="primary" @click="submitForm">{{ $t('btn.submit') }}</el-button>
		  </div>
		</template>
	  </el-dialog>
  
	</div>
  </template>
  
  <script setup name="sysarea">
  import { treelistSysArea, listSysArea, addSysArea, delSysArea, updateSysArea,getSysArea,} 
  from '@/api/system/sysarea.js'
  
  const { proxy } = getCurrentInstance()
  const isExpandAll = ref(false)
  const refreshTable = ref(true)
  function toggleExpandAll() {
	refreshTable.value = false
	isExpandAll.value = !isExpandAll.value
	nextTick(() => {
	  refreshTable.value = true
	})
  }
  
  // 选中id数组数组
  const ids = ref([])
  const single = ref(true)
  const multiple = ref(true)
  const loading = ref(false)
  const showSearch = ref(true)
  const queryParams = reactive({
	pageNum: 1,
	pageSize: 10,
	sort: 'Order',
	sortType: 'asc',
  })
  const total = ref(0)
  const dataList = ref([])
  const queryRef = ref()
  const defaultTime = ref([new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)])
  
  
  var dictParams = [
  ]
  
  
  function getList(){
	loading.value = true
	treelistSysArea(queryParams).then(res => {
	  const { code, data } = res
	  if (code == 200) {
		//dataList.value = res.data.result
		//total.value = res.data.totalNum
		dataList.value = res.data
		loading.value = false
	  }
	})
	  .catch(() => {
		loading.value = false
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
  
  // 多选框选中数据
  function handleSelectionChange(selection) {
	ids.value = selection.map((item) => item.id);
	single.value = selection.length != 1
	multiple.value = !selection.length;
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
  const title = ref("")
  // 操作类型 1、add 2、edit
  const opertype = ref(0)
  const open = ref(false)
  const state = reactive({
	form: {},
	rules: {
	  country: [{ required: true, message: "所属国家", trigger: "blur" }],
	  parentId: [{ required: true, message: "父级区域", trigger: "blur" }],
	  level: [{ required: true, message: "区域等级", trigger: "blur" }],
	  name: [{ required: true, message: "区域名称", trigger: "blur" }],
	},
	options: {
	}
  })
  
  const { form, rules, options } = toRefs(state)
  
  // 关闭dialog
  function cancel(){
	open.value = false
	reset()
  }
  
  // 重置表单
  function reset() {
	proxy.resetForm("formRef")
  }
  
  // 添加按钮操作
  function handleAdd() {
	reset();
	open.value = true
	title.value = '添加'
	opertype.value = 1
  }
  
  // 修改按钮操作
  function handleUpdate(row) {
	reset()
	const id = row.id || ids.value
	getSysArea(id).then((res) => {
	  const { code, data } = res
	  if (code == 200) {
		open.value = true
		title.value = "修改数据"
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
		if (form.value.id != undefined && opertype.value === 2) {
		  updateSysArea(form.value).then((res) => {
			proxy.$modal.msgSuccess("修改成功")
			open.value = false
			getList()
		  })
		  .catch(() => {})
		} else {
		  addSysArea(form.value).then((res) => {
			  proxy.$modal.msgSuccess("新增成功")
			  open.value = false
			  getList()
			})
			.catch(() => {})
		}
	  }
	})
  }
  
  // 删除按钮操作
  function handleDelete(row) {
	const Ids = row.id || ids.value
  
	proxy.$confirm('是否确认删除参数编号为"' + Ids + '"的数据项？')
	.then(function () {
		return delSysArea(Ids)
	})
	.then(() => {
		getList()
		proxy.$modal.msgSuccess("删除成功")
	})
	.catch(() => {})
  }
  
  // 导出按钮操作
  function handleExport() {
	proxy
	  .$confirm("是否确认导出行政区域数据项?", "警告", {
		confirmButtonText: "确定",
		cancelButtonText: "取消",
		type: "warning",
	  })
	  .then(async () => {
		await proxy.downFile('/System/SysArea/export', { ...queryParams })
	  })
  }
  
  handleQuery()
  </script>