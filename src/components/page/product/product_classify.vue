<template>
  <div class="category">
    <!-- 标题 -->
    <div class="source">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">商家中心</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- 分类按钮 -->
    <div class="add-btn">
      <el-button type="primary" @click="addCategoriesListMt()">添加分类</el-button>
    </div>
    <!-- 新增分类 -->
    <el-dialog :title="(isEditState ? '编辑' : '添加')+'商品分类'" :visible.sync="isShowDialog" :modal="false">
       <template v-if="isShowDialog">
         <el-form :model="myForm" :rules="rules" ref="myForm" label-width="120px">
           <el-form-item label="父级分类" prop="categoryId">
             <el-select v-model="myForm.categoryId" @change="chanegCategoryMt"
             :disabled = "isDisabled" placeholder="请选择活动区域">
              <el-option
               :key='0'
               :value="0"
               label="顶级分类">
              </el-option>
              <el-option
                v-for='item in oneCategoryList'
                :key='item.id'
                :value="item.name"
                :label="item.name">
              </el-option>
             </el-select>
           </el-form-item>
           <el-form-item label="分类名" prop="categoryName">
             <el-input v-model="myForm.categoryName" auto-complete="off"></el-input>
           </el-form-item>
           <el-form-item label="展示" prop="showState">
             <el-radio-group v-model="myForm.showState">
               <el-radio :label="1">是</el-radio>
               <el-radio :label="0">否</el-radio>
             </el-radio-group>
           </el-form-item>
           <el-form-item>
             <el-button @click="cancelFormMt('myForm')">取 消</el-button>
             <el-button type="primary" @click="submitFormMt('myForm')">确 定</el-button>
           </el-form-item>
         </el-form>
       </template>
    </el-dialog>
    <!-- 分类列表 -->
    <el-table
    :data="allcCategoriesList"
    border
    v-loading="loadUse"
    style="width:100%"
    :row-style="showTrMt">
     <el-table-column v-for="(item,index) in myColumn"
     :width="item.width"
     :label="item.label"
     :key="index">
      <template slot-scope="scope">
        <template v-if="item.rowName == 'index'">
          <template v-if="scope.row.dpath == 1">
            <template v-if="scope.row.child.length">
              <span class="openTree" @click="handleTreeMt(scope)">+</span>
            </template>
            <template v-else>
              <span class="openTree">-</span>
            </template>
          </template>
          <template v-if="scope.row.dpath == 2">
            <span class="openTree" style="margin-left:28px;">-</span>
          </template>
        </template>
        <template v-if="item.rowName == 'name'">
          {{scope.row.name}}
        </template>
        <template v-if="item.rowName == 'isShow'">
          {{scope.row.isShow ? '是' : '否'}}
        </template>
        <template v-if="item.rowName == 'id'">
          <template v-if="scope.row.dpath == 1">
                <span class="linkCur" @click="editCategoriesListMt(scope)">编辑</span>
                <span class="linkCur" @click="delFirstGoodsMerchantCategoriesMt(scope)">删除</span>
          </template>
          <template v-if="scope.row.dpath == 2">
                <span class="linkCur" @click="editCategoriesListMt(scope)">编辑</span>
                <span class="linkCur" @click="delFirstGoodsMerchantCategoriesMt(scope)">删除</span>
                <span class="linkCur" @click="relevanceFn(scope.row.id)">已关联的商品</span>
          </template>
        </template>
      </template>
     </el-table-column>
    </el-table>
    <!-- 已关联的商品弹窗 -->
    <el-dialog title="关联商品分类" :visible.sync="dialogRelevance" width="60%">
      <el-table :data="gridData">
        <el-table-column
          prop="goodsImage"
          label="展示图">
          <template slot-scope="scope">
            <img style="max-height:60px;" :src="scope.row.goodsImage" alt="">
          </template>
        </el-table-column>
        <el-table-column property="name" label="商品名称"></el-table-column>
        <el-table-column property="price" label="价格"></el-table-column>
        <el-table-column
          prop="stocks"
          property="stocks"
          label="库存">
        </el-table-column>
        <el-table-column
          prop="addTime"
          width="200"
          label="上架/下架时间">
        </el-table-column>
        <el-table-column
          prop="isShow"
          label="状态">
          <template slot-scope="scope">
            <p>{{scope.row.isShow==1?'上架':scope.row.isShow==0?'下架':'待上架'}}</p>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button type="danger" @click.native.prevent="deleteRow(scope.row.id)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    <!-- 分页 -->
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
    </el-dialog>

  </div>
</template>

<script>
import { Row,Col,Button,Breadcrumb,BreadcrumbItem,Dialog,Form,FormItem,Select,
Option,Input,RadioGroup,Radio,Table,TableColumn, Pagination } from 'element-ui'

function flattenDeep(data) {
    let tempArr = [];

    Array.from(data).forEach(function (record) {
        tempArr.push(record);
        if(record.parentId != 0) {
          record = Object.assign(record,{isExend:false})
        }

        if (record.child && record.child.length > 0 ) {
          let child = flattenDeep(record.child);
          tempArr = tempArr.concat(child);
        }
    });

    return tempArr;
}

export default {
  name: 'product_classify',
  components: {
   'el-row':Row,
   'el-col':Col,
   'el-button':Button,
   'el-breadcrumb':Breadcrumb,
   'el-breadcrumb-item':BreadcrumbItem,
   'el-dialog':Dialog,
   'el-form':Form,
   'el-form-item':FormItem,
   'el-option':Option,
   'el-select':Select,
   'el-input':Input,
   'el-radio-group':RadioGroup,
   'el-radio':Radio,
   'el-table':Table,
   'el-table-column':TableColumn,
   'el-pagination':Pagination
  },
  data () {
    return {
      loadUse:false,
      pageNum:1,//当前页
      pageSize:5,//页码
      total:0,//总页数
      dialogRelevance:false,//关联商品分类弹窗开关
      goodsMerchantCategoryId:'',//当前二级分类的id
      gridData:[],//关联商品分类表格
      // gridData:[{
      //   goodsImage:'http://g.hiphotos.baidu.com/image/pic/item/b58f8c5494eef01fcca8beccecfe9925bc317d7f.jpg',
      //   name:'商品name',
      //   price:'1000.00',
      //   stocks:'10',
      //   time:'2018-03-07 17:44:45',
      //   isShow:1
      // }],//关联商品分类表格
      myForm: {
        id:'',
        categoryId:'0',//分类当前类别 默认顶级分类
        categoryName: '',//分类名
        dpath:'',//是否深度 //1|2
        showState:'',//显示状态
      },
      rules: {
        categoryName: [//分类名
          { required: true, message: '请输入分类名，最多20个字', trigger: 'blur' },
          { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
        ],
        categoryId: [
          { required: true, message: '请选择分类名称', trigger: 'blur click' }
        ],
        showState: [
          { required: true, message: '请选择显示状态', trigger: 'click' }
        ]
      },
      myColumn:[{
        label:'选择',
        width:'100',
        rowName:'index'
      },
      {
        label:'分类名',
        rowName:'name'
      },
      {
        label:'是否显示',
        rowName:'isShow'
      },
      {
        label:'操作',
        width:'240',
        rowName:'id'
      }],
      oneCategoryList:[],//一级分类
      isShowDialog: false,
      loading:false,
      allcCategoriesList:[],//分类列表
      isEditState:false,
      isDisabled:false//是否禁用分类选择框
    }
  },
  methods: {
    handleSizeChange(val){
      this.pageSize = val
      this.relevanceFn(this.goodsMerchantCategoryId)
    },
    handleCurrentChange(val){
        this.pageNum = val
        this.relevanceFn(this.goodsMerchantCategoryId)
    },
    //移除(商品id，二级分类id)
    deleteRow(id){
        let _this = this
        this.$axios.post(this.$$jk.removeGoodsFromGoodsMerchantCategory,{goodsId:id,goodsMerchantCategoryId:this.goodsMerchantCategoryId})
          .then(function(response) {
              if(response.data.code == "SUCCESS"){
                _this.$message({
                  message:'删除成功',
                  type:"SUCCESS"
                })
                _this.relevanceFn(_this.goodsMerchantCategoryId)
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
    //已关联的商品
    relevanceFn(id){//二级分类id
        let _this = this
        this.goodsMerchantCategoryId = id
        this.$axios.post(this.$$jk.getMerchantCategoriesGoods,{merchantCategoriesId:id,pageNum:this.pageNum,pageSize:this.pageSize})
          .then(function(response) {
              if(response.data.code == "SUCCESS"){
                _this.dialogRelevance = true
                let r = response.data.data
                _this.total = r.total
                _this.gridData = r.list
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
    showTrMt (obj) {
      return obj.row.parentId != 0 && obj.row.isExend == false ? 'display:none' : '';
    },
    handleTreeMt (scope) {
      let isExend = scope.row.child[0]['isExend'];

      Array.isArray(scope.row.child)
      && scope.row.child.forEach((val,index,arr) => {
        val.isExend = !isExend;
      })
    },
    getOneCategoriesMt () {
      // this.$axios.post(this.$$jk.oneCategory)
      this.$axios.post('oneCategory')
      .then((response) => {
        if(response && response.data && response.data.code == "SUCCESS"){
           this.oneCategoryList = response['data']['data'];
        }else{
          this.$message({
            message:response.data.remark,
            type:'warning'
          })
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    submitFormMt (formName) {
      let myForm = this.myForm,
          jkUrl = '',
          data = {};

      if(!this.isEditState){//添加
        jkUrl = this.$$jk.goodsCategoriesSave;
        data = {
           parentId:myForm.categoryId == '顶级分类' ? 0 : myForm.categoryId,
           isShow:myForm.showState,
           name:myForm.categoryName
         }
      }else{//编辑
        jkUrl = this.$$jk.goodsCategoriesUpdate;

        if(this.myForm && (this.myForm.categoryId > -1)){
          data = {
             parentId:this.myForm.categoryId,
             id:this.myForm.id,
             isShow:myForm.showState,
             name:myForm.categoryName
          }
        }else{
          this.$message({
            message:'父级分类id不存在'
          })
          return;
        }
      }

      if(jkUrl == '') return;
      this.$refs[formName].validate((valid) => {
        if(valid) {
          //  this.loadUse = true
          //  this.$axios.post(jkUrl,data)
          this.$axios.post('flag',data)
           .then((response) => {
             if(response && response.data && response.data.code == "SUCCESS"){
               this.$message({
                 message:this.isEditState ? '修改成功' : '添加成功',
                 type:'success'
               })
              //  this.myForm = {
              //   id:'',
              //   categoryId:'',//分类当前类别 默认顶级分类
              //   categoryName:'',//分类名
              //   showState:''//显示状态
              //  }
               this.isShowDialog = false;
               this.isEditState = false;
               console.log(this.myForm.categoryId)
               this.allcCategoriesList.push({name:this.myForm.categoryId})
              //  this.getAllGoodsMerchantCategoriesMt();
             }else{
              this.$message({
               message:response.data.remark,
               type:'warning'
              })
             }
           })
           .catch(function(error) {
             console.log(error);
           });
        }
      })
    },
    cancelFormMt (formName) {
      this.isShowDialog = false;
      this.$refs[formName].resetFields();
    },
    getAllGoodsMerchantCategoriesMt () {
      let storeId = sessionStorage.getItem('merchantId');
      let _this = this
      if(!(Number(storeId) > -1)){
        this.$message({
          message:'merchantId未获取到',
          type:'error'
        })
        return;
      }
      // this.$axios.post(this.$$jk.getAllGoodsMerchantCategories,{storeId:storeId})
      this.$axios.post('getAllGoodsMerchantCategories',{storeId:storeId})
      .then((response) => {
        if(response && response.data && response.data.code == "SUCCESS"){
          let data = response['data']['data'],
              newArr = [];
          //数据json转换转换
          data.forEach((val,index,arr) => {
            let obj = {};
            obj = val['goodsMerchantCategories'];
            obj['child'] = val['goodsMerchantCategoriesList'];
            newArr.push(obj);
          })
          _this.allcCategoriesList.push(...flattenDeep(newArr));
        }else{
         _this.$message({
            message:response.data.remark,
            type:'warning'
         })
        }
        setTimeout(()=>{
          _this.loadUse = false;
        },500)
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    addCategoriesListMt () {
      this.isShowDialog = true;
      this.isDisabled = false;
      this.myForm = {
       categoryId:'顶级分类',//分类当前类别 默认顶级分类
       categoryName:'',//分类名
       showState:'',//显示状态
      }
      this.getOneCategoriesMt();
      this.isEditState = false;
    },
    //编辑
    editCategoriesListMt (scope) {
      this.isShowDialog = true;
      this.isDisabled =  scope.row.dpath == 1 ? true : false;
      this.getOneCategoriesMt();
      this.isEditState = true;

      this.$axios.post(this.$$jk.getGoodsMerCate,{id:scope.row.id})
      .then((response) => {
        if(response && response.data && response.data.code == "SUCCESS"){
          let data = response['data']['data'];

          this.myForm = {
            id:data.id,
            categoryId:data.parentId,//分类当前类别 默认顶级分类
            categoryName:data.name,//分类名
            showState:data.isShow,//显示状态
          }
        }else{
          this.$message({
            message:response.data.remark,
            type:'warning'
          })
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    //删除
    delFirstGoodsMerchantCategoriesMt (scope) {
        let jkUrl = scope.row.dpath == 1 ? this.$$jk.delFirstGoodsMerchantCategories : this.$$jk.delSecondGoodsMerchantCategories;
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loadUse = true
          this.$axios.post(jkUrl,{goodsMerchantCategoriesId:scope.row.id})
          .then((response) => {
            if(response && response.data && response.data.code == "SUCCESS"){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getAllGoodsMerchantCategoriesMt();
            }else{
              this.$message({
                message:response.data.remark,
                type:'warning'
              })
            }
          })
          .catch(function(error) {
            console.log(error);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    },
    chanegCategoryMt (e){
      e ? this.myForm.categoryId = e : '';
    }
  },
  created () {
    this.$store.state.adminleftnavnum="/product_category";
  },
  mounted () {
    this.loadUse = true
    this.getAllGoodsMerchantCategoriesMt();
  }
}
</script>

<style scoped>
.add-btn{
  background:#fff;
  margin-bottom:20px;
  padding:15px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.dialog-footer{
  text-align:center;
}
.linkCur{
  color:#337ab7;
  cursor:pointer;
}
.openTree{
  display:inline-block;
  width:28px;
  height:22px;
  text-align:center;
  line-height:22px;
  font-size:26px;
  cursor:pointer;
}
</style>