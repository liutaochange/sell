<template>
  <div class="header">
    <div class="content">
      <div class="avatar">
        <img :src="seller.avatar" alt="img" width="64" height="64">
      </div>
      <div class="content-item">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="details">
          {{seller.description}}/{{seller.deliveryTime}}分钟后送达
        </div>
        <div v-if="seller.supports" class="supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <div class="info"></div>
  </div>
</template>

<script>
export default {
  name: 'headers',
  props: {
    seller: {
      type: Object,
      default: () => {}
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  }
}
</script>

<style scoped lang="stylus">
  @import "~common/stylus/mixin.styl"
  .header
    color: #fff
    background: #000
    .content
      padding: 24px 12px 18px 24px
      font-size: 0
      .avatar
        img
          border-radius: 4px
      .avatar,.content-item
        display: inline-block
        vertical-align: top
      .content-item
        font-size: 14px
        margin-left: 16px
        .title
          margin: 2px 0 8px 0
          font-size: 0
          .brand
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            margin-left: 6px
            font-size: 16px
            line-height: 18px
            font-weight: bold
        .details
          margin-bottom: 10px
          line-height: 12px
          font-size: 12px
        .supports
          font-size: 0
          .icon
            display: inline-block
            vertical-align: top
            width: 12px
            height: 12px
            margin-right: 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            font-size: 12px
            line-height: 12px
</style>
