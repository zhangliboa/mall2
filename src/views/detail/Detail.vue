<!--  -->
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @itemClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
      <detail-swiper :images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="detailImageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="recommendList" ref="recommend"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
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
import DetailBottomBar from "./childComps/DetailBottomBar";
import {
  BACKTOP_DISTANCE
} from "common/const"
import { debounce } from "common/utils";
import { itemListenerMixin,backTopMixin } from "common/mixin";

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
      recommendList: [],
      themeTopYs: [],
      getThemeTopYs: null,
      currentIndex: 0
    };
  },
  mixins: [itemListenerMixin,backTopMixin],
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBottomBar,
  },
  created() {
    this.iid = this.$route.params.id;
    this.getDetailData();
    this.getRecommendData();
    this.getThemeTopYs = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopYs.push(Number.MAX_VALUE);
    });
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
  // updated() {
  //   this.themeTopYs = [];
  //   this.themeTopYs.push(0);
  //   this.themeTopYs.push(this.$refs.param.$el.offsetTop);
  //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
  //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
  //   this.themeTopYs.push(Number.MAX_VALUE);
  //   console.log(this.themeTopYs);
  // },
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
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
          this.commentInfo = data.rate.list[0];
        }
      });
    },
    getRecommendData() {
      getRecommend().then((res, error) => {
        if (error) return;
        this.recommendList = res.data.list;
      });
    },
    // ===========事件相关方法
    detailImageLoad() {
      this.newRefresh();
      this.getThemeTopYs();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100);
    },
    contentScroll(position) {
      const positionY = -position.y;
      for (let i = 0; i < this.themeTopYs.length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
       // 判断BackTop是否显示
      this.isShowBackTop = -position.y > BACKTOP_DISTANCE;
    },
    addToCart(){
      // 1.创建对象
      let obj = {};
      // 2.添加对象信息
      obj.iid = this.iid;
      obj.imgURL = this.topImages;
      obj.title = this.goods.title;
      obj.desc = this.goods.desc;
      obj.newPrice = this.goods.newPrice;
      // 3.添加到store中
      // 改变store中的state的值要通过mutation和action
      this.$store.dispatch('addCart',obj)
    },
     
  }
};
</script>
<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 11;
  background-color: #fff;
  overflow: hidden;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 60px;
  background-color: #fff;
}
.detail-nav {
  position: relative;
  z-index: 9;
}
</style>