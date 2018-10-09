import Vue from 'vue'
import App from './App'
import router from './router/index.js'
Vue.config.productionTip = false;
// 导入轮播图插件
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
// 导入图片懒加载
import VueLazyload from 'vue-lazyload'

Vue.use(VueAwesomeSwiper);
Vue.use(VueLazyload,{
    preload:1.3,
    // error:'https://i.postimg.cc/rm9WhzD0/error.png',
    error:'http://upload.ouliu.net/i/20181007112720cpd7z.png',
    // loading:'https://i.postimg.cc/d3qRvrbj/loading1.gif',
    loading:'http://upload.ouliu.net/i/201810071127424l9lq.gif',
    // loading:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1538690931270&di=57513fda65081669884180d2566fc1a4&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F01491557e1e0f00000012e7e66d689.gif',
    attempt:1
});

import store from './store';

// 在进入路由之前，每一次都会执行此方法
router.beforeEach((to,from,next)=>{
    document.title=to.meta.title;
    next();
});


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
