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
    </scroll>
  </div>
</template>

<script>
import { getDetail, Goods, Shop, GoodsParam } from "network/detail";

import Scroll from "components/common/scroll/Scroll";

import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailParamInfo from './childComps/DetailParamInfo'

export default {
  name: "Detail",
  data() {
    return {
      iid: "",
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo:{}
    };
  },
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo
  },
  created() {
    this.iid = this.$route.params.id;
    this.getDetailData();
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
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
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