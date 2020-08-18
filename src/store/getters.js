export default {
  cartList(state) {
    console.log(state.cartList)
    return state.cartList
  },
  cartCount(state,getters) {
    return getters.cartList.length
  }
}
