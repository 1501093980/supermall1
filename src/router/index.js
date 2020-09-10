import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import("../views/home/Home")

const Category = () => import( "../views/categroy/Categroy")
const Shopcart = () => import( "../views/shopcart/Shopcart")
const Message = () => import( "../views/message/Message")
const Profile = () => import( "../views/profile/Profile")
const Detail = () => import("../views/detail/Detail")

Vue.use(VueRouter)
const routes = [
  {
    path: '',
    redirect: '/home'
  }, {
    path: '/home',
    component: Home,
    meta: {
      title: '首页',
    },},
  {
    path: '/category',
    component: Category,
    meta: {
      title: '分类'
    },
  }, {
    path: '/message',
    component: Message,
    meta: {
      title: '消息'
    },
  }, {
    path: '/shopcart',
    component: Shopcart,
    meta: {
      title: '购物车'
    },
  }, {
    path: '/profile',
    component: Profile,
    meta: {
      title: '我的'
    },
  }, {
        path: '/detail/:iid',
        component: Detail,
        meta: {
            title: '详情页'
        }
    },
], router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'active'

}); //前置守卫
router.beforeEach((to, from, next) => {
    document.title = to.matched[0].meta.title
    // console.log(to);
    // console.log('++++');
    next()
});
//后置守卫


export default router

