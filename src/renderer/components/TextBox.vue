<template>
  <div class='display'>
    <span>AAA</span>
  </div>
</template>

<script>
  export default {
    name: 'TextBox',
    data () {
      return {
      }
    }
  }
</script>

<style>
  .display {
    border: 5px solid #D3DCE6; 
    width: calc(100% - 81px); 
    height: calc(100% - 81px);
    overflow: scroll
  }
</style>