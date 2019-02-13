<template>
  <div class="list">

    <div class="source">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">商家中心</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="form-con">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="创建时间">
          <el-col :span="24">
              <!-- <el-date-picker
                value-format="yyyy-MM-dd"
                v-model="formInline.timevalue"
                type="daterange"
                align="right"
                :editable="false"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions2">
              </el-date-picker> -->
              <el-date-picker
                value-format="yyyy-MM-dd hh:mm:ss"
                v-model="formInline.timevalue"
                type="datetimerange"
                align="right"
                :editable="false"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="商品名称">
          <el-input v-model="formInline.productName" placeholder="请输入商品名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">查询</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="tabs-con">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="出售中的商品" name="1"></el-tab-pane>
        <el-tab-pane label="仓库中的商品" name="0"></el-tab-pane>
        <el-tab-pane label="违规商品" name="2"></el-tab-pane>
        <!-- <el-tab-pane label="审核中的商品" name="4"></el-tab-pane> -->
      </el-tabs>
    </div>

    <div class="table-con">
      <el-table
        ref="multipleTable"
        :data="list"
        tooltip-effect="dark"
        style="width: 100%"
        @row-click="tableCurrentChange"
        @selection-change="handleSelectionChange"
        v-loading="loadUse">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="goodsImage"
          label="展示图">
          <template slot-scope="scope">
            <img height="60" width="60" :src="scope.row.goodsImage" alt="">
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          width="150"
          label="商品名称">
          <template slot-scope="scope">
            <el-button style="white-space:normal;word-warp:break-word;word-break:break-all;line-height:26px" type="text" v-text="scope.row.name" @click="detail(scope.row.id)"></el-button>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="commission"
          label="分佣">
        </el-table-column> -->
        <el-table-column
          prop="price"
          label="价格">
        </el-table-column>
        <el-table-column
          prop="stocks"
          property="stocks"
          label="库存">
          <!-- <template slot-scope="scope">
              <el-input v-model="scope.row.stocks"></el-input>
              <el-button size="mini" type="primary">添加</el-button>
          </template> -->
          <template slot-scope="scope">
            <!-- <span v-show="stocksFlag">{{scope.row.stocks}}</span> -->
            <!-- <el-input v-show="!stocksFlag" v-model="scope.row.stocks"></el-input> -->
            <span>{{scope.row.stocks}}</span>
            <el-button type="text" size="small" @click="mdf(scope.row.stocks,scope.row.id)"> <i class="el-icon-edit"></i> </el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="addTime"
          width="200"
          label="上架时间">
        </el-table-column>
        <el-table-column
          prop="isShow"
          label="状态">
          <template slot-scope="scope">
            <p>{{scope.row.isShow==1?'上架':scope.row.isShow==0?'下架':'待上架'}}</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="isShow"
          label="操作状态">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="putaway(scope.row.isShow,scope.row.id)">{{scope.row.isShow==1?'下架':scope.row.isShow==0?'上架':'上架'}}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click.native.prevent="relevance(scope.$index, scope.row)">关联分类</el-button>
            <el-button type="text" size="mini" v-show="scope.row.isShow==0" @click.native.prevent="editor(scope.row)">编辑</el-button>
            <el-button type="text" size="mini" @click.native.prevent="deleteRow(scope.row.id)">删除</el-button>
            <el-dialog title="修改库存" :visible.sync="dialogFormVisible" :modal="false">
              <el-form>
                <el-form-item label="库存数" :label-width="formLabelWidth">
                  <el-input v-model="formstocks" type="number" @focus="formstocksF"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click.native="dialogFormVisible = false,loadUse=false">取 消</el-button>
                <el-button type="primary" @click="okmdf()" :disabled="disabledBtn">确 定</el-button>
              </div>
            </el-dialog>
          </template>
        </el-table-column>
      </el-table>
      <div class="btn-all">
        <el-button type="primary" v-show="this.isShelves!=1" v-if="this.activeName==='0'?this.batchText='上架':this.batchText='下架'" @click.native="batchPut()" :disabled="this.sels.length === 0">批量{{batchText}}</el-button>
        <!-- <el-button type="primary" v-if="this.activeName==='1'" :disabled="this.sels.length === 0">批量下架</el-button> -->
        <el-button type="warning" @click.native="allDelFn" :disabled="this.sels.length === 0">批量删除</el-button>
      </div>
    </div>

    <el-dialog title="关联商品分类" :visible.sync="dialogTreeVisible">
        <dl class="dl-con" v-for="(item,itemIndex) in treedata" :key="itemIndex">
          <dd class="dd-head">{{item.goodsMerchantCategories.name}}</dd>
          <dt class="dt-body" v-for="(sublist,subIndex) in item.goodsMerchantCategoriesDetailList" :key="subIndex">
            <el-checkbox :label="sublist.id"
            :checked="sublist.status===1?true:false" v-model="goodsMerchantCategoryIds">{{sublist.name}}</el-checkbox>
          </dt>
        </dl>
      <el-button type="primary" @click="getCheckedNodes" :label="okid" style="margin-top:15px;">保 存</el-button>
    </el-dialog>

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
import { Row,Col,Dialog,Button,Breadcrumb,BreadcrumbItem,DatePicker,Form,FormItem,
Input,Tabs,TabPane,Table,TableColumn,MessageBox,Message,Tree, Pagination, Checkbox} from 'element-ui'
export default {
  name: 'issue',
  components: {
    MessageBox,
     Message,
    'el-row':Row,
    'el-col':Col,
    'el-dialog':Dialog,
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
    'el-tree':Tree,
    'el-pagination':Pagination,
    'el-checkbox':Checkbox
  },
  data () {
    //this.$router.replace('/product_list')
    // this.$router.replace({
    //   path: '/home',
    // })
    //then replace your route (with same component)
    // this.$router.replace({
    //   path: '/product_list'
    // })
    return {
      goodsMerchantCategoryIds:[],//商品分类集合
      disabledBtn:false,//库存确定按钮的disabled
      loadUse:true,//过渡效果
      startTime:'',
      endTime:'',
      isShow:1,//是否上架
      isShelves:0,//是否违规下架
      batchText:'',
      sels:[],//table中checkbox选中的值显示
      pageNum:1,//当前页
      pageSize:5,//每页5条
      total:0,//总页数
      stocksFlag:true,//库存的编辑状态
      treeStructure: true,
      dialogTreeVisible:false,//关联分类弹窗开关
      treedata:[],
        dialogFormVisible: false,//弹窗隐藏
        formLabelWidth: '60px',
        formstocks:0,//库存数量
        formstocksId:'',//库存id
        okid:'',
        list:[],
        formInline: {
          timevalue:'',//时间
          productName:'',//商品名称
        },
        activeName:'1',
        // pickerOptions2: {
        //   disabledDate(time) {
        //     return time.getTime() > Date.now();
        //   },
        //   shortcuts: [{
        //     text: '最近一周',
        //     onClick(picker) {
        //       const end = new Date();
        //       const start = new Date();
        //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        //       picker.$emit('pick', [start, end]);
        //     }
        //   }, {
        //     text: '最近一个月',
        //     onClick(picker) {
        //       const end = new Date();
        //       const start = new Date();
        //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        //       picker.$emit('pick', [start, end]);
        //     }
        //   }, {
        //     text: '最近三个月',
        //     onClick(picker) {
        //       const end = new Date();
        //       const start = new Date();
        //       start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        //       picker.$emit('pick', [start, end]);
        //     }
        //   }]
        // }

    }
  },
  computed:{

  },
  created () {
      this.$store.state.adminleftnavnum="/product_list"; //设置左侧导航active
  },
  mounted(){
      let _this = this
      // 接收路由传过来的参数
      let pstate = this.$route.query.pState//1:出售中的商品；2：仓库中的商品；3：违规商品
      // console.log(pstate)
      if(pstate){
        this.activeName = pstate
        if(pstate == 2){
          this.isShow = 0
          this.isShelves = 1
        }else{
          this.isShow = pstate
          this.isShelves = 0
        }
      }
      this.listFn(this.pageNum,this.pageSize,this.isShow,this.isShelves)//默认显示上架商品
  },
  methods: {
    formstocksF(){
      this.disabledBtn = false
    },
    //获取商品列表
    //分页页码*，每页显示条数*，是否上架*，是否违规下架，开始时间，结束时间，商品名
    listFn(){
      let _this=this
      let trans = {
        pageNum:this.pageNum,
        pageSize:this.pageSize,
        isShow:this.isShow,
        isShelves:this.isShelves,
        startDate:this.startTime,
        endDate:this.endTime,
        name:this.formInline.productName
      }
      //this.$axios.post(this.$$jk.getMerchantGoodsList,trans)
      this.$axios.post('getMerchantGoodsList',trans)
          .then(function(response) {
              if(response.data.code == "SUCCESS"){
                let r = response.data.data
                _this.total = r.total
                _this.list = r.list
              }
              setTimeout(() => {
                _this.loadUse = false
              }, 500);
          })
          .catch(function(error) {
              alert(error);
          });

    },
    //跳转商品详情页
    detail(id){
      window.open(process.env.businessHost.host+'/'+process.env.businessHost.projectName+'/#/goods_detail?id='+id)
    },
    //上架
    putaway(isShow,id){
      this.loadUse = true
      let _this = this
      if(id instanceof Object){
          id = JSON.stringify(id)
      }else{
          id = JSON.stringify([id])
      }
      // return false;
      if(isShow == 1){//下架操作
        this.isShow = 1
        this.$axios.post(this.$$jk.undercarriageGoods,{goodsIds:id})
            .then(function(response) {
                if(response.data.code == "SUCCESS"){
                  setTimeout(() => {
                      _this.listFn()
                      _this.$message({
                        type: 'success',
                        message: '下架成功!'
                      });
                  }, 1000);
                }
            })
            .catch(function(error) {
                alert(error);
            });

      }else{//上架操作
        this.isShow = 0
        this.$axios.post(this.$$jk.shelvesGoods,{goodsIds:id})
            .then(function(response) {
                if(response.data.code == "SUCCESS"){
                  setTimeout(() => {
                      _this.listFn()
                      _this.$message({
                        type: 'success',
                        message: '上架成功!'
                      });
                  }, 1000);
                }
            })
            .catch(function(error) {
                alert(error);
            });
      }
    },
    //pageSize事件
    handleSizeChange(val){
        this.loadUse = true
        this.pageSize = val
        this.listFn()
    },
    //pageNum事件
    //分页页码*，每页显示条数*，是否上架*，是否违规下架，开始时间，结束时间，商品名
    handleCurrentChange(val){
      this.loadUse = true
      this.pageNum = val
      this.listFn()
    },
    //列表--编辑
    editor(row){
        this.$router.push({path:'/editor',query:{goodsId:row.id}})
    },
    //关联商品分类--保存(商品id，分类id的集合)
    getCheckedNodes() {
      let _this =this
      // console.log(this.goodsMerchantCategoryIds)
      // console.log(this.goodsMerchantCategoryIds.length)
      let ids
      if(this.goodsMerchantCategoryIds.length>0){
        ids = this.goodsMerchantCategoryIds.join(",")
      }else{
        ids=''
      }
      this.$axios.post(this.$$jk.addGoodsMerchantCategoryIndices,{goodsId:this.okid,goodsMerchantCategoryIds:ids})
            .then(function(response) {
                if(response.data.code == "SUCCESS"){
                  _this.dialogTreeVisible = false
                  _this.$message({
                    message:'保存成功',
                    type:'SUCCESS'
                  })
                }
            })
            .catch(function(error) {
                alert(error);
            });
   },
    //关联分类
    relevance(index, row) {
        let _this = this
        this.goodsMerchantCategoryIds = []
        // this.$refs.tree.setCheckedKeys([]);//清空树
        this.dialogTreeVisible = true//打开弹窗
        this.okid = row.id
        console.log(this.okid)
        this.treedata = []
        this.$axios.post(this.$$jk.getGoodsMerchantCategoriesDetail,{goodsId:this.okid})
          .then(function(response) {
              if(response.data.code == "SUCCESS"){
                let r = response.data.data
                _this.treedata = r
              }
          })
          .catch(function(error) {
              alert(error);
          });
    },

    handleEdit:function(row){
        //遍历数组改变editeFlag
    },
    handleSave:function(row){
        //保存数据，向后台取数据
    },
    //修改库存数量-修改按钮(数量，id)
    mdf(stocks,id) {
      this.disabledBtn = false
      this.stocksFlag = false;
      this.dialogFormVisible = true
      this.formstocks = stocks
      this.formstocksId = id
    },
    //修改库存数量-确定按钮
    okmdf(){
        this.disabledBtn = true
        let _this = this
        var re = /^[0-9]+$/
        if(!this.formstocks || !re.test(this.formstocks)){
          this.$message({
            message:'库存应该为整数',
            type:'warning'
          })
          return false;
        }
        this.loadUse = true
        this.$axios.post(this.$$jk.updateGoodsStork,{goodsId:this.formstocksId,stork:this.formstocks})
            .then(function(response) {
                if(response.data.code == "SUCCESS"){
                    setTimeout(() => {
                      _this.dialogFormVisible = false
                      _this.listFn()
                      _this.disabledBtn = false
                    }, 1000);

                }

            })
            .catch(function(error) {
                alert(error);
            });

    },
    //删除
    deleteRow(id) {
          // rows.splice(index, 1);
        let _this = this
        this.loadUse = true
        if(id instanceof Object){
            id = JSON.stringify(id)
        }else{
            id = JSON.stringify([id])
        }
        this.$axios.post(this.$$jk.delGoods,{goodsIds:id})
            .then(function(response) {
                if(response.data.code == "SUCCESS"){
                    _this.$message({
                      message:'删除成功',
                      type:'warning'
                    })
                    setTimeout(() => {
                       _this.listFn()
                       _this.loadUse = true
                    }, 1000);
                }
            })
            .catch(function(error) {
                alert(error);
            });
    },
    add(scope1){
      console.log(scope1)
    },
    //批量上架
    batchPut(){
        this.loadUse = true
        var ids = this.sels.map(item => item.id)
        console.log(this.activeName,ids,typeof ids)
        this.putaway(this.activeName,ids)
    },
    //批量删除
    allDelFn(){
      this.loadUse = true
      var ids = this.sels.map(item => item.id)
      this.deleteRow(ids)
    },
    tableCurrentChange(row, event, column) {
      // console.log(row)
      // console.log(event)
      // console.log(column)
        // this.$refs.table.toggleRowSelection(row)
    },
    //table中checkbox选中
    handleSelectionChange(sels) {
        this.sels = sels;
    },
    //tab事件（出售中的商品/仓库中的商品/违规商品）
    handleClick(tab, event) {
      this.loadUse = true
      this.pageNum = 1
      if(tab.name == "0"||tab.name == "1"){
        this.isShow = tab.name
        this.isShelves = 0
      }else{
        this.isShelves = 1
        this.isShow = 0
      }
      this.listFn()
    },
    //查询
    onSearch(){
      this.loadUse = true
      let id = sessionStorage.getItem('merchantId')
      if(this.formInline.timevalue){
        this.startTime = this.formInline.timevalue[0]
        this.endTime = this.formInline.timevalue[1]
      }else{
        this.startTime = ''
        this.endTime = ''
      }
      this.listFn()
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
  padding:15px;
}
.table-con{
  background:#fff;
  padding:0 15px;
}
.btn-all{
  background:#fff;
  padding:15px;
}
.dl-con{
  margin-bottom:15px;
}
.dd-head{

}
.dt-body{
  margin-left:20px;
}
</style>

