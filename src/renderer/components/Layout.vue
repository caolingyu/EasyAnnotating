<template>
  <el-container>
    <el-header>
      <toolbar></toolbar>
    </el-header>
    <el-container class="app-container">
      <el-aside class="sidebar" width="200px">
        <leftbar></leftbar>
      </el-aside>
      <el-main class="app-main">
        <textbox></textbox>
      </el-main>
      <rightbar></rightbar>
    </el-container>
  </el-container>
</template>

<script>
  import textbox from './TextBox'
  import toolbar from './ToolBar'
  import leftbar from './LeftSideBar'
  import rightbar from './RightSideBar'

  export default {
    components: {
      textbox,
      toolbar,
      leftbar,
      rightbar
    }
  }
</script>

<style scoped>
  .app-main {
    height: 100%;
    padding: 0px;
  }

  .app-container {
    width: 100%;
    height: 100%;
    padding: 0px;
  }

  .app-container .main {
    height: 100%;
    padding: 0px;
  }
</style>