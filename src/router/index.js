import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Goods from '@/components/goods/goods'
import Ratings from '@/components/ratings/ratings'
import Seller from '@/components/seller/seller'
Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      redirect: '/goods',
      children: [
        {
          path: '/goods',
          name: 'goods',
          component: Goods
        },
        {
          path: '/ratings',
          name: 'ratings',
          component: Ratings
        },
        {
          path: '/seller',
          name: 'seller',
          component: Seller
        }
      ]
    }
  ]
})
