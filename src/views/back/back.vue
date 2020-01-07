<template>
  <div>
    123456789
    <p>{{show}}</p>
  </div>
</template>
<script>
export default {
  name: 'back-back',
  data() {
    return {
      show: '123321'
    };
  },
  created() {
    console.log('这是back/back.vue');
  }
};
</script>
