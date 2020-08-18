import {
  ADD_TO_CART,
  ADD_COUNTER
} from './mutations-types'

export default {
  addCart(context, info) {
    return new Promise((resolve, reject) => {
      // 1.查看是否添加过
      const oldInfo = context.state.cartList.find((item) => {
        return item.iid === info.iid
      })
      // 2.判断oldInfo
      if (oldInfo) {
        context.commit(ADD_COUNTER, oldInfo)
        resolve("商品+1")
      } else {
        info.count = 1
        info.checked = true
        context.commit(ADD_TO_CART, info)
        resolve("添加商品")
      }
      reject('添加失败')
    })
  }
}
