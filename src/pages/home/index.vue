<template>
	<div class="home">
		<!-- <van-button type="default" @click="nextStep">开始制作</van-button> -->
		<!-- <van-image :src=bg class="temp" @click="nextStep"/> -->
		<div class="door-wrap">
			<div class="door-left" @click="openTheDoor('left')">
				举头望明月
				<div class="open-left">
					<div class="img" :style="openDoorLeft">
						<van-image :src="doorLeft" class="temp1" />
					</div>
				</div>
			</div>
			<div class="door-right" @click="openTheDoor('right')">
				低头思故乡
				<div class="open-right">
					<div class="img" :style="openDoorRight">
						<van-image :src="doorRight" class="temp1" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { Button, Image } from "vant";
import router from "../../../router/routes";
import background from "../../assets/images/home_img.jpg";
import doorLeftImg from "../../assets/images/doorleft.jpg";
import doorRightImg from "../../assets/images/door.jpg";

export default {
	name: "home",
	components: {
		[Button.name]: Button,
		[Image.name]: Image,
	},
	data() {
		return {
			bg: background,
			doorLeft: doorLeftImg,
      doorRight: doorRightImg,
      openDoorLeft: {},
      openDoorRight: {}
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
      console.log(arg);
      this.openDoorLeft = {
        opacity: 0,
        '*filter': 'alpha(opacity=0)',
        filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)',
        transform: 'perspective(600px) rotateY(90deg)',
        '-webkit-transform': 'perspective(600px) rotateY(90deg)',
        '-moz-transform': 'perspective(600px) rotateY(90deg)'
      }
      this.openDoorRight = {
					opacity: 0,
					'*filter': 'alpha(opacity=0)',
					filter: 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)',
					transform: 'perspective(600px) rotateY(-90deg)',
					'-webkit-transform': 'perspective(600px) rotateY(-90deg)',
					'-moz-transform': 'perspective(600px) rotateY(-90deg)'
      }
      // 根据arg参数判断条件跳转

      // 开完门之后进入下一页
      setTimeout(() => {
        this.nextStep()
      }, 2000);

    }
	},
};
</script>

<style lang="less" scoped>
.home {
	.temp {
		width: 80%;
		margin: 0 auto;
	}
	.door-wrap {
		display: flex;
		justify-content: center;
		.door-left {
			.open-left {
				.img {
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
	}
	.door-right {
		.open-right {
			.img {
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
</style>
