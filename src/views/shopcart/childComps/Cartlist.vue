<template>
    <div class="cartlist">
        <Scroll class="content" ref="scroll">
                <!--eslint-disable-next-line-->
                <CartlistItem v-for="(item,index) in cartList"
                              :key="index"
                              :product="item"/>
        </Scroll>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import Scroll from "components/common/scroll/Scroll";
    import CartlistItem from "./CartlistItem";

    export default {
        name: "Cartlist",
        components: {
            Scroll,
            CartlistItem

        },
        computed: {
            ...mapGetters(['cartList'])
        },
        activated() {
          this.$refs.scroll.refresh
        }
    }
</script>

<style scoped>
    .cartlist {
        height: 100vh;

    }
    .content {
        height: calc(100% - 44px - 49px - 49px);
        overflow: hidden;
    }

</style>