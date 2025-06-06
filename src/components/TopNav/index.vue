<template>
  <el-menu
    :default-active="activeMenu"
    :active-text-color="theme"
    mode="horizontal"
    background-color="transparent"
    @select="handleSelect"
    :ellipsis="false">
    <template v-for="(item, index) in topMenus">
      <el-menu-item :style="{ '--theme': theme }" :index="item.path" :key="index" v-if="index < visibleNumber">
        <svg-icon class="menu-icon" :name="item.meta.icon" />
        <!-- {{ item.meta.title }} -->
        <template v-if="item.meta.titleKey" #title>
          {{ $t(item.meta.titleKey) }}
        </template>
        <template v-else-if="item.meta.title" #title>
          {{ item.meta.title }}
        </template>
      </el-menu-item>
    </template>

    <!-- 顶部菜单超出数量折叠 -->
    <el-sub-menu :style="{ '--theme': theme }" index="more" v-if="topMenus.length > visibleNumber">
      <template #title>{{ $t('btn.more') }}</template>
      <template v-for="(item, index) in topMenus">
        <el-menu-item :index="item.path" :key="index" v-if="index >= visibleNumber">
          <svg-icon class="menu-icon" :name="item.meta.icon" />
          <template v-if="item.meta.titleKey" #title>
            {{ $t(item.meta.titleKey) }}
          </template>
          <template v-else-if="item.meta.title" #title>
            {{ item.meta.title }}
          </template>
        </el-menu-item>
      </template>
    </el-sub-menu>
  </el-menu>
</template>

<script setup>
import { constantRoutes } from '@/router'
import { isHttp } from '@/utils/validate'
import { useRouter } from 'vue-router'
import { getNormalPath } from '@/utils/ruoyi'
import useAppStore from '@/store/modules/app'
import useSettingsStore from '@/store/modules/settings'
import usePermissionStore from '@/store/modules/permission'

// 顶部栏初始数
const visibleNumber = ref(5)
// 当前激活菜单的 index
const currentIndex = ref(undefined)
// 隐藏侧边栏路由
const hideList = ['/index', '/user/profile']

const appStore = useAppStore()
const settingsStore = useSettingsStore()
const permissionStore = usePermissionStore()
const route = useRoute()
const router = useRouter()

// 主题颜色
const theme = computed(() => settingsStore.theme)
// 所有的路由信息
const routers = computed(() => permissionStore.topbarRouters)

// 顶部显示菜单
const topMenus = computed(() => {
  let topMenus = []
  routers.value.map((menu) => {
    if (menu.hidden !== true) {
      // 兼容顶部栏一级菜单内部跳转
      if (menu.path === '/' && menu.children) {
        topMenus.push(menu.children[0])
      } else {
        topMenus.push(menu)
      }
    }
  })
  return topMenus
})

// 设置子路由
const childrenMenus = computed(() => {
  let childrenMenus = []
  routers.value.map((router) => {
    for (let item in router.children) {
      if (router.children[item].parentPath === undefined) {
        if (router.path === '/') {
          router.children[item].path = '/' + router.children[item].path
        } else {
          if (!isHttp(router.children[item].path)) {
            router.children[item].path = router.path + '/' + router.children[item].path
          }
        }
        router.children[item].parentPath = router.path
      }
      childrenMenus.push(router.children[item])
    }
  })
  return childrenMenus.concat(constantRoutes)
})

// 默认激活的菜单
const activeMenu = computed(() => {
  const path = route.path
  let activePath = path

  if (path !== undefined && path.lastIndexOf('/') > 0 && hideList.indexOf(path) === -1) {
    const tmpPath = path.substring(1, path.length)

    // if (!route.meta.link) {
    activePath = '/' + tmpPath.substring(0, tmpPath.indexOf('/'))
    appStore.toggleSideBarHide(false)
    // }
  } else if (!route.children) {
    activePath = path
  }
  activeRoutes(activePath)
  return activePath
})

function setVisibleNumber() {
  const width = document.body.getBoundingClientRect().width / 3
  visibleNumber.value = parseInt(width / 85)
}
/**
 * 选中菜单
 * @param key
 * @param keyPath
 */
function handleSelect(key, keyPath) {
  currentIndex.value = key
  const route = routers.value.find((item) => item.path === key)
  if (key.startsWith('/link')) {
    var path = import.meta.env.VITE_APP_ROUTER_PREFIX + key
    path = path.replace('//', '/')
    window.open(key, '_blank')
  } else if (isHttp(key)) {
    // http(s):// 路径新窗口打开
    window.open(key, '_blank')
  } else if (!route || !route.children) {
    // 没有子路由路径内部打开
    const routeMenu = childrenMenus.value.find((item) => item.path === key)
    if (routeMenu && routeMenu.query) {
      let query = JSON.parse(routeMenu.query)
      router.push({ path: key, query: query })
    } else {
      router.push({ path: key })
    }
    activeRoutes(key)
    // appStore.toggleSideBarHide(true)
  } else {
    // 显示左侧联动菜单
    activeRoutes(key)
    appStore.toggleSideBarHide(false)
  }
}
// 当前激活的路由
function activeRoutes(key) {
  const children = childrenMenus.value || []
  const routes = children.filter(
    (item) => key === item.parentPath || (item.parentPath === '/' && key === item.path) || (key === '/index' && item.path === '')
  )
  permissionStore.setSidebarRouters(routes)
  return routes
}

onMounted(() => {
  window.addEventListener('resize', setVisibleNumber)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', setVisibleNumber)
})

onMounted(() => {
  setVisibleNumber()
})
</script>

<style lang="scss" scoped>
// 修改默认样式
.el-menu--horizontal > .el-menu-item {
  height: 50px !important;
  line-height: 50px !important;
  padding: 0 5px !important;
  margin: 0 10px !important;
}
.el-menu--horizontal .menu-icon {
  margin-right: 5px;
}
/* sub-menu item */
.el-menu--horizontal > .el-sub-menu .el-sub-menu__title {
  height: var(--base-header-height) !important;
  line-height: var(--base-header-height) !important;
  padding: 0 5px !important;
  margin: 0 10px !important;
}
.el-menu--horizontal.el-menu {
  border-bottom: unset !important;
}
.el-menu--horizontal {
  height: var(--base-header-height);
}
</style>
