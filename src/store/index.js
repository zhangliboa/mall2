import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'


Vue.use(Vuex)

let state = {
  cartList: []
}
const store = new Vuex.Store({
  state: state,
  mutations,
  actions,
  getters: {}
})
export default store
