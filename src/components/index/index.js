import Vue from 'vue'
import App from './App.vue'
import Antd, { Icon } from 'ant-design-vue'
import '@/assets/css/base.less'
import router from './global/router'
import store from './global/vuex'


Vue.use(Antd)
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1040750_93iafurn65a.js',
})
Vue.component(IconFont.name, IconFont)

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
