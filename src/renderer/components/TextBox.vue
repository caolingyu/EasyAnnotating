<template>
  <div class='display'>
    <span v-for="(item, index) in getFile" :id=index :key=index :style="{'background-color': item.color}">{{item.char}}</span>
  </div>
</template>

<script>
  export default {
    computed: {
      getFile () {
        return this.$store.state.Upload.annotated[this.$store.state.Upload.cur_idx]
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