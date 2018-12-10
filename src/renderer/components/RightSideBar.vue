<template>
  <div>
    <el-button round v-for="(item, index) in getLabelSet" :style="{'background-color': item.color}" :key=index @click="changeLabel(item.name, item.color)">{{ item.name }}</el-button>
  </div>
</template>

<script>
  export default {
    computed: {
      getLabelSet () {
        return this.$store.state.Upload.label_set
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

<style>
  .el-aside {
    line-height: 60px;
  }
</style>