<template>
  <div class="hello">
    <van-button type="default" @click="nextStep">开始制作</van-button>
  </div>
</template>

<script>
import { Button } from "vant";
import router from '../../../router/routes'

export default {
  name: "home",
  components: {
    vanButton: Button,
  },
  props: {
    msg: String,
  },
  mounted() {

  },
  methods: {
      nextStep() {
          console.log('xiayibu');
          router.push('/makePhoto')
      }
  }
};
</script>

<style scoped>

</style>
