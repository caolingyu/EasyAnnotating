<template>
  <el-aside width="200px">
    <h3>实体类型</h3>
    <hr/>
    <el-row type="flex" justify="space-between" v-for="(item, index) in getLabelSet" :key=index>
      <el-col>
        <el-button plain 
          :id=index
          :style="{'background-color': item.color, 'color': '#333'}"
          @click="changeLabel(item.name, item.color)">
          {{ item.name }}
        </el-button>
      </el-col>
    </el-row>
  </el-aside>
</template>

<script>
  var Mousetrap = require('mousetrap')

  export default {
    computed: {
      getLabelSet () {
        let labelSet = this.$store.state.Upload.label_set
        if (labelSet) {
          Object.keys(labelSet).forEach(l => {
            Mousetrap.bind(labelSet[l].shortcuts, () => { this.changeLabel(labelSet[l].name, labelSet[l].color) })
          })
        }
        return labelSet
      }
    },

    methods: {
      changeLabel (label, color) {
        let startIdx = window.getSelection().anchorNode.parentElement.id
        let endIdx = window.getSelection().focusNode.parentElement.id
        let combined = {
          label: label,
          color: color,
          startIdx: startIdx,
          endIdx: endIdx
        }
        this.$store.dispatch('changeLabelAndColor', combined)
        window.getSelection().removeAllRanges()
      }
    }
  }
</script>

<style scoped>
  .el-aside {
    line-height: 60px;
    background: #D3DCE6;
  }

  .el-button {
    display: block;
    margin: 0 auto;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  h3 {
    font-weight: 300;
    color: #574C4C;
    border-bottom: 1px solid #ddd;
    text-align: center;
    margin: 0 auto;
  }

  hr {
    height: 0;
    border-left: 0;
    border-right: 0;
    border-top: 1px solid #DDD;
    border-bottom: 1px solid #FFF;
  }
</style>