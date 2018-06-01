import Vue from 'vue'
import Router from 'vue-router'
const Index = () => import('@/components/index')
const Goods = () => import('@/components/goods/goods')
const Ratings = () => import('@/components/ratings/ratings')
const Seller = () => import('@/components/seller/seller')
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
