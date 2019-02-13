<template>
  <div class="trading_list">

    <div class="source">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">商家中心</el-breadcrumb-item>
        <el-breadcrumb-item>账户管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/my_account' }">我的账户</el-breadcrumb-item>
        <el-breadcrumb-item>交易详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="form-con">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="创建时间:">
          <el-col :span="24">
              <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="timevalue"
                type="daterange"
                align="right"
                :editable="false"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2">
              </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">搜索</el-button>
          <!-- <el-button type="primary" @click="exportFn" style="float:right;">导出图表</el-button> -->
          <a class="el-button el-button--primary" :href="exportFn()">导出图表</a>
        </el-form-item>
      </el-form>
    </div>

    <div class="tabs-con">
      <el-tabs v-model="type" @tab-click="handleClick">
        <el-tab-pane label="全部" name=" "></el-tab-pane>
        <el-tab-pane label="现金" name="0"></el-tab-pane>
        <el-tab-pane label="银果" name="1"></el-tab-pane>
      </el-tabs>
    </div>

    <div class="table-con">
      <el-table
        ref="multipleTable"
        :data="withdrawList"
        tooltip-effect="dark"
        style="width: 100%"
        v-loading="loadUse">
        <el-table-column
          align='center'
          prop="yurref"
          label="流水号">
        </el-table-column>
        <el-table-column
        align='center'
          prop="createTime"
          label="创建时间">
        </el-table-column>
        <el-table-column
        align='center'
          prop="withdrawalAmount"
          label="提现金额">
        </el-table-column>
        <el-table-column
        align='center'
          prop="money"
          label="实际金额">
        </el-table-column>
        <el-table-column
        align='center'
          prop="rateDetail"
          label="手续费">
           <template slot-scope="scope"> 
             <p>{{rateDetail(scope.row.type,scope.row.rateDetail)}}</p>
            <!-- <p>{{scope.row.type==0?JSON.parse(scope.row.rateDetail).bankRate:''}}</p>  -->
          </template>         
        </el-table-column>
        <el-table-column
        align='center'
          prop="beforeAmount"
          label="金额">
        </el-table-column>
        <el-table-column
        align='center'
          prop="type"
          label="账户类型">
          <template slot-scope="scope"> 
            <p>{{scope.row.type==0?'现金':'银果'}}</p> 
          </template>
        </el-table-column>
        <el-table-column
        align='center'
          prop="bankName"
          label="到款账户">
        </el-table-column>
        <el-table-column
        align='center'
          prop="status"
          label="状态">
          <template slot-scope="scope"> 
            <p>{{scope.row.status==0?'待审核':scope.row.status==1?'审核通过':'审核驳回'}}</p> 
          </template>          
        </el-table-column>
      </el-table>
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
import { Col,Button,Breadcrumb,BreadcrumbItem,DatePicker,Form,FormItem,
Input,Tabs,TabPane,Table,TableColumn, Pagination} from 'element-ui'
export default {
  name: 'trading_list',
  components: {
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
    'el-table':Table,
    'el-table-column':TableColumn,
    'el-pagination':Pagination
  },
  data () {
    return {
      withdrawList:[],
        userId:null,
        loadUse:true,
        pageNum:1,
        pageSize:5,
        total:0,
        type:'',//'':全部;'0':现金;'1':银果
        timevalue:[],//时间
        startTime:'',//开始时间，
        endTime:'',//结束时间
        pickerOptions2: {//时间组件数据
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
    }
  },
  created () {
      this.$store.state.adminleftnavnum="/my_account"; //设置左侧导航active
  },
  mounted(){
      this.userId = sessionStorage.getItem('userId')
      let _this = this
      this.type = this.$route.query.type    
      this.getWithdrawsById()  
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
    rateDetail(type,obj){
      let o = eval('(' + obj + ')')
      if(type==0){
        return o.bankRate
      }else{
        return o.YINGUO
      }
    },
    handleSizeChange(val){
      this.loadUse = true
      this.pageSize = val
      this.getWithdrawsById()
    },
    handleCurrentChange(val){
      this.loadUse = true
      this.pageNum = val
      this.getWithdrawsById()
    },
    //通过id获取交易详情
    getWithdrawsById(){
      let _this = this
      let id = sessionStorage.getItem('merchantId')
      let trans = {
        merchantId:id,
        userId:this.userId,
        type:this.type,
        startCreateTime:this.startTime,
        endCreateTime:this.endTime,
        pageNum:this.pageNum,
        pageSize:this.pageSize
      }
      this.$axios.post(this.$$jk.getWithdrawsById,trans)
          .then(function(response) {
            if(response.data.code == 'SUCCESS'){
              let r = response.data.data
              _this.withdrawList = r.list
              _this.total = r.total
            }
            setTimeout(() => {
              _this.loadUse = false
            }, 500);
          })
          .catch(function(error) {
              alert(error);
          });  
    },
    //tab事件（全部:'';现金:'0';银果:'1'）
    handleClick(tab, event) {
      this.loadUse = true
      this.type = tab.name
      this.getWithdrawsById()
    },
    //查询
    onSearch(){
      this.loadUse = true
      if(this.timevalue){
        this.startTime = this.timevalue[0]
        this.endTime = this.timevalue[1]
      }else{
        this.startTime = ''
        this.endTime = ''
      }
      this.getWithdrawsById()
      // console.log(this.formInline.timevalue,this.formInline.productName);
    },
    //导出图表
    exportFn(){
      return this.$$jk.exportMerchantWithdraw+'?'+this.setExportWithdraws()
    },
		setExportWithdraws(){
      let _this = this
      let id = sessionStorage.getItem('merchantId')

      if(this.timevalue){
        this.startTime = this.timevalue[0]
        this.endTime = this.timevalue[1]
      }else{
        this.startTime = ''
        this.endTime = ''
      } 
      let params = {
        merchantId:id,
        userId:this.userId,
        type:this.type,
        startCreateTime:this.startTime,
        endCreateTime:this.endTime
      }
			let arr = [];
			for (var name in params) {
        if(params[name]){
				  arr.push(encodeURIComponent(name) + "=" + encodeURIComponent(params[name]));
        }
			}
			return arr.join("&");
		},
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
  padding:15px;
}
.table-con{
  background:#fff;
  padding:0 15px;
}
</style>
  
