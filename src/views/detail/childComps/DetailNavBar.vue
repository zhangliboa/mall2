<template>
  <div>
    <nav-bar>
      <img slot="left" class="back" @click="backClick" src="~assets/img/common/back.svg" />
      <div class="title" slot="center">
        <span v-for="(item,index) in titleInfos" :key="index" 
        class="title-item" :class="{'active':currentIndex === index}"
        @click="itemClick(index)">{{item}}</span>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

export default {
  name: "DetailNavBar",
  props: {
    titleInfos: {
      type: Array,
      default() {
        return ["商品", "参数", "评论", "推荐"];
      }
    }
  },
  data() {
    return {
        currentIndex:0
    };
  },
  components: {
    NavBar
  },
  methods: {
      backClick() {
          this.$router.back()
      },
      itemClick(index) {
          this.currentIndex = index
          this.$emit('itemClick',index)
      }
  }
};
</script>
<style scoped>
.detail-nav {
  background-color: #fff;
  font-weight: normal;
}

.title {
  display: flex;
  padding: 0 20px;
  font-size: 14px;
}

.title-item {
  flex: 1;
}

.title-item.active {
  color: var(--color-high-text);
}

.back {
  margin-top: 12px;
}
</style>