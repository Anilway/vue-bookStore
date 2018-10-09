<template>
    <div>
        <MHeader :show="false" class="MHeader">列表页</MHeader>
        <div class="container" ref='scroll' @scroll='loadMore'>
            <ul>
                <router-link v-for="(book,index) in books" :to="{name:'detail',params:{uid:book.bookId}}" tag="li" :key="index">
                    <img v-lazy="book.bookCover">
                    <div class="info">
                        <h4>{{book.bookName}}</h4>
                        <p class='bookInfo'>{{book.bookInfo}}</p>
                        <p class='bookPrice'>{{book.bookPrice | toFixed}}</p>
                        <div>
                            <button @click.stop="addCart(book)" class='btn add'>添加到购物车</button>
                            <!--<button @click.stop="remove(book.bookId)" class='btn remove'>删除</button>-->
                        </div>
                    </div>
                </router-link>
                <li class="addmore" @click="more">{{msg}}</li>
            </ul>
        </div>
    </div>
</template>


<script>
    import MHeader from '../base/MHeader.vue';
    import {pagination,removeBook} from '../api';
    import * as Types from '../store/mutations-type';

    export default {
        data() {
            return {
                books:[],
                offset:0, // 偏移量
                hasMore:true, // 是否有更多
                isLoading:false,
                msg:'点击加载更多',
                isMove:false
            }
        },
        mounted(){
            let scroll=this.$refs.scroll;
            let top=scroll.offsetTop;
            scroll.addEventListener('touchstart',(e)=>{
                // 滚动条在最顶端时，或者 当前盒子在顶端的时候，才继续走
                if(scroll.scrollTop!==0 || scroll.offsetTop!==top) return;
                let start=e.touches[0].pageY;
                let distance=0;
                let move=(e)=>{
                    this.isMove=true;
                    let current = e.touches[0].pageY;
                    distance=current-start;// 求拉动的距离，负的就不要，只要从上往下拉的。
                    if(distance>0){
                        // 限制下拉距离
                        if(distance<=150){
                            scroll.style.top=distance+top+"px";
                        }else{
                            distance=150;
                            scroll.style.top=150+top+"px";
                        }
                    }else{
                        // 如果不在考虑范围内，移除掉move和end事件
                        scroll.removeEventListener('touchmove',move);
                        scroll.removeEventListener('touchend',end);
                    }
                };
                let end=(e)=>{
                    if(!this.isMove)return;
                    this.isMove=false;
                    clearInterval(this.scrollTimer);
                    this.scrollTimer=setInterval(()=>{
                        if(distance<=0){
                            clearInterval(this.scrollTimer);
                            distance=0;
                            scroll.style.top=top+"px";
                            scroll.removeEventListener('touchmove',move);
                            scroll.removeEventListener('touchend',end);
                            this.books=[];
                            this.offset=0;
                            this.hasMore=true;
                            this.getData();
                            this.msg="正在刷新";
                            return;
                        }
                        distance=distance/1.5;
                        distance<1?distance=0:null;
                        scroll.style.top=top+distance+"px";
                    },17);
                };
                scroll.addEventListener('touchmove',move);
                scroll.addEventListener('touchend',end);
            },false);
        },
        created(){
            this.getData();
        },
        methods: {
            addCart(book){
                this.$store.commit(Types.ADD_CART,book);
            },
            loadMore(){
                clearTimeout(this.timer);
                this.timer=setTimeout(()=>{
                    let {scrollTop,scrollHeight,clientHeight}=this.$refs.scroll;
                    if(scrollTop+clientHeight+20>scrollHeight){
                        this.getData();
                    }
                },50);
            },
            more(){
                if(!this.hasMore){
                    this.msg="已加载到底部";
                    return;
                }
                this.getData();
            },
           async getData(){
               if(this.hasMore && !this.isLoading){
                   this.msg="加载中..."
                   this.isLoading=true;
                   let {data}=await pagination(this.offset);
                   this.books=[...this.books,...data.books];
                   this.hasMore=data.hasMore;
                   this.offset=this.books.length;// 维护偏移量，就是总数的长度
                   this.isLoading=false;
                   this.msg="点击加载更多"
               }
            },
            async remove(id){
               await removeBook(id); // 删除某一项
                // 要删除前台数据
                this.books=this.books.filter(item=>item.bookId!==id);
            }
        },
        computed: {},
        components: {
            MHeader
        },
        filters:{
            toFixed(price){
                if(isNaN(price))return;
                return '￥'+ price.toFixed(2);
            }
        }
    }
</script>


<style  lang="less">
    .container{
        width:100%;
        position:fixed;
        top:40px;
        bottom:50px;
        overflow:auto;
        background:#F8F9F9;
        padding:10px;

        li{
            margin-bottom:10px;
            border-bottom:1px solid #ddd;
            padding:10px 0 15px 15px;
            margin-left:-10px;
            &:after{
                content: "";
                display:block;
                clear:both;
            }
            img{
                float:left;
                width:80px;
                height:119px;
                box-shadow:1px 2px 4px rgba(0,0,0,.3);
            }
            .info{
                width:70%;
                margin-left:10px;
                /*background:gray;*/
                float:left;
                h4{color:#333;font-size:16px; padding-right:20px;}
                .bookInfo{
                    color:#a6a6a6;
                    font-size:14px;
                    margin-top:5px;
                    padding-right:13px;
                }
                .bookPrice{
                    color:#68ABB7;
                    font-size:14px;
                }
                .btn{
                    border: 0px solid transparent;
                    padding:5px 10px;
                    border-radius:5px;
                    margin:10px;
                    &.add{background:#4D87DE;color:white;}
                    &.remove{
                        background:#F8F6F3;
                        color:#666666;
                        border: 1px solid #c2b3a7;
                        box-shadow:0 2px 2px rgba(166,151,138,.2);
                    }
                }
            }
        }
    }
    .MHeader{
        position:absolute;
        top:0;
        left:0;
        z-index:101;
    }
    .addmore{
        text-align: center;
        color:#8e8e8e;
        background:#fff;
        margin-left:-10px;
        margin-top:-10px;
    }
</style>
