<template>
  <div class="list2">
    <div class="table-con">
      <table class="table">
        <thead>
          <tr>
            <th :width="i==0?300:120" v-for="(title,i) in columns" :key="i">{{title}}</th>
          </tr>
        </thead>
      </table>
    </div>
    <div v-for="(item,key) in listData" :key="key" class="listData">
      <el-row class="list-header">
        <el-col :span="14"><p class="list-col">退单编号：{{item.orderNumber}}</p></el-col>
        <el-col :span="6">
          <span class="list-col">店铺详情：</span>
          <el-button type="text" size="mini" @click="refundDetail(item.id)">{{storeName}}</el-button>
        </el-col>
      </el-row>
      <table class="listtable">
        <tbody>
          <tr>
            <td width="300">
              <div class="flex flex-row flex-align-center pro-info">
                <img :src="item.orderGoods.goodsImage" alt="">
                <el-button class="proname" type="text" size="mini" @click="goGoods(item.orderGoods.goodsId)">{{item.orderGoods.goodsName}}</el-button>
              </div>
            </td>
            <td width="120" v-text="item.refundAmount"></td>
            <td width="120" v-text="item.refundsTime"></td>
            <td width="120" v-text="item.type==1?'退款退货':'仅退款'"></td>
            <td width="120">
                {{statusFn(item.status)}}
                <p style="padding:0 8px;" v-if="item.status==1||item.status==2">退款待处理还剩{{countdown(item.refundsTime)}}</p>
            </td>
            <td width="120">
              <el-button v-show="item.status!=1&&item.status!=2" type="primary" size="mini" @click="refundInfo(item.orderGoodId)">退款详情</el-button>
              <el-button v-show="item.status==1||item.status==2" type="primary" size="mini" @click="refundInfo(item.orderGoodId)">退款处理</el-button>
            </td> 
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
import { Row,Col,Button } from 'element-ui'
export default {
  name: 'list2',
  props:{
    listData:Array,
    columns:Array
  },
  components: {
    'el-row':Row,
    'el-col':Col,
    'el-button':Button
  },
  data () {
    return {
        storeName:'',//店铺详情
        currentType:'全部订单',
        types:['全部订单','近三个月订单','近一个月订单','近七天'],//
        // listData: [{
        //   id:1,
        //   orderNumber:201707272108161697951,//退单编号
        //   explanation:'幻牛测试账号',//店铺详情
        //   refundAmount:'0.22',//退款金额
        //   refundsTime:'2017-07-27 21:08:16',//申请时间
        //   type:2,//1退款退货  2退款
        //   status:-1,//退款状态
        //   listArr:[{
        //       id:101,
        //       goodsImage:'http://smerchant.51myd.com/modules/jifenbao/shop/img/no1.png',//展示图
        //       goodsName: 'A商品'//商品名称
        //   },{
        //       id:102,
        //       goodsImage:'http://smerchant.51myd.com/modules/jifenbao/shop/img/no1.png',//展示图
        //       goodsName: 'B商品'//商品名称
        //   }],
        // }],
        multipleSelection: [],
        formInline: {
          timevalue:'',//时间
          productName:'',//商品名称
        },
        activeName:'1'
    }
  },
  computed:{  
        
  },  
  created () {
      //  this.$store.state.activeName = "4"
       this.$store.state.adminleftnavnum="/order_list"; //设置左侧导航active
  }, 
  mounted(){
      let _this = this
      this.storeName = sessionStorage.getItem('storeName')
      // this.$axios.post('/hn-shop-web/bankNames/bankNamesList',{state:pstate})
      //     .then(function(response) {
      //       let bankList = response.data.data.list
      //       _this.bankArr = bankList;
      //       console.log(bankList)

      //     })
      //     .catch(function(error) {
      //         alert(error);
      //     });      
  },
  methods: {
    countdown(time){
        let repTime = time.replace("-", "/").replace("-", "/");
        var reg = /^\d{2}$/;
        var ending = new Date (repTime);
        var now = new Date;
        if (now >= ending)
        {
            clearTimeout(timeout);
            return;
        }
        var disc = ending - now;
        var day = parseInt (disc / 1000 / 60 / 60 / 24);
        var hour = parseInt (disc / 1000 / 60 / 60 % 24);
        hour = !reg.test(hour) ? "0" + hour : hour;
        var minute = parseInt (disc / 1000 / 60 % 60);
        minute = !reg.test(minute) ? "0" + minute : minute;
        var second = parseInt (disc / 1000 % 60);
        second = !reg.test(second) ? "0" + second : second;
        return day + "天" + hour + "小时" + minute + "分" + second + "秒"
        var timeout = setTimeout (this.countdown(repTime), 1000);
    },
    goGoods(id){
      window.open(process.env.businessHost.host+'/'+process.env.businessHost.projectName+'/#/goods_detail?id='+id)
    },
    //进入商家页面
    refundDetail(id){
      window.open(process.env.businessHost.host+'/'+process.env.businessHost.projectName+'/#/seller_goods_list?storeId='+id)
    },
    statusFn:function(val){  
      switch(val){
        case -3:
          return '用户取消退款';
          break;
        case -1:
          return '商家驳回退款';
          break;
        case 1://发起退款
          return '';
          break;
        case 2://商家同意退款申请
          return '';
          break;
        case 3:
          return '确认退款';
          break;
        case 4:
          return '退款中...'
          break;
        case 5:
          return '退款成功'
          break;
        default:
          return '没有状态'
      }
    },
    //退款详情，退款处理
    refundInfo(id){
      let _this = this
      this.$router.push({
        path: '/refund_detail',
        query: {
          orderGoodId: id
        }
      }) 
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-con{
  background:#fff;
  padding:0 15px;
}
.leave-message{
  padding:12px;
  border-top:1px solid #dbeeff;
}
.leave-message>span{
  color:#ff4545;
}
.order-num{
  padding-bottom:10px;
}
.table-con{
  padding:0 15px;
}
.table,.listtable{
    width: 100%;
    max-width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
    text-align:center;
}
.table>thead>tr>th{
  padding:12px 0;
  background:#f9f9f9;
}
.listData{
  background:#fff;
  padding:15px;
}
.proname{
  padding-left:12px;
  white-space:normal;
  word-warp:break-word;
  word-break:break-all;
  line-height:26px
}
/* .el-table__fixed-header-wrapper {
    display:none;
} */
.list-header{
  padding:10px 12px;
  background:#f2f9ff;
  border:1px solid #dbeeff;
  border-bottom:0;
}
.list-header .list-col{
  line-height:30px;
}
.listData .listtable>tbody>tr>td{
    border:1px solid #dbeeff;
}
.listData .listtable:nth-child(odd)>tbody>tr>td{
  border-top:0;
}
.pro-info{
  padding:12px;
}
.pro-info>img {
    height: 50px;
    max-width: 50px;
}
</style>

  
