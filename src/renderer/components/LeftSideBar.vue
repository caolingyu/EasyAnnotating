<template>
  <el-menu style="text-align: left; background-color: #333; color: #66b1ff">
    <template slot="title"><i class="el-icon-edit"></i>Files</template>
    <el-menu-item 
      :index="'1'+index" 
      v-for="(item, index) in getFileList" 
      :key=index @click="changeIndex(index)"
      style="color: #66b1ff">
      {{ item }}
    </el-menu-item>
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