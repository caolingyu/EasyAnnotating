<template>
  <el-row>
    <uploader></uploader>
  </el-row>
</template>

<script>
  import uploader from './UploadFile'

  export default {
    name: 'ToolBar',
    data () {
      return {
      }
    },
    components: {
      uploader
    }
  }
</script>

<style>
</style>