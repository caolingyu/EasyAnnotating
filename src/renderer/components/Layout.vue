<template>
  <el-container>
    <el-aside width="200px">
      <leftbar></leftbar>
    </el-aside>
    <el-container>
      <el-header>
        <toolbar></toolbar>
      </el-header>
      <el-main>
        <textbox></textbox>
      </el-main>
    </el-container>
    <el-aside width="200px">
      <rightbar></rightbar>
    </el-aside>
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

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>