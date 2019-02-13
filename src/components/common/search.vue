<template>
	 <!--搜索框-->
	 <div class="index-search-wrap flex flex-r flex-align-center">
      <a  @click="com.targetMt('index',true)">
          <img class="logo-img" src="../../assets/img/logo.png" />
      </a>
	    <div class="index-search-box flex-1">
            <em v-if="isSearchIcon"></em>
            <input type="text" v-model="searchVal" @focus="isSearchIcon = false"
            @blur="!searchVal.trim() ? isSearchIcon = true : isSearchIcon = false"/>
        <span class="index-search" @click="userSearchMt"> 搜索</span>
      </div>
      <div class="shopcart-small-box" ref="myShopCar">
        <div class="shopcarts-wrap-box">
          <div class="cart-wrapper-div"><i>我的购物车</i><b class="shopcart-num">{{checkGoods}}</b></div>
          <!-- 购物车商品 -->
          <template v-if="carsList.length">
            <div class="shopcart-now-wrap" style="display:none;">
              <h4>最近加入购车</h4>
              <div class="shopcart-list-box" v-for="(goods,index) in carsList" :key="goods.id">
                <div class="shopcart-img">
                  <a @click="com.targetMt(goods.goodsUrl,true)"><img :src="goods.goodsImage"></a>
                </div>
                <div class="shopcart-text">
                  <a @click="com.targetMt(goods.goodsUrl,true)" :title="goods.goodsName"><p>{{goods.goodsName}}</p></a>
                </div>
                <div class="shopcart-edit">
                  <p><span>¥</span><span>{{goods.price}}</span><span>X{{goods.goodsNum}}</span></p>
                  <span class="detele-shopcart-list" @click="delGoodsMt(index)">删除</span>
                </div>
              </div>
              <div class="shopcart-allprice">
                <span>共<b>{{checkGoods}}</b>件商品</span>
                <span>共计¥ <b>{{calcTotalPrice}}</b>元</span>
                <a  @click="com.targetMt('carts_index',true)">去购物车</a>
              </div>
            </div>
          </template>
          <!-- 购物车商品为空 -->
          <template v-else>
            <div class="shopcart-now-wrap" style="display:none;">
              <p class="no-goods"><img src="../../assets/img/no-goods.png"> <span>购物车内空空如也,赶紧去淘一些塞满它</span></p>
            </div>
          </template>
        </div>
      </div>
	  </div>
</template>

<script>
	export default {
		data () {
			return {
         isSearchIcon:true,
         searchVal:'',
         searchAddress:'search_list',//搜索地址
         shopGoodsDetail: "goods_detail",//商品详情
         carsList:[],
         checkGoods:0
			}
		},
    methods: {
      userSearchMt () {//用户搜索
        let self = this;

        if(vm.$dash.trim(self.searchVal)){
            vm.com.targetMt('index',true,'?keyWord='+vm.$dash.trim(self.searchVal))
        }else{
          self.$message({
            message:'不能为空',
            type:'warning',
            duration:1000
          })
        }
      },
      getcartsListMt() { //获取购物车
        let self = this;
        // self.$$.ajax({
        //   url: '/api/carts_index',
        //   type: 'POST',
        //   dataType: 'JSON',
        //   success: function(res) {
        //     self.carsList  = res[0]['goods'];

        //     self.carsList.forEach(function(carts) {
        //       self.$set(carts, 'goodsUrl', self.shopGoodsDetail + '?id=' + carts.id);
        //     })
        //   },
        //   error: function(res) {
        //     console.log(res);
        //   }
        // })
      },
      delGoodsMt(index) { //商品删除
        let self = this;

        // self.$$.ajax({
        //   url: '/api/carts_del',
        //   success: function(res) {
        //     self.$nextTick(function() {
        //       self.carsList.splice(index, 1);
        //     })
        //   },
        //   error: function(res) {
        //     console.log(res);
        //   }
        // })
      }
    },
    computed:{
      calcTotalPrice() {
        let self = this,
        price = 0;
        self.checkGoods = 0;

        if (Object.prototype.toString.call(self.carsList) == "[object Array]" && self.carsList.length) {
           self.carsList.forEach(function(item, goodsIndex) {
            if (item.isChecked) {
              // if(!item.isInvalid){
              //    price += item.price * item.goodsNum;
              // }
               price += item.price * item.goodsNum;
              self.checkGoods = self.checkGoods + 1;
            }
          })
        }

        return price;
      }
    },
    mounted () {
      let self = this;
      self.getcartsListMt();
    }
	}
</script>

<style scoped>
.logo-img{
  margin-right:120px;
}
  /*首页搜索栏*/
  .wrap-border{border:1px solid #dcdcdc;margin-bottom:10px}
  .index-search-wrap{height:102px;margin:0 auto;background:#FFF;clear:both}
  .index-search-box{position:relative;width:calc(100% - 130px);height:38px;line-height:38px;border:2px solid #dd2727}
  .index-search-box a{color:#818181;text-decoration:none}
  .index-search-box a:hover{text-decoration:none;color:#d71f1b}
  .index-search-box a:visited{text-decoration:none}
  .index-search-box em,.top-search em{width:16px;height:16px;position:absolute;top:10px;left:10px;background:url(../../assets/img/index-search.png) no-repeat center center}
  .index-search-box input{display:block;float:left;width:360px;height:36px;text-indent:15px;outline:0;border:0;background:0 0}
  .index-search{width:130px;height:40px;line-height:40px;color:#FFF;text-align:center;font-size:18px;background:#dd2727;
  position:absolute;right:0;top:0;}
  .index-search:hover{cursor:pointer}
  .index-search-box ul{margin:0}
  .index-search-box li{float:left;padding:0 7px;color:#818181}

  /*购物车*/
  .shopcart-small-box{position:relative;width:200px;height:40px;z-index:300;line-height:40px;text-align:center;cursor:pointer;margin-left:120px;}
  .shopcart-small-boxposition{margin:5px 0 0 21px!important}
  .cart-wrapper-div{position:relative;z-index:100;width:100%;height:100%;border:1px solid #e6e7e8;background:#fff url(../../assets/img/shopcart-img.png) no-repeat 42px center}
  .shopcarts-wrap-box:hover .cart-wrapper-div{border-bottom-color:transparent}
  .shopcarts-wrap-box:hover .shopcart-now-wrap{display:block !important}
  .shopcart-small-box i{display:inline-block;margin-left:30px}
  .shopcart-small-box b.shopcart-num{display:inline-block;min-width:18px;min-height:18px;line-height:18px;margin-left:5px;text-align:center;font-size:12px;color:#fff;border-radius:50%;background:#dd2727}
  .shopcart-now-wrap{position:absolute;top:40px;left:-110px;z-index:0;width:310px;overflow:hidden;text-align:left;border:1px solid #e6e7e8;background:#fff}
  .shopcart-now-wrap .no-goods{height:40px;line-height:40px;border:none!important;width:262px!important;margin:22px auto!important}
  .shopcart-now-wrap .no-goods img{display:block;float:left;width:40px;height:40px;margin-right:14px}
  .shopcart-now-wrap .no-goods span{display:block;float:left;font-size:12px;color:#666!important}
  .shopcart-now-wrap h4{height:34px;padding:0 10px;line-height:34px;font-size:12px;color:#222;margin:0!important}
  .shopcart-list-box{width:auto;height:72px;padding:10px;border-bottom:1px solid #e6e7e8}
  .shopcart-list-box div{display:block;float:left}
  .shopcart-img{width:52px;height:52px;border:1px solid #ddd}
  .shopcart-img img{width:100%;height:100%;background:#000}
  .shopcart-text{width:120px;margin-left:10px}
  .shopcart-text a:hover p{color:#dd2d3a}
  .shopcart-text a:hover{text-decoration:none}
  .shopcart-text p{margin:0;padding:0;line-height:18px;font-size:12px;color:#666;width:100%;border:none!important;white-space:nowrap;-ms-text-overflow:ellipsis;text-overflow:ellipsis;overflow:hidden}
  .shopcart-edit{padding:0;float:right!important;text-align:left}
  .shopcart-edit p{margin:0;padding:0;line-height:14px;height:14px;font-size:12px;border:none!important}
  .shopcart-edit p span{margin:0;padding:0;color:#666}
  .detele-shopcart-list{float:right;font-size:12px;line-height:20px;color:#666;cursor:pointer}
  .shopcart-allprice{height:46px;padding:0 10px;line-height:46px;background:#f5f5f5}
  .shopcart-allprice span{display:inline-block;font-size:12px;color:#666}
  .shopcart-allprice span:nth-child(1){margin-right:10px}
  .shopcart-allprice b{font-weight:400}
  .shopcart-allprice a{float:right;width:68px;height:28px;margin-top:9px;font-size:12px;line-height:28px;text-align:center;color:#fff!important;background:#dd2727}
  .shopcart-allprice a:hover{color:#fff!important;text-decoration:none}
</style>