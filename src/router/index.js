import Vue from 'vue'
import Router from 'vue-router'

// 导入路由
import login from '@/components/login'
import home from '@/components/home'

import welcome from '@/components/welcome'
import users from '@/components/users'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      component: login
    },
    {
      path: '/home',
      component: home,
      redirect: '/welcome',
      children:[
        {
          path: '/welcome',
          component: welcome
        },
        {
          path: '/users',
          component: users
        },
      ]
    },
    {
      path: '/',
      redirect: '/login'
    }
  ]
})
