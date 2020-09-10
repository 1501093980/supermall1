<template>
  <div id="home">
          <Navbar class="home-nav"><div slot="center">购物街</div></Navbar>
      <tab-control  :titles="['流行','新款','精选']"
                   @tabClick="tabClick"
                   ref="tabControl1"
                   class="tab-control" v-show="isTabFixed"/>
      <Scroll class="content"
              ref="scroll"
              :probe-type="3" @scroll="contentScroll"
              :pull-up-load="true"
              @pullingUp="loadMore">
          <HomeSwiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
          <RecommendView :recommends="recommends"/>
          <FeatureView class="feature"/>
          <tab-control :titles="['流行','新款','精选']"
                       @tabClick="tabClick"
                       ref="tabControl2"/>
          <Goodslist :goods="showGoods"/>
      </Scroll>
      <back-top @click.native="backClick" v-show="isShowBackTop"/>
    <router-view></router-view>
  </div>
</template>

<script>


  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import Navbar from "components/common/navbar/Navbar";
  import TabControl from "components/content/tabControl/TabControl";
  import Goodslist from "components/content/goods/Goodslist";
  import Scroll from "components/common/scroll/Scroll";

  import {getHomeMultidata,
      getHomeGoods
  } from "network/home";
  import {itemListenerMixin,backTopMixin} from "common/mixin";

  export default {
    name: "Home",
    components: {
      Navbar,
        HomeSwiper,
        FeatureView,
        RecommendView,
        TabControl,
        Goodslist,
        Scroll,
    },
      mixins: [itemListenerMixin,backTopMixin],
      data() {
        return {
            banners: [],
            recommends: [],
            goods: {
                'pop': {page: 0,list: []},
                'new': {page: 0,list: []},
                'sell': {page: 0,list: []},
            },
            currentType: 'pop',
            tabOffsetTop: 0,
            isTabFixed: false,
            savaY: 0,
        }
      },
      computed: {
        showGoods() {
            return this.goods[this.currentType].list
        },
      },
      destroyed() {

      },
      activated () {
          this.$refs.scroll.scrollTo(0, this.savaY, 0)
          this.$refs.scroll.refresh()
      },
      deactivated() {
        // 1.保存Y值
        this.savaY = this.$refs.scroll.getScrollY()
          // console.log(this.savaY);
        // 2.取消全局事件的监听
          this.$bus.$off('itemImgLoad',this.itemImgListener)
      },
      created() {
          //1.请求多个数据
          this.getHomeMultidata()
        //2.请求商品数据
          this.getHomeGoods('pop')
          this.getHomeGoods('new')
          this.getHomeGoods('sell')

      },
      mounted() {
          // 3.手动代码点击一次
          this.tabClick(0)

      },
      methods: {
        // 事件监听相关的方法

          tabClick(index) {
              // console.log(index)
             switch (index) {
                 case 0:
                     this.currentType = 'pop'
                     break
                 case 1:
                     this.currentType = 'new'
                     break
                 case 2:
                     this.currentType = 'sell'
                     break
             }

                 this.$refs.tabControl1.currentIndex = index
                 this.$refs.tabControl2.currentIndex = index

          },

          contentScroll(position){

           // 混入  listenShowBackTop(position)
           this.listenShowBackTop(position)
              // 2.决定tabControl是否吸顶(position: fixed)
              this.isTabFixed = (-position.y) > this.tabOffsetTop
          },

          loadMore() {
              this.getHomeGoods(this.currentType)
              // 重新计算高度，自动加载刷新图片
              this.$refs.scroll.refresh
          },
          swiperImageLoad() {
              this.tabOffsetTop =this.$refs.tabControl2.$el.offsetTop;
          },
        // 网络请求相关的方法
        getHomeMultidata() {
            getHomeMultidata().then(res => {
              console.log(res);
              this.banners = res.data.banner.list;
                this.recommends = res.data.recommend.list;
            })
        },
          getHomeGoods(type) {
            // 1.获取页码
              const page = this.goods[type].page + 1
              // 2.发送网络请求
              getHomeGoods(type, page).then(res => {
                  // 3.取出数据
                  this.goods[type].list.push(...res.data.list)
                  this.goods[type].page += 1
                  console.log(type)

                  this.$refs.scroll.finishPullUp()
              })
          }
      }
  }
</script>


<style scoped>
#home {
  /*padding-top: 44px;*/
    height: 100vh;
    position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: white;
  /*position: fixed;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*  top: 44;*/
  /* z-index: 10;*/

}

.content {
    position: absolute;
    overflow: hidden;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
}
.tab-control {
    position: relative;
    z-index: 10;
}
    /*.content {*/
    /*    height: calc(100% - 93px);*/
    /*    overflow: hidden;*/
    /*    margin-top: 44px;*/
    /*}*/
</style>
