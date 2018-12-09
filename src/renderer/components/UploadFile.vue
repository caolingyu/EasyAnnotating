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
  import { Loading } from 'element-ui'

  export default {
    data () {
      return {
        uploadFilename: null,
        uploadFiles: [],
        dialogVisible: false,
        fileName: null,
        currentResult: null,
        ifLast: false,
        currentIndex: 0,
        loading: null
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
        // console.log(this.uploadFiles)
        if (this.uploadFiles) {
          // for (let i = 0; i < this.uploadFiles.length; i++) {
          let options = {
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          }
          this.loading = Loading.service(options)

          this.ifLast = false
          this.$store.dispatch('changeIfDone', false)

          let file = this.uploadFiles[0]
          // console.log(file.raw)
          // if (!file) continue
          if (file) {
            let reader = new FileReader()
            reader.readAsText(file.raw)
            reader.onload = e => {
              // console.log(e.target.result);
              // var _fileName = file.raw.name
              this.fileName = file.raw.name
              this.currentResult = e.target.result
              this.sendData(e.target.result)
              // console.log(this.$store.state.currentIndex2)
            }
          }
          // reader.onload = function(){
          //   //读取完毕后输出结果
          //   console.log(this.result);

          //  }
          // this.$store.dispatch("changeUploadData", this.result);
          // var _len = this.$store.state.inputList.length + 1
          // this.$store.dispatch("changeUploadList", _fileName)
          // this.$store.dispatch("changeCurrentIndex2", _len-1)
          // this.sendData(this.result);
        }
        // }
        this.dialogVisible = false
      },

      loadNext () {
        this.$store.dispatch('changeIfDone', false)
        let file = this.uploadFiles[this.currentIndex]
        // if (!file) continue
        if (file) {
          let reader = new FileReader()
          reader.readAsText(file.raw)
          reader.onload = e => {
            this.fileName = file.raw.name
            this.currentResult = e.target.result
            this.sendData(e.target.result)
          }
        }
      }
    }
  }
</script>  