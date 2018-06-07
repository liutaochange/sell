<template>
  <div class="shopping">
    <div class="content" @click="toggleList">
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
    <div class="ball-container">
      <div v-for="(ball, index) in balls" :key="index">
        <transition name="drop" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
          <div v-show="ball.shows" class="ball">
            <div class="inner inner-hook"></div>
          </div>
        </transition>
      </div>
    </div>
    <transition name="fold">
      <div class="shopp-detail" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food border-1px" v-for="(item,index) in selectGoods" :key="index">
              <span class="name">{{item.name}}</span>
              <div class="price-wamp">
                <span class="price">￥{{item.price*item.count}}</span>
              </div>
              <div class="cart-control-wamp">
                <cart-control :food="item"></cart-control>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
    <transition name="fade">
      <div class="list-mark" v-show="listShow"></div>
    </transition>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import cartControl from 'base/control/control'
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
  data () {
    return {
      balls: [
        {
          shows: false
        },
        {
          shows: false
        },
        {
          shows: false
        },
        {
          shows: false
        },
        {
          shows: false
        }
      ],
      dropBall: [],
      showFlag: false
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
    },
    listShow () {
      const that = this
      if (!that.totalCount) {
        that.showFlag = true
        return false
      }
      let show = !that.showFlag
      if (show) {
        that.$nextTick(() => {
          that._initScroll()
        })
      }
      return show
    }
  },
  methods: {
    empty () {
      this.selectGoods.forEach((food) => {
        food.count = 0
      })
    },
    _initScroll () {
      if (!this.scroll) {
        this.Scroll = new Bscroll(this.$refs.listContent, {
          click: true,
          probeType: 3
        })
      } else {
        this.Scroll.refresh()
      }
    },
    toggleList () {
      if (!this.totalCount) {
        return
      }
      this.showFlag = !this.showFlag
    },
    drop (el) {
      for (let i = 0; i < this.balls.length; i++) {
        let ele = this.balls[i]
        if (ele.shows === false) {
          ele.shows = true
          ele.el = el
          this.dropBall.push(ele)
          return
        }
      }
    },
    beforeEnter (el) {
      let count = this.balls.length
      while (count--) {
        let ball = this.balls[count]
        if (ball.shows) {
          let rect = ball.el.getBoundingClientRect()
          let x = rect.left - 32
          let y = -(window.innerHeight - rect.top - 22)
          el.style.display = ''
          el.style.webkitTransform = `translate3d(0,${y}px,0)`
          el.style.transform = `translate3d(0,${y}px,0)`
          let inner = el.getElementsByClassName('inner-hook')[0]
          inner.style.webkitTransform = `translate3d(${x}px,0,0)`
          inner.style.transform = `translate3d(${x}px,0,0)`
        }
      }
    },
    enter (el, done) {
      /* eslint-disable no-unused-vars */
      let rf = el.offsetHeight
      this.$nextTick(() => {
        el.style.webkitTransform = 'translate3d(0,0,0)'
        el.style.transform = 'translate3d(0,0,0)'
        let inner = el.getElementsByClassName('inner-hook')[0]
        inner.style.webkitTransform = 'translate3d(0,0,0)'
        inner.style.transform = 'translate3d(0,0,0)'
        el.addEventListener('transitionend', done)
      })
    },
    afterEnter (el) {
      let ball = this.dropBall.shift()
      if (ball) {
        ball.shows = false
        el.style.display = 'none'
      }
    }
  },
  components: {
    cartControl
  }
}
</script>

<style scoped lang="stylus">
  @import "~common/stylus/mixin.styl"
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
    .ball-container
      & .drop-enter-active,& .drop-leave-active
        transition: all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
      .ball
        position: fixed
        left: 32px
        bottom: 22px
        z-index: 200
        .inner
          width: 16px
          height: 16px
          border-radius: 50%
          background: rgb(0,160,220)
          transition: all 0.4s linear
    .shopp-detail
      position: absolute
      left: 0
      top: 0
      z-index: -1
      width: 100%
      transform: translate3d(0,-100%,0)
      &.fold-enter-active
        transition: all 0.5s
      &.fold-leave-active
        transition: all 0.5s
        transform:translate3d(0,-100%,0)
      &.fold-enter,&.fold-leave-active
        transform:translate3d(0,0,0)
      .list-header
        height: 40px
        line-height: 40px
        padding: 0 18px
        background: #f3f5f7
        border-bottom: 1px solid rgba(7,17,27,.1)
        .title
          float: left
          font-size: 14px
          color: rgb(1,17,27)
        .empty
          float: right
          font-size: 12px
          color: rgb(1,160,220)
      .list-content
        padding: 0 18px
        max-height: 216px
        background: #fff
        overflow: hidden
        .food
          position: relative
          padding: 12px 0
          box-sizing: border-box
          border-1px(rgba(7,17,27,.1))
          .name
            line-height: 24px
            font-size: 14px
            color: rgb(7,17,27)
          .price-wamp
            position: absolute
            right: 90px
            bottom: 12px
            line-height: 20px
            font-size: 14px
            font-weight: 700
            color: rgb(240,20,20)
          .cart-control-wamp
            position: absolute
            right: 0
            bottom: 6px
    .list-mark
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      width: 100%
      height: 100%
      z-index: -2
      filter: blur(10px)
      backdrop-filter: blur(10px)
      -webkit-backdrop-filter: blur(10px)
      background: rgba(7,17,27,.6)
      &.fade-enter-active,&.fade-leave-active
        transition:all 0.5s
      &.fade-enter
        opacity: 1
      &.fade-leave-active
        opacity: 0
</style>
