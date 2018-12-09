<template>
  <el-container>
    <el-header>
      <toolbar></toolbar>
    </el-header>
    <el-aside width="200px">
      <leftbar></leftbar>
    </el-aside>
    <el-main>
      <textbox></textbox>
    </el-main>
  </el-container>
</template>

<script>
  import textbox from './TextBox'
  import toolbar from './ToolBar'
  import leftbar from './LeftSideBar'

  export default {
    name: 'Layout',
    data () {
      return {
      }
    },
    components: {
      textbox,
      toolbar,
      leftbar
    }
  }
</script>

<style>
</style>