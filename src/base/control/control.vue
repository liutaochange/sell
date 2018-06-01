<template>
  <div class="cart-wamp">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click="resCount">
        <div class="rotate icon-remove_circle_outline"></div>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop="addCount"></div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    addCount (event) {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('cartAdd', event.target)
    },
    resCount () {
      if (this.food.count > 0) {
        this.food.count--
      }
    }
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
