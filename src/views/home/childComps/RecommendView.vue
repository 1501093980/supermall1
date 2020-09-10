<template>
    <div class="recommend">
        <!--eslint-disable-next-line-->
        <div v-for="item in recommends" class="recommend-item">
            <a v-bind:href="item.link">
                <img v-bind:src="item.image" alt="">
                <div class="title">{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RecommendView",
        props: {
            recommends: {
                type: Array,
                default() {
                    return []
                }
            }
        }
    }
</script>
<style scoped>
    .recommend{
        display: flex;
        width: 100%;
        text-align: center;
        font-size: 12px;
        padding: 10px 0 20px ;
        border-bottom: 8px solid #888;
    }
    .recommend-item {
        flex: 1;
        width: 100%;
    }
    .recommend img {
        width: 70px;
        height: 70px;
    }
    .recommend .title {
        padding-top: 15px;
    }



</style>