<!-- 一般是列表 -->
<template>
  <div class="body-layout no-border">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'BodyLayout'
}
</script>
<style lang="scss" scoped>
  .body-layout {
    padding: 10px 0;
  }
</style>
