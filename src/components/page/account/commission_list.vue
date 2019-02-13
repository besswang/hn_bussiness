<template>
  <div class="commission_list">

    <div class="source">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">商家中心</el-breadcrumb-item>
        <el-breadcrumb-item>账户管理</el-breadcrumb-item>
        <el-breadcrumb-item>佣金统计</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="form-con">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="起止时间:">
          <el-col :span="24">
              <el-date-picker
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
        <el-button type="primary">筛选</el-button>
        <el-button type="primary" style="float:right;">导出</el-button>
      </el-form>
    </div>

    <div class="table-con">
      <el-table
        ref="multipleTable"
        :data="tableData3"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          prop=""
          label="时间">
        </el-table-column>
        <el-table-column
          prop=""
          label="订单号">
        </el-table-column>
        <el-table-column
          prop=""
          label="金额">
        </el-table-column>
        <el-table-column
          prop=""
          label="佣金">
        </el-table-column>
        <el-table-column
          prop=""
          label="收益账户">
        </el-table-column>
        <el-table-column
          prop=""
          label="来源">
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>


<script>
import { Col,Button,Breadcrumb,BreadcrumbItem,DatePicker,Form,FormItem,Table,TableColumn} from 'element-ui'
export default {
  name: 'commission_list',
  components: {
    'el-col':Col,
    'el-button':Button,
    'el-breadcrumb':Breadcrumb,
    'el-breadcrumb-item':BreadcrumbItem,
    'el-date-picker':DatePicker,
    'el-form':Form,
    'el-form-item':FormItem,
    'el-table':Table,
    'el-table-column':TableColumn
  },
  data () {
    return {
        tableData3: [],//表格数组对象
        timevalue:'',//时间
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
      this.$store.state.adminleftnavnum="/commission_list"; //设置左侧导航active
  },
  mounted(){
      let _this = this
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

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-con{
  background:#fff;
  padding:22px 15px 0 15px;
}
.table-con{
  background:#fff;
  padding:0 15px;
}
</style>
  
