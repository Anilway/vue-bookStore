<template>
    <div>
        <MHeader :show="true" class="MHeader">图书详情</MHeader>
        <div class="mask">
            <img id="bookCover" :src="book.bookCover" width=40%><br>
            <div class="bookMsg">
                <label for="bookName">图书书名：</label><input id="bookName" type="text" v-model="book.bookName"><br>
                <label for="bookInfo">图书简介：</label><input  id="bookInfo" type="text" v-model="book.bookInfo"><br>
                <label for="bookPrice">图书价格:</label><input id="bookPrice" type="text" v-model.number="book.bookPrice"><br>
            </div>
            <div class="handel">
                <button @click='remove(book.bookId)'>从数据库删除</button>
                <button @click='update'>确认修改</button>
            </div>
        </div>
    </div>
</template>


<script>
    import MHeader from '../base/MHeader.vue';
    import {findOneBook,updateBook,removeBook} from "../api";

    export default {
        data() {
            return {
                book:{}
            }
        },
        watch:{
            $route(){
                this.getData();
            }
        },
        created(){
          this.getData();
        },
        methods: {
            async update(){ // 点击修改图书信息
                await updateBook(this.uid,this.book);
                this.$router.push('/list'); // 修改完成后转跳回列表页
            },
            async getData(){
               var {data} = await findOneBook(this.uid);
               this.book=data;
               // 如果是空对象，需转跳回列表页
               Object.keys(this.book).length>0?void 0:this.$router.push("/list");
            },
            async remove(id){
                let flag=confirm('确定要删除吗？');
                if(!flag)return;
                await removeBook(id); // 删除某一项
                this.$router.push('/list');
            }
        },
        computed: {
            uid(){
                return parseInt(this.$route.params.uid);
            }
        },
        components: {
            MHeader
        }
    }
</script>


<style scoped>
    .mask{
        width:100%;
        background:#F7F7F7;
        position:absolute;
        margin-top:40px;
        top:0;
        bottom:0;
        left:0;
        z-index:100000;
        font-size:18px;
        /*overflow:auto;*/
    }
    .MHeader{
        position:absolute;
        top:0;
        left:0;
        z-index:101;
    }
    #bookCover{
        display:block;
        margin:20px auto;
        position:relative;
        box-shadow:1px 2px 4px rgba(0,0,0,.3);
    }
    .bookMsg{
        /*background:pink;*/
        padding:10px 25px;
        border-top: 1px solid #bcbcbc;
        border-bottom: 1px solid #bcbcbc;
        margin-top:-20px;
    }
    label,input{
        margin:10px 0;
    }
    label{color:#8e8e8e}
    input{
        height:24px;
        border:1px solid transparent;
        padding:5px;
        border-radius:5px;
        font-size:16px;
        color:#68ABB7;
        width:95%;
        font-weight: bold;
        box-shadow: 0 0 3px #8e8e8e inset;
    }
    .handel{
        /*background:pink;*/
        text-align: center;
    }
    button{
        width:150px;
        margin-top:10px;
        position:relative;
        /*left:50%;*/
        border-color:transparent;
        font-size:18px;
        padding:5px;
        border-radius:38px;
        background:#5DCAAD;
        color:white;
    }



</style>
