<template>
  <div style="display: inline">
    <el-button icon="el-icon-setting" @click="dialogVisible = true"></el-button>
    <el-dialog title="上传您的文件" :visible.sync="dialogVisible">
      <el-upload :file-list="uploadFiles" action="alert" 
        :auto-upload="false" 
        :on-change="loadFromFile" 
        :on-remove="handleRemove"
        :on-exceed="handleExceed">
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
        uploadFiles: [],
        labelSet: null,
        dialogVisible: false
      }
    },

    methods: {
      handleRemove (file, fileList) {
        this.uploadFiles.splice(this.uploadFiles.indexOf(file), 1)
      },

      handleExceed (files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
      },

      loadFromFile (file, fileList) {
        this.uploadFiles = fileList
      },

      loadFromFileConfirmed () {
        if (this.uploadFiles) {
          this.uploadFiles.forEach(f => {
            let reader = new FileReader()
            reader.readAsText(f.raw)
            reader.onload = e => {
              this.file = e.target.result
              this.$store.dispatch('changeLabelSet', JSON.parse(this.file))
            }
          })
        }
        this.dialogVisible = false
        this.uploadFiles = []
      }
    }
  }
</script>  