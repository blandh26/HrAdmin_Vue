<template>
  <div class="app-container home">
    <noticeBar :dataList="noticeList"> </noticeBar>
    <el-row :gutter="20">
      <el-col :lg="16" :sm="24">
        <h2>ZRAdmin.NET {{ $t('layout.backstageManagement') }}</h2>
        <p>
          ZRAdmin.NET借鉴了很多开源项目的优点，让你开发Web管理系统更简单，所以我也把它给开源了（前端
          <code>vue页面</code>主要使用了若依，后端参考Ruoyi SpringBoot版本，在此表示感谢.)
        </p>
        <p>{{ $t('layout.content1') }}</p>
        <!-- <p>
          <b>{{ $t('layout.currentVersion') }}:</b> <span>v{{ version }}</span>
          <el-link
            class="ml10"
            type="primary"
            size="small"
            icon="Document"
            plain
            @click="goTarget('http://www.izhaorui.cn/doc/changelog.html#' + version)"
            >{{ $t('layout.changeLog') }}
          </el-link>
        </p> -->
        <!-- <p>
          <el-button type="primary" size="small" icon="Cloudy" plain @click="goTarget('https://gitee.com/izory/ZrAdminNetCore')">Gitee </el-button>
          <el-button type="primary" size="small" icon="Cloudy" plain @click="goTarget('https://github.com/izhaorui/ZrAdmin.NET')"
            >Github
          </el-button>
        </p> -->
        <p></p>
        <!-- <h3>{{ $t('layout.tip1') }}</h3> -->
      </el-col>
      <el-col :lg="8" :sm="24">
        <h2>{{ $t('layout.technicalSelection') }}</h2>
        <div style="float: left; width: 50%">
          <h4>{{ $t('layout.backendTechnology') }}</h4>
          <ul>
            <li>NET8</li>
            <li>JWT</li>
            <li>SqlSugar</li>
            <li>Quartz.Net</li>
            <li>Mapster</li>
            <li>MiniExcel</li>
            <li>Redis</li>
            <li>Signalr</li>
            <li>...</li>
          </ul>
        </div>
        <div style="float: right; width: 50%">
          <h4>{{ $t('layout.frontendTechnology') }}</h4>
          <ul>
            <li>Vue3</li>
            <li>Pinia</li>
            <li>Element plus</li>
            <li>Axios</li>
            <li>Sass</li>
            <li>Wangeditor</li>
            <li>Vite</li>
            <li>Composition api</li>
            <li>I18n</li>
            <li>...</li>
          </ul>
        </div>
      </el-col>
    </el-row>
    <el-divider />
  </div>
</template>

<script setup name="index">
import noticeBar from '@/components/NoticeBar/index'

const noticeList = ref(['官网地址：http://www.izhaorui.cn', 'ZRAdmin.NET后台管理系统'])

import defaultSettings from '@/settings'
const version = defaultSettings.version

function goTarget(url) {
  window.open(url, '__blank')
}
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }

  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }

  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: 'open sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;

    b {
      font-weight: 700;
    }
  }

  .update-log {
    ol {
      display: block;
      list-style-type: decimal;
      margin-block-start: 1em;
      margin-block-end: 1em;
      margin-inline-start: 0;
      margin-inline-end: 0;
      padding-inline-start: 40px;
    }
  }
}
</style>
