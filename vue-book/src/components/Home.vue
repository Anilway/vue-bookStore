<template>
    <div>
        <MHeader :show='false' class="MHeader">首页</MHeader>
        <div class="wrap">
            <loading v-if='loading'></loading>
            <template v-else>
                <Swiper class="banner" :swiperSliders="sliders"></Swiper>
                <div class="goodsBox">
                    <h3 class='title'>新书上架</h3>
                    <ul>
                        <router-link v-for="(hot,index) in hotBooks" :to="{name:'detail',params:{uid:hot.bookId}}" tag="li" :key="index">
                            <img :src="hot.bookCover" width=100%>
                            <div class="msg">
                                <h4>{{hot.bookName}}</h4>
                                <p>{{hot.bookPrice |toFixed}}</p>
                            </div>
                        </router-link>
                    </ul>
                </div>
                <div class="goodsBox">
                    <h3 class='title'>热门图书</h3>
                    <ul>
                        <router-link v-for="(news,index) in newBooks" :to="{name:'detail',params:{uid:news.bookId}}" tag="li" :key="index">
                            <img :src="news.bookCover" width=100%>
                            <div class="msg">
                                <h4>{{news.bookName}}</h4>
                                <p>{{news.bookPrice |toFixed}}</p>
                            </div>
                        </router-link>
                    </ul>
                </div>
                <div class="goodsBox">
                    <h3 class='title'>精品推荐</h3>
                    <ul>
                        <router-link v-for="(recommend,index) in recommendBooks" :to="{name:'detail',params:{uid:recommend.bookId}}" tag="li" :key="index">
                            <img :src="recommend.bookCover" width=100%>
                            <div class="msg">
                                <h4>{{recommend.bookName}}</h4>
                                <p>{{recommend.bookPrice |toFixed}}</p>
                            </div>
                        </router-link>
                    </ul>
                </div>
            </template>
        </div>

    </div>
</template>


<script>
    import MHeader from '../base/MHeader.vue';
    import Swiper from '../base/swiper.vue';
    // import {getSliders,getHotBook} from "../api";
    import {getAll} from "../api";
    import loading from "../base/loading.vue";

    export default {
        created(){
          // 获取轮播图
          // this.getBanner();
          // this.getHot();
            this.getData();
        },
        data() {
            return {
                sliders:[],
                hotBooks:[],
                loading:true
            }
        },
        methods: {
            // getHot(){
            //   getHotBook().then(res=>{
            //       this.hotBooks=res.data;
            //   },err=>{
            //       console.log('获取热门图书数据出错：'+err);
            //   });
            // },
            // getBanner(){
            //     getSliders().then((res)=>{
            //         this.sliders=res.data;
            //     },(err)=>{
            //         console.log('获取轮播图数据出错'+err);
            //     });
            // }
            async getData(){
                let [sliders,hotBooks,newBooks,recommendBooks]=await getAll();
                this.sliders=sliders.data;
                this.hotBooks=hotBooks.data;
                this.newBooks=newBooks.data;
                this.recommendBooks=recommendBooks.data;
                // 数据获取完毕
                this.loading=false;
            }
        },
        components: {
            MHeader,Swiper,loading
        },
        filters:{
            toFixed(price){
                if(isNaN(price))return;
                return '￥'+price.toFixed(2);
            }
        }
    }
</script>


<style scoped lang="less">
    .banner{
        display:block!important;
        &:after{
            content:'';
            display:block;
            clear:both;
        }
    }

    .goodsBox{
        padding:10px;
        /*padding-bottom:50px;*/
        border-bottom:1px solid #ddd;
        ul{
            &:after{
                content:"";
                display:block;
                clear:both;
            }
            li{
                width:30%;
                height:200px;
                text-align: left;
                margin:5px;
                float:left;
                position:relative;
                img{
                    width:90px;
                    height:120px;
                    box-shadow:1px 2px 4px rgba(0,0,0,.3);
                }
                .msg{
                    width:100%;
                    /*position: absolute;*/
                    /*bottom:0;*/
                    h4{padding-right:15px;color:#222;font-size:12px;}
                    p{color:#68ABB7;}
                }

            }
        }

    }
    .title{
        padding:10px 0;
        color:#68ABB7;
    }
    .MHeader{
        position:absolute;
        top:0;
        left:0;
        z-index:101;
    }
</style>
