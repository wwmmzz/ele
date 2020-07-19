// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 全局样式
import '@/assets/css/global.css'
// 字体图标
import '@/assets/css/fonts/iconfont.css'

Vue.use(ElementUi)

Vue.config.productionTip = false

router.beforeEach((to, from, next)=>{
  if(to.path !== '/login'){
    const token = window.sessionStorage.getItem("token")
    if(!token){
      return next('/login')
    }
  }
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
