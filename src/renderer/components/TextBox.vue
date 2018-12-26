<template>
  <div class='display'>
    <span v-for="(item, index) in getFile" :key=index :style="{'display': 'inline-block'}">
      <span v-if="item.label!='None'"
        :id=index
        :style="{'background-color': item.color, 'cursor': 'pointer'}"
        @click="clickEnt(index)">
        {{item.char}}
      </span>
      <span v-else
        :id=index>
        {{item.char}}
      </span>
    </span>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>删除实体</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changeEnt()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        curIdx: null,
        dialogVisible: false
      }
    },
    computed: {
      getFile () {
        let fileSelected = this.$store.state.Upload.annotated[this.$store.state.Upload.cur_idx]
        if (fileSelected) {
          if ('content' in fileSelected) {
            return fileSelected.content
          } else {
            return []
          }
        }
      }
    },

    methods: {
      clickEnt (index) {
        this.curIdx = index
        this.dialogVisible = true
      },

      changeEnt () {
        let startIdx = this.$store.state.Upload.annotated[this.$store.state.Upload.cur_idx].content[this.curIdx].linkedEntStart
        let endIdx = this.$store.state.Upload.annotated[this.$store.state.Upload.cur_idx].content[this.curIdx].linkedEntEnd
        this.$store.dispatch('removeEnt', {startIdx: startIdx, endIdx: endIdx})
        this.dialogVisible = false
      },

      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      }
    }
  }
</script>

<style>
  .display {
    /* border: 5px solid #D3DCE6; */
    /* width: calc(100% - 81px); 
    height: calc(100% - 81px); */
    position: relative;
    background: #fff;
    width: 100%;
    height: 100%;
    line-height: 30px;
    overflow: auto;
  }

  ::selection {
    background: #ffb7b7;
  }
</style>