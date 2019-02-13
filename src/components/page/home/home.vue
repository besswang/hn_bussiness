<template>
  <div class="home">
    <el-row class="home-info-con">
      <el-col :span="4">
        <div class="user-logo-con">
            <img class="user-logo" :src="image" alt="">
        </div>
      </el-col>
      <el-col :span="6">
        <ul class="home-info">
          <li>{{realName}}</li>
          <li><span>联系电话:</span>{{mobile}}</li>
          <li><span>店铺名称:</span>{{storeName}}</li>
          <li><span>商店状态:</span>{{isShelves}}</li>
        </ul>
      </el-col>
      <el-col :span="6">
        <ul class="home-info">
          <li>服务费续费</li>
          <li><span>到期时间:</span>{{serviceEndTime}}</li>
          <!-- <li><el-button type="primary">
            <router-link to="/recharge" style="color:#fff;">续费</router-link>
          </el-button></li> -->
        </ul>
      </el-col>
      <el-col :span="8">
        <div class="code">
          <img class="codeImage" id="ringoImage" :src="qrCode" alt="">
        </div>
        <el-button v-if="qrCode" type="primary" style="width:180px;" @click="download">下载打印二维码</el-button>
      </el-col>
    </el-row>
    <el-row class="hint-con">
      <el-col :span="18">
        <el-row>
          <el-col :span="24">
            <div class="pro-hint">
              <h1>店铺提示</h1>
              <el-row>
                <el-col :span="8">
                  <router-link :to="{ path: 'product_list', query: { pState: '0' }}" class="pro-text">
                    仓库中待上架商品 <span>({{unShow}})</span>
                  </router-link>
                  <!-- <router-link to="/product_list" class="pro-text">仓库中待上架商品 <span>(0)</span></router-link> -->
                  <!-- <div class="pro-text">仓库中待上架商品 <span>(0)</span></div> -->
                </el-col>
                <el-col :span="8">
                  <router-link :to="{ path: 'product_list', query: { pState: '1' }}" class="pro-text">
                    出售中的商品 <span>({{isShow}})</span>
                  </router-link>
                  <!-- <router-link to="/product_list" class="pro-text">出售中的商品 <span>(0)</span></router-link> -->
                  <!-- <div class="pro-text">出售中的商品 <span>(0)</span></div> -->
                </el-col>
                <el-col :span="8">
                  <router-link :to="{ path: 'product_list', query: { pState: '2' }}" class="pro-text">
                    违规下架的商品 <span>({{illegal}})</span>
                  </router-link>
                  <!-- <router-link to="/product_list" class="pro-text">违规下架的商品 <span>(0)</span></router-link> -->
                  <!-- <div class="pro-text">违规下架的商品 <span>(0)</span></div> -->
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="wait-hint">
              <h1>店铺提示</h1>
              <el-row>
                <el-col :span="8">
                  <router-link :to="{ path: 'order_list', query: { oState: '1' }}" class="wait-text">
                    待付款 <span>({{waitingPay}})</span>
                  </router-link>
                </el-col>
                <el-col :span="8">
                  <router-link :to="{ path: 'order_list', query: { oState: '2' }}" class="wait-text">
                    待发货 <span>({{waitingDelivery}})</span>
                  </router-link>
                </el-col>
                <el-col :span="8">
                  <router-link :to="{ path: 'order_list', query: { oState: '3' }}" class="wait-text">
                    待收货 <span>({{waitingReceived}})</span>
                  </router-link>
                </el-col>
              </el-row>
              <el-row class="pt20">
                <el-col :span="8">
                  <router-link :to="{ path: 'order_list', query: { oState: '7' }}" class="wait-text">
                    退款申请 <span>({{refunds}})</span>
                  </router-link>
                </el-col>
                <el-col :span="8">
                  <router-link :to="{ path: 'order_list', query: { oState: '8' }}" class="wait-text">
                    近期订单 <span>({{recentlyOrders}})</span>
                  </router-link>                  
                </el-col>
                <el-col :span="8">
                  <router-link :to="{ path: 'order_list', query: { oState: '5' }}" class="wait-text">
                    待评价 <span>({{waitingEvaluate}})</span>
                  </router-link>  
                </el-col>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
        <div class="kls-con">
          <h6>商城平台联系方式</h6>
          <ul class="kls-ul">
            <li>客服电话: 400-888-888</li>
            <li>电子邮箱: chh@5ihuanniu.com</li>
            <li>服务时间: 周一至周五 9:00 - 17:00</li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</template>


<script>
import { Row,Col,Button } from 'element-ui'
export default {
  name: 'home',
  components: {
    'el-row':Row,
    'el-col':Col,
    'el-button':Button
  },
  data () {
    return {
      realName:'',
      image:'',//logo
      mobile:'',//联系电话
      storeName:'',//店铺名称
      isShelves:'',//是否下架
      serviceEndTime:'',//到期时间
      qrCode:'',//商家二维码
      waitingEvaluate:0,//待评价
      waitingReceived:0,//待收货
      waitingPay:0,//待付款
      refunds:0,//退款申请
      waitingDelivery:0,//待发货
      recentlyOrders:0,//近期订单
      unShow:0,//仓库中待上架商品
      isShow:0,//出售中的商品
      illegal:0//违规商品
    }
  },
  created () {
      this.$store.state.adminleftnavnum="/home"; //设置左侧导航active
  },
  mounted(){
      this.infoFn()
      let _this = this 
      let id = sessionStorage.getItem('merchantId')
      this.getMerchantOrderInfoFn(id)
      //获取商家各种状态的商品的库存
      //this.$axios.post(this.$$jk.getMerchantGoodsStock,{})
      this.$axios.post('getMerchantGoodsStock',{})
      .then(function(response) {
        if(response.data.code == "SUCCESS"){
            let r = response.data.data
            _this.illegal = r.is_shelves
            _this.isShow = r.is_show
            _this.unShow = r.un_show
        } 
      })
      .catch(function(error) {
          alert(error);
      });      
  },
  methods: {
    //获取商户信息（商户id）
    getMerchantOrderInfoFn(id){
      let _this = this
      //this.$axios.post(this.$$jk.getMerchantOrderInfo,{merchantId:id})
      this.$axios.post('getMerchantOrderInfo',{merchantId:id})
      .then(function(response) {
        if(response.data.code == "SUCCESS"){
            let r = response.data.data
            _this.waitingEvaluate = r.waitingEvaluate
            _this.waitingReceived = r.waitingReceived
            _this.waitingPay = r.waitingPay
            _this.refunds = r.refunds
            _this.waitingDelivery = r.waitingDelivery
            _this.recentlyOrders = r.recentlyOrders
        } 
      })
      .catch(function(error) {
          alert(error);
      });
    },
    infoFn() {
      let _this = this
      //通过id获取商家
      let id = sessionStorage.getItem('merchantId')

      //'/hn-shop-web/merchants/getMerchantByd'
      //this.$axios.post(this.$$jk.getMerchantsForProductDetailsById,{merchantId:this.$store.state.shopid})
      //this.$axios.post(this.$$jk.getMerchantsForProductDetailsById,{merchantId:id})
      this.$axios.post('getMerchantsForProductDetailsById',{merchantId:id})
      .then(function(response) {
        if(response.data.code == "SUCCESS"){
          let info = response.data.data
          _this.realName = info.realName
          _this.$store.state.name = info.realName
          _this.$emit('abc',info.realName)
          _this.mobile = info.mobile//联系电话
          _this.storeName = info.name //店铺名称
          //_this.$store.state.isShelves = info.isShelves
          sessionStorage.setItem('isShelves', info.isShelves);
          if(info.isShelves == -1){
            _this.isShelves = "到期下架"
          }else if(info.isShelves == 1){
            _this.isShelves = "上架"
          }
          _this.image = info.image//logo
          _this.serviceEndTime = info.serviceEndTime//到期时间
          _this.qrCode = info.qrCode//商家二维码
          sessionStorage.setItem('storeName',info.name)
        }
      })
      .catch(function(error) {
          alert(error);
      });
    },
    //下载打印二维码
    download() {
        var $a = document.createElement('a');
        $a.setAttribute("href", this.qrCode);
        $a.setAttribute("download", "");
        var evObj = document.createEvent('MouseEvents');
        evObj.initMouseEvent( 'click', true, true, window, 0, 0, 0, 0, 0, false, false, true, false, 0, null);
        $a.dispatchEvent(evObj);
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home-info-con{
  background:#fff;
}
.user-logo-con{
  width:100px;
  height:100px;
  overflow:hidden;
  border-radius:50%;
  margin:7px auto 0 auto;
}
.user-logo-con .user-logo{
  height:100%;
  max-width:100%;
  float:left;
}
.home-info>li{
  font-size:14px;
  color:#303133;
  padding:7px 0;
}
.home-info>li>span{
  color:#818181;
  display:inline-block;
  padding-right:10px;
}
.code{
  width:180px;
  box-shadow: rgba(0, 0, 0, 0.498039) 0px 0px 15px;
  margin-bottom:10px;
}
.code .codeImage{
  width:100%;
}

.hint-con{
  margin-top:20px;
  font-size:14px;
}
.hint-con h1{
  font-weight:500;
  font-size:18px;
  color:#303133;
  padding-bottom:30px;
  margin-left:-15px;
}
.pro-hint{
  background: #fff;
  padding:20px 30px;
  margin-bottom:20px;
}
.wait-hint{
  background: #fff;
  padding:20px 30px;
}
.pro-text{
  color:#4aa6ec;
  cursor: pointer;
}
.wait-text{
  color:#818181;
  cursor: pointer;
}
.pro-text>span,.wait-text>span{
  color:#ff4545;
}
.kls-con{
  background:#fff;
  margin-left:15px;
}
.kls-con>h6{
  font-weight:500;
  font-size:14px;
  border-bottom:1px solid #dcdfe6;
  padding:20px 15px 20px 15px;
}
.kls-con .kls-ul{
  padding:0 15px 20px 15px;
}
.kls-con .kls-ul>li{
  padding-top:20px;
}
</style>
  
