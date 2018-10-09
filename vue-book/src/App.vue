<template>
  <div id="app">
      <!--需要缓存的页面-->
      <transition name="fadeIn">
        <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
      </transition>
      <!--不需要缓存的页面-->
      <transition name="fadeIn">
          <router-view v-if="!$route.meta.keepAlive"></router-view>
      </transition>
        <Tab></Tab>
  </div>
</template>

<script>
    import Tab from './base/Tab.vue';
    export default {
        name: 'App',
        components:{
           Tab
        }
    }
</script>

<style>
    ul,li,h1,h2,h3,h4,h5,h6,p{margin:0;
        padding:0;}
    input,button{
        -webkit-appearance:none;
    }
    .wrap{
        position:fixed;
        top:40px;
        bottom:40px;
        width:100%;
        overflow: auto;
        background:#F8F9F9;
    }
    ul,li{list-style: none;}

    .fadeIn-enter{opacity:0;}
    .fadeIn-enter-active{transition:all 0.3s linear;}
    .fadeIn-leave-active{transition:all 0.3s linear;opacity:0;}
</style>
