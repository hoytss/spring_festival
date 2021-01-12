<template>
  <div class="hello">
    <van-button type="success" @click="nextStep">成功</van-button>
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
          router.push('/')
      }
  }
};
</script>

<style scoped>

</style>
