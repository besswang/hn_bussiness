<template>
  <div class="temp">

    <div class="source">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">商家中心</el-breadcrumb-item>
        <el-breadcrumb-item>运费模板</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="temp-con">
        <el-row>
          <el-col :span="24">
            <router-link to="/add_template" style="color:#fff;">
            <el-button type="primary" class="add-temp">新建运费模板</el-button>
            </router-link>
          </el-col>
        </el-row>
        <div class="tem-table">
            <el-table
              border
              :data="list"
              v-loading="loadUse"
              style="width: 100%;">
              <el-table-column
                align="center"
                prop="name"
                label="运费模板">
              </el-table-column>
              <el-table-column
                align="center"
                prop="kuaidiId"
                label="运送方式">
                <template slot-scope="scope">
                  <!-- <p>{{scope.row.name.substr(0,scope.row.name.length-2)}}</p> -->
                  <p>{{kuaidiFn(scope.row.kuaidiId)}}</p>
                </template>
              </el-table-column>
              <el-table-column
                align="center"
                prop="firstWeight"
                label="首重(KG)">
              </el-table-column>
              <el-table-column
                align="center"
                prop="firstFee"
                label="运费(元)">
              </el-table-column>
              <el-table-column
                align="center"
                prop="addedWeight"
                label="续重(KG)">
              </el-table-column>
              <el-table-column
                align="center"
                prop="addedFee"
                label="运费(元)">
              </el-table-column> 
              <el-table-column
                align="center"
                prop="isShow"
                label="是否启用">
                  <template slot-scope="scope">
                    <span>{{scope.row.isShow==1 ? '是':'否'}}</span>
                  </template>                
              </el-table-column>  
              <el-table-column 
              align="center"
              width='200'
              prop="id"
              label="操作">
                <template slot-scope="scope">
                  <el-button
                    size="mini"
                    @click="handleEdit(scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row.id)">删除</el-button>
                </template>
              </el-table-column>                            
            </el-table>
        </div>
    </div>
    <div class="reference-con">
      <el-row>
        <el-col :span="24"><h4 class="reference-title">参考范例: <span>(以下模板仅供参考)</span></h4></el-col>
      </el-row>
    </div>

    <div class="temp-con">
      <div class="kls-title">克珞世物流模板副本</div>
      <el-table
        border
        :data="tableData1"
        style="width: 100%">
        <el-table-column
          align="center"
          prop="name"
          label="运费模板">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="运送方式">
            <template slot-scope="scope">
              <p>{{scope.row.name.match(/(\S*)模板/)[1]}}</p>
            </template>          
        </el-table-column>
        <el-table-column
          align="center"
          prop="firstWeight"
          label="首重(KG)">
        </el-table-column>
        <el-table-column
          align="center"
          prop="firstFee"
          label="运费(元)">
        </el-table-column>
        <el-table-column
          align="center"
          prop="addedWeight"
          label="续重(KG)">
        </el-table-column>
        <el-table-column
          align="center"
          prop="addedFee"
          label="运费(元)">
        </el-table-column> 
        <el-table-column
          align="center"
          prop="isShow"
          label="是否启用">
          <template slot-scope="scope">
            <span>{{scope.row.isShow=='1' ? scope.row.isShow='是':scope.row.isShow='否'}}</span>
          </template>
        </el-table-column>                             
      </el-table>
    </div>

  </div>
</template>


<script>
import { Row,Col,Breadcrumb,BreadcrumbItem,Button,Table,TableColumn } from 'element-ui'
export default {
  name: 'issue',
  components: {
    'el-row':Row,
    'el-col':Col,
    'el-breadcrumb':Breadcrumb,
    'el-breadcrumb-item':BreadcrumbItem,
    'el-button':Button,
    'el-table':Table,
    'el-table-column':TableColumn
  },
  data () {
    return {
      loadUse:false,
          tableData1: [{
            name: '中通模板',//运费模板
            firstWeight:1,//首重
            firstFee:"2.00",//首重运费
            addedWeight:3,//续重
            addedFee:"4.00",//续重运费
            isShow:1,//是否启用
          },{
            name: '顺丰快递模板',//运费模板
            firstWeight:5,//首重
            firstFee:"6.00",//首重运费
            addedWeight:7,//续重
            addedFee:"8.00",//续重运费
            isShow:1,//是否启用
          }],
          list:[],
          kuaidisList:[]
    }
  },
  created () {
      this.$store.state.adminleftnavnum="/freight_template"; //设置左侧导航active
  }, 
  mounted(){
    //获取模板列表
      this.loadUse = true
      this.templateList()
      let _this = this
    //获取快递名称
      this.$axios.post(this.$$jk.kuaidisList,{})
        .then(function(response){
            if(response.data.code == "SUCCESS"){
                _this.kuaidisList = response.data.data
                // _this.$store.state.kuaidisList = response.data.data
            }
        })
        .catch(function(error){

        })
  },
  methods: {
      //列表中通过模板id显示模板name
      kuaidiFn(val){
          let name;
          this.kuaidisList.forEach(item => {
            if(item.id == val){
              console.log(item.name)
              name = item.name
            }
          })
          return name;
      },
      templateList(){
        let _this = this
        let id = sessionStorage.getItem('merchantId')
        this.$axios.post(this.$$jk.getContactsByMerchantId,{merchantId:id})
            .then(function(response) {
                if(response.data.code == "SUCCESS"){
                    _this.list = response.data.data 
                }
                setTimeout(()=>{
                  _this.loadUse = false;
                },500)
            })
            .catch(function(error) {
                alert(error);
            }); 
      },
      //编辑(模板id)
      handleEdit(row) {
        this.$router.push({
          path:'/add_template',
          query:row
        })
        console.log(row);
      },
      //删除（模板的id）
      handleDelete(index, id) {
        // rows.splice(index, 1);
        this.loadUse = true
        let _this = this
        this.$axios.post(this.$$jk.delete,{id:id})
            .then(function(response) {
                if(response.data.code == "SUCCESS"){
                    _this.$message({
                    message: '删除成功',
                    type: 'success'
                  }); 
                  _this.templateList()
                }
            })
            .catch(function(error) {
                alert(error);
            }); 
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.temp-con{
  background:#fff;
  padding:15px;
}
.add-temp{
  position: absolute;
  right:15px;
}
.tem-table{
  margin-top:55px;
}
.reference-title{
  font-size:18px;
  font-weight:normal;
  color:#f83c37;
}
.reference-con{
  background:#fff;
  padding:15px;
}
.reference-title>span{
  color:#818181;
}
.kls-title{
    border: 1px solid #ebeef5;
    padding: 10px;
    border-bottom: 0;
    color: #6a8ec3;
}
</style>
  
