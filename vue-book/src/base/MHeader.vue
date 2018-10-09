<template>
    <div class="mHeader">
        <i v-if="show" class="iconfont icon-fanhui1 back" @click="goBack"></i>
        <slot>页头</slot>
    </div>
</template>


<script>
    export default {
        data() {
            return {}
        },
        props:{
            show:{
                type:Boolean,
                default:false
            }
        },
        methods: {
            goBack(){
                this.$router.go(-1);
            }
        },
        computed: {},
        components: {}
    }
</script>


<style scoped lang='less'>
    .mHeader{
        width:100%;
        height:40px;
        background:#2C2C2E;
        color:white;
        text-align:center;
        line-height:40px;
        font-size:20px;

        .back{
            position:absolute;
            font-size:20px;
            left:10px;
        }
    }
</style>