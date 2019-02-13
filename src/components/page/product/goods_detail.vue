<template>
<div class="goods-detail">
        <v-head></v-head>
        <Vsearch></Vsearch>
	<!-- 店铺大图 -->
	<!-- <div class="mydet-img" style="background-color:#e4efff">
		<div style="background-image:url(https://img00.51myd.com/modules/shop/upload/20170615/merchant/20170615171816_594250d8d6067.png);"></div>
	</div> -->
	<div class="mydet-img" style="background-color:#e4efff">
		<div :style="'background-image:url('+sign+');background-repeat:no-repeat;background-size:cover;'" ></div>
	</div>
	<!-- 详情面包屑 -->
	<div class="w mydet-crumbs">
		 <div class="mydet-crumbs-wrap">
		 	<span class="span-pointer"  @click="com.targetMt('index',true)">首页</span>
		 	&nbsp;＞&nbsp;<span class="span-pointer" @click="com.targetMt('seller_goods_list',true,'?id=33')">店铺</span>
		 	&nbsp;＞&nbsp;<span>商品详情</span>
		 </div>
	</div>
	<!-- 商品详情 -->
	<div class="mydet-buygoods w clearfix">
		<!-- 图片 -->
		<div class="mydet-buygoods-imgs fl">
			<div class="mydet-goods-selectimg">
				<img :src="goodsImgUrl">
			</div>
			<ul class="mydet-buygoods-imgslist">
				<li v-for="(gItem,gIndex) in imagelist" :class="{active:imagelistActive[gIndex]}" @mouseover="hoverImgMt(gItem,gIndex)" :key="gIndex">
					<img :src="gItem">
				</li>
			</ul>
			<!-- <div class="mydet-goods-selectimg">
				<img :src="goodsImgUrl">
			</div>
			<ul class="mydet-buygoods-imgslist">
				<li v-for="(gItem,gIndex) in goods.goodsImg" :class="{active:gItem.active}" @mouseover="hoverImgMt(gItem)" :key="gIndex">
					<img :src="gItem.imageUrl">
				</li>
			</ul> -->
		</div>
		<!-- 商品选择操作 -->
		<div class="mydet-buygoods-handle fl ml20">
			<div class="mydet-buygoods-tit">{{goodsForm.name}}</div>
			<div class="mydet-buygoods-det">{{goodsForm.detail}}</div>
			<!-- 价格 -->
			<div class="mydet-buygoods-attr clearfix mydet-buygoods-pricebg">
				<div class="mydet-buygoods-key fl">价格</div>
				<div class="mydet-buygoods-value fl mydet-buygoods-price  clearfix">
					<b class="fl">¥ <i >{{goodsForm.price}}</i></b>
					<div class="mydet-buygoods-commentnum fr">
		                累计评论：
						<a href="javascript:void(0);" @click="commentLinkMt()">0</a>条
					</div>
				</div>
			</div>
			<div class="mydet-msgerror" :class="{active:isShwoMsgerror}">
				<div class="mydet-msgerro-tit" v-if="isShwoMsgerror">
					<span>请选择商品的完整信息</span>
					<b @click="isShwoMsgerror = false">x</b>
				</div>
				<!-- 颜色|尺寸 -->
				<!-- <template v-for="item in goods.attrList">
					<div class="mydet-buygoods-attr clearfix">
						<div class="mydet-buygoods-key fl">{{item.keyName}}</div>
						<div class="mydet-buygoods-value fl">
							<template v-for="(ch,chIndex) in item.attrVal">
								<span class="mydet-goodsattr-list" :class="{active:ch.active}" @click="selectGoodAttrMt(ch,item.attrVal)">{{ch.name}}</span>
							</template>
						</div>
					</div>
				</template> -->
				<!-- 数量操作 -->
				<div class="mydet-buygoods-attr clearfix">
					<div class="mydet-buygoods-key fl">数量</div>
					<div class="mydet-buygoods-value fl mydet-goods-num" style="width:120px;margin-top:-4px;">
						<a class="num-btn" href="javascript:void(0);" @click="goodsNum = parseInt(goodsNum) - 1">-</a>
						<input type="text" value="1" v-model="goodsNum">
						<a class="num-btn" href="javascript:void(0);" @click="goodsNum =  parseInt(goodsNum) + 1">+</a>
					</div>
					<div class="mydet-goods-stocks fl">
						<b>库存</b>
						<span>{{goodsForm.stocks}}</span>
						<b>件</b>
					</div>
				</div>
				<!-- 商品超过库存提示-->
				<div class="mydet-buygoods-attr clearfix" v-if="goodsNum > 100" style="position:relative;top:-20px">
					<div class="mydet-buygoods-key fl">&nbsp;</div>
					<div class="mydet-buygoods-value fl">
						<div class="mydet-cont-tip"><s></s>您所填写的商品数量超过库存！</div>
					</div>
				</div>
			</div>
		 	<!-- 购买 -->
		 	<div class="mydet-buygoods-attr clearfix" v-if="!isShwoMsgerror">
		 		<div class="mydet-buygoods-key fl">&nbsp;</div>
		 		<div class="mydet-buygoods-value fl mydet-goods-goshop" :class="{active:(goodsNum > 100)}">
		 			<template v-if="goodsNum > 100">
		 				<a class="mydet-goshop-btn one">立即购买</a>
		 				<a class="mydet-goshop-btn two position-one">加入购物车</a>
		 			</template>
		 			<template v-else>
		 				<a class="mydet-goshop-btn one" @click="goShopMt">立即购买</a>
		 				<a class="mydet-goshop-btn two position-one" @click="joinShopCarMt">加入购物车</a>
		 			</template>
		 			<span class="mydet-collect-goods">
		 				<a href="javascript:void(0)" @click="selectState.activeCollectGood = !selectState.activeCollectGood" :class="{activeCollectGood:selectState.activeCollectGood}">
		 					<i></i>
		 					收藏商品
		 				</a>
		 			</span>
		 		</div>
		 	</div>
		 	<!-- 是否下架 -->
		 	<!--  <div class="mydet-buygoods-attr clearfix">
		 		<div class="mydet-buygoods-key fl">&nbsp;</div>
		 		<div class="mydet-buygoods-value fl star">
		 			该商品已经下架
		 		</div>
		 	</div>-->
		</div>
	</div>
	<!-- 商品查看 -->
	<div class="mydet-shopmain flex flex-r">
		<!-- (商品查看)左 -->
		<div class="mydet-shopmain-left">
			<!-- 店铺 -->
			<div class="mydet-sort">
				<div class="mydet-sort-tit">
					<span>店铺</span>
				</div>
				<div class="mydet-sort-cont mydet-dianpu">
					<p class="mydet-dianpu-name">竹山蓝天官方旗舰店<i></i></p>
					<p class="mydet-dianpu-link clearfix">
						<a @click="enterStore">进店看看</a>
						<a style="margin-left:4px;" @click="selectState.activeCollectShop = !selectState.activeCollectShop" :class="{activeCollectShop:selectState.activeCollectShop}">收藏店铺</a>
					</p>
				</div>
			</div>
			<!-- 店内搜索 -->
			<div class="mydet-sort">
				<div class="mydet-sort-tit">
					<span>店内搜索</span>
				</div>
				<div class="mydet-sort-cont mydet-shop-search">
					<ul class="mydet-shop-name clearfix">
						<li class="fl mb10">商品名称</li>
						<input type="text" class="fl" v-model="shopName">
					</ul>
					<ul class="mydet-shop-price clearfix">
						<li class="fl mb10">价格</li>
						<div class="fl">
							<input type="text" v-model="userPrice.start">
							<span>-</span>
							<input type="text" v-model="userPrice.end">
						</div>
					</ul>
					<div class="mydet-search-btn txt-right" >
						<a @click.stop="searchShopMt">搜索</a>
						<a @click.stop="clearSearchMt">重置</a>
					</div>
				</div>
			</div>
			<!-- 商品分类 -->
			<div class="mydet-sort">
				<div class="mydet-sort-tit">
					<span>商品分类</span>
				</div>
				<template  v-for="(item,index) in categoryList">
					<div class="mydet-sort-cont mydet-shop-panner" style="padding:0;">
						<p @click="setCategoryListMt(item)">{{item.parentName}}<i></i></p>
						<transition name="slide-fade">
						<el-collapse>
							<ul v-show="item.active">
								<template v-for="(ch,chIndex) in item.childCategory">
									<li @click="selectCategoryMt(ch)">{{ch.name}}</li>
								</template>
							</ul>
						</el-collapse>
						</transition>
					</div>
				</template>
			</div>
		</div>
		<!-- (商品查看)右 -->
		<div class="flex-1">
			<div class="mydet-shopcont-top">
				<li @click="tabGoodsdetailMt('one')" :class="{active:(selectState.activeName == 'one' ? false : true)}">
	    			<span></span>
	    	         商品详情
	    		</li>
	    		<li  @click="tabGoodsdetailMt('two')" :class="{active:(selectState.activeName == 'two' ? false : true)}">
	    		   <span></span>
	    	         用户评价
	    		    <b>(22)</b>
	    	    </li>
	    		<li  @click="tabGoodsdetailMt('three')" :class="{active:(selectState.activeName == 'three' ? false : true)}">
	    			<span ></span>
	    	         店铺信息
	    		</li>
			</div>
			<div class="mydet-shopcont-bot">
				<!-- 商品详情 -->
				<div class="nav-show" v-if="selectState.activeName == 'one'">
					<ul class="item-list">
						<li class="item-box pc33">品牌：<b>{{brandName}}</b></li>
						<!-- <li class="item-box pc33">价格：<b>1-999</b></li>
						<li class="item-box pc33">功能：<b>长款</b></li>
						<li class="item-box pc33">人群：<b>男士</b></li>
						<li class="item-box pc33">材质：<b>真皮</b></li> -->
					</ul>
					<div class="goods-img-box" v-html="content">
			    		<!-- <p><img src="https://img02.51myd.com/uploads/ueditor/php/upload/image/20170729/1501306594418596.jpeg"></p>
			    		<p><img src="https://img02.51myd.com/uploads/ueditor/php/upload/image/20170729/1501306600150722.jpeg"></p> -->
				    </div>
				</div>
				<!-- 用户评论 -->
				<div class="nav-show" v-if="selectState.activeName == 'two'">
					<!-- 评分 -->
					<div class="detail-describe">
						<div class="detail-describe-left">
							<p>与描述相符</p>
							<p class="grade-show">{{grade}}</p>
							<div class="outbox-bj">
								<div class="innerbox-bj" :style="{width:(grade/5)}">
									<img src="http://www.51myd.com/modules/jifenbao/shop/img/dengji2.png">
								</div>
							</div>
						</div>
						<div class="detail-describe-line"></div>
						<div class="detail-describe-right">
							<div class="detail-describe-box">
								<div class="detail-describe-grade" :style="{left:'90%'}">{{grade}}</div>
								<ul>
									<li>1<span>非常差</span></li>
									<li>2<span>比较差</span></li>
									<li>3<span>一般</span></li>
									<li>4<span>满意</span></li>
									<li>5<span>很满意</span></li>
								</ul>
							</div>
						</div>
					</div>
					<!-- 评论列表 -->
				    <div class="user-reviews" v-for="(item,index) in 10">
				    	<div class="user-img">
				    		<img src="http://www.51myd.com/modules/jifenbao/shop/img/user-default.png">
				    		<div class="pj-name">王歆</div>
				    	</div>
				    	<p>此用户没有填写评价!</p>
				    	<h4 v-show="index % 2 == 0">
				    		<img src="https://img02.51myd.com/modules/shop/upload/2017/09/12/merchant/20170912122829_59b7626dad9d2.jpeg">
				    	</h4>
				    	<h6>2017-10-27 14:26:52</h6>
				    </div>
				</div>
				<!-- 店铺信息 -->
				<div class="nav-show" v-if="selectState.activeName == 'three'">
				     <ul class="shop-address-box">
						<li><label>所属行业：</label>{{store.categoryName}}</li>
						<li>
							<label>营业时间：</label>{{store.week}}
						</li>
						<li><label>店铺地址：</label>{{store.provinceName}} {{store.cityName}} {{store.areaName}}</li>
						<li><label>配送方式：</label>{{store.logisticsTypeName}}</li>
						<li><label>发票信息：</label>{{store.isInvoiceName}}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
    <!-- 滚动导航 -->
    <div class="shopdetail-fixbox" v-show="isShowGoodsNav">
    	<div class="w clearfix shopdetail-fixbox-wrap">
    	    <div class="shopdetail-fixbox-search fl"><input type="text"><button>搜索</button></div>
			<div class="mydet-shopcont-top fl" style="margin-top:0;border:none;">
				<li @click="tabGoodsdetailMt('one')" :class="{active:(selectState.activeName == 'one' ? false : true)}">
	    			<span></span>
	    	         商品详情
	    		</li>
	    		<li  @click="tabGoodsdetailMt('two')" :class="{active:(selectState.activeName == 'two' ? false : true)}">
	    		   <span></span>
	    	         用户评价
	    		    <b>(22)</b>
	    	    </li>
	    		<li  @click="tabGoodsdetailMt('three')" :class="{active:(selectState.activeName == 'three' ? false : true)}">
	    			<span ></span>
	    	         店铺信息
	    		</li>
			</div>
       </div>
    </div>
	<v-foot></v-foot>
</div>
</template>

<script>
import vHead from '../../common/vheader.vue'
import Vsearch from '../../common/search.vue';
import vFoot from '../../common/vfooter.vue'
import { Collapse } from 'element-ui'
export default {
	props:{
		goodsForm:Object,
		imagelist:Array,
		sign:String,
		content:String,
		brandName:String
	},
	components:{
		vHead,
		Vsearch,
		vFoot,
		'el-collapse':Collapse
	},
	data () {
		return {
			imagelistActive:[],//5张小图的active状态
			selectState:{
				activeName:'one',
				activeCollectGood:false,
				activeCollectShop:false
			},
			shopName:'',//店铺名称
			sortTypeNum:'',//排序类型 参数
			userPrice:{//价格 参数
			  start:'',
			  end:''
			},
			attrId:[],//属性参数
			isShwoMsgerror:false,//选择购买提示
			isShowGoodsNav:false,//是否显示导航
			goodsNum:1,
			grade:4.7,
			// goodsImgUrl:'',
		    goods:{
	    		goodsImg:[//商品图片
	    	       {imageUrl:'https://img00.51myd.com/modules/shop/upload/20170616/goods/20170616230937_5943f4b19f2d2.jpeg'},
	    	       {imageUrl:'https://img00.51myd.com/modules/shop/upload/20170616/goods/20170616230943_5943f4b7cf921.jpeg'}
	    	    ],
	    	    attrList:[{keyName:'颜色',attrVal:[{name:'黑色',id:123},{name:'黄色',id:432}]},{keyName:'尺码',attrVal:[{name:'38',id:33},{name:'39',id:44}]}]//属性列表
		    },
			store:{//店铺信息
			   name:'Mexican稻草人皮具',
			   login:true,//是否登录
			   storeId:2323,
			   isCollectMerchant:false,//是否收藏店铺
			   categoryName:'箱包',
			   week:'周一到周五',
			   provinceName:'湖南省',
			   cityName:'长沙市',
			   areaName:'开福区',
			   logisticsTypeName:'快递',
			   isInvoiceName:'不提供'
			},
			categoryList:[{"parentName":"皮带","childCategory":[{"name":"男士皮带","id":1},{"name":"女生皮带","id":2}]},{"parentName":"男士包","childCategory":[{"name":"钱包","id":3},{"name":"手提包","id":4}]}],//分类列表
		}
	},
	computed:{
		goodsImgUrl: function () {
			return this.imagelist[0]
		}
	},
	methods: {
	  getGoodsMt () {
		   let self = this;
		   if(self.imagelist.length>0){
				self.imagelist.forEach(function(val,index,arr){
					self.imagelistActive[index] = false
				})
				//默认设置第一张图片
				self.goodsImgUrl = self.imagelist[0];
				self.imagelistActive[0] = true
		   }
	  },
	  hoverImgMt (gitem,i) {
		  let self = this;
		  self.imagelistActive[0] = true
	  	self.imagelist.forEach(function(val,index,arr){
	  		self.imagelistActive[index] = false
	  	})
		self.imagelistActive[i] = true
	  	// vm.$set(gitem,'active',true);
	  	self.goodsImgUrl = gitem
	  },
	  selectGoodAttrMt (ch,item) {
	  	 let self = this;
	  	 
	  	 //属性选择状态判断
	  	 if(ch.active){
	  	 	ch.active = false;
	  	 }else{
	  	 	item.forEach(function(val,index,arr){
	  	 		val.active = false;
	  	 	})
	  	 	ch.active = true;
	  	 }

	  	 self.setAttrIdMt();
	  },
	  setAttrIdMt () {
	  	let self = this;

	  	self.goods.attrList.forEach(function(val,index,arr){
			  if(val.attrVal != "undefined"){
				vm.$dash.isArray(val.attrVal) && val.attrVal.forEach(function(chVal,chIndex,chArr){
					let idIndex = self.attrId.indexOf(chVal.id);

					if(chVal.active){
						idIndex == -1 && self.attrId.push(chVal.id);
					}else{
						idIndex > -1 && self.attrId.splice(idIndex,1);
					}
				})
			  }
      	})
	  },
	  tabGoodsdetailMt (activeName) {
	  	let self = this;
	  	self.selectState.activeName = activeName;
	  },
   	  motGoodsNavMt () {
	  	 let self = this;

	  	 vm.$$(window).on("scroll",function(){
	  	 	let h =  vm.$$(".mydet-shopmain").eq(0).offset().top;
	  	    if(vm.$$(document).scrollTop() >= h + 10){
	  	 		self.isShowGoodsNav = true;
	  	 	}else{
	  	 		self.isShowGoodsNav = false;
	  	 	}
	  	 })
      },
      getCategoryListMt () {
      	let self = this;

      	self.categoryList.forEach(function(val,index,arr){
      		vm.$set(val,'active',true);
      	})
      },
      setCategoryListMt (item) {
      	vm.$dash.isObject(item) ? item.active = !item.active : '';
      },
      enterStore () {
      	vm.com.targetMt('seller_goods_list',false,"?storeId="+23);
      },
      searchShopMt () {
      	let self = this,
      	    parm = "";

  	    if(vm.$dash.trim(self.shopName) || vm.$dash.trim(self.userPrice.start) || vm.$dash.trim(self.userPrice.end)){
  	    	 parm = "?shopName="+vm.$dash.trim(self.shopName)
  				+"&priceStart="+vm.$dash.trim(self.userPrice.start)
  				+"&priceEnd="+vm.$dash.trim(self.userPrice.end);
  	    }

      	vm.com.targetMt('seller_goods_list',false,parm);
      },
      selectCategoryMt (ch) {
      	let self = this,
      	    parm = "";
      	    parm += "?sortName=" + ch.id;

      	vm.com.targetMt('seller_goods_list',false,parm);
      },
      clearSearchMt () {
      	let self = this;

      	self.shopName = '';
      	self.userPrice.start = '';
      	self.userPrice.end = '';
      },
      commentLinkMt () {
      	let self = this,
      	h =  vm.$$(".mydet-shopmain").eq(0).offset().top;
  	    self.tabGoodsdetailMt('two');
  	    vm.$$(document).scrollTop(h);
      },
      goShopMt () {
      	let self = this,
			  attrList = self.goods.attrList;
		if(attrList != "undefined"){
			attrListLen = vm.$dash.isArray(attrList) && vm.$dash.keys(attrList).length || 0;
		}
        if(self.attrId.length != attrListLen){
        	self.isShwoMsgerror = true;
        }else{
        	self.isShwoMsgerror = false;
        	vm.com.targetMt('order_pay',false,'?id='+23);
        }
      },
      joinShopCarMt () {
    	let self = this,
			attrList = self.goods.attrList;
		if(attrList != "undefined"){
			attrListLen = vm.$dash.isArray(attrList) && vm.$dash.keys(attrList).length || 0;
		}
      	if(self.attrId.length != attrListLen){
      		self.isShwoMsgerror = true;
      	}else{
      		self.isShwoMsgerror = false;
      		vm.com.dynamicShopCar(vm.$$('.position-one'),vm.$$('.shopcart-small-boxpositionindex'),'https://img00.51myd.com/modules/shop/upload/20170616/goods/20170616230937_5943f4b19f2d2.jpeg')
      	}
      }
	},
	watch:{
		goodsNum: function(){
			let self = this;
		    (!(/^[0-9]+$/.test(self.goodsNum)) ||  self.goodsNum < 1) && (self.goodsNum = 1);
		}
	},
	mounted () {
		let self = this;
		self.getGoodsMt();
		self.getCategoryListMt();
		self.motGoodsNavMt();
	}
}
</script>

<style scoped>
/*==============================购买商品选择提示=============================================*/
.mydet-msgerror.active{margin-bottom:20px;padding-bottom:36px;border:1px solid #d71f1b}
.mydet-msgerror.active .mydet-msgerro-tit{width:100%;height:30px;line-height:30px;font-size:14px;text-indent:20px;background:rgba(250,228,227,1);border-bottom:1px solid #ccc}
.mydet-msgerror.active .mydet-msgerro-tit b{display:block;float:right;color:#d71f1b;cursor:pointer;text-indent:0;width:20px;text-align:center;font-weight:700;font-size:20px;line-height:25px;margin-right:2px}
/*==============================购买商品选择提示end==========================================*/

/*==============================商品导航切换=============================================*/
.shopdetail-fixbox{position:fixed;top: 0;left:0;width:100%;height:36px;background: #ffffff}
.shopdetail-fixbox-wrap{border:1px solid #dddddd;border-top:none}
.shopdetail-fixbox-search{position:relative;top:2px;border:1px solid #dddddd;top:5px;left:7px}
.shopdetail-fixbox-search input{display:inline-block;width: 118px; height: 100%; border: none; background: none}
.shopdetail-fixbox-search button{display:inline-block;width: 60px; height: 18px; line-height: 18px; font-size: 12px; text-align: center; border: none; background: #f5f5f5;color:#999}
/*==============================商品导航end=============================================*/

/*==============================(商品查看)左=============================================*/
.mydet-shopmain-left{width:192px;margin-right:8px}
.mydet-sort{border:1px solid #dcdcdc;margin-bottom:20px}
.mydet-sort-tit{height: 34px;line-height: 34px; font-size: 14px; text-indent: 10px;color: #222;background:#eeeeed;
border-bottom: 1px solid #dcdcdc}
.mydet-sort-cont{padding:10px}
/*店铺*/
.mydet-dianpu-name{font-size:12px;color: #222222;position:relative}
.mydet-dianpu-name i{display:inline-block;vertical-align:middle;width:18px;height:17px;margin-left:5px;cursor:pointer;
background:url(../../../assets/img/talk-icon.png) no-repeat 50% 50%}
.mydet-dianpu-link > a{display:block;float:left;width: 68px;height: 28px;line-height: 28px;font-size: 12px;text-align: center;color:#666666;border-radius: 3px;border: 1px solid #dcdcdc;cursor: pointer;background: #f5f5f5}
.mydet-dianpu-link > a:hover,.mydet-dianpu-link .activeCollectShop{border:1px solid #d71f1b;text-decoration: none;color: #dd2d3a;background: #ffffff}
/*店内搜索(名称)*/
.mydet-shop-search .mydet-shop-name{width:100%}
.mydet-shop-search .mydet-shop-name li{width:52px;margin-right:10px;font-size: 12px;color:#666666;font-weight:normal}
.mydet-shop-search .mydet-shop-name > input{width:90px;height: 20px;border:1px solid #dddddd}
/*店内搜索(价格)*/
.mydet-shop-search .mydet-shop-price{width:100%}
.mydet-shop-search .mydet-shop-price li{width:52px;margin-right:10px;font-size: 12px;color:#666666;font-weight:normal}
.mydet-shop-search .mydet-shop-price > div > input{width:45px;height: 20px;border:1px solid #dddddd}
.mydet-shop-panner > ul li:hover,.mydet-shop-panner > ul li.ch-active{color:#d71f1b;background:#f8f8f8}
/*店内搜索(搜索按钮)*/
.mydet-search-btn > a{display:inline-block;width:48px;height:24px;border-radius:2px;border:none;color:#ffffff;background:#dd2727;
text-align:center;font-size:12px;line-height:24px;text-decoration:none}
/*商品分类*/
.mydet-shop-panner > p{font-size:13px;padding:10px 10px 5px 10px;margin:0;position:relative;cursor:pointer}
.mydet-shop-panner > p > i{display:block;position:absolute;width:20px;height:20px;right:14px;top:7px;background:url(../../../assets/img/arrow.png) no-repeat 50% 50%}
.mydet-shop-panner > ul li{text-indent:10px;height:26px;line-height:26px;font-size:12px;color:#999;cursor:pointer}
/*===================================(商品查看)左end========================================*/

/*================================(商品查看)右===========================================*/
/*tap切换*/
.mydet-shopcont-top{height:35px;line-height:35px;margin:0px 15px;border:1px solid #dcdcdc;border-left:0}
.mydet-shopcont-top > li{position:relative;float:left;line-height:30px;width:120px;height:100%;text-align:center;
	border-right:1px solid #dcdcdc;cursor:pointer;background:#fff}
.mydet-shopcont-top > li label{color:#999;font-weight:400}
.mydet-shopcont-top > li:first-child{border-left:1px solid #dcdcdc}
.mydet-shopcont-top b{font-weight:400;color:#dd2d3a}
.mydet-shopcont-top > li span{display:block;position:absolute;top:0;left:0;width:120px;height:1px;background:#d71f1b}
.mydet-shopcont-top > li.active span{display:none !important}

/*商品详情展示*/
.mydet-shopcont-bot .nav-show li{padding-left:30px;line-height:32px;font-size:14px;color:#000}
.mydet-shopcont-bot .nav-show b{display:inline;color:#666;font-weight:400}
.mydet-shopcont-bot .goods-img-box {padding: 10px 15px; line-height: 1.8}
.mydet-shopcont-bot .goods-img-box img{width:100%}
.mydet-shopcont-bot .goods-img-box p{ height: auto!important}

/*评分*/
.mydet-shopcont-bot .detail-describe .detailimg-box{width:790px;height:400px;margin:10px auto;background:#ededed}
.detail-describe .outbox-bj{float:left;width:70px;height:12px;margin:0 43px 20px;background:url(../../../assets/img/dengji1.png) no-repeat center center}
.mydet-shopcont-bot .detail-describe .innerbox-bj{width:100%;height:100%;overflow:hidden}
.mydet-shopcont-bot .detail-describe .innerbox-bj img{display:block}
.mydet-shopcont-bot .detail-describe .innerbj-width0{width:0!important}
.mydet-shopcont-bot .detail-describe .innerbj-width20{width:20%!important}
.mydet-shopcont-bot .detail-describe .innerbj-width40{width:40%!important}
.mydet-shopcont-bot .detail-describe .innerbj-width60{width:60%!important}
.mydet-shopcont-bot .detail-describe .innerbj-width80{width:80%!important}
.mydet-shopcont-bot .detail-describe .detail-describe-left{float:left;width:155px;height:100%}
.mydet-shopcont-bot .detail-describe .detail-describe-left p:nth-child(1){margin-top:10px!important;font-size:12px;text-align:center;color:#666}
.mydet-shopcont-bot .detail-describe .detail-describe-left p:nth-child(2){font-size:34px;line-height:40px;text-align:center;font-weight:700;color:#dd2d3a}
.mydet-shopcont-bot .detail-describe .detail-describe-line{float:left;width:1px;height:56px;background:#ddd;margin:22px 0}
.mydet-shopcont-bot .detail-describe .detail-describe-right{float:left;height:100px}
.mydet-shopcont-bot .detail-describe .detail-describe-box{position:relative;width:430px;height:14px;margin:46px 0 0 70px;background:-moz-linear-gradient(left,#f9dadb 0,#e34c4c 100%);background:-webkit-gradient(linear,left left,right right,color-stop(0,#f9dadb),color-stop(100%,#e34b4c));background:-webkit-linear-gradient(left,#f9dadb 0,#e34b4c 100%);background:-o-linear-gradient(left,#f9dadb 0,#e34b4c 100%);background:-ms-linear-gradient(left,#f9dadb 0,#e34b4c 100%);background:linear-gradient(to right,#f9dadb 0,#e34b4c 100%)}
.mydet-shopcont-bot .detail-describe .detail-describe-grade{position:absolute;top:-28px;left:0;width:30px;height:20px;line-height:20px;font-size:12px;text-align:center;color:#fff;background:#dd2d3a}
.mydet-shopcont-bot .detail-describe .detail-describe-grade:after{position:absolute;bottom:-5px;left:10px;content:'';border-top:5px solid #dd2d3a;border-left:5px solid transparent;border-right:5px solid transparent}
.mydet-shopcont-bot .detail-describe .detail-describe-box ul{display:flex;width:100%;height:100%}
.mydet-shopcont-bot .detail-describe .detail-describe-box li{position:relative;flex:1;height:14px;padding-right:2px;line-height:14px !important;font-size:12px;text-align:right;color:#666}
.mydet-shopcont-bot .detail-describe .detail-describe-box li span{position:absolute;top:24px;right:-12px}

/*评论列表*/
.mydet-shopcont-bot .user-reviews{position:relative;width:100%;padding:30px 0 40px 156px;overflow:hidden}
.mydet-shopcont-bot .user-img{position:absolute;left:0;top:30%;width:156px;text-align:center}
.mydet-shopcont-bot .user-img img{width:56px;height:56px;margin:0 auto 5px;border:1px solid #DCDCDC;border-radius:50%;overflow:hidden}
.mydet-shopcont-bot .user-reviews p{display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;overflow:hidden;font-size:12px;line-height:20px;color:#666}
.mydet-shopcont-bot .user-reviews p:hover{color:#dd2727}
.mydet-shopcont-bot .user-reviews h4{width:100%;margin:5px 0;overflow:hidden}
.mydet-shopcont-bot .user-reviews h4 img{width:78px;height:78px;margin-right:5px}
.mydet-shopcont-bot .user-reviews h6{text-align:left;font-size:12px;line-height:20px;color:#666}

/*店铺信息*/
.mydet-shopcont-bot .goodsdetail-nav{height:35px;line-height:35px;margin-bottom:0;border:1px solid #DCDCDC;border-left:0}
.mydet-shopcont-bot .shop-address-box{margin:15px}
.mydet-shopcont-bot .shop-address-box li{line-height:30px}
.mydet-shopcont-bot .shop-address-box li label{color:#999;font-weight:400}
/*==================================(商品查看)右end=========================================*

/*==================================面包屑=========================================*/
.mydet-crumbs .mydet-crumbs-wrap{font-size:14px;padding:10px 0px}
.mydet-crumbs .mydet-crumbs-wrap span{color:#333333}
.mydet-crumbs .mydet-crumbs-wrap .span-pointer{cursor:pointer}
/*==================================面包屑end=========================================*/

/*==================================商品选择(左)=========================================*/
/*店铺大图切换列表*/
.mydet-img{height:160px;overflow:hidden}
.mydet-img > div{height:160px;background-repeat:no-repeat;background-position:center center}

.mydet-buygoods-imgs{width:400px}
.mydet-goods-selectimg{width:400px;height:400px;border:1px solid #eee}
.mydet-goods-selectimg img{width:100%;height:100%}
.mydet-buygoods-imgs ul{height:60px;margin-top:20px}
.mydet-buygoods-imgs li{float:left;width:60px;height:60px;margin-right:25px;border:1px solid transparent;outline:1px solid #eee;cursor:pointer}
.mydet-buygoods-imgs li:last-child{margin:0}
.mydet-buygoods-imgs .active{border-color:#d71f1b;outline:1px solid #d71f1b;}
.mydet-buygoods-imgs img{width:100%;height:100%}
/*=====================================商品选择(左)(end)======================================*/

/*============================商品选择(右)===============================================*/
/*商品选择(右)*/
.mydet-buygoods-tit{width:600px;line-height:30px;font-size:16px;font-weight:700}
.mydet-buygoods-det{width:600px;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;text-overflow:ellipsis;
	line-height:20px;max-height:40px;font-size:12px;color:#999;overflow:hidden}
.mydet-buygoods-attr{min-height:30px;line-height:30px;margin:20px 0}
.mydet-buygoods-key{display:block;width:80px;line-height:30px; font-size:12px;font-weight:normal;color:#999;padding-left:18px}
.mydet-buygoods-value{width:500px}
.mydet-buygoods-value > .mydet-goodsattr-list{display:inline-block;padding:0 6px;line-height:34px;margin:0 5px 5px 0;font-size:12px;text-align:center;color:#666;border:1px solid transparent;outline:1px solid #ddd;cursor:pointer}
.mydet-buygoods-value > .mydet-goodsattr-list:hover,.mydet-buygoods-value > .mydet-goodsattr-list.active{border:1px solid #d71f1b!important;outline:1px solid #d71f1b;}
.mydet-buygoods-value.bg-none{background:rgba(0,0,0,.1)!important}
/*价格*/
.mydet-buygoods-pricebg{background: url(../../../assets/img/price-bg.png) no-repeat center center;background-size: 100%;
height:62px;line-height:62px;margin-bottom:10px;font-size:14px;color:#666}
.mydet-buygoods-pricebg .mydet-buygoods-key{line-height:62px}
.mydet-buygoods-price{position:relative}
.mydet-buygoods-price b{color:#d71f1b;font-size:18px;font-weight:700}
.mydet-buygoods-price i{font-size:24px;font-weight: 700}
.mydet-buygoods-price .mydet-buygoods-commentnum{font-size:12px;font-weight:400;color:#999}
.mydet-buygoods-price .mydet-buygoods-commentnum > a{text-decoration:underline;color:#666}
.mydet-goods-num{line-height:30px;font-size:12px;color:#666}
/*数量*/
.mydet-goods-num > .num-btn{text-decoration:none;position:relative;display:block;float:left;width:20px;height:30px;text-align:center;line-height:26px;font-size:20px;font-weight:700;color:#666;border:1px solid #DCDCDC;background:-moz-linear-gradient(top,#fefefe 0,#f1f1f1 100%);background:-webkit-gradient(linear,left top,left bottom,color-stop(0,#fefefe),color-stop(100%,#f1f1f1));background:-webkit-linear-gradient(top,#fefefe 0,#f1f1f1 100%);background:-o-linear-gradient(top,#fefefe 0,#f1f1f1 100%);background:-ms-linear-gradient(top,#fefefe 0,#f1f1f1 100%);background:linear-gradient(to bottom,#fefefe 0,#f1f1f1 100%);cursor:pointer}
.mydet-goods-num input{float:left;width:36px;height:30px;text-align:center;font-weight:700;margin:0 5px;border-radius:2px;font-size:12px;color:#666;border:1px solid #ddd;outline:0}
.mydet-cont-tip{font-size:12px;line-height: 23px; color: #666;  background-color: #fbfbfb;padding: 3px 10px 3px 5px;border: 1px solid #efefef; border-left: 1px solid #e7e7e7;font-size:12px;width:210px}
.mydet-cont-tip > s{float:left;display:inline-block;width:23px;height:22px;background:url(../../../assets/img/tip-img.png) no-repeat center center!important; background-position: -61px -1px;background-size: 14px 12px}
/*库存*/
.mydet-goods-stocks b{margin:0 5px}
.mydet-goods-stocks span{color:#d71f1b;font-weight:bold}
/*立即购买 加入购物车*/
.mydet-goods-goshop{height:40px;font-size:0}
.mydet-goods-goshop *{font-size:12px}
.mydet-goods-goshop .mydet-goshop-btn{display:inline-block;width:136px;height:40px;line-height:36px;color:#ffffff;text-align:center;border-radius:2px;text-decoration:none;font-size:14px}
.mydet-goods-goshop .mydet-goshop-btn.one{background:#ff9000}
.mydet-goods-goshop .mydet-goshop-btn.two{width:182px;text-indent:30px;background: url(../../../assets/img/add-shop-cart.png) no-repeat 40px center #dd2727;background-size: 20px;margin-left:6px}
.mydet-goods-goshop.active .mydet-goshop-btn.one{cursor: default;background-color: #f9f9f9;color: #818181;border: 1px solid #818181}
.mydet-goods-goshop.active .mydet-goshop-btn.two{cursor: default;background-color: #818181;border: 1px solid #818181;color:#fff;}
/*收藏商品*/
.mydet-collect-goods{margin-left:30px}
.mydet-collect-goods a {color:#999;text-decoration:none}
.mydet-collect-goods a > i{cursor:pointer;display:inline-block;width:14px;height:12px;margin-right:2px;margin-top:13px;background:url(../../../assets/img/soucang1.png) no-repeat center center;background-size:14px 12px}
.mydet-collect-goods a > i:hover,.mydet-collect-goods > i.active,
.mydet-collect-goods .activeCollectGood > i{background:url(../../../assets/img/soucang2.png) no-repeat center center!important;background-size:14px 12px}
/*====================================商品选择(右)(end)=======================================*/

</style>