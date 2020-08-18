import Toast from './Toast'
let obj = {
  
}
// install方法默认传参 Vue
obj.install = function(Vue){
    // document.appendChild(Toast.$el)
    // Vue.prototype.$toast = Toast组件对象
    
    // 1.创建组件构造器对象
    const toastConstructor = Vue.extend(Toast)
    // 2.new的方式 根据组件构造器 可以创建出一个组件对象
    const toast = new toastConstructor()
    // 3.将组件对象手动挂载到 某个元素上
    toast.$mount(document.createElement('div'))
    // 4.toast.$el对应的就是div
    document.body.appendChild(toast.$el)
    Vue.prototype.$toast = toast
}
export default obj