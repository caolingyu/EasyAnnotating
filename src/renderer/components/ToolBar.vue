<template>
  <el-row type="flex" justify="start">
    <config-uploader></config-uploader>    
    <uploader></uploader>
    <exporter></exporter>
    <div style="display: inline">
      <el-button icon="el-icon-delete" @click="resetAnnotated"></el-button>
    </div>
  </el-row>
</template>

<script>
  import uploader from './UploadFile'
  import configUploader from './UploadConfig'
  import exporter from './Export'

  export default {
    components: {
      configUploader,
      uploader,
      exporter
    },

    methods: {
      resetAnnotated () {
        this.$store.dispatch('resetAnnotated')
      }
    }
  }
</script>