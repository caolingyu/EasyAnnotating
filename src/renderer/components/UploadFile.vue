<template>
  <div style="display: inline">
    <el-button icon="el-icon-upload2" @click="dialogVisible = true"></el-button>
    <el-dialog title="上传您的文件" :visible.sync="dialogVisible">
      <el-upload 
        :file-list="uploadFiles"
        action="alert" 
        :auto-upload="false"
        :show-file-list="true"
        multiple 
        :on-change="loadFromFile" 
        :on-remove="handleRemove">
        <el-button size="small" type="primary">选择文件</el-button>
        <div slot="tip"></div>
      </el-upload>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>  
        <el-button type="primary" @click="loadFromFileConfirmed" :disabled="uploadFiles===[]">确 认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        fileName: null,
        file: null,
        uploadFiles: [],
        dialogVisible: false
      }
    },

    methods: {
      loadFromFileConfirmed () {
        if (this.uploadFiles) {
          this.uploadFiles.forEach(f => {
            this.fileName = f.raw.name
            let spl = this.fileName.split('.')
            let suffix = spl[spl.length - 1]
            if (suffix === 'ann') {
              this.$store.dispatch('appendPreAnn', {fileName: this.fileName.replace('.' + suffix, ''), file: f})
            } else {
              this.$store.dispatch('appendFileNames', this.fileName)
              this.$store.dispatch('appendFileRaw', f)
            }
          })
        }
        this.dialogVisible = false
        this.uploadFiles = []
      },

      handleRemove (file, fileList) {
        this.uploadFiles.splice(this.uploadFiles.indexOf(file), 1)
      },

      loadFromFile (file, fileList) {
        this.uploadFiles = fileList
      }
    }
  }
</script>

<style>
  .el-upload-list {
    max-height: 100px;
    overflow: scroll;
  }
</style>