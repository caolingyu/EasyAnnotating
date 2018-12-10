<template>
  <el-row>
    <el-button type="primary" plain size="small" @click="dialogVisible = true">上传配置</el-button>    
    <uploader></uploader>
    <el-button type="primary" plain size="small" @click="dialogVisible = true">清除标注</el-button>
    <el-button type="primary" plain size="small" @click="dialogVisible = true">导出标注</el-button>
  </el-row>
</template>

<script>
  import uploader from './UploadFile'

  export default {
    components: {
      uploader
    }
  }
</script>

<style>
</style>