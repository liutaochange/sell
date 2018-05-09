<template>
  <div class="wraper">
    <Headers :seller="seller"></Headers>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
    </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script>
import Headers from 'base/header/header'
import {getSeller} from 'api/index'
const ERROR_OK = 0
export default {
  name: 'index',
  data () {
    return {
      seller: {}
    }
  },
  created () {
    this._getSeller()
  },
  methods: {
    _getSeller () {
      const _this = this
      getSeller().then((res) => {
        if (res.errNo === ERROR_OK) {
          _this.seller = res.data
        }
      })
    }
  },
  components: {
    Headers
  }
}
</script>

<style scoped lang="stylus">
  @import "../common/stylus/mixin.styl"
  .wraper
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px(rgba(7,17,27,.1))
      .tab-item
        flex: 1
        text-align: center
        & > a
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
          &.active
            color: rgb(240, 20, 20)
</style>
