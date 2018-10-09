import Vue from 'vue';
import VueRouter from 'vue-router';

// import Home from '../components/Home.vue';
// import List from '../components/List.vue';
// import Collect from '../components/Collect.vue';
// import Add from '../components/Add.vue';
// import Detail from '../components/Detail.vue';

Vue.use(VueRouter);
let router=new VueRouter({
    mode:'history',
    routes:[
        {path:"/",redirect:"/home"},
        {
            path:'/home',
            component:()=>import('../components/Home.vue'),
            meta:{keepAlive:true,title:'首页'}
        },
        {
            path:'/list',
            meta:{title:'列表'},
            component:()=>import('../components/List.vue')
        },
        {
            path:'/detail/:uid',
            component:()=>import('../components/Detail.vue'),
            name:"detail",
            meta:{title:'详情'}
        },
        {
            path:'/collect',
            meta:{title:'购物车'},
            component:()=>import('../components/Collect.vue')
        },
        {
            path:'/add',
            meta:{title:'添加'},
            component:()=>import('../components/Add.vue')
        },
        {path:'*',redirect:'/home'}
    ]
});

export default router;
