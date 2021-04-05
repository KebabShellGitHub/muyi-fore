import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "ant-design-vue/dist/antd.css";
import Antd from "ant-design-vue";
import axios from 'axios'
import qs from 'qs'
Vue.config.productionTip = false;
Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios
Vue.prototype.$qs = qs    //全局注册，使用方法为:this.$qs
Vue.use(Antd);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");

// 跳转后返回顶部
router.afterEach((to, from, next) => {
    window.scrollTo(0, 0);
})
