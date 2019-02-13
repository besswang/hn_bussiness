<template>
  <div class="list">
    <div class="source">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">商家中心</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="form-con">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="创建时间">
          <el-col :span="24">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="formInline.timevalue"
                type="daterange"
                align="right"
                :editable="false"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formInline.orderNumber" :placeholder="showList==true?'请输入订单号':'请输入退单编号'"></el-input>
        </el-form-item>
        <el-form-item v-show="showList">
          <el-input v-model="formInline.buyerName" placeholder="请输入买家姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">搜索</el-button>
        </el-form-item>
        <el-form-item v-show="showList">
          <a class="el-button el-button--primary" :href="orderExport()">订单导出</a>
        </el-form-item>
      </el-form>
    </div>
    <!-- <div class="form-con" v-show="!showList">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="创建时间">
          <el-col :span="24">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="formInline.timevalue"
                type="daterange"
                align="right"
                :editable="false"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formInline.orderNumber" placeholder="请输入退单编号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">搜索</el-button>
        </el-form-item>
      </el-form>
    </div> -->

    <div class="tabs-con flex flex-row">
      <el-select v-model="currentType" style="margin-right:15px;" @change="sectionTypeFn">
        <el-option
        v-for="typelist in types"
        :key="typelist.type"
        :value="typelist">
        </el-option>
      </el-select>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="全部订单" name="0"></el-tab-pane>
        <el-tab-pane label="等待付款" name="1"></el-tab-pane>
        <el-tab-pane label="等待发货" name="2"></el-tab-pane>
        <el-tab-pane label="已发货" name="3"></el-tab-pane>
        <el-tab-pane label="已完成" name="4"></el-tab-pane>
        <el-tab-pane label="待评价" name="5"></el-tab-pane>
        <el-tab-pane label="已取消" name="6"></el-tab-pane>
        <el-tab-pane label="退款申请" name="7"></el-tab-pane>
      </el-tabs>
    </div>
    <!-- <router-view class="views"></router-view> -->
    <div v-loading="loadUse" v-if="showList">
      <order-list @send-ok="sendOk" :columns="columns" :list-data="listData"></order-list>
    </div>
    <div v-loading="loadUse" v-if="!showList">
        <order-list2 :columns="columns2" :list-data="listData2"></order-list2>
    </div>

    <div style="padding:15px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>


<script>
import orderList from './list1.vue'
import orderList2 from './list2.vue'
import { Row,Col,Button,Breadcrumb,BreadcrumbItem,DatePicker,
Form,FormItem,Input,Tabs,TabPane,Select,Option, Pagination} from 'element-ui'
export default {
  name: 'issue',
  components: {
    orderList,
    orderList2,
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
    'el-pagination':Pagination
  },
  data () {
    return {
      loadUse:true,
        showList:true,
        columns:['商品详情','单价','数量','售后','买家','支付方式','订单总价','状态与操作'],//订单列表thead
        columns2:['商品详情','退款金额','申请时间','退款类型','退款状态','操作'],
        listData2:[],
        listData:[],
        total:0,//总页数
        pageNum: 1,//当前页
        pageSize:5,//每页条目数
        currentType:'全部订单',
        sectionType:'all',//时间区间类型
        types:['全部订单','近三个月订单','近一个月订单','近七天'],
        status:0,//订单状态
        multipleSelection: [],
        formInline: {
          orderNumber:'',//订单号
          buyerName:'',//买家姓名
          timevalue:[]
        },
        activeName:'',
        startTime:'',//开始时间
        endTime:''//结束时间
    }
  },
  created () {
      this.$store.state.adminleftnavnum="/order_list"; //设置左侧导航active
  },
  mounted(){
    // this.activeName = sessionStorage.getItem('active')
      let _this = this
      // 接收路由传过来的参数
      let ostate = this.$route.query.oState
      //1:等待付款（全部）；2：等待发货（全部）；3：已发货（全部）；4：退款申请（全部）；5：近期订单（近一个月订单）；6：待评价（全部）

      if(ostate){//如果有路由传参过来
        if(ostate == '7'){
            this.activeName = ostate
            this.showList = false
            this.sectionType = 'all'
            this.refundFn()
        }else{
            if(ostate == '8'){
              this.activeName = ''
              this.currentType = '近一个月订单'
              this.sectionType = '2'
              this.status = 0
            }else{
              this.activeName = ostate
              this.sectionType = 'all'
              this.status = Number(ostate)
            }
            //商家id*，页码*，行数*,订单状态，时间区间类型，开始时间，结束时间,订单号，买家姓名
            this.orderFn()
          }
        }else{
           this.orderFn()
        }
  },
  methods: {
    //出库
    sendOk(trans){
      this.loadUse = true
      let _this = this;
      this.$axios.post(this.$$jk.setOrderState,trans)
      .then(function(response){
          if(response.data.code == "SUCCESS"){
                setTimeout(() => {
                    _this.orderFn()
                    _this.$message({
                      message:'发货成功',
                      type:'SUCCESS'
                    })
                }, 1000);
          }
      })
      .catch(function(error){

      })
    },
    //订单导出
    orderExport(){
      return this.$$jk.exportMerchantOrder+'?'+this.setExportWithdraws()
    },
		setExportWithdraws(){
      let id = sessionStorage.getItem('merchantId')
			let params={
        storeId:id,
        status:this.status,
        orderNumber:this.formInline.orderNumber,
        buyerName:this.formInline.buyerName.trim(),
        sectionType:this.sectionType,//时间区间类型
        startTime:this.startTime,
        endTime:this.endTime
			};
			let arr = [];
			for (var name in params) {
				arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(params[name]));
			}
			return arr.join("&");
		},
    //搜索
    onSearch(){
      this.loadUse = true
      //商家id*，页码*，行数*,订单状态，时间区间类型，开始时间，结束时间,订单号，买家姓名
      if(this.formInline.timevalue){
        this.startTime = this.formInline.timevalue[0]
        this.endTime = this.formInline.timevalue[1]
      }else{
        this.startTime = ''
        this.endTime = ''
      }
      if(this.activeName=='7'){
        this.refundFn()
      }else{
        this.orderFn()
      }
    },
    //tab事件(0:'全部', 1:'等待付款', 2:'等待发货', 3:'已发货', 4:'交易成功', 5:'待评价', 6:'已取消',7:'退款申请')
    handleClick(tab) {
      this.loadUse = true
      let _this = this
      this.pageNum = 1
      if(tab.name!='7'){
        this.showList = true;
        this.status = tab.name
        this.orderFn()
      }else{//退款申请
        this.showList = false;
        this.refundFn()
      }

    },
    //卖家查询退款订单
    refundFn(){
        let _this = this
        let id = sessionStorage.getItem('merchantId')
        //trant{商家id，页码，行数，查询时间段类型，开始时间，结束时间，退款编号}
        let trant = {
            merchantId:id,
            pageNum:this.pageNum,
            pageSize:this.pageSize,
            timeType:this.sectionType,
            startTime:this.startTime,
            endTime:this.endTime,
            refundOrderNumber:this.formInline.orderNumber,
        }
        let params = {};
        let i;
        for(i in trant){
          if(trant[i]){
            params[i] = trant[i];
          }
        }
        this.$axios.post(this.$$jk.getRefundOrdersMerchant,params)
        .then(function(response) {
          if(response.data.code == "SUCCESS"){
              let r = response.data.data
              _this.listData2 = r.list
              _this.total = r.total
          }else{
            _this.$message({
              message:response.data.remark,
              type:'warning'
            })
          }
          setTimeout(() => {
            _this.loadUse = false
          }, 500);
        })
        .catch(function(error) {
            alert(error);
        });
    },
    //全部订单的切换时间
    sectionTypeFn(val){
      this.loadUse = true
      this.pageNum = 1
      this.startTime=''
      this.endTime=''
      this.formInline.timevalue=[]
      switch(val)
      {
      case '全部订单':
        this.sectionType = 'all'
        break;
      case '近三个月订单':
        this.sectionType = '1'
        break;
      case '近一个月订单':
        this.sectionType = '2'
        break;
      case '近七天':
        this.sectionType = '3'
        break;
      default:
        this.sectionType = 'all'
      }
      if(this.activeName=='7'){
          this.refundFn()
      }else{
          this.orderFn()
      }

    },
    //订单管理
    orderFn(){
        let id = sessionStorage.getItem('merchantId')
        let _this = this
        //portObj{商家id*，页码*，行数*,订单状态，时间区间类型，开始时间，结束时间,订单号，买家姓名}
        let portObj = {
          storeId:id,
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          status:this.status,
          sectionType:this.sectionType,
          startTime:this.startTime,
          endTime:this.endTime,
          orderNumber:this.formInline.orderNumber,
          buyerName:this.formInline.buyerName.trim()
        }
        ///hn-shop-web/order/queryBusinessOrderList
        // this.$axios.post(this.$$jk.queryBusinessOrderList,portObj)
        this.$axios.post('queryBusinessOrderList',portObj)
        .then(function(response) {
          if(response.data.code == "SUCCESS"){
              let order = response.data.data
              _this.listData = order.list
              _this.total = order.total
          }else{
            _this.$message({
              message:response.data.remark,
              type:'warning'
            })
          }
          setTimeout(() => {
            _this.loadUse = false
          }, 500);
        })
        .catch(function(error) {
            alert(error);
        });
    },
    //分页
    handleSizeChange(val) {
      this.loadUse = true
      this.pageSize = val
      if(this.activeName == '7'){
         this.refundFn()
      }else{
        this.orderFn()
      }
    },
    handleCurrentChange(val) {
      //商家id*，页码*，行数*,订单状态，时间区间类型，开始时间，结束时间,订单号，买家姓名
      this.loadUse = true
      this.pageNum = val
      console.log(this.activeName)
      if(this.activeName=='7'){
          this.refundFn()
      }else{
          this.orderFn()
      }
    },

    getActiveType(){
        this.activeName=this.$store.state.activeName;
    },
    add(scope1){
      console.log(scope1)
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
    }
  },
  watch: {
      // 监测store.state
      '$store.state.activeName': 'getActiveType',
      "$route": function(){
          let routerPath = this.$route.path
          if(routerPath == "/order_list"){
              this.activeName = ''
              this.showList = true
              this.loadUse = true
              this.orderFn()
              // sessionStorage.setItem('active','')
              // this.$store.state.activeName = 0
              // this.$store.state.sectionType = 'all'
          }
      },
      activeName:{
          handler:function(val,oldval){
              if(val=='7'){
                console.log("2233")
              }
          },
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-con{
  background:#fff;
  padding:22px 15px 0 15px;
}
.tabs-con{
  margin-top:20px;
  background:#fff;
  padding:15px 15px 0 15px;
}
</style>

