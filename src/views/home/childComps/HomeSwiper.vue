<template>
    <div>
        <Swiper>
            <!--eslint-disable-next-line-->
            <swiper-item v-for="item in banners">
                <a :href="item.link">
                    <img :src=" item.image" alt="" @load="imageload">
                </a>
            </swiper-item>
        </Swiper>
    </div>

</template>

<script>
    import {Swiper,SwiperItem} from 'components/common/swiper'
    export default {
        name: "HomeSwiper",
        props: {
            banners: {
                type: Array,
                default() {
                    return[]
                }
            }
        },
        data() {
           return{
               isLoad: false
           }
        },
        components: {
            Swiper,
            SwiperItem
        },
        methods: {
            imageload() {
                if(!this.isLoad) {
                    this.$emit('swiperImageLoad')
                    this.isLoad = true
                }
            }
        }
    }
</script>

<style scoped>

</style>