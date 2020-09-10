<template>
  <div id="tab-bar" >
   <slot></slot>
  </div>
</template>

<script>
    export default {
        name: "TabBar"
    }
</script>

<style scoped>

  #tab-bar {
    background-color: #bfc2c2;
    display: flex;
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -1px 1px rgba(100,100,111,0.5);
  }

</style>
