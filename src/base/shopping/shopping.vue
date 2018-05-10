<template>
  <div class="shopping">
    <div class="content">
      <div class="item-left">
        <div class="logo-wamp">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
          </div>
          <div class="num" v-show="totalCount>0">{{totalCount}}</div>
        </div>
        <div class="prise" :class="{'highlight':totalPrise>0}">￥ {{totalPrise}} 元</div>
        <div class="description">另需配送费￥{{deliveryPrise}}元</div>
      </div>
      <div class="item-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'shopping',
  props: {
    selectGoods: {
      type: Array,
      default: () => []
    },
    minPrise: {
      type: Number,
      default: 0
    },
    deliveryPrise: {
      type: Number,
      default: 0
    }
  },
  computed: {
    totalPrise () {
      let total = 0
      this.selectGoods.forEach((ele) => {
        total += (ele.price * ele.count)
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectGoods.forEach((ele) => {
        count += ele.count
      })
      return count
    },
    payDesc () {
      if (this.totalPrise === 0) {
        return `￥${this.minPrise}元起送`
      } else if (this.totalPrise < this.minPrise) {
        let diff = this.minPrise - this.totalPrise
        return `还差￥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    payClass () {
      if (this.totalPrise < this.minPrise) {
        return 'not-enough'
      } else {
        return 'enough'
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .shopping
    position: fixed
    left: 0
    bottom: 0
    z-index: 50
    width: 100%
    height: 48px
    .content
      display: flex
      background: #141d27
      font-size: 0
      .item-left
        flex: 1
        .logo-wamp
          display: inline-block
          position: relative
          top: -10px
          margin: 0 12px
          padding: 6px
          width: 56px
          height: 56px
          box-sizing: border-box
          vertical-align: top
          border-radius: 50%
          background: #141d27
          .logo
            width: 100%
            height: 100%
            border-radius: 50%
            background: #2b343c
            text-align: center
            &.highlight
              background: rgb(0,160,220)
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
              &.highlight
                color: #fff
          .num
            position: absolute
            top: 0
            right: 0
            width: 24px
            height: 16px
            line-height: 16px
            font-size: 12px
            text-align: center
            font-weight: 700
            color: #fff
            background: rgb(240,20,20)
            box-shadow: 0 4px 8px 0 rgba(0,0,0,.4)
            border-radius: 10px
        .prise
          display: inline-block
          vertical-align: top
          margin-top: 12px
          line-height: 24px
          box-sizing: border-box
          padding-right: 12px
          border-right: 1px solid rgba(255,255,255,.1)
          font-size: 16px
          font-weight: 700
          color: rgba(255,255,255,.4)
          &.highlight
            color: #fff
        .description
          display: inline-block
          vertical-align: top
          margin-top: 12px
          margin-left: 12px
          line-height: 24px
          font-size: 10px
          color: rgba(255,255,255,.4)
      .item-right
        flex: 0 0 100px
        width: 100px
        .pay
          height: 48px
          line-height: 48px
          text-align: center
          color: rgba(255,255,255,.4)
          font-weight: 700
          font-size: 12px
          &.not-enough
            background: #2b333b
          &.enough
            background: #00b43c
            color: #fff
</style>
