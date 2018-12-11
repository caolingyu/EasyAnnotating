<template>
  <el-row>
    <config-uploader></config-uploader>    
    <uploader></uploader>
    <!-- <el-button type="primary" plain size="small" @click="dialogVisible = true">清除标注</el-button> -->
    <exporter></exporter>
  </el-row>
</template>

<script>
  import uploader from './UploadFile'
  import configUploader from './UploadConfig'
  import exporter from './Export'

  export default {
    components: {
      uploader,
      exporter,
      configUploader
    }
  }
</script>

<style>
</style>