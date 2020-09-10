<template>
   <div class="goods">
      <!--    eslint-disable-next-line-->
      <GoodslistItem v-for="item in goods" :goods-item="item"/>
   </div>
</template>

<script>
   import GoodslistItem from "./GoodslistItem";
    export default {
        name: "Goodslist",
       components: {
           GoodslistItem
       },
       props: {
          goods: {
             type: Array,
             default() {
                return []
             }
          }
       }
    }
</script>

<style scoped>
.goods {
   display: flex;
   flex-wrap: wrap;
   justify-content: space-around;
   padding: 2px;
}
</style>