<template>
    <div id="main-tab-bar">
      <tab-bar>
        <tab-bar-item path="/home" active-color="#c70000">
          <img slot="item-icon" src="~assets/img/tab-bar/home.png" alt="">
          <img slot="item-icon-active" src="~assets/img/tab-bar/home-active.svg" alt="">
          <div slot="item-text">首页</div>
        </tab-bar-item>
        <tab-bar-item path="/category" active-color="#c70000">
          <img slot="item-icon" src="~assets/img/tab-bar/category.png" alt="">
          <img slot="item-icon-active" src="~assets/img/tab-bar/categroy-active.svg" alt="">
          <div slot="item-text">分类</div>
        </tab-bar-item>
        <tab-bar-item path="message" active-color="#c70000">
          <img slot="item-icon" src="~assets/img/tab-bar/message.png" alt="">
          <img slot="item-icon-active" src="~assets/img/tab-bar/message-active.svg" alt="">
          <div slot="item-text">消息</div>
        </tab-bar-item>
        <tab-bar-item path="shopcart" active-color="#c70000">
          <img slot="item-icon" src="~assets/img/tab-bar/shop-cart1.png" alt="">
          <img slot="item-icon-active" src="~assets/img/tab-bar/shop-cart-active.svg" alt="">
          <div slot="item-text">购物车</div>
        </tab-bar-item>
        <tab-bar-item path="/profile" active-color="#0055ff">
          <img slot="item-icon" src="~assets/img/tab-bar/profile.png" alt="">
          <img slot="item-icon-active" src="~assets/img/tab-bar/profile-active.svg" alt="">

          <div slot="item-text">我的</div>
        </tab-bar-item>
      </tab-bar>
    </div>
</template>

<script>
    import TabBar from "components/common/tabbar/TabBar";
    import TabBarItem from "components/common/tabbar/TabBarItem";

    export default {
        name: "MainTabBar",
      components: {
        TabBar,
        TabBarItem
      }
    }
</script>

<style scoped>

</style>
