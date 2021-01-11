<template>
  <div class="hello">
    <van-button type="default" @click="nextStep">第一步</van-button>
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
          router.push('/generate')
      }
  }
};
</script>

<style scoped>

</style>
