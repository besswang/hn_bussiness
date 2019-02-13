<template>
  <div class="detail">

    <div class="source">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">商家中心</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/order_list' }">订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="detail-con">
      <el-row>
        <el-col :span="2">
          <span>收货信息:</span>
        </el-col>
        <el-col :span="22">
          <p>{{receiverName}}<span style="padding-left:20px;">{{mobile}}</span></p>
          <p>{{buyerAddress}}</p>
        </el-col>
      </el-row>
      <el-row>
      <el-col :span="2">
          <span>配送方式:</span>
        </el-col>
        <el-col :span="22">
          <p>{{delivery}}</p>
        </el-col>
      </el-row>
    </div>

    <div class="detail-con">
      <el-row>
        <h5>买家信息</h5>
      </el-row>
      <el-row>
        <el-col :span="12">
          <span>用户名:</span>
          <p>{{receiverName}}</p>
        </el-col>
        <el-col :span="12">
          <span>买家电话:</span>
          <p>{{mobile}}</p>
        </el-col>
      </el-row>
    </div>
    <div class="detail-con">
      <el-row>
        <h5>订单信息</h5>
      </el-row>
      <el-row class="last-row">
        <el-col :span="12">
          <span>订单编号:</span>
          <p>{{orderNumber}}</p>
        </el-col>
        <el-col :span="12">
          <span>交易流水:</span>
          <p>{{outNumber}}</p>
        </el-col>
        <el-col :span="12">
          <span>创建时间:</span>
          <p>{{addTime}}</p>
        </el-col> 
        <el-col :span="12">
          <span>付款时间:</span>
          <p>{{payTime}}</p>
        </el-col>               
      </el-row>
    </div>

<section class="table-con">
    <table class="listtable">
        <thead>
          <tr>
            <th width="300">商品</th>
            <!-- <th width="100">状态</th> -->
            <th width="100">单价(元)</th>
            <th width="100">数量</th>
            <th width="100">售后</th>
            <th width="100">商品总价(元)</th>
            <th width="100">运费(元)</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item,index) in tableData.orderGoodsList" :key="index">
            <td width="300">
              <div class="flex flex-row flex-align-center pro-info">
                <img style="max-height:60px;" :src="item.goodsImage" alt="">
                <div style="display: block; width: 100%;">
                  <el-button class="proname" type="text" size="mini" @click="detail(item.goodsId)">{{item.goodsName}}</el-button>
                </div>
              </div>
            </td>
            <!-- <td width="100" :rowspan="tableData.orderGoodsList.length" v-if="index==0">{{orderStateFn(tableData.orderState)}} {{payState(tableData.payState)}}</td> -->
            <td width="100">{{item.price}}</td>
            <td width="100">{{item.goodsNum}}</td>
            <td width="100">
              {{statusFn(item.status)}}
              <el-button v-show="item.status==3" type="text" @click="refundInfo(item.id,tableData.orderState,tableData.orderGoodsList)">请卖家处理</el-button>
              <el-button v-show="item.status==4" type="text" @click="refundInfo(item.id,null,null)">退款成功</el-button>  
              <el-button v-show="item.status==5" type="text" @click="refundInfo(item.id,null,null)">已退款</el-button>               
            </td>
            <td width="100" :rowspan="tableData.orderGoodsList.length" v-if="index==0">{{tableData.orderAmount}}</td>
            <td width="100" :rowspan="tableData.orderGoodsList.length" v-if="index==0">{{tableData.shippingFee}}</td>
          </tr>
        </tbody>
      </table>
      <p class="total text-right">实付金额:<span>￥{{tableData.orderAmount}}</span>元</p>  
</section>


  </div>
</template>


<script>
import { Row,Col,Button,Breadcrumb,BreadcrumbItem,DatePicker,
Form,FormItem,Input,Tabs,TabPane,Select,Option, Table, TableColumn} from 'element-ui'
export default {
  name: 'detail',
  components: {
    'el-row':Row,
    'el-col':Col,
    'el-button':Button,
    'el-breadcrumb':Breadcrumb,
    'el-breadcrumb-item':BreadcrumbItem,
    'el-date-picker':DatePicker,
    'el-form':Form,
    'el-form-item':FormItem,
    'el-input':Input,
    'el-tabs':Tabs,
    'el-tab-pane':TabPane,
    'el-select':Select,
    'el-option':Option,
    'el-table':Table,
    'el-table-column':TableColumn
  },
  data () {
    return {
      buyerAddress:'',//收货信息
      delivery:1,//配送方式
      receiverName:'',//用户名
      mobile:'',//买家电话
      orderNumber:'',//订单号
      outNumber:'',//交易流水
      addTime:'',//创建时间
      payTime:'',//付款时间
      //settleAmount:0,//实付金额/结算金额
      orderAmount:0,//实付金额
      tableData: [],
    }
  },
  created () {
      this.$store.state.adminleftnavnum="/order_list"; //设置左侧导航active
  }, 
  mounted(){
      let _this = this
      //获取路由传过来的订单id
      let orderSubsId = this.$route.query.id
      ///hn-shop-web/order/queryBusinessOrderDeatil
      this.$axios.post(this.$$jk.queryBusinessOrderDeatil,{orderSubsId:orderSubsId})
          .then(function(response) {
            if(response.data.code == "SUCCESS"){
              let r = response.data.data
              _this.buyerAddress = r.buyerAddress
              if(r.delivery==1){
                _this.delivery = "快递"
              }else{//2
                _this.delivery = "自提"
              }
              _this.receiverName = r.receiverName
              _this.mobile = r.mobile
              _this.orderNumber = r.orderNumber
              _this.outNumber = r.outNumber
              _this.addTime = r.addTime
              _this.payTime = r.payTime
              _this.orderAmount = r.orderAmount
              _this.tableData = r
            }
          })
          .catch(function(error) {
              alert(error);
          });      
  },
  methods: {
    statusFn(val){
      switch (val) {
          case 3://请卖家处理
              return ""
              break;
          case 0:
              return ""
              break;
          case 2:
              return "已收货"
              break
          case 4://退款成功
              return ""
              break
      }
    },    
    //商品页面
    detail(id){
      window.open(process.env.businessHost.host+'/'+process.env.businessHost.projectName+'/#/goods_detail?id='+id)
    },
    //发货状态：-1:待发货;1:已发货;2:已收货;
    orderStateFn(flag){
        if(flag == -1){
          return ""//显示发货按钮
        }else if(flag == 1){
          return "已发货"
        }else{
          return "已收货"
        }
    },
    //付款状态：10(默认):未付款;20:已付款;-10:取消;
    payState(flag){
      if(flag == 10){
        return "未付款"//显示付款按钮
      }else if(flag == 20){
        return "已付款"
      }
    },
    //退款详情，退款处理
    refundInfo(id,orderState,item){
      let _this = this
      if(orderState==-1){
        this.orderGoodsIds = []
        item.forEach(el =>{
          this.orderGoodsIds.push(el.id)
        })
        let orderGoodsIds = this.orderGoodsIds.join(",")        
        this.$router.push({
          path: '/refund_detail',
          query: {
            orderGoodId:id,
            orderGoodsIds:orderGoodsIds
          }
        })
      }else{
        this.$router.push({
          path: '/refund_detail',
          query: {
            orderGoodId:id
          }
        }) 
      }
    }    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-con{
  background:#fff;
  padding:20px;
}
.detail-con{
  background:#fff;
  padding:20px 20px 0 20px;;
}
.detail-con .el-row:first-child{
  padding-bottom:15px;
}
.detail-con .el-row:last-child{
  border-bottom:1px solid #ededed;
  padding-bottom:20px;
}
.detail-con span,.detail-con p{
  display:inline-block;
}
.detail-con span{
  color:#818181;
  width:86px;
}
.last-row>.el-col{
  padding-bottom:10px;
}
.total{
    padding-top:20px;
}
.total>span{
    font-size: 24px;
    color: #ff4545;
    font-weight:700;
}
.table-con{
  padding:15px;
}
.listtable{
    width: 100%;
    max-width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
    text-align:center;
}
.listtable>thead>tr>th{
  padding:12px 0;
  background:#f2f9ff;
  border:1px solid #dbeeff
}
.listtable>tbody>tr>td{
  border:1px solid #dbeeff
}
.pro-info{
  padding:12px;
}
</style>
  
