import {
  debounce
} from './utils'

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    // 1. 监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh, 10);
    this.itemImgListener = () => {
      // this.$refs.scroll.refresh();
      // 防抖函数
      refresh();
    }
    this.$bus.$on("itemImageLoad", this.itemImgListener);
    console.log('混入的内容');
  },
  components:{},
  methods:{}
}
