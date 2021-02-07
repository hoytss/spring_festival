import {createRouter, createWebHistory} from "vue-router"

// 1. 定义路由组件， 注意，这里一定要使用 文件的全名（包含文件后缀名）
import home from "@/pages/home/index.vue";
import makePhoto from "@/pages/makePhoto/index.vue";
import generate from "@/pages/generate/index.vue";
import choosePhoto from "@/pages/choosePhoto/index.vue";


// 2. 定义路由配置
const routes = [
  { 
    path: "/",
    redirect: '/home'
  },
  { path: "/home", component: home },
  { path: "/makePhoto", component: makePhoto },
  { path: "/generate", component: generate },
  { name: 'choosePhoto', path: "/choosePhoto", component: choosePhoto },
];

// 3. 创建路由实例
const router = createRouter({
  // 4. 采用hash 模式
//   history: createWebHashHistory(),
  // 采用 history 模式
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

export default router
