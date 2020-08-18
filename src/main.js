import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.use(toast)
// fastclick减小移动端点击300ms延迟
FastClick.attach(document.body)

Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png'),
})

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
