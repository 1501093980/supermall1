<template >

        <div class="tabControl">
            <!--    eslint-disable-next-line-->
            <div v-for="(item, index) in titles"
                 class="tabControl-item"
                 :class="{active : index===currentIndex}"
                 @click="itemClick(index)">
                <span>{{item}}</span>
            </div>



        </div>


</template>

<script>
    export default {
        name: "TabControl",
        props: {
            titles: {
                type: Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                currentIndex: 0
            }
        },
        methods: {
            itemClick(index) {
                this.currentIndex = index;
                this.$emit('tabClick', index)
            }
        }
    }
</script>

<style scoped>
.tabControl {
    display: flex;
    text-align: center;
    font-face: 14px;
    height: 40px;
    line-height: 40px;
    background-color: #ffffff;
}
.tabControl-item {
    flex: 1;

}
.tabControl-item span{
    padding: 5px;
}

.active {
color: var(--color-high-text);

}
.active span {
    border-bottom: 3px solid var(--color-tint) ;
}
</style>