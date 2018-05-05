<template>
  <div class="star-wamp" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script>
export default {
  name: 'star',
  props: {
    size: {
      type: Number,
      default: 5
    },
    score: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      list: []
    }
  },
  computed: {
    starType () {
      return 'star-' + this.size
    }
  }
}
</script>

<style scoped lang="stylus">
  @import "~common/stylus/mixin.styl"
  .star-wamp
    font-size: 0
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
    &.star-24
    .star-item
      display: inline-block
      background-repeat: no-repeat

</style>
