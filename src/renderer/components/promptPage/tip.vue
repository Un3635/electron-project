<template>
   <Tooltip content="content" placement="top">
        A balloon appears when the mouse passes over this text
    </Tooltip>
</template>
<script>
export default {
  props: {
    content: {
      default: 'success'
    },
    pos: {
      default: 'top'
    }
  }
}
</script>
<style lang="scss" scoped>
.top,.bottom{
  text-align: center;
}
.center{
  width: 300px;
  margin: 10px auto;
  overflow: hidden;
}
.center-left{
  float: left;
}
.center-right{
  float: right;
}
</style>

