import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/main',
      name: 'main',
      component: require('@/components/mainPage/main').default
    },
    {
      path: '/walletDetail',
      name: 'wallet-detail',
      component: require('@/components/mainPage/wallet-detail').default
    }
  ]
})
