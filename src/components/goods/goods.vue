<template>
  <div class="goods">
    <div class="menu-wamp" ref="menu">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="menu-item" :class="{'current':currentIndex == index}" @click="selectMenu(index,$event)">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="goods-wamp" ref="goods">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="foods-item food-item-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(foods,i) in item.foods" class="food-item border-1px" :key="i" @click="selectFoodItem(foods,$event)">
              <div class="icon">
                <img :src="foods.icon" alt="img" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{foods.name}}</h2>
                <p class="desc">{{foods.description}}</p>
                <div class="extra">
                  <span class="count">月售{{foods.sellCount}}份</span>
                  <span>好评率{{foods.rating}}</span>
                </div>
                <div class="prise">
                  <span class="now">￥{{foods.price}}</span>
                  <span class="old" v-show="foods.oldPrie">￥{{foods.oldPrice}}</span>
                </div>
                <div class="cartControl-wamp">
                  <cart-control :food="foods" @cartAdd="drop"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart :deliveryPrise="seller.deliveryPrice" :minPrise="seller.minPrice" :selectGoods="selectFoods" ref="shopCart"></shop-cart>
    <transition name="move">
      <food :food="selectedFoot" ref="food" @cartAdd="drop"></food>
    </transition>
  </div>
</template>

<script>
import {getGoods} from 'api/index'
import Bscroll from 'better-scroll'
import cartControl from 'base/control/control'
import shopCart from 'base/shopping/shopping'
import food from 'components/food/food'
const ERROR_OK = 0
export default {
  name: 'goods',
  props: {
    seller: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      goods: [],
      itemHeight: [],
      scrollY: 0,
      selectedFoot: {}
    }
  },
  created () {
    this._getGoods()
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.itemHeight.length; i++) {
        let height = this.itemHeight[i]
        let nextHeight = this.itemHeight[i + 1]
        if (!nextHeight || (this.scrollY >= height && this.scrollY < nextHeight)) {
          return i
        }
      }
      return 0
    },
    selectFoods () {
      let item = []
      this.goods.forEach((ele) => {
        ele.foods.forEach((food) => {
          if (food.count) {
            item.push(food)
          }
        })
      })
      console.log(item)
      return item
    }
  },
  methods: {
    _getGoods () {
      const _this = this
      getGoods().then((res) => {
        if (res.errNo === ERROR_OK) {
          _this.goods = res.data
          _this.$nextTick().then(function () {
            _this._initScroll()
            _this._linkType()
          })
        }
      })
    },
    _initScroll () {
      this.menuScroll = new Bscroll(this.$refs.menu, {
        click: true
      })
      this.googsScroll = new Bscroll(this.$refs.goods, {
        click: true,
        probeType: 3
      })
      this.googsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _linkType () {
      const _this = this
      const goodsEle = _this.$refs.goods
      const goodsList = goodsEle.getElementsByClassName('food-item-hook')
      let height = 0
      _this.itemHeight.push(height)
      for (let i = 0; i < goodsList.length; i++) {
        let item = goodsList[i]
        height += item.clientHeight
        _this.itemHeight.push(height)
      }
    },
    selectMenu (index, event) {
      if (!event._constructed) {
        return
      }
      const _this = this
      const goodsEle = _this.$refs.goods
      const goodsList = goodsEle.getElementsByClassName('food-item-hook')
      let el = goodsList[index]
      this.googsScroll.scrollToElement(el, 300)
    },
    drop (ele) {
      // 优化多个动画时卡顿，改为异步执行
      this.$nextTick(() => {
        this.$refs.shopCart.drop(ele)
      })
    },
    selectFoodItem (foods, event) {
      if (!event._constructed) {
        return
      }
      this.selectedFoot = foods
      this.$refs.food.show()
    }
  },
  components: {
    shopCart,
    cartControl,
    food
  }
}
</script>

<style scoped lang="stylus">
  @import "~common/stylus/mixin.styl"
  .goods
    display: flex
    position: absolute
    top: 174px
    bottom: 46px
    width: 100%
    overflow: hidden
    .menu-wamp
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        line-height: 14px
        padding: 0 12px
        &.current
          position: relative
          z-index: 10
          margin-top: -1
          background: #fff
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          font-size: 12px
          border-1px(rgba(7,17,27,0.1))
    .goods-wamp
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9ddel
        font-size: 12px
        color: rgb(147,153,159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        border-1px(rgba(7,17,27,0.1))
        position: relative
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7,17,27)
          .desc,.extra
            line-height: 14px
            font-size: 10px
            color: rgb(147,153,159)
          .desc
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .prise
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240,20,20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147,153,159)
          .cartControl-wamp
            position: absolute
            bottom: 12px
            right: 0
  @media screen and (max-width: 320px) {
    .content .name{
      font-size: 12px !important;
    }
  }
</style>
