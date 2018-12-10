<template>
  <el-menu background-color="#D3DCE6" style="text-align: left; margin-left: 20px">
    <template slot="title"><i class="el-icon-edit"></i>Files</template>
    <el-menu-item :index="'1'+index" v-for="(item, index) in getFileList" :key=index @click="changeIndex(index)">{{ item }}</el-menu-item>
  </el-menu>
</template>

<script>
  import uploader from './UploadFile'

  export default {
    components: {
      uploader
    },

    computed: {
      getFileList () {
        return this.$store.state.Upload.file_names
      }
    },

    methods: {
      changeIndex (index) {
        this.$store.dispatch('changeCurIdx', index)
      }
    }
  }
</script>

<style>
</style>