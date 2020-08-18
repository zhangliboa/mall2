<!--  -->
<template>
  <div class="toast" v-show="isShow">
    <span>{{message}}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
        message:'',
        isShow:false
    };
  },
  methods: {
      show(res='默认',time=1500){
          this.message = res;
          this.isShow = true;
          setTimeout(()=>{
              this.message='';
              this.isShow = false
          },time)
      }
  },
};
</script>
<style scoped>
.toast {
  position: fixed;
  top:50%;
  left:50%;
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  z-index: 999;
  transform: translate(-50%,-50%);
  padding: 5px 10px;
  border-radius: 3px;
}

</style>