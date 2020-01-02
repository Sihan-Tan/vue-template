<template>
  <div id="app">
    <keep-alive :include="$store.state.keepAlivePages">
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
};
</script>
