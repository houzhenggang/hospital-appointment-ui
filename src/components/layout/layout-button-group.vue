<!-- 按钮组 -->
<template>
  <div class="button-group-layout">
    <el-button-group>
      <slot></slot>
    </el-button-group>
  </div>
</template>
<script>
export default {
  name: 'ButtonGroupLayout'
}
</script>
<style lang="scss" scoped>
  .button-group-layout {
    margin: 5px 0;
  }
</style>
