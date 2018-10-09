<template>
    <div>
        <MHeader class='MHeader'>购物车</MHeader>
        <ul class="wrap">
            <li v-for="(book,index) in carList" :key="index">
                <img :src="book.bookCover">
                <div class="info">
                    <h4>{{book.bookName}}</h4>
                    <p class='bookInfo'>{{book.bookInfo}}</p>
                    <p class='bookPrice'>{{book.bookPrice | toFixed}}</p>
                </div>
                <div class="count">
                    <div class='box btn' @click="removeBook(book)">-</div>
                    <div class='box num'>{{book.bookCount}}</div>
                    <div class='box btn' @click='addBook(book)'>+</div>
                    <div class='box itemPrice'>{{book.bookPrice*book.bookCount |toFixed}}</div>
                    <div class='box cancel' @click='cancel(book)'>删除</div>
                </div>
            </li>
            <li class='checkout'>
                <span>共{{count}}本</span>
                <span>合计:</span>
                <span class='all'>{{allPrice|toFixed}}</span>
                <span class='pay' @click='payment'>结算</span>
            </li>
        </ul>
    </div>
</template>


<script>
    import MHeader from '../base/MHeader';
    import {mapState,mapGetters} from 'vuex';
    import * as Types from '../store/mutations-type';
    export default {
        data(){
            return {}
        },
        methods: {
            addBook(book){
                this.$store.commit(Types.ADD_CART,book);
            },
            removeBook(book){
                this.$store.commit(Types.REMOVE_CART,book);
            },
            cancel(book){
                this.$store.commit(Types.CLEAR_CART,book);
            },
            payment(){
                if(this.$store.state.carList.length>0){
                    alert('支付成功！');
                    this.$store.commit(Types.PAY_CART);
                }else{
                    alert('购物车为空！');
                }
            }
        },
        computed: {
            ...mapState(['carList']),
            ...mapGetters(['count']),
            ...mapGetters(['allPrice'])
        },
        components: {
            MHeader
        },
        filters:{
            toFixed(price){
                if(isNaN(price)) return;
                return '￥'+ price.toFixed(2);
            }
        }
    }
</script>


<style scoped lang="less">
    .MHeader{
        position:absolute;
        top:0;
        left:0;
        z-index:101;
    }

    .wrap{
        padding:10px;
        li{
            margin-bottom:10px;
            border-bottom:1px solid #ddd;
            padding:10px 0 15px 0;
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
            .count{
                float:left;
                width:70%;
                padding:10px;
                &:after{
                    content:"";
                    display:block;
                    clear:both;
                }
                .box{
                    display:block;
                    float:left;
                    width:50px;
                    /*background:#F0F0F0;*/
                    text-align:center;
                    color:#999999;
                    /*height:30px;*/
                    /*line-height:30px;*/
                    /*border:1px solid #ddd;*/
                    &.btn{
                        width:20px;
                        height:20px;
                        border-radius: 50%;
                        line-height:20px;
                        background:#F0F0F0;
                    }
                    &.num{
                        width:45px;
                        border-left:1px solid #F8F9F9;
                        border-right:1px solid #F8F9F9;
                    }
                    &.cancel{
                        float:right;
                        position:relative;
                    }
                }
                .itemPrice{
                    /*width:30%;*/
                    background:#F8F9F9;
                    border-color:transparent;
                    color:red;
                    margin-left:10px;
                }
            }
        }
        .checkout{
            /*background:pink;*/
            width:95%;
            padding:10px 0;
            margin-top:-10px;
            border-bottom:none;
            line-height:38px;
            .all{
                color:#FB4741;
                font-size:20px;
            }
            .pay{
                display:block;
                float:right;
                background:#FB4741;
                color:white;
                font-size:18px;
                width:80px;
                text-align:center;
                padding:10px;
                height:18px;
                line-height: 22px;
            }
        }
    }
</style>
