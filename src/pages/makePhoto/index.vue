<template>
	<div class="make-photo">
		<!-- <van-button type="default" @click="nextStep">第一步</van-button> -->
		<van-image :src="bodyPhoto" class="temp" @click="nextStep" />
		<van-uploader :after-read="afterRead" @click="setup" />
		<!-- <van-image :src="name111" class="temp" /> -->
		<img :src="name111" class="temp" />
		{{ name111 }}
	</div>
</template>

<script>
import { Button, Image, Uploader } from "vant";
import { ref, toRefs, reactive } from "vue";
import router from "../../../router/routes";
import { deploymentList, uploadFile } from "../../api/makephoto";
import photo from "../../assets/images/make_head.jpg";

export default {
	name: "home",
	components: {
		[Button.name]: Button,
		[Image.name]: Image,
		[Uploader.name]: Uploader,
	},
	data() {
		return {
			bodyPhoto: photo,
			newSrc: null,
		};
	},
	props: {
		msg: String,
	},
	mounted() {
		this.getTest();
	},
	setup() {
		// 在setup中定义template模板使用的响应式变量，你得用ref或者reactive来定义
		// 这里的ref你可以理解成一个工厂类，传入的参数就是初始化的变量的值，跟组件的ref概念不能混淆
		// 定义单个变量，为了让大家明白意义，我跟vue2.0都进行下对比
		// vue2.0,不管定义单个或者多个我们都是定义 在data里，如
		/*
       data(){
          return {
            name: '小哥哥'
          }
       }
    */
		// 在vue3.0中，如果你只需要定义一个响应式变量，那么你可以用以下ref
		// 可能你会疑惑既然是定义变量为什么不用let，var，而用const定义常量的，这里是因为你定义的是一个引用，name指向的永远是一个固定不变的指针地址
		const name = ref("小哥哥");
		const name111 = ref("小哥哥");
		// 注意点，这里要获取name的值怎么获取,通过定义的变量的。value
		console.log("拿到name的值：", name.value);
		// 检测某个值是不是响应式的可以用isRef

		// 每次都用.value去拿值的写法，是不是有点不适应，而且定义的变量多了我们也不可能定义一堆ref，看起来都丑
		// reactive 可以创建一个响应式数据，参数是一个对象
		const data = reactive({
			name: "帅的没人要", // 这样创建的响应式数据就不用ref了，写起来是不是要方便点
			sex: "性别分不出",
			arr: [],
		});
		// 但是以上还是有个缺点，如果你在return里直接放上data,那你使用的时候每次都要data.name，data.sex也麻烦，<div>{{data.sex}}</div>
		// 你说你可以解构在return {...data} 如果你这样的，里面的数据都会变成非响应式的，vue3.0提供了一个满足你幻想的方法toRefs,使用了这个包装下，你就可以在return里使用解构了
		// 包装上面的data
		const refData = toRefs(data);
		// 在data中都有个return ，这里当然也必须要有的，但是这里是所有方法计算属性都要通过这个返回
		// 有人疑惑，那我可以直接在这个return上定义变量吗，答案是可以，但是定义的变量不是响应式的，不可变化

		const afterRead = (file) => {
			// 此时可以自行将文件上传至服务器
			console.log(file);
			console.log(file.file);
			let getFile = file.file;
			//new 一个FormData格式的参数
			let params = new FormData();
			params.append("file", getFile);
			uploadFile("post", params).then((res) => {
        console.log(res);
        name111.value = `data:image/png;base64,${res.data.img}`;
				// this.newSrc = res.data.img
			});
		};

		return {
			...refData, // 你也可以直接在这里用...toRefs(data) 这样会简单点
      name111,
      afterRead
		};

		// return {
		//   afterRead,
		//   name
		// };
	},
	methods: {
		nextStep() {
			console.log("xiayibu");
			router.push("/generate");
		},
		async getTest() {
			console.log("吊影");
			await deploymentList("post", { name: "jhon", age: "18" }).then((res) => {
				console.log(res);
			});
		},
	},
};
</script>

<style lang="less" scoped>
.make-photo {
	.temp {
		width: 80%;
		margin: 0 auto;
	}
}
</style>
