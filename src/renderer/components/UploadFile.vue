<template>
  <div style="display: inline">
    <el-button type="primary" plain size="small" @click="dialogVisible = true">上传文件</el-button>
    <el-dialog title="上传您的文件" :visible.sync="dialogVisible">
      <el-upload :file-list="uploadFiles" action="alert" :auto-upload="false" multiple :on-change="loadFromFile" :on-remove="handleRemove">
        <el-button size="small" type="primary">选择文件</el-button>
        <div slot="tip"></div>
      </el-upload>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>  
        <el-button type="primary" @click="loadFromFileConfirmed" :disabled="uploadFiles===[]">确认</el-button>
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
        uploadFilename: null,
        uploadFiles: [],
        dialogVisible: false
      }
    },

    methods: {
      handleRemove (file, fileList) {
        this.uploadFiles.splice(this.uploadFiles.indexOf(file), 1)
      },

      loadFromFile (file, fileList) {
        this.uploadFilename = file.name
        this.uploadFiles = fileList
      },

      loadFromFileConfirmed () {
        if (this.uploadFiles) {
          this.uploadFiles.forEach(f => {
            let reader = new FileReader()
            reader.readAsText(f.raw)
            reader.onload = e => {
              this.fileName = f.raw.name
              this.file = e.target.result
              let fileToSave = []
              for (let i = 0; i < this.file.length; i++) {
                fileToSave.push({
                  char: this.file[i],
                  index: i,
                  label: 'None',
                  color: this.$store.state.Upload.label_set.label
                })
              }
              this.$store.dispatch('appendFileNames', this.fileName)
              this.$store.dispatch('appendFiles', fileToSave)
            }
          })
        }
        this.dialogVisible = false
      }
    }
  }
</script>  