<template>
	<div class="home">
		<!-- <van-button type="default" @click="nextStep">开始制作</van-button> -->
		<!-- <van-image :src=bg class="temp" @click="nextStep"/> -->
		<div class="door-wrap">
			<van-field
				v-model="value"
				class="why-num"
				readonly
				clickable
				@touchstart.stop="show = true"
			/>
			<van-number-keyboard
				v-model="value"
				:show="show"
				:maxlength="2"
				@blur="show = false"
				close-button-text="完成"
			/>
			<div class="title">
				<van-image :src="title" />
			</div>
			<div class="horizontal-batch">
				<van-image :src="Light" />
			</div>
			<div class="door-open">
				<div class="door-left" @click="openTheDoor('left')">
					<div class="couplet-left">
						<div class="img" :style="openDoorLeft">
							<van-image :src="coupletLeft" />
						</div>
					</div>
					<div class="open-left">
						<div class="img" :style="openDoorLeft">
							<van-image :src="doorLeft" class="temp1" />
						</div>
					</div>
				</div>
				<div class="door-right" @click="openTheDoor('right')">
					<div class="couplet-right">
						<div class="img" :style="openDoorRight">
							<van-image :src="coupletRight" />
						</div>
					</div>
					<div class="open-right">
						<div class="img" :style="openDoorRight">
							<van-image :src="doorRight" class="temp1" />
						</div>
					</div>
				</div>
			</div>
			<div class="door-firecracker">
				<van-image :src="firecracker" />
			</div>
			<div class="door-cloud">
				<van-image :src="cloud" />
			</div>
		</div>
	</div>
</template>

<script>
import { Button, Image, Dialog, NumberKeyboard, Field } from "vant";
import { ref } from "vue";
import router from "../../../router/routes";
import doorLeftImg from "@/assets/images/home/door_right.png";
import doorRightImg from "@/assets/images/home/door_left.png";
import LightImg from "@/assets/images/home/light.png";
import Title from "@/assets/images/home/title.png";
import Cloud from "@/assets/images/home/cloud.png";
import Firecracker from "@/assets/images/home/firecracker.png";
import coupletLeftImg from "@/assets/images/home/nianyefan.png";
import coupletRightImg from "@/assets/images/home/quanjiafu.png";

export default {
	name: "home",
	components: {
		[Button.name]: Button,
		[Image.name]: Image,
		[Dialog.Component.name]: Dialog.Component,
		[NumberKeyboard.name]: NumberKeyboard,
		[Field.name]: Field,
	},
	setup() {
		const show = ref(false);
		const value = ref("");
		return {
			show,
			value,
		};
	},
	data() {
		return {
			doorLeft: doorLeftImg,
			doorRight: doorRightImg,
			Light: LightImg,
			title: Title,
			cloud: Cloud,
			firecracker: Firecracker,
			coupletLeft: coupletLeftImg,
			coupletRight: coupletRightImg,
			openDoorLeft: {},
			openDoorRight: {},
			homeNum: null,
		};
	},
	props: {
		msg: String,
	},
	mounted() {},
	methods: {
		nextStep() {
			router.push("/makePhoto");
		},
		// 选择类型+开门
		openTheDoor(arg) {
			// 检测是否选择家庭人数
			if (this.value === "") {
				Dialog.alert({
					message: "请先选择家庭人数哦～",
				}).then(() => {
					// on close
					return;
				});
			} else {
				this.openDoorLeft = {
					opacity: 0,
					"*filter": "alpha(opacity=0)",
					filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)",
					transform: "perspective(600px) rotateY(90deg)",
					"-webkit-transform": "perspective(600px) rotateY(90deg)",
					"-moz-transform": "perspective(600px) rotateY(90deg)",
				};
				this.openDoorRight = {
					opacity: 0,
					"*filter": "alpha(opacity=0)",
					filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=0)",
					transform: "perspective(600px) rotateY(-90deg)",
					"-webkit-transform": "perspective(600px) rotateY(-90deg)",
					"-moz-transform": "perspective(600px) rotateY(-90deg)",
				};
				// 根据arg参数判断条件跳转

				// 开完门之后进入下一页
				setTimeout(() => {
					this.nextStep();
				}, 2000);
			}
			console.log(arg);
		},
	},
};
</script>

<style lang="less" scoped>
.home {
	height: 100%;
	.temp {
		width: 80%;
		margin: 0 auto;
	}
	.door-wrap {
		height: 100%;
		background-image: url("~@/assets/images/home/base_bg.png");
		background-repeat: no-repeat;
		background-size: 100% 100%; /* 背景图片宽度为容器宽度的100%，高度为容器高度的100% */
		position: relative;
		.why-num {
			position: absolute;
			width: 65px;
			background: border-box;
			right: 21%;
			top: 24%;
			z-index: 200;
		}
		.horizontal-batch {
			position: absolute;
			top: 20%;
			z-index: 20;
		}
		.title {
			position: absolute;
			top: 11%;
			z-index: 21;
		}
		.door-open {
			display: flex;
			justify-content: center;
			width: 81%;
			position: absolute;
			left: 50%;
			margin-left: -40.5%;
			height: 85%;
			top: 19%;
			.door-left {
				position: relative;
				height: 83%;
				.couplet-left {
					position: absolute;
					width: 68px;
					z-index: 18;
					left: 22px;
					top: 11.75rem;
					height: 100%;
					.img {
						transition: all 3s;
						-moz-transition: all 3s;
						-webkit-transition: all 3s;
						position: relative;
						bottom: 0;
						height: 100%;
						transform-origin: left;
						-moz-transform-origin: left;
						-webkit-transform-origin: left;
						transform: perspective(600px) rotateY(0deg);
						-webkit-transform: perspective(600px) rotateY(0deg);
						-moz-transform: perspective(600px) rotateY(0deg);
					}
				}
				.open-left {
					height: 100%;
					.img {
						.van-image {
							height: 100%;
						}
						height: 100%;
						transition: all 3s;
						-moz-transition: all 3s;
						-webkit-transition: all 3s;
						position: relative;
						bottom: 0;
						transform-origin: left;
						-moz-transform-origin: left;
						-webkit-transform-origin: left;
						transform: perspective(600px) rotateY(0deg);
						-webkit-transform: perspective(600px) rotateY(0deg);
						-moz-transform: perspective(600px) rotateY(0deg);
					}
				}
			}
			.door-right {
				position: relative;
				height: 83%;
				.couplet-right {
					height: 100%;
					position: absolute;
					width: 68px;
					z-index: 18;
					right: 22px;
					top: 11.75rem;
					.img {
						height: 100%;
						transition: all 3s;
						-moz-transition: all 3s;
						-webkit-transition: all 3s;
						position: relative;
						bottom: 0;
						transform-origin: right;
						-moz-transform-origin: right;
						-webkit-transform-origin: right;
						transform: perspective(600px) rotateY(0deg);
						-webkit-transform: perspective(600px) rotateY(0deg);
						-moz-transform: perspective(600px) rotateY(0deg);
					}
				}
				.open-right {
					height: 100%;
					.img {
						height: 100%;
						.van-image {
							height: 100%;
						}
						transition: all 3s;
						-moz-transition: all 3s;
						-webkit-transition: all 3s;
						position: relative;
						bottom: 0;
						transform-origin: right;
						-moz-transform-origin: right;
						-webkit-transform-origin: right;
						transform: perspective(600px) rotateY(0deg);
						-webkit-transform: perspective(600px) rotateY(0deg);
						-moz-transform: perspective(600px) rotateY(0deg);
					}
				}
			}
		}
		.door-cloud {
			position: absolute;
			bottom: -6px;
		}
		.door-firecracker {
			position: absolute;
			top: 231px;
		}
	}
}
</style>
