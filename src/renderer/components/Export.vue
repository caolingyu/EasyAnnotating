<template>
  <div style="display: inline">
    <el-button icon="el-icon-download" @click="dialogFormVisible = true"></el-button>
    <el-dialog title="导出设置" :visible.sync="dialogFormVisible">
      <el-row>
        <el-col :span="18"><el-input v-model="savePath" clearable></el-input></el-col>
        <el-col :span="6"><el-button type="primary" @click="oepnDialog">浏览</el-button></el-col>
      </el-row>
      <el-form :model="form">
        <el-form-item label="标注模式" :label-width="formLabelWidth">
          <el-select v-model="form.pattern" placeholder="请选择标注模式">
            <el-option label="BIO" value="BIO"></el-option>
            <el-option label="Tie & Break" value="Tie&Break"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="genAnnotated">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import path from 'path'
  import { files } from '@/scripts/fileOperation.js'
  const ipc = require('electron').ipcRenderer

  export default {
    data () {
      return {
        dialogFormVisible: false,
        formLabelWidth: '120px',
        form: {
          pattern: ''
        },
        savePath: '',
        annotated: []
      }
    },
    mounted () {
      ipc.on('selected-directory', (event, path) => {
        if (!path) path = '无路径'
        this.savePath = path[0]
        // const savePath = path[0]
        // document.getElementById('file-saved').innerHTML = `选择的路径: ${path}`
        // files.write(path, 'write some to test')
      })
    },
    methods: {
      genAnnotated () {
        for (let i = 0; i < this.$store.state.Upload.annotated.length; i++) {
          let annotatedText = ''
          let fileName = ''
          let curLabel = ''
          let curEnt = ''
          let startIdx = 0
          let lineToAdd = ''
          switch (this.form.pattern) {
            case 'Tie&Break':
              fileName = this.$store.state.Upload.file_names[i] + '.ann'
              annotatedText = '<s>\tO\tNone\n'
              curLabel = 'None'
              this.$store.state.Upload.annotated[i].content.forEach(f => {
                if (!(['', ' ', '\t', '\n', '\t'].indexOf(f.char) > -1)) {
                  if (f.label !== curLabel) {
                    lineToAdd = f.char + '\tI\t' + f.label + '\n'
                    annotatedText += lineToAdd
                  } else {
                    if (f.label === 'None' || f.isStart === true) {
                      lineToAdd = f.char + '\tI\t' + f.label + '\n'
                      annotatedText += lineToAdd
                    } else {
                      lineToAdd = f.char + '\tO\t' + f.label + '\n'
                      annotatedText += lineToAdd
                    }
                  }
                }
                curLabel = f.label
                if (([',', '.', '、', '，', '。'].indexOf(f.char) > -1)) {
                  annotatedText += '<eof>\tI\tNone\n\n'
                  annotatedText += '<s>\tO\tNone\n'
                }
              })
              this.annotated.push({name: fileName, content: annotatedText})
              break
            case 'BIO':
              fileName = this.$store.state.Upload.file_names[i] + '.ann'
              annotatedText = ''
              curEnt = ''
              curLabel = 'None'
              startIdx = 0
              this.$store.state.Upload.annotated[i].content.forEach(f => {
                if (f.label !== curLabel) { // 当前标签和前一个标签不同
                  if (curEnt !== '') {
                    lineToAdd = curEnt + '\t' + startIdx.toString() + '\t' + (f.index - 1).toString() + '\t' + curLabel + '\n'
                    annotatedText += lineToAdd
                  }
                  if (f.label !== 'None') {
                    curEnt = f.char
                    curLabel = f.label
                    startIdx = f.index
                  } else {
                    curEnt = ''
                    curLabel = 'None'
                    startIdx = 0
                  }
                } else { // 当前标签和前一个标签相同
                  if (f.label !== 'None' && f.isStart === false) { // 当前的标签非空且属于同一实体
                    curEnt += f.char
                  } else if (f.label !== 'None' && f.isStart === true) { // 当前的标签非空且不属于同一实体
                    lineToAdd = curEnt + '\t' + startIdx.toString() + '\t' + (f.index - 1).toString() + '\t' + curLabel + '\n'
                    annotatedText += lineToAdd
                    curEnt = f.char
                    curLabel = f.label
                    startIdx = f.index
                  } else { // 当前标签为空
                    startIdx = ''
                    curEnt = ''
                  }
                }
              })
              this.annotated.push({name: fileName, content: annotatedText})
              break
          }
        }
        this.annotated.forEach(f => {
          files.write(path.join(this.savePath, f.name), f.content)
          this.annotated = []
        })
        this.dialogFormVisible = false
      },
      oepnDialog () {
        ipc.send('open-file-dialog')
      }
    }
  }
</script>  