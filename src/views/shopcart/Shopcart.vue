<template>
  <div>
<!--    1.导航模块-->
    <Navbar class="nav-bar">
      <div slot="center">购物车({{cartLenght}})</div>
<!--      <cart-list class="cart-list" :cart-list="cartList">{{cartlist}}</cart-list>-->
    </Navbar>
<!--    2.商品展示模块-->
    <Cartlist/>
<!--    3.计算模块-->
    <CartBottonBar />
  </div>
</template>

<script>
  import Navbar from "components/common/navbar/Navbar";
  import Cartlist from "./childComps/Cartlist";
  import CartBottonBar from "./childComps/CartBottonBar";
  import {mapGetters} from "vuex";

  export default {
    name: "categroy",
    components: {
      Navbar,
      Cartlist,
      CartBottonBar


    },
    computed: {
        ...mapGetters(['cartList','cartLenght'])
    }


  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: white;

  }

</style>
