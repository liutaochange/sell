<template>
  <div class="title-center">
    <div class="line"></div>
    <div class="text">{{title}}</div>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  name: 'list-title',
  props: {
    title: {
      type: String,
      default: 'title'
    }
  }
}
</script>

<style scoped lang="stylus">
  .title-center
    display: flex
    width: 80%
    margin: 0 auto
    .line
      flex: 1
      position: relative
      top: -6px
      border-bottom: 1px solid rgba(255,255,255,.2)
    .text
      padding: 0 12px
      font-size: 14px
      font-weight: 700
</style>
