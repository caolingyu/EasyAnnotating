<template>
  <div style="display: inline">
    <el-button type="primary" plain size="small" @click="dialogVisible = true">导出标注</el-button>
    <el-dialog title="导出设置" :visible.sync="dialogVisible">
      
      <span slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>  
        <el-button type="primary" @click="loadFromFileConfirmed" :disabled="uploadFiles===[]">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { files } from "@/scripts/fileOperation.js";
  const {
    ipcRenderer
  } = window.require("electron")
  export default {
    methods: {
      writeFile: function() {
        files.write(
          "/userSet.txt",
          'write some to test'
        );
      },
      // readFile: function() {  // 读取 userSet.txt 文件
      //   this.filesData = files.read("/userSet.txt");
      // },
      openUseDirections: function(){  // render 进程与 main 进程交互打开使用说明窗口
        ipcRenderer.send("openUseDirections");
      }
    }
  }
</script>  