<template>
    <div class="goods-item" @click="itemClick">
        <img v-lazy ="showImage" alt="" @load="imageload">
        <div class="goods-info">
            <p>{{goodsItem.title}}</p>
            <span class="price">￥{{goodsItem.price}}</span>
            <span class="collect">{{goodsItem.cfav}}</span>
<!--            cfav:收藏-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "GoodslistItem",
        props: {
            goodsItem: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        computed: {
           showImage () {
                return this.goodsItem.image || this.goodsItem.show.img
            }
        },
        methods: {
            imageload() {
                this.$bus.$emit('itemImageload')
                // if(this.$route.path.indexOf('/home')) {
                //     this.$bus.$emit('homeItemLoad')
                // } else if (this.$route.path.indexOf('/detail')) {
                //     this.$bus.$emit('detailitemImgload')
                // }
            },
            itemClick() {
                this.$router.push('/detail/' + this.goodsItem.iid)
                // this.$router.push('/detail')
                console.log('跳转详情页');
            }
        }
    }
</script>

<style scoped>
    .goods-item {
        padding-bottom: 40px;
        position: relative;
        width: 48%;
    }
    .goods-item img {
        width: 100%;

        border-radius: 5px;
    }
    .goods-info {
        font-size: 14px;
        position: absolute;
        bottom: 5px;
        left: 0;
        right: 0;
        overflow: hidden;
        text-align: center;

    }
     .goods-item .goods-info p {
        overflow: hidden ;
        text-overflow: ellipsis ;
        white-space: nowrap ;
        margin-bottom: 3px ;
         color: #ff5777;

    }
    .goods-info .price {
        color: var(--color-high-text);
        margin-right: 30px;



    }
  .goods-info .collect {
        position: relative;
    }

     .goods-item .goods-info .collect::before {
        content: '';
        position: absolute;
        left: -15px;
        top: 1px;
        width: 14px;
        height: 14px;
        background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
    }

</style>