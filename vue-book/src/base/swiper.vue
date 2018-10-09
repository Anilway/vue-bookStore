<template>
    <swiper :options="swiperOption">
        <swiper-slide v-for="(slide, index) in swiperSliders" :key="index">
            <img :src="slide" width="100%">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
    export default {
        name: 'carousel',
        props:['swiperSliders'],
        data() {
            return {
                swiperOption: {
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    autoplay:{
                        delay:1000
                    },
                    setWrapperSize:true,
                    observerParents:true
                }
            }
        },
        mounted() {
            // setInterval(() => {
            //     console.log('simulate async data')
            //     if (this.swiperSlides.length < 10) {
            //         this.swiperSlides.push(this.swiperSlides.length + 1)
            //     }
            // }, 3000)
        }
    }
</script>