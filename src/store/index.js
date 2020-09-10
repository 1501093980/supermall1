import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations';
import actions from './actions';
import getters from './getters';
// 监控vuex
import createLogger from 'vuex/dist/logger';

// 1.安装插件
Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production';
const state = {
  cartList: []
}
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  strict:false,
  plugins: debug ? [createLogger()] : []
  })

// 3.挂载Vue实例上
export default store
