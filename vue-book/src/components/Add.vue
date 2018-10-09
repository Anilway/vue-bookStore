<template>
    <div>
        <MHeader>添加图书</MHeader>
        <div class="mask">
            <div class="bookMsg">
                <label for="bookName">图书书名：</label><input id="bookName" type="text" v-model="book.bookName"><br>
                <label for="bookInfo">图书简介：</label><input  id="bookInfo" type="text" v-model="book.bookInfo"><br>
                <label for="bookPrice">图书价格：</label><input id="bookPrice" type="text" v-model.number="book.bookPrice"><br>
                <label for="cover">图书封面：</label><input id="cover" type="text" v-model="book.bookCover"><br>
            </div>
            <button @click='add'>添加到数据库</button>
        </div>
    </div>
</template>


<script>
    import MHeader from '../base/MHeader.vue';
    import {addBook} from "../api";
    export default {
        data() {
            return {
                book:{}
            }
        },
        created(){
            document.title=this.$route.meta.title;
        },
        methods: {
            async add(){ // 添加图书信息
                let flag=false;
                for (var key in this.book) {
                    if (this.book.hasOwnProperty(key)) {
                       this.book[key]!==null?flag=true:null;
                    }
                }
                if(!flag){
                    alert("不能为空");
                    return
                };
                await addBook(this.book);
                this.$router.push('/list'); // 修改完成后转跳回列表页
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
        position:fixed;
        top:40px;
        bottom:60px;
        left:0;
        font-size:18px;
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
        box-shadow: 0 0 10px;
    }
    .bookMsg{
        /*background:pink;*/
        padding:10px 25px;
        border-top: 1px solid #bcbcbc;
        border-bottom: 1px solid #bcbcbc;
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
    button{
        width:150px;
        margin-top:10px;
        position:relative;
        left:50%;
        border-color:transparent;
        font-size:18px;
        padding:5px;
        border-radius:38px;
        background:#5DCAAD;
        color:white;
    }

</style>
