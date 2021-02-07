<template>
	<div class="make-photo">
		<!-- <van-image :src="bodyPhoto" class="temp" @click="nextStep" />
		<van-uploader :after-read="afterRead" @click="setup" />
		<img :src="name111" class="temp" />
		{{ name111 }} -->
		<!-- 两端对齐 -->
		<van-row justify="space-between">
			<img :src="gobackBtn" class="top-btn" @click="goBack" />
			<!-- <van-col span="6">
			</van-col> -->
			<img :src="nextpage" class="top-btn" @click="nextStep" />
			<!-- <van-col span="6">
				
			</van-col> -->
		</van-row>
		<van-row style="min-height: 68%; position: relative;" class="body-wrap">
			<section style="height: 100%; position: relative;" ref="sourceImg">
				<div class="head">
					<img :src="head" class="" />
				</div>
				<div class="top">
					<img :src="top" class="" />
				</div>
				<div class="bottom">
					<img :src="bottom" class="" />
				</div>
			</section>

			<!-- 切换性别 -->
			<!-- <div>
				<img :src="woman" class="top-btn" @click="chooseSex(1)" v-if="sexSet===0"/>
				<img :src="man" class="top-btn" @click="chooseSex(0)" v-else/>
			</div> -->
		</van-row>
		<van-row>
			<img :src="testImg" class="" />
		</van-row>
		<van-row justify="flex-start">
			<van-col span="2" class="part-wrap">
				<img :src="hair" class="part" @click="selectPart('head')" />
				<img :src="coat" class="part" @click="selectPart('top')" />
				<img :src="pants" class="part" @click="selectPart('bottom')" />
				<img :src="accessories" class="part" @click="selectPart('head')" />
			</van-col>
			<van-col span="18" class="part-details-wrap">
				<div>
					<img
						v-for="item in firstRow"
						:key="item.part_id"
						class="part"
						:src="item.thumbnailUrl"
						@click="addPartInTemplate(item)"
					/>
				</div>
				<div>
					<img
						v-for="item in secondRow"
						:key="item.part_id"
						class="part"
						:src="item.thumbnailUrl"
						@click="addPartInTemplate(item)"
					/>
				</div>
			</van-col>
		</van-row>
	</div>
</template>

<script>
import { Button, Image, Uploader, Row } from "vant";
import { ref, toRefs, reactive } from "vue";
import router from "../../../router/routes";
import { deploymentList, uploadFile, getImgPartList, saveTemplateInfo } from "@/api/makephoto";
import html2canvas from "html2canvas";
import photo from "@/assets/images/make_head.jpg";
import Goback from "@/assets/images/makePhoto/goback.png";
import NextPage from "@/assets/images/makePhoto/nextpage.png";

import Hair from "@/assets/images/makePhoto/hair.png";
import Coat from "@/assets/images/makePhoto/coat.png";
import Pants from "@/assets/images/makePhoto/pants.png";
import Accessories from "@/assets/images/makePhoto/accessories.png";

import Man from "@/assets/images/makePhoto/man.png";
import Woman from "@/assets/images/makePhoto/woman.png";

import Head from "@/assets/images/makePhoto/test_head.png";
import Top from "@/assets/images/makePhoto/test_top.png";
import Bottom from "@/assets/images/makePhoto/test_bottom.png";

import Slhead1 from "@/assets/images/makePhoto/sl_head1.png";
import Slhead2 from "@/assets/images/makePhoto/sl_head2.png";

export default {
	name: "home",
	components: {
		[Button.name]: Button,
		[Image.name]: Image,
		[Uploader.name]: Uploader,
		[Row.name]: Row,
	},
	data() {
		return {
			gobackBtn: Goback,
			nextpage: NextPage,
			bodyPhoto: photo,
			newSrc: null,
			hair: Hair,
			coat: Coat,
			pants: Pants,
			accessories: Accessories,
			man: Man,
			woman: Woman,
			sexSet: 1,
			head: Head,
			top: Top,
			bottom: Bottom,
			firstRow: [],
			secondRow: [],
			slhead1: Slhead1,
			slhead2: Slhead2,
			testImg: ''
		};
	},
	props: {
		msg: String,
	},
	mounted() {
		// 注释掉测试用接口
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
			afterRead,
		};

		// return {
		//   afterRead,
		//   name
		// };
	},
	methods: {
		goBack() {
			router.push("/home");
		},
		nextStep() {
			let that = this;
			html2canvas(this.$refs.sourceImg, {
				backgroundColor: null, // 背景颜色
				dpi: 192, // 将分辨率提高到特定的dpi,默认值为96
				scale: 2, // 用于渲染的比例尺。默认为浏览器设备像素比率。默认值是1，手机端设置成2
				useCORS: true, // 是否尝试使用CORS从服务器加载图像
			}).then(function (canvas) {
				console.log(canvas);
				let dataURL = canvas.toDataURL("image/png");
				console.log(dataURL);
				// 转文件
				// base64转blob
				// const base64ToBlob = function(base64Data) {
				// 	let arr = base64Data.split(','),
				// 		fileType = arr[0].match(/:(.*?);/)[1],
				// 		bstr = atob(arr[1]),
				// 		l = bstr.length,
				// 		u8Arr = new Uint8Array(l);
						
				// 	while (l--) {
				// 		u8Arr[l] = bstr.charCodeAt(l);
				// 	}
				// 	return new Blob([u8Arr], {
				// 		type: fileType
				// 	});
				// };
				// // blob转file
				// const blobToFile = function(newBlob, fileName) {
				// 	newBlob.lastModifiedDate = new Date();
				// 	newBlob.name = fileName;
				// 	return newBlob;
				// };
				// // 调用
				// const blob = base64ToBlob(dataURL);
				// const file = blobToFile(blob, 'targetFile');
				// console.log(blob);
				// console.log(file);

				let params = {
					head: that.head,
					top: that.top,
					bottom: that.bottom,
					source_template: dataURL
				}
				
				saveTemplateInfo("post", params).then((res) => {
					// console.log(res);
					that.testImg = 'data:image/png;base64,'+res.data.transform_img
					// console.log(that.testImg);
					router.push({
						name: "choosePhoto",
						query: { targetTemplate: 'file'}
					});
				});
			});
			
		},
		async getTest() {
			await deploymentList("post", { name: "jhon", age: "18" }).then((res) => {
				console.log(res);
			});
		},
		// 选择配件 展示详细
		async selectPart(args) {
			// 读取性别
			if (args) {
				let params = { imgType: args, sex: this.sexSet };
				await getImgPartList("post", params).then((res) => {
					console.log(res);
					if (res.code === 200) {
						this.firstRow = res.data.first_row;
						this.secondRow = res.data.second_row;
					}
				});
			}

			// 调接口展示配件详细图片
		},
		// 选择性别
		chooseSex(arg) {
			console.log(arg);
			this.sexSet = arg;
			console.log(this.sexSet);
		},
		addPartInTemplate(args) {
			if (args.type === 'head') {
				this.head = args.artworkUrl
			}else if(args.type === 'top') {
				this.top = args.artworkUrl
			}else if(args.type === 'bottom') {
				this.bottom = args.artworkUrl
			}
			console.log(args.part_id)
			console.log(args.thumbnailUrl)
			console.log(args.type)
			console.log(args.artworkUrl)
			console.log(args.sex)
		},
	},
};
</script>

<style lang="less" scoped>
.make-photo {
	background-color: #f3d4cb;
	height: 100%;
	.temp {
		width: 80%;
		margin: 0 auto;
	}
	.top-btn {
		width: 6.25rem;
		margin: 1.25rem;
	}
	.part-wrap {
		display: flex;
		flex-flow: wrap;
		width: 36%;
		border-right: 1px solid red;
		justify-content: center;
		.part {
			display: inline-block;
			width: 3rem;
			height: 3rem;
			padding: 4px;
		}
	}
	.part-details-wrap {
		display: flex;
		flex-flow: wrap;
		width: 63%;
		border-left: 1px solid green;
		justify-content: flex-start;
		overflow-x: auto;
		div {
			width: 100%;
			display: flex;
			justify-content: flex-start;
		}
		.part {
			display: inline-block;
			width: 3rem;
			height: 3rem;
			padding: 4px;
		}
	}
	.body-wrap {
		.head {
			width: 100%;
			img {
				width: 66%;
				position: relative;
				z-index: 6;
			}
		}
		.top {
			img {
				width: 50%;
				position: relative;
				z-index: 5;
				top: -14px;
			}
		}
		.bottom {
			img {
				width: 50%;
				position: relative;
				z-index: 4;
				top: -86px;
			}
		}
	}
}
</style>
