<template>
    <div class="footer">
        <router-link class="link" to="/home">
            <i class="iconfont icon-home"></i>
            <div>首页</div>
        </router-link>
        <router-link class="link" to="/list">
            <i class="iconfont icon-liebiao"></i>
            <div>列表</div>
        </router-link>
        <router-link class="link" to="/collect">
            <i class="iconfont icon-gouwuche"></i>
            <div>购物车</div>
        </router-link>
        <router-link class="link" to="/add">
            <i class="iconfont icon-add_icon"></i>
            <div>添加</div>
        </router-link>
    </div>
</template>


<script>
    export default {
        data() {
            return {}
        },
        methods: {},
        computed: {},
        components: {}
    }
</script>


<style scoped lang="less">
    .footer{
        width:100%;
        height:40px;
        background:#2C2C2E;
        position:fixed;
        left:0;
        bottom:0;
        padding:10px 0;
        box-shadow:0 0 10px;
    }
    .tab:after {
        content: "";
        display:block;
        clear:both;
    }
    .link{
        float:left;
        width:25%;
        text-align:center;
        text-decoration:none;
        color:#747476;
    }
    .link i{
        font-size:20px;
    }
    a.router-link-active{
        color:white;
    }
</style>