<template>
  <div class="shopping">
    <div class="content">
      <div class="item-left">
        <div class="logo-wamp">
          <div class="logo">
            <i class="icon-shopping_cart"></i>
          </div>
        </div>
        <div class="prise">￥ {{totalPrise}} 元</div>
        <div class="description">另需配送费￥{{deliveryPrise}}元</div>
      </div>
      <div class="item-right">
        <div class="pay">
          ￥{{minPrise}}元
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
            .icon-shopping_cart
              line-height: 44px
              font-size: 24px
              color: #80858a
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
          background: #2b333b
</style>
