<template>
	<div class="choose-photo">
		<!-- <van-button type="default" @click="start">开始制作</van-button> -->
		<van-button type="default" @click="show = true">开始制作</van-button>
		<input
			type="file"
			accept="image/*"
			capture="camera"
			v-show="false"
			ref="photo"
			@change="getPhoto"
		/>
		<input
			type="file"
			accept="image/*"
			ref="uploadImg"
			v-show="false"
			@change="chooseImg"
		/>
		<div class="imgBox name">
			<img :src="imgSrc"/>
		</div>
		<van-action-sheet
			v-model:show="show"
			:actions="actions"
			cancel-text="取消"
			close-on-click-action
			@cancel="onCancel"
			@select="onSelect"
		/>
		<van-row>
			<img :src="testImg" class=""  style="width:100%"/>
		</van-row>
		
	</div>
</template>

<script>
import { Button, Image, Uploader, Row, ActionSheet, Toast } from "vant";
import { ref, reactive } from "vue"; //, toRefs, reactive
import router from "../../../router/routes";
import { swapFace, loadTemplateInfo } from "@/api/makephoto";

export default {
	name: "home",
	components: {
		[Button.name]: Button,
		[Image.name]: Image,
		[Uploader.name]: Uploader,
		[Row.name]: Row,
		[ActionSheet.name]: ActionSheet,
	},
	data() {
		return {
			imgSrc: "", //展示的图片路径
			tupianlist: "", //展示的图片容器,
			targetTemplate: "",
			testImg: ''
		};
	},
	props: {
		msg: String,
	},
	mounted() {
		this.getTemplate();
	},
	setup() {
		const show = ref(false);
		const uploadImg = ref(null);
		const photo = ref(null);
		const data = reactive({
			name: "帅的没人要", // 这样创建的响应式数据就不用ref了，写起来是不是要方便点
			sex: "性别分不出",
			arr: [],
			imgUrl: "",
		});
		const actions = [{ name: "拍照" }, { name: "从相册选择" }];

		const onCancel = () => {
			Toast("取消");
			console.log("取消了");
		};
		const onSelect = (action, index) => {
			console.log(action);
			if (index === 0) {
				makePhoto();
			} else {
				selectPhoto();
			}
		};
		const selectPhoto = () => {
			console.log("uploadImg，选照片");
			uploadImg.value.click();
		};
		const makePhoto = () => {
			console.log("uploadImg，拍照");
			photo.value.click();
		};
		return {
			show,
			actions,
			onCancel,
			onSelect,
			uploadImg,
			photo,
			// chooseImg
		};
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

		//1222/
		// const name = ref("小哥哥");
		// const name111 = ref("小哥哥");
		// // 注意点，这里要获取name的值怎么获取,通过定义的变量的。value
		// console.log("拿到name的值：", name.value);
		// // 检测某个值是不是响应式的可以用isRef

		// // 每次都用.value去拿值的写法，是不是有点不适应，而且定义的变量多了我们也不可能定义一堆ref，看起来都丑
		// // reactive 可以创建一个响应式数据，参数是一个对象
		// const data = reactive({
		// 	name: "帅的没人要", // 这样创建的响应式数据就不用ref了，写起来是不是要方便点
		// 	sex: "性别分不出",
		// 	arr: [],
		// });
		// // 但是以上还是有个缺点，如果你在return里直接放上data,那你使用的时候每次都要data.name，data.sex也麻烦，<div>{{data.sex}}</div>
		// // 你说你可以解构在return {...data} 如果你这样的，里面的数据都会变成非响应式的，vue3.0提供了一个满足你幻想的方法toRefs,使用了这个包装下，你就可以在return里使用解构了
		// // 包装上面的data
		// const refData = toRefs(data);
		// // 在data中都有个return ，这里当然也必须要有的，但是这里是所有方法计算属性都要通过这个返回
		// // 有人疑惑，那我可以直接在这个return上定义变量吗，答案是可以，但是定义的变量不是响应式的，不可变化

		// const afterRead = (file) => {
		// 	// 此时可以自行将文件上传至服务器
		// 	console.log(file);
		// 	console.log(file.file);
		// 	let getFile = file.file;
		// 	//new 一个FormData格式的参数
		// 	let params = new FormData();
		// 	params.append("file", getFile);
		// 	uploadFile("post", params).then((res) => {
		// 		console.log(res);
		// 		name111.value = `data:image/png;base64,${res.data.img}`;
		// 		// this.newSrc = res.data.img
		// 	});
		// };

		// return {
		// 	...refData, // 你也可以直接在这里用...toRefs(data) 这样会简单点
		// 	name111,
		// 	afterRead,
		// };

		// return {
		//   afterRead,
		//   name
		// };
	},
	methods: {
		async getTemplate() {
			let params = {
				user_id: 1,
			};
			await loadTemplateInfo("post", params).then((res) => {
				if (res.code === 200) {
					console.log(res);
					this.targetTemplate = res.data;
				}
			});
		},
		goBack() {
			router.push("/generate");
		},
		start() {
			this.show1 = true;
		},
		chooseImg(e) {
			console.log(this.$route);
			// console.log(e.target.files[0]);
			// console.log(this.$refs.uploadImg.files[0]);
			let getFile = e.target.files[0];
			// 将获取的base64图片转成文件
			// let useTemplate = this.targetTemplate.split("'")[1]
			// let bob = this.dataUrlToBlob(useTemplate);
			// let fileAll = this.blobToFile(bob,'filename')

			let useTemplate = this.targetTemplate.split("'")[1]
			let latestTemplate = useTemplate.split(',')[1]
			//new 一个FormData格式的参数
			let params = new FormData();
			params.append("sourceFile", getFile);
			params.append("targetFile", latestTemplate);

			// let params = {
			// 	sourceFile: sourceImg,
			// 	targetFile: this.$route.query.targetTemplate
			// }
			swapFace("post", params).then((res) => {
				console.log(res);
				this.testImg = 'data:image/png;base64,'+res.data
			});
			// console.log(2223232323232);
		},
		getPhoto(e) {
			let getFile = e.target.files[0];
			// 将获取的base64图片转成文件
			// let useTemplate = this.targetTemplate.split("'")[1]
			// let bob = this.dataUrlToBlob(useTemplate);
			// let fileAll = this.blobToFile(bob,'filename')

			let useTemplate = this.targetTemplate.split("'")[1]
			let latestTemplate = useTemplate.split(',')[1]
			//new 一个FormData格式的参数
			let params = new FormData();
			params.append("sourceFile", getFile);
			params.append("targetFile", latestTemplate);

			// let params = {
			// 	sourceFile: sourceImg,
			// 	targetFile: this.$route.query.targetTemplate
			// }
			swapFace("post", params).then((res) => {
				console.log(res);
				this.testImg = 'data:image/png;base64,'+res.data
			});
		},
		dataUrlToBlob(dataurl) {
			let arr = dataurl.split(","),
				mime = arr[0].match(/:(.*?);/)[1],
				bstr = atob(arr[1]),
				n = bstr.length,
				u8arr = new Uint8Array(n);
			while (n--) {
				u8arr[n] = bstr.charCodeAt(n);
			}
			return new Blob([u8arr], { type: mime });
		},

		blobToFile(theBlob, fileName) {
			theBlob.lastModifiedDate = new Date();
			theBlob.name = fileName;
			return theBlob;
		},
	},
};
</script>

<style lang="less" scoped>
// .choose-photo {

// }
</style>
