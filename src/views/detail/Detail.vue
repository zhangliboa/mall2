<!--  -->
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content">
      <detail-swiper :images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <goods-list :goods="recommendList"></goods-list>
    </scroll>
  </div>
</template>

<script>
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";

import Scroll from "components/common/scroll/Scroll";

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import GoodsList from "components/content/goods/GoodsList";
// import { debounce } from "common/utils";
import { itemListenerMixin } from "common/mixin";

export default {
  name: "Detail",
  data() {
    return {
      iid: "",
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: []
    };
  },
  mixins:[itemListenerMixin],
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList
  },
  created() {
    this.iid = this.$route.params.id;
    this.getDetailData();
    this.getRecommendData();
  },
  // mounted(){
  //   // 1. 监听item中图片加载完成
  //   const refresh = debounce(this.$refs.scroll.refresh, 10);
  //   this.itemImgListener = () => {
  //     // this.$refs.scroll.refresh();
  //     // 防抖函数
  //     refresh();
  //   }
  //   this.$bus.$on('itemImgLoad',this.itemImgListener)
  // },
  destroyed(){
     this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  methods: {
    getDetailData() {
      getDetail(this.iid).then(res => {
        // 2.1获取结果
        const data = res.result;
        // 2.2获取顶部信息
        this.topImages = data.itemInfo.topImages;
        // 2.3获取商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        // 2.4获取店铺信息
        this.shop = new Shop(data.shopInfo);
        // 2.5获取商品信息
        this.detailInfo = data.detailInfo;
        // 2.6保存参数信息
        this.paramInfo = new GoodsParam(
          data.itemParams.info,
          data.itemParams.rule
        );
        // 2.7保存评论信息
        if (data.rate.list) {
          this.commentInfo = data.rate.list;
        }
      });
    },
    getRecommendData() {
      getRecommend().then((res, error) => {
        if (error) return;
        this.recommendList = res.data.list;
      });
    }
  }
};
</script>
<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 11;
  background-color: #fff;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 60px;
}
.detail-nav {
  position: relative;
  z-index: 9;
}
</style>