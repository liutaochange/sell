<template>
  <div class="cart-wamp">
    <transition name="move">
      <div class="cart-decrease" v-show="showFlag" @click.stop.prevent="resCount">
        <div class="rotate icon-remove_circle_outline"></div>
      </div>
    </transition>
    <div class="cart-count" v-show="showFlag">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCount"></div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
  props: {
    food: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    showFlag () {
      let currentIndex = this.getGoodsList.indexOf(this.food)
      if (currentIndex >= 0) {
        if (this.getGoodsList[currentIndex].count > 0) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    },
    ...mapGetters([
      'getGoodsList'
    ])
  },
  methods: {
    addCount (event) {
      if (!event._constructed) {
        return false
      }
      this.addCountMap(this.food)
      this.$emit('cartAdd', event.target)
    },
    resCount (event) {
      if (!event._constructed) {
        return false
      }
      this.reduceCountMap(this.food)
    },
    ...mapMutations([
      'addCountMap',
      'reduceCountMap'
    ])
  }
}
</script>

<style scoped lang="stylus">
  .cart-wamp
    font-size: 0
    .move-enter-active,.move-leave-active
      transition: all .3s linear
    .move-enter,.move-leave-to
      opacity: 0
      transform: translate3d(24px,0,0) rotate(0)
    .move-enter-to,.move-leave
      opacity: 1
      transform: translate3d(0,0,0) rotate(180deg)
      .cart-decrease
        transform: rotateX(180deg)
    .cart-decrease,.cart-add
      display: inline-block
      vertical-align: top
      line-height: 24px
      font-size: 24px
      padding: 6px
      color: rgb(0,160,220)
      cursor: pointer
    .cart-count
      display: inline-block
      vertical-align: top
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147,153,159)
</style>
