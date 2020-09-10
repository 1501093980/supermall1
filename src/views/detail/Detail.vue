<template>
    <div id="detail">
        <DetailNavbar class="detail-navbar" @titleClick="  titleClick" ref="nav"/>
        <Scroll class="content" ref="scroll" @scroll="contentScroll" :probe-type="3">
            <DetailSwiper :top-images="topImages"/>
            <DetailBaseInfo :goods="goods"/>
            <DetailShopInfo :shop="shop"/>
            <DetailGoodsInfo :detail-info="detailInfo" @imageLoad="imageLoad"/>
            <DetailParamInfo :param-info="paramInfo" ref="params"/>
            <DetailCommentInfo :comment-info="commentInfo" ref="comment"/>
            <Goodslist :goods="recommends" @imageLoad="imageLoad" ref="recommend"/>
        </Scroll>
        <back-top @click.native="backClick" v-show="isShowBackTop"/>
        <DetailBottomBar @addCart="addToCart"/>
<!--        <Toast :message="message"  :show="show" />-->
    </div>

</template>

<script>
    import DetailNavbar from "./childComps/DetailNavbar";
    import DetailSwiper from "./childComps/DetailSwiper";
    import DetailBaseInfo from "./childComps/DetailBaseInfo";
    import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
    import DetailShopInfo from "./childComps/DetailShopInfo";
    import DetailCommentInfo from "./childComps/DetailCommentInfo";
    import Goodslist from "components/content/goods/Goodslist";
    import DetailBottomBar from "./childComps/DetailBottomBar";

    import Scroll from "components/common/scroll/Scroll";

    import {getDetail,Goods,Shop,getRecommend} from "network/detail";
    import DetailParamInfo from "./childComps/DetailParamInfo";
    import {GoodsParam} from "network/detail";
    import {itemListenerMixin} from "common/mixin";
    import {debounce} from "common/utils";
    import {backTopMixin} from "common/mixin";
    import {mapActions} from "vuex";

    // import Toast from "@/components/common/toast/Toast";


    export default {
        name: "Detail",
        components: {
            DetailParamInfo,
            DetailNavbar,
            DetailSwiper,
            DetailBaseInfo,
            DetailGoodsInfo,
            DetailShopInfo,
            DetailCommentInfo,
            Goodslist,
            Scroll,
            DetailBottomBar,
        },
        mixins: [itemListenerMixin, backTopMixin],


        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommends: [],
                themeTopYs: [],
                getThemeTopY: null,
                currentIndex: 0,
              // message:'',
              // show: false
            }
        },
        created() {
            // 1.保存传入的IDD
            this.iid = this.$route.params.iid
            // 2.根据IDD请求详细数据
            getDetail(this.iid).then(res => {
                //1.获取顶部的图片轮播数据
                console.log(res);
                const data = res.result
                this.topImages = data.itemInfo.topImages
                //2.获取商品信息
              this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
                //3.创建店铺信息的对象
                this.shop = new Shop(data.shopInfo);
                // 4.保存商品详情数据
                this.detailInfo = data.detailInfo
                // 5.获取参数的信息
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
                // 6.获取评论信息
                if (data.rate.cRate !== 0) {
                    this.commentInfo = data.rate.list[0]
                }

            })
            // 3.获取推荐信息
            getRecommend().then(res => {
                this.recommends = res.data.list
                // console.log(res);
            })

            // 4.给getThemeTopY赋值
            this.getThemeTopY = debounce(() => {
                this.themeTopYs = []
                this.themeTopYs.push(0)
                this.themeTopYs.push(this.$refs.params.$el.offsetTop)
                this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
                this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
                this.themeTopYs.push(Number.MAX_VALUE)

                // console.log(this.themeTopYs);
            }, 100)
        },
        mounted() {

        },
        destroyed() {
            this.$bus.$off('itemImgLoad', this.itemImgListener)
        },
        methods: {
          ...mapActions(['addCart']),
            imageLoad() {
                this.$refs.scroll.refresh()
                // 混入getThemeTopY
                this.getThemeTopY()
            },
            titleClick(index) {
                this.currentIndex = index
                this.$emit('titleClick', index)
                // console.log(index);
                this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
            },
            contentScroll(position) {
                // 1.获取Y值
                const positionY = -position.y
                let length = this.themeTopYs.length
                // hack做法
                for (let i = 0; i < length; i++) {
                    if (this.currentIndex !== i && (positionY >= this.themeTopYs[i]) &&
                        positionY < this.themeTopYs[i + 1])
                        // if(this.currentIndex !==i && ((i <= length - 1
                        //     && positionY >= this.themeTopYs[i]
                        //     && positionY < this.themeTopYs[i + 1])
                        //     || (i === length - 1 && positionY >= this.themeTopYs[i])))
                    {
                        this.currentIndex = i
                        // console.log(this.currentIndex);
                        this.$refs.nav.currentIndex = this.currentIndex
                    }
                }
                // 3.判断是否回到顶部
                // 混入listenShowBackTop(position)
                this.listenShowBackTop(position)
            },
            addToCart() {
                // 1.获取购物车需要展示的信息
                const product = {}
                // 2.对象信息
                product.image = this.topImages[0];
                product.title = this.goods.title;
                product.desc = this.goods.desc;
                product.price = this.goods.nowPrice;
                product.count = this.goods.count;
                product.iid = this.iid

                // 3.添加到Store中
              this.addCart(product).then(res => {
                // this.message = res
                // this.show = true
                //
                // setTimeout(() =>{
                //   this.show = false
                //   this.message = ''
                // },2000)

             this.$toast.show(res,2000)
                // console.log(this.$toast);
              })
                // this.$store.dispatch('addCart',product).then(res =>{
                //   console.log(res);
                // })

            },
        }
    }
</script>

<style scoped>
.detail-navbar {
    position: relative;
    z-index: 9;
    background-color: #ffffff;
}
#detail {
    position: relative;
    z-index: 9;
    background-color: #ffffff;
    height: 100vh;
}
    .content {
        height: calc(100% - 44px - 49px);
    }
</style>