<template>
  <el-container>
    <el-header>
      <toolbar></toolbar>
    </el-header>
    <el-main>
      <textbox></textbox>
    </el-main>
  </el-container>
</template>

<script>
  import textbox from './TextBox'
  import toolbar from './ToolBar'

  export default {
    name: 'Layout',
    data () {
      return {
      }
    },
    components: {
      textbox,
      toolbar,
    }
  }
</script>

<style>
</style>