import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from "@/components/common/toast";
import FastClick from 'fastclick';
import VueLazyload from "vue-lazyload";

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// eslint-disable-next-line no-unused-vars
Vue.use(ElementUI);
// 1.安装插件
Vue.use(toast)
// 安装图片懒加载VueLazyload插件
Vue.use(VueLazyload,{
  loading: require('./assets/img/common/placeholder.png'),
  error: require('./assets/img/common/error.png'),
})
// 导入，调用attach函数,解决移动端300点延迟
FastClick.attach(document.body)


Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
