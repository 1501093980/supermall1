<template>
<div>
    <Navbar class="nav-bar">
      <div slot="center">购物车</div>
    </Navbar>
</div>
</template>

<script>
    import Navbar from "components/common/navbar/Navbar";

    export default {
      name: "categroy",
        components: {
          Navbar,
        },
        computed: {

        }
    }
</script>

<style scoped>
    .nav-bar {
        background-color: var(--color-tint);
        color: white;
        text-align: center;
    }

</style>
