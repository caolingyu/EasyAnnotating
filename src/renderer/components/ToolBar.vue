<template>
  <el-row>
    <el-button type="primary" plain size="small" @click="dialogVisible = true">上传配置</el-button>    
    <uploader></uploader>
    <el-button type="primary" plain size="small" @click="dialogVisible = true">清除标注</el-button>
    <exporter></exporter>
  </el-row>
</template>

<script>
  import uploader from './UploadFile'
  import exporter from './Export'

  export default {
    components: {
      uploader,
      exporter
    }
  }
</script>

<style>
</style>