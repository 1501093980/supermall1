import {debounce} from "./utils.js";
import BackTop from "components/content/backTop/BackTop";
import {BACKTOP_DISTANCE} from "common/const";
export const itemListenerMixin = {
    data() {
        return {
            itemImglistener : null,
            newRefresh : null
        }
    },
    mounted() {
       this.newRefresh = debounce(this.$refs.scroll.refresh,100)
        this.itemImglistener = () => {
         this.newRefresh()
        }
        this.$bus.$on('itemImgload',this.itemImglistener)
        // console.log('我是混入内容');
    }
}
export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false,
        }
    },
    methods: {
        backClick() {
            this.$refs.scroll.scrollTo (0,0,500)
        },
        listenShowBackTop(position) {
            this.isShowBackTop = -position.y > BACKTOP_DISTANCE
        }

    }
}