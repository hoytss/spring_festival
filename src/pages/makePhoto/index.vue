<template>
  <div class="hello">
    <van-button type="default" @click="nextStep">第一步</van-button>
  </div>
</template>

<script>
import { Button } from "vant";
import router from '../../../router/routes'
import { deploymentList } from '../../api/makephoto'


export default {
  name: "home",
  components: {
    [Button.name]: Button,
  },
  props: {
    msg: String,
  },
  mounted() {
    this.getTest()
  },
  methods: {
      nextStep() {
          console.log('xiayibu');
          router.push('/generate')
      },
      async getTest() {
        console.log('吊影');
        await deploymentList('post',{ name: 'jhon',age: '18' }).then((res) => {
          console.log(res);
        });
      }
  }
};
</script>

<style scoped>

</style>
