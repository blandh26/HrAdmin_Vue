<template>
	<div>
	  <el-form :model="queryParams" label-position="right" inline ref="queryRef" v-show="showSearch" @submit.prevent>
		<el-form-item label="主键ID" prop="id">
		  <el-input v-model.number="queryParams.id" placeholder="请输入主键ID" />
		</el-form-item>
		<el-form-item label="模块" prop="module">
		  <el-select clearable  v-model="queryParams.module" placeholder="请选择模块">
			<el-option v-for="item in  options.frontend_category " :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue">
			  <span class="fl">{{ item.dictLabel }}</span>
			  <span class="fr" style="color: var(--el-text-color-secondary);">{{ item.dictValue }}</span>          
			</el-option>
		  </el-select>
		</el-form-item>
		<el-form-item label="操作类型" prop="actionType">
		  <el-select clearable  v-model="queryParams.actionType" placeholder="请选择操作类型">
			<el-option v-for="item in  options.frontend_point_operate " :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue">
			  <span class="fl">{{ item.dictLabel }}</span>
			  <span class="fr" style="color: var(--el-text-color-secondary);">{{ item.dictValue }}</span>          
			</el-option>
		  </el-select>
		</el-form-item>
		<el-form-item label="积分类型" prop="scoreType">
		  <el-select clearable  v-model="queryParams.scoreType" placeholder="请选择积分类型">
			<el-option v-for="item in  options.frontend_pointtype " :key="item.dictValue" :label="item.dictLabel" :value="item.dictValue">
			  <span class="fl">{{ item.dictLabel }}</span>
			  <span class="fr" style="color: var(--el-text-color-secondary);">{{ item.dictValue }}</span>          
			</el-option>
		  </el-select>
		</el-form-item>
		<el-form-item label="变动金额（正负）" prop="amount">
		  <el-input v-model="queryParams.amount" placeholder="请输入变动金额（正负）" />
		</el-form-item>
		<el-form-item label="用户ID" prop="userId">
		  <el-input v-model.number="queryParams.userId" placeholder="请输入用户ID" />
		</el-form-item>
		<el-form-item label="操作人" prop="operator">
		  <el-input v-model="queryParams.operator" placeholder="请输入操作人" />
		</el-form-item>
		<el-form-item label="操作时间">
		  <el-date-picker
			v-model="dateRangeCreateTime" 
			type="datetimerange"
			start-placeholder="开始日期"
			end-placeholder="结束日期"
			value-format="YYYY-MM-DD HH:mm:ss"
			:default-time="defaultTime"
			:shortcuts="dateOptions">
		  </el-date-picker>
		</el-form-item>
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
		<el-table-column prop="id" label="主键ID" align="center" v-if="columns.showColumn('id')"/>
		<el-table-column prop="module" label="模块" align="center" v-if="columns.showColumn('module')">
		  <template #default="scope">
			<dict-tag :options=" options.frontend_category " :value="scope.row.module"  />
		  </template>
		</el-table-column>
		<el-table-column prop="actionType" label="操作类型" align="center" v-if="columns.showColumn('actionType')">
		  <template #default="scope">
			<dict-tag :options=" options.frontend_point_operate " :value="scope.row.actionType"  />
		  </template>
		</el-table-column>
		<el-table-column prop="scoreType" label="积分类型" align="center" v-if="columns.showColumn('scoreType')">
		  <template #default="scope">
			<dict-tag :options=" options.frontend_pointtype " :value="scope.row.scoreType"  />
		  </template>
		</el-table-column>
		<el-table-column prop="beforeAmount" label="操作前余额" align="center" v-if="columns.showColumn('beforeAmount')"/>
		<el-table-column prop="amount" label="变动金额（正负）" align="center" v-if="columns.showColumn('amount')"/>
		<el-table-column prop="afterAmount" label="操作后余额" align="center" v-if="columns.showColumn('afterAmount')"/>
		<el-table-column prop="userId" label="用户ID" align="center" v-if="columns.showColumn('userId')"/>
		<el-table-column prop="operator" label="操作人" align="center" :show-overflow-tooltip="true" v-if="columns.showColumn('operator')"/>
		<el-table-column prop="createTime" label="操作时间" :show-overflow-tooltip="true"  v-if="columns.showColumn('createTime')"/>
		<el-table-column prop="remark" label="备注" align="center" :show-overflow-tooltip="true" v-if="columns.showColumn('remark')"/>
		<el-table-column label="操作" width="160">
		  <template #default="scope">
		  </template>
		</el-table-column>
	  </el-table>
	  <pagination :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
  
  
	  <el-dialog :title="title" :lock-scroll="false" v-model="open" >
		<el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
		  <el-row :gutter="20">
			  
  
			  
			  
  
  
  
			  
  
  
  
		  </el-row>
		</el-form>
		<template #footer v-if="opertype != 3">
		  <el-button text @click="cancel">{{ $t('btn.cancel') }}</el-button>
		</template>
	  </el-dialog>
	</div>
  </template>
  
  <script setup name="fpointslog">
  import { listFPointslog,
   
  getFPointslog, 
   } 
  from '@/api/frontEnd/fpointslog.js'
  const { proxy } = getCurrentInstance()
  const ids = ref([])
  const loading = ref(false)
  const showSearch = ref(true)
  const queryParams = reactive({
	pageNum: 1,
	pageSize: 10,
	sort: '',
	sortType: 'asc',
	id: undefined,
	module: undefined,
	actionType: undefined,
	scoreType: undefined,
	amount: undefined,
	userId: undefined,
	operator: undefined,
	createTime: undefined,
  })
  const columns = ref([
	{ visible: true, align: 'center', type: '', prop: 'id', label: '主键ID'   },
	{ visible: true, align: 'center', type: 'dict', prop: 'module', label: '模块'  ,showOverflowTooltip: true  ,dictType: 'frontend_category' },
	{ visible: true, align: 'center', type: 'dict', prop: 'actionType', label: '操作类型'   ,dictType: 'frontend_point_operate' },
	{ visible: true, align: 'center', type: 'dict', prop: 'scoreType', label: '积分类型'   ,dictType: 'frontend_pointtype' },
	{ visible: true, align: 'center', type: '', prop: 'beforeAmount', label: '操作前余额'   },
	{ visible: true, align: 'center', type: '', prop: 'amount', label: '变动金额（正负）'   },
	{ visible: true, align: 'center', type: '', prop: 'afterAmount', label: '操作后余额'   },
	{ visible: true, align: 'center', type: '', prop: 'userId', label: '用户ID'   },
	{ visible: false, align: 'center', type: '', prop: 'operator', label: '操作人'  ,showOverflowTooltip: true  },
	{ visible: false, align: 'center', type: '', prop: 'createTime', label: '操作时间'  ,showOverflowTooltip: true  },
	{ visible: false, align: 'center', type: '', prop: 'remark', label: '备注'  ,showOverflowTooltip: true  },
	//{ visible: false, prop: 'actions', label: '操作', type: 'slot', width: '160' }
  ])
  const total = ref(0)
  const dataList = ref([])
  const queryRef = ref()
  const defaultTime = ref([new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)])
  
  // 操作时间时间范围
  const dateRangeCreateTime = ref([])
  
  
  var dictParams = [
	"frontend_category",
	"frontend_point_operate",
	"frontend_pointtype",
  ]
  
  proxy.getDicts(dictParams).then((response) => {
	response.data.forEach((element) => {
	  state.options[element.dictType] = element.list
	})
  })
  
  function getList(){
	proxy.addDateRange(queryParams, dateRangeCreateTime.value, 'CreateTime');
	loading.value = true
	listFPointslog(queryParams).then(res => {
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
	// 操作时间时间范围
	dateRangeCreateTime.value = []
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
	  module: [{ required: true, message: "模块不能为空", trigger: "change"     }],
	  actionType: [{ required: true, message: "操作类型不能为空", trigger: "change"    , type: "number"  }],
	  scoreType: [{ required: true, message: "积分类型不能为空", trigger: "change"    , type: "number"  }],
	  beforeAmount: [{ required: true, message: "操作前余额不能为空", trigger: "blur"     }],
	  amount: [{ required: true, message: "变动金额（正负）不能为空", trigger: "blur"     }],
	  afterAmount: [{ required: true, message: "操作后余额不能为空", trigger: "blur"     }],
	  userId: [{ required: true, message: "用户ID不能为空", trigger: "blur"    , type: "number"  }],
	  operator: [{ required: true, message: "操作人不能为空", trigger: "blur"     }],
	  createTime: [{ required: true, message: "操作时间不能为空", trigger: "blur"     }],
	},
	options: {
	  // 模块 选项列表 格式 eg:{ dictLabel: '标签', dictValue: '0'}
  frontend_category: [],
	  // 操作类型 选项列表 格式 eg:{ dictLabel: '标签', dictValue: '0'}
  frontend_point_operate: [],
	  // 积分类型 选项列表 格式 eg:{ dictLabel: '标签', dictValue: '0'}
  frontend_pointtype: [],
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
	  id: null,
	  module: null,
	  actionType: null,
	  scoreType: null,
	  beforeAmount: null,
	  amount: null,
	  afterAmount: null,
	  userId: null,
	  operator: null,
	  createTime: null,
	  remark: null,
	};
	proxy.resetForm("formRef")
  }
  
  
  
  // 添加&修改 表单提交
  function submitForm() {
	proxy.$refs["formRef"].validate((valid) => {
	  if (valid) {
		state.submitLoading = true
  
		if (form.value.id != undefined && opertype.value === 2) {
		} else {
		}
	  }
	})
  }
  
  handleQuery()
  </script>