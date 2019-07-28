<template>
  <div class="basic-container">
    <el-card>
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'BasicContainer'
}
</script>

<style lang="scss">
.basic-container {
  padding: 5px 10px;
  border-radius: 10px;
  box-sizing: border-box;
  height: calc(100vh - 125px);
  overflow: hidden;
  > .el-card {
    width: 100%;
    height: calc(100vh - 115px);
    overflow: auto;
    .el-card__body {
      padding: 10px 15px;
    }
  }
  &:first-child {
    padding-top: 0;
  }
}
</style>
