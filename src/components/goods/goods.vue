<template>
  <div class="goods">
    <div class="menu-wamp"></div>
    <div class="goods-wamp"></div>
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
    .goods-wamp
      flex: 1
</style>
