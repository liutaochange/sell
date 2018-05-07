<template>
  <div class="goods">
    <div class="menu-wamp">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="menu-item">
          <span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="goods-wamp">
      <ul>
        <li v-for="(item,index) in goods" :key="index" class="foods-item">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(foods,i) in item.foods" class="food-item" :key="i">
              <div class="icon">
                <img :src="foods.icon" alt="img">
              </div>
              <div class="content">
                <h2 class="name">{{foods.name}}</h2>
                <p class="desc">{{foods.description}}</p>
                <div class="extra">
                  <span>月售{{foods.sellCount}}份</span>
                  <span>好评率{{foods.rating}}</span>
                </div>
                <div class="price">
                  <span >￥{{foods.price}}</span>
                  <span v-show="foods.oldPrice">￥{{foods.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {getGoods} from 'api/index'
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
      goods: []
    }
  },
  created () {
    this._getGoods()
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  methods: {
    _getGoods () {
      const _this = this
      getGoods().then((res) => {
        if (res.errNo === ERROR_OK) {
          _this.goods = res.data
        }
      })
    }
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
</style>
