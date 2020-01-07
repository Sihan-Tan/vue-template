<template>
  <div id="app">
    123456
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  watch: {
    '$route'(val) {
      console.log(val.name);
    }
  }
};
</script>
<style lang="less">
#app {
	height: 100vh;
	overflow: auto;
}
</style>
