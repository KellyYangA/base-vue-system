import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/request/api'

Vue.use(Vuex)

const state = {
  loading: (state) => state.loading
}

const mutations = {
  showLoading(state, {text = '加载中...', count = false}) {
    state.loading.show = true
    state.loading.text = text
    if (count) state.loading.loadingCount ++
  },
  hideLoading(state, {count = false}) {
    state.loading.show = false
    state.loading.text = ''
    if (count) {
      state.loading.loadingCount --
    } else {
      // 适用于无showLoading(例如：mixin中组件创建后隐藏loading框、login TOKEN接口的错误返回时)
      state.loading.loadingCount = 0
    }
  },
}

const actions = {
  async getUser({state, commit}, params) {
    return await api.user(params)
  },
}

const store = new Vuex.Store({
  strict: true,
  state: state,
  mutations: mutations,
  actions: actions,
})

export default store
