import Vue from 'vue'
import Router from 'vue-router'

import home from '@/components/index/pages/home/router'
import childStation from '@/components/index/pages/childStation/router'

Vue.use(Router)

const router = new Router({
  routes: [
    ...home,
    ...childStation,
  ]
})
// 路由改变的钩子
router.beforeEach((to, from, next) => {
  console.log(to, from)
  if (from.path === '/' && to.path === '/') {
    // 首次进入跳转至首页
    router.push({name: 'messageStation'})
  }
  next()
})

export default router
