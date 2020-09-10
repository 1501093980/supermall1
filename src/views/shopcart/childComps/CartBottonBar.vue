<template>
    <div class="cart-btn-bar">
      <div class="check-content">
        <check-button class="check-button"
                      :is-checked="isSelectAll"
                      @click.native="checkChick"/>
        <span class="check-text">全选</span>
      </div>

      <div class="price">
        合计: <span style="color: red">{{totalPrice}}</span>
      </div>

      <div class="calculate"  >
        结算：({{checkLength}})
      </div>

    </div>
</template>

<script>
    import CheckButton from "@/components/content/checkButton/CheckButton";
    import {mapGetters} from "vuex";

    export default {
        name: "CartBottonBar",
      components: {
          CheckButton
        },
        computed: {
          ...mapGetters(['cartList']),
          totalPrice() {
            return  '￥'+ this.cartList.filter( item => {
              return  item.checked
            }).reduce((preValue, item) => {

              return preValue + parseFloat(item.price) * item.count
            },0).toFixed(2)
          },
          checkLength() {
            return + this.cartList.filter(item =>(item.checked)
            ).length
          },
          isSelectAll() {
            if(this.cartList.length === 0) return false
            // 1.普通遍历
            // for ( let item of this.cartList) {
            //   if(!item.checked) {
            //     return false
            //   }
            // }
            // return true

            // 2.使用filter
            return ! (this.cartList.filter(item => !item.checked).length)


            // // 3.使用find
            // return !(this.cartList.find( item =>! item.checked))

          }
        },
        methods: {
          checkChick() {
            if(this.isSelectAll) {// 全部选中
              this.cartList.forEach(item =>item.checked = false)
            } else {// 部分或全部不选中
              this.cartList.forEach(item =>item.checked = true)
            }
            // this.cartList.forEach(item =>item.checked =!this.isSelectAll)
          }
       },
      // calcClick() {
      //   if(!this.isSelectAll) {
      //     this.$toast.show('res',2000)
      //   }
      //     }

    }
</script>

<style scoped>
.cart-btn-bar {
  display: flex;
  position: fixed;
  width: 100%;
  bottom: 49px;
  left: 0;

  background-color: #f1e3e3;

  height: 50px;
  line-height: 50px;
  z-index: 1;
}
.cart-btn-bar .check-content{
  display: flex;
  align-items: center;
  margin-left: 10px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 20px;
}
.check-text {
  padding-left: 5px;
}
.cart-btn-bar .price {
  flex: 1;
  margin-left: 30px;
}
.cart-btn-bar .calculate {
  width: 60px;
  height: 40px;
  border-radius: 20px;
  background-color: #f54b08;
  flex: 1;
  margin-left: 15px;
  margin-top: 5px;
  margin-right: 3px;

  text-align: center;
  line-height: 40px;



}



</style>