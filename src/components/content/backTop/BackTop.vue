<template>
    <div class="back-top" @click="backClick">
        <img src="~assets/img/common/top.png" alt="">
    </div>
</template>

<script>
    export default {
        name: "BackTop",
        methods: {
            backClick() {

            }
        }
    }
</script>

<style scoped>
.back-top {
    position: fixed;
    right: 8px;
    bottom: 58px;
}
    .back-top img {
        width: 43px;
        height: 43px;
    }
</style>