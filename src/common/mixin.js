import {
  debounce
} from './utils'
import BackTop from "components/content/backTop/BackTop";

export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted() {
    // 1. 监听item中图片加载完成
    this.newRefresh = debounce(this.$refs.scroll.refresh, 10);
    this.itemImgListener = () => {
      // this.$refs.scroll.refresh();
      this.newRefresh();
    }
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  components: {},
  methods: {}
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    }
  }
}
