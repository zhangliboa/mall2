import {ADD_TO_CART,ADD_COUNTER} from './mutations-types'

export default {
  addCart(context, info) {
    // 1.查看是否添加过
    const oldInfo = context.state.cartList.find((item) => {
      return item.iid === info.iid
    })
    // 2.判断oldInfo
    if (oldInfo) {
      context.commit(ADD_COUNTER, oldInfo)
    } else {
      info.count = 1
      context.commit(ADD_TO_CART, info)
    }
  }
}
