<template>
  <div class="list">

    <div class="source">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">商家中心</el-breadcrumb-item>
        <el-breadcrumb-item>账户管理</el-breadcrumb-item>
        <el-breadcrumb-item>我的账户</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="card-con"> 
      <el-row>
        <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>现金账户</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="dialogVisible = true">提现规则</el-button>
              </div>
              <ul class="card-body">
                <li>可提现金额</li>
                <li><span>{{accountInfo.currentCash}}</span>元</li>
                <li class="flex flex-row">
                  <el-button type="primary" v-if="accountInfo.currentCash!=0" 
                  @click.native.prevent="withdraw('0',accountInfo.currentCash)">提现</el-button>
                  <el-button type="text" @click.native.prevent="trading('0')">查看记录</el-button>
                </li>
              </ul>
            </el-card>
        </el-col>
        <el-col :span="12">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>银果账户</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="dialogVisible = true">提现规则</el-button>
              </div>
              <ul class="card-body">
                <li>可提现金额</li>
                <li><span>{{accountInfo.currentYg}}</span>元</li>
                <li class="flex flex-row">
                  <el-button type="primary" v-if="accountInfo.currentYg!=0" @click.native.prevent="withdraw('1',accountInfo.currentYg)">提现</el-button>
                  <el-button type="text" @click.native.prevent="trading('1')">查看记录</el-button>
                </li>
              </ul>
            </el-card>
        </el-col>
      </el-row>
    </div>

    <el-dialog
    title="关于克珞世商城提现规则"
    :visible.sync="dialogVisible"
    width="60%"> 
      <rule></rule>     
    </el-dialog>

    <!-- <div class="but-group">
      <el-button @click.native.prevent="handleNextStep" v-show="nextStep" type="primary">确认绑定</el-button>
      <el-button v-show="nextStep">取消</el-button>
    </div> -->
    <div class="flex flex-row flex-pack-center button-con">
      <el-button-group>
        <el-button type="primary" @click="getBalanceFlowsChangeByMerchantId(2)">近60天</el-button>
        <el-button type="primary" @click="getBalanceFlowsChangeByMerchantId(1)">近30天</el-button>
        <el-button type="primary" @click="getBalanceFlowsChangeByMerchantId(0)">近7天</el-button>
      </el-button-group>
    </div>

    <!-- <div class="echarts-con" id="main" style="width: 1065px;height: 500px;"></div> -->
    <div class="echarts-con" id="myChart" :style="{width: '1065px', height: '500px'}"></div>
  </div>
</template>


<script>
import rule from '../../common/rule.vue'
// import echarts from 'echarts'
import {Row,Col,ButtonGroup,Button,Breadcrumb,BreadcrumbItem,Card, Dialog, } from 'element-ui'
export default {
  name: 'issue',
  components: {
    rule,
    'el-row':Row,
    'el-col':Col,
    'el-button-group':ButtonGroup,
    'el-button':Button,
    'el-breadcrumb':Breadcrumb,
    'el-breadcrumb-item':BreadcrumbItem,
    'el-card':Card,
    'el-dialog':Dialog
  },
  data () {
      return {
        start:'',//开始时间
        end:'',//结束时间
        splitNumber:'',//坐标轴的分割段数
          accountInfo:{},//账户信息
          dialogVisible: false,//提现规则弹窗
          opinion:['现金账户','银果账户'],
          opinionData:[]
      }
  },
  created () {
      this.$store.state.adminleftnavnum="/my_account"; //设置左侧导航active
  }, 
  //调用
  mounted(){
      //调图表
      // this.$nextTick(function() {
      //    this.drawLine();
      // })
      let _this = this
      let id = sessionStorage.getItem('merchantId')
      this.$axios.post(this.$$jk.getMerchantsForProductDetailsById,{merchantId:id})
        .then(function(response) {
            if(response.data.code == "SUCCESS"){
              _this.accountInfo = response.data.data
            }else{
              _this.$message({
                message:response.data.remark,
                type:"warning"
              })
            }
        })
        .catch(function(error) {
            alert(error);
        });
        this.getBalanceFlowsChangeByMerchantId(0)
  },
  methods: {
    time(type){
      Date.prototype.format = function(fmt) { 
          var o = { 
              "M+" : this.getMonth()+1,                 //月份 
              "d+" : this.getDate(),                    //日 
              "h+" : this.getHours(),                   //小时 
              "m+" : this.getMinutes(),                 //分 
              "s+" : this.getSeconds(),                 //秒 
              "q+" : Math.floor((this.getMonth()+3)/3), //季度 
              "S"  : this.getMilliseconds()             //毫秒 
          }; 
          if(/(y+)/.test(fmt)) {
                  fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
          }
          for(var k in o) {
              if(new RegExp("("+ k +")").test(fmt)){
                  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
              }
          }
          return fmt; 
      }        
      const end = new Date().format("yyyy-MM-dd")
      const start = new Date()
      let s
      if(type==0){
          this.splitNumber = 7
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
          var oldTime = (new Date(start)).getTime();
          s = new Date(start).format("yyyy-MM-dd");
      }else if(type==1){
          this.splitNumber = 15
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
          var oldTime1 = (new Date(start)).getTime();
          s = new Date(start).format("yyyy-MM-dd");               
      }else{
          this.splitNumber = 15
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 60);
          var oldTime2 = (new Date(start)).getTime();
          s = new Date(start).format("yyyy-MM-dd");           
      }
      return [s,end]
    },
    //通过商家Id获取账户变动趋势
    getBalanceFlowsChangeByMerchantId(type){
      let _this = this
      this.start = this.time(type)[0]
      this.end = this.time(type)[1]
      console.log(this.opinionData)
      let id = sessionStorage.getItem('merchantId')
      this.$axios.post(this.$$jk.getBalanceFlowsChangeByMerchantId,{merchantId:id,startCreateTime:this.start,endCreateTime:this.end})
        .then(function(response) {
            if(response.data.code == "SUCCESS"){
              let r = response.data.data
              _this.drawLine();
            }else{
              _this.$message({
                message:response.data.remark,
                type:"warning"
              })
            }
        })
        .catch(function(error) {
            alert(error);
        });
    },
    //提现
    withdraw(type,money){
      let _this = this
      let id = sessionStorage.getItem('merchantId')
      this.$axios.post(this.$$jk.getBankCardsByMerchantId,{merchantId:id})
          .then(function(response) {
              if(response.data.code == "SUCCESS"){
                if(response.data.hasOwnProperty('data')){
                  let r = response.data.data
                  if(r.status==1){
                    _this.$router.push({
                        path:'/withdraw',
                        query:{
                          type:type,
                          money:money
                          }
                    })
                    let info = JSON.stringify(r)
                    sessionStorage.setItem("cardInfo",info)
                  }else{
                    _this.$message({
                      message:"请先绑定银行卡",
                      type:'warning'
                    })
                    return false
                  }
                }else{
                  _this.$message({
                    message:"请先绑定银行卡",
                    type:'warning'
                  })
                  return false
                }
              }
          })
          .catch(function(error) {
              alert(error);
          }); 
      
      // this.$router.push({path:'/editor',query:{id:row.id}})
    },
    //查看记录
    trading(type){
      this.$router.push({
        path:'/trading_list',
        query:{type:type}
      })
    },
    drawLine(){
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // myChart.showLoading();
    //     myChart.hideLoading();  
        myChart.setOption({
          title:{
            text:'账户变更趋势'
          },         
          tooltip: {
            trigger:'axis'
          },
          legend: {
            data:this.opinion
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          toolbox: {
              feature: {
                  saveAsImage: {}
              }
          },
          xAxis: [
              {
                type: 'time',
                name: '时间',
                min:this.start,
                max:this.end,
                splitNumber:this.splitNumber,//坐标轴的分割段数
                splitLine: {
                    show: false
                },
                boundaryGap: false
              }                     
          ],
          yAxis: {
              type: 'value',
              name:'金额',
              boundaryGap: [0, '100%'],
              splitLine: {
                  show: false
              }              
          },
          series:[
            // {
            //   name: '模拟数据',
            //   type: 'line',
            //   showSymbol: false,
            //   hoverAnimation: false,
            //   data: data              
            // }
              {
                  name: '现金',
                  type: 'line',
                  smooth: false,
                  data: [10, 12, 21, 54, 260, 830, 710]
              },
              {
                  name: '银果',
                  type: 'line',
                  smooth: true,
                  data: [30, 182, 434, 791, 390, 30, 10]
              }            
          ]
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .clearfix:after {
    clear: both
  }
.card-con{
  background:#fff;
  padding:15px 0 15px 15px;
}
.box-card{
  margin-right:15px;
}
.card-body>li:not(:last-child){
  padding-bottom:15px;
}
.echarts-con{
  padding:15px 0 0 15px;;
}
.button-con{
  padding-top:15px;
}
</style>
  
