import Vue from 'vue'
import App from './App.vue'
import Antd, { Icon } from 'ant-design-vue'
import '@/assets/css/base.less'

Vue.use(Antd)


/* eslint-disable no-new */
new Vue({
  render: h => h(App)
}).$mount('#app')
