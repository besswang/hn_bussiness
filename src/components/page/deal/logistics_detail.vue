<template>
  <div class="logistics_detail">
    <!-- 物流详情 -->
    <div class="source">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">商家中心</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/order_list' }">订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>物流详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="logis-con">
      <ul class="flex flex-r logis-ul">
        <li><span>承运方: </span>{{com}}</li>
        <li><span>货运单号: </span>{{nu}}</li>
      </ul>
      <p class="track-title">物流跟踪:</p>
      <ul class="track-ul">
        <li v-for="(list,i) in logisticsTracking" :key="i">{{list.time}}{{list.context}}</li>
      </ul>
    </div>

  </div>
</template>


<script>
import { Row,Col,Button,Breadcrumb,BreadcrumbItem,DatePicker,
Form,FormItem,Input,Tabs,TabPane,Select,Option, Table, TableColumn} from 'element-ui'
export default {
  name: 'logistics_detail',
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
        com:'',//承运方
        nu:'',//物流单号
        logisticsTracking:[],//物流跟踪
    }
  },
  created () {
      this.$store.state.adminleftnavnum="/order_list"; //设置左侧导航active
  }, 
  mounted(){
      let _this = this
      //获取路由传过来的订单id
      let id = this.$route.query.id
      let postId = this.$route.query.postId
      this.com = this.$route.query.kuaidiName
      this.$axios.post(this.$$jk.merchantGetDataByid,{id:id,postId:postId})
      .then(function(response){
          if(response.data.code == "SUCCESS"){
              let r = JSON.parse(response.data.data)
              _this.nu = r.nu
              _this.logisticsTracking = r.data
              console.log(r)
          }
      })
      .catch(function(error){

      })    
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logis-con{
  background:#fff;
  padding:20px;
}
.track-ul{
    font-size: 12px;
    line-height: 34px;
    color: #969696;
}
.logis-ul li>span{
    color: #969696;
}
.logis-ul>li:nth-child(2){
  padding-left:15px;
}
.track-title{
  padding-top:15px;
}
</style>
  
