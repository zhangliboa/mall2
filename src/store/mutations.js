import {ADD_TO_CART,ADD_COUNTER} from './mutations-types'
export default {
  // mutations唯一的目的是修改state中的状态
  // mutations中的每个方法尽可能完成的事件比较单一
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
  }
}
