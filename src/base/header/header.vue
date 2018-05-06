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
      <div v-if="seller.supports" class="support-count" @click="showDetails">
        <span class="count">{{seller.supports.length}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="info" @click="showDetails">
      <span class="info-title"></span>
      <span class="info-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="bg-wamp">
      <img :src="seller.avatar" alt="banner" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div v-show="detailShow" class="detail-dialog">
        <div class="dialog-wamp clearfix">
          <div class="dialog-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wamp">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title-wamp">
              <list-title :title="firstTitle"></list-title>
            </div>
            <ul v-if="seller.supports" class="list-supports">
              <li v-for="(item,index) in seller.supports" class="support-item" :key="index">
                <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                <p class="text">{{item.description}}</p>
              </li>
            </ul>
            <div class="title-wamp">
              <list-title :title="secondTitle"></list-title>
            </div>
            <div class="info-wraper">
              <p class="info-text">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="dialog-close" @click="closeDetails">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import star from 'base/star/star'
import listTitle from 'base/title/title'
export default {
  name: 'headers',
  props: {
    seller: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      detailShow: false,
      firstTitle: '优惠信息',
      secondTitle: '商家公告'
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  methods: {
    showDetails () {
      this.detailShow = true
    },
    closeDetails () {
      this.detailShow = false
    }
  },
  components: {
    star,
    listTitle
  }
}
</script>

<style scoped lang="stylus">
  @import "~common/stylus/mixin.styl"
  .header
    position: relative
    color: #fff
    background: rgba(7,17,27,.5)
    overflow: hidden
    .content
      padding: 24px 12px 18px 24px
      font-size: 0
      position: relative
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
            font-size: 10px
            line-height: 12px
      .support-count
        position: absolute
        right: 12px
        bottom: 14px
        padding: 0 8px
        height: 24px
        line-height: 24px
        border-radius: 14px
        background: rgba(0,0,0,.2)
        text-align: center
        .count,.icon-keyboard_arrow_right
          font-size: 10px
        .count
          vertical-align: top
        .icon-keyboard_arrow_right
          line-height: 24px
          margin-left: 2px

    .info
      position: relative
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
      background: rgba(7,17,27,.2)
      .info-title
        display: inline-block
        vertical-align: top
        margin-top: 8px
        width: 22px
        height: 12px
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .info-text
        vertical-align: top
        font-size: 10px
        font-weight: 200
        margin-left: 4px
        margin-right: 12px
      .icon-keyboard_arrow_right
        position: absolute
        font-size: 10px
        right: 12px
        top: 8px
    .bg-wamp
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(10px)
    .fade-enter-active, .fade-leave-active
      transition: all 0.5s
    .fade-enter, .fade-leave-to
      opacity: 0
    .detail-dialog
      position: fixed
      top: 0
      left: 0
      z-index: 100
      width: 100%
      height: 100%
      overflow: auto
      background: rgba(7,17,27,.8)
      backdrop-filter: blur(10px)
      .dialog-wamp
        width: 100%
        min-height: 100%
        .dialog-main
          margin-top: 64px
          padding-bottom: 64px
          .name
            font-size: 16px
            line-height: 16px
            text-align: center
          .star-wamp
            margin-top: 18px
            padding: 2px 0
            text-align: center
          .title-wamp
            width: 100%
            margin: 28px auto 24px
          .list-supports
            width: 80%
            margin: 0 auto
            .support-item
              padding: 0 12px
              margin-bottom: 12px
              font-size: 0
              &:last-child
                margin-bottom: 0
              .icon
                display: inline-block
                width: 16px
                height: 16px
                vertical-align: top
                margin-right: 6px
                background-size: 16px 16px
                background-repeat: no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                display: inline-block
                font-size: 12px
                line-height: 16px
          .info-wraper
            width: 80%
            margin: 0 auto
            .info-text
              padding: 0 12px
              line-height: 24px
              font-size: 12px
      .dialog-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0
        clear: both
        font-size: 32px

</style>
