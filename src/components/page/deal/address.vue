<template>
  <div class="list">

    <div class="source">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">商家中心</el-breadcrumb-item>
        <el-breadcrumb-item>{{addressText}}地址</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="add-con">
      <div style="padding:80px 0;text-align:center;" v-show="hintShow">
        <span class="address-icon">你还没有编辑任何{{addressText}}地址，点击以下按钮新建</span>
      </div>
      <el-button v-if="addressData.length<21" type="primary" class="add-btn" 
      @click="addFn"><i class="el-icon-plus"></i> 新建{{addressText}}地址</el-button>
    </div>
    
    <el-dialog :title="dialogTitle" :visible.sync="addressFormVisible" width="60%">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="expressForm">
        <el-form-item label="联系人:" :label-width="formLabelWidth" prop="contact">
          <el-input v-model="ruleForm.contact" placeholder="请输入联系人姓名（最多20字）"></el-input>
        </el-form-item>
        <!-- <el-form-item label="所在地区:" :label-width="formLabelWidth">
          <el-select v-model="ruleForm.city" placeholder="">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
				<el-form-item>
          <label class="self-label" for=""><span style="color:red">* </span>所在地区:</label>
          <div style="width:calc(100% - 120px);margin-left:120px;">
              <el-col :span="8">
                <el-form-item prop="provinceId">
                    <el-select v-model="ruleForm.provinceId" placeholder="请选择省" @change="changeProv">
                      <el-option v-for="(prov,index) in provs" :label="prov.name" :key="index" :value="prov.id"></el-option>
                    </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="cityId">
                  <el-select v-model="ruleForm.cityId" placeholder="请选择市" @change="changeCity">
                    <el-option v-for="(city,index) in citys" :label="city.name" :key="index" :value="city.id"></el-option>
                  </el-select>  
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item prop="areaId">
                  <el-select v-model="ruleForm.areaId" placeholder="请选择区">
                    <el-option v-for="(area,index) in areas" :label="area.name" :key="index" :value="area.id"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>            
          </div>
				</el-form-item>
        <el-form-item label="详细地址:" :label-width="formLabelWidth" prop="areaInfo">
          <el-input v-model="ruleForm.areaInfo" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-col :span="12">
            <el-form-item label="手机号码:" :label-width="formLabelWidth" prop="mobile">
              <el-input v-model="ruleForm.mobile" auto-complete="off" type="number"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话号码:" :label-width="formLabelWidth" prop="tele">
              <el-input v-model="ruleForm.tele" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="邮政编码:" :label-width="formLabelWidth" prop="postcodes">
          <el-input v-model="ruleForm.postcodes" auto-complete="off" type="number"></el-input>
        </el-form-item>
        <el-form-item label="是否设置为默认地址:">
            <el-radio-group v-model="ruleForm.isDefault">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0" :disabled="isDefaultShow" v-if="addressData.length!=0">否</el-radio>
            </el-radio-group>          
        </el-form-item>       
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('ruleForm')">保存{{addressText}}地址</el-button>
        <el-button type="warning" @click="resetForm('ruleForm')">重置</el-button>
        <el-button @click="cancelForm('ruleForm')">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 地址list -->
    <div class="address-list-con">
        <h3 class="add-list-title">您已创建{{addressData.length}}个{{addressText}}地址，最多可创建<span>20</span>个</h3>
        <el-row v-loading="loadUse">
          <el-col :span="8" class="address-col" v-for="(item,index) in addressData" :key="index">
            <el-card :class="item.isDefault==1?'box-card':''">
              <div slot="header" class="clearfix">
                <span class="header-title">测试账户</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="delAddress(item.id)" v-if="item.isDefault!=1">删除</el-button>
                <!-- <el-button style="float: right; padding: 3px 0" type="text" @click="delAddress(item.id)">删除</el-button> -->
                <el-button style="float: right; padding: 3px 15px" type="text" @click="editorFn(item,item.isDefault)">编辑</el-button>
                <el-button v-if="item.isDefault!=1" style="float: right; padding: 3px 0" type="text" @click="defaultAddress(item.id)">设为默认地址</el-button>
              </div>
              <ul class="address-ul">
                <li><span>联系人: </span>{{item.contact}}</li>
                <li><span>地址: </span>{{item.areaInfo}}</li>
                <li><span>邮政: </span>{{item.postcodes}}</li>
                <li><span>电话: </span>{{item.tele}}</li>
                <li><span>手机: </span>{{item.mobile}}</li>
              </ul>
            </el-card>
          </el-col>
        </el-row>
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
import { Row,Col,Button,Breadcrumb,BreadcrumbItem,
Form,FormItem,Input,Select,Option,RadioGroup,Radio,Dialog,Card, Pagination} from 'element-ui'
const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
const phone = /^0\d{2,3}-?\d{7,8}$/
var checkTel = (rule, val,callback)=>{
  if(!val){
    callback(val = '')
  }else if(!phone.test(val) && !reg.test(val)){
    callback(new Error('请输入有效的电话号码'))
  }else{
    callback()
  }
}
var validMobile=(rule, val,callback)=>{
    if (!val){
        callback(new Error('请填写手机号'))
    }else  if (!reg.test(val)){
      callback(new Error('请输入正确的11位手机号码'))
    }else {
      callback()
    }
}
export default {
  name: 'issue',
  components: {
    'el-row':Row,
    'el-col':Col,
    'el-button':Button,
    'el-breadcrumb':Breadcrumb,
    'el-breadcrumb-item':BreadcrumbItem,
    'el-form':Form,
    'el-form-item':FormItem,
    'el-input':Input,
    'el-select':Select,
    'el-option':Option,
    'el-radio-group':RadioGroup,
    'el-radio':Radio,
    'el-dialog':Dialog,
    'el-card':Card,
    'el-pagination':Pagination
  },
  data () {
      return {
        hintShow:false,
        loadUse:false,
        isDefaultShow:false,//默认地址的否是否显示
        isSend:1,//1：收货；2，退货
        addressId:'',//地址id
        addressData:[],//收发货地址列表
        pageNum:1,//当前页
        pageSize:5,//每页的条目数
        total:0,//总页数
        addressText:'',//发货/退货 文本切换
        dialogTitle:'',//填写发货/退货地址
        addressFormVisible:false,//弹窗隐藏
        formLabelWidth: '120px',//弹窗宽度
        ruleForm: {
          contact: '',//联系人
          provinceId:'',//省
          cityId: '',//市
          areaId:'',//区
          areaInfo: '',//详细地址
          mobile: '',//手机号码
          tele: '',//电话号码
          postcodes:'',//邮政编码
          isDefault:1//是否为默认地址
        },
        provs:[],
        citys:[],
        areas:[],
        rules: {
          provinceId:[
            { required: true, message: '请选择省', trigger: 'blur' },
          ],
          cityId:[
            { required: true, message: '请选择市', trigger: 'blur' },
          ],
          areaId:[
            { required: true, message: '请选择区', trigger: 'blur' },
          ],          
          contact: [
            { required: true, message: '请输入联系人姓名（最多20字）', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],
          areaInfo:[
            { required: true, message: '请填写详细地址', trigger: 'blur' }
          ],
          mobile:[
            //  { required: true, message: '请填写手机号码', trigger: 'blur' },
            //  { min: 11, max: 11, message: '长度11个字符', trigger: 'blur' }   
            {required:true,validator:validMobile,trigger:'blur'}        
          ],
          postcodes:[
            { required: true, message: '请填写邮政编码', trigger: 'blur' }
          ],
          tele:[
            {validator:checkTel,trigger: 'blur'} 
          ]
        }
      };
  },
  created () {
      this.$store.state.adminleftnavnum=this.$route.path; //设置左侧导航active
      this.changeRoute()
  }, 
  mounted(){
    let _this = this
    //省
    this.$axios.post(this.$$jk.getAllProvince,{})
        .then(function(response) {
            if(response.data.code == "SUCCESS"){
              _this.provs = response.data.data;
            }
        })
        .catch(function(error) {
            alert(error);
        });              
  },
　watch:{
    "$route":"changeRoute"//监听路由事件
  },
  methods: {
    //默认地址
    defaultAddress(id){//地址id
    let _this = this
        this.$axios.post(this.$$jk.updateAddrsToDefaultById,{id:id,isSend:this.isSend})
          .then(function(response) {
              if(response.data.code == "SUCCESS"){
                  _this.$message({
                    message:'默认地址设置成功',
                    type:'SUCCESS'
                  })
                  _this.addressLists()
              }
          })
          .catch(function(error) {
              alert(error);
          });         
    },
    //编辑
    editorFn(item,isDefault){
      if(isDefault == 1){
        this.isDefaultShow = true
      }else{
        this.isDefaultShow = false
      }
      this.addressId = item.id
      this.addressFormVisible = true;
      this.changeProv(item.provinceId)
      this.changeCity(item.cityId) 

      this.ruleForm.contact = item.contact
      this.ruleForm.provinceId = item.provinceId
      this.ruleForm.cityId = item.cityId
      this.ruleForm.areaId = item.areaId
      this.ruleForm.areaInfo = item.areaInfo
      this.ruleForm.mobile = item.mobile
      this.ruleForm.tele = item.tele
      this.ruleForm.postcodes = item.postcodes
      this.ruleForm.isDefault = item.isDefault
    },
    handleSizeChange(val){
      this.pageSize = val
      this.addressLists()
    },
    handleCurrentChange(val){
      this.pageNum = val
      this.addressLists()
    },
    //获取收/发货地址列表{type:1,发货，type2，退货}
    addressLists(){
        this.addressData = []
        //收/发货地址接口请求
        let _this = this
        let id = sessionStorage.getItem('merchantId')
        let trans = {
          isSend:this.isSend,
          merchantId:id,
          pageNum:this.pageNum,
          pageSize:this.pageSize
        }
        //this.$axios.post(this.$$jk.getAddrsListByMerchantId,trans)
        this.$axios.post('getAddrsListByMerchantId',trans)
          .then(function(response) {
              if(response.data.code == "SUCCESS"){
                let r = response.data.data
                _this.addressData = r.list
                _this.total = r.total
                if(r.list.length==0){
                  _this.hintShow = true
                }
              }
              setTimeout(()=>{
                _this.loadUse = false
              },500)
          })
          .catch(function(error) {
              alert(error);
          }); 
    },
    //路由事件
    changeRoute(){
      this.loadUse = true
      let route = this.$route.path;
      if(route == "/address"){
        this.addressText = "发货"
        this.dialogTitle = "填写发货地址"
        this.isSend = 1
      }else{
        this.addressText = "退货"
        this.dialogTitle = "填写退货地址"
        this.isSend = 2
      }
      this.addressLists()
    },
    addFn(){
      this.isDefaultShow = false
      this.addressFormVisible = true
      this.addressId = ''
      this.ruleForm.contact = ''
      this.ruleForm.contact = ''
      this.ruleForm.provinceId = ''
      this.ruleForm.cityId = ''
      this.ruleForm.areaId = ''
      this.ruleForm.areaInfo = ''
      this.ruleForm.mobile = ''
      this.ruleForm.tele = ''
      this.ruleForm.postcodes = ''
      this.ruleForm.isDefault = 1
    },
      //新增地址弹窗-确定事件
      submitForm(formName) {
        let _this = this        
        this.$refs[formName].validate((valid) => {
          if (valid) {
              let trans = Object.assign(this.ruleForm,{isSend:this.isSend})
              // let pam = {}
              // for(let i in trans){
              //   if(trans[i]){
              //     pam[i] = trans[i]
              //   }
              // }
              if(this.addressId){//编辑保存
                  let edit = Object.assign(trans,{id:this.addressId})
                  console.log(edit)
                  this.$axios.post(this.$$jk.merchantAddrsEdit,edit)
                    .then(function(response){
                      if(response.data.code == "SUCCESS"){
                          _this.$message({
                            type: 'success',
                            message: '修改成功'
                          }) 
                          _this.addressFormVisible = false; 
                          _this.resetForm(formName) 
                          _this.addressLists()               
                      }
                    })
                    .catch(function(error){})
              }else{//新增
                  this.$axios.post(this.$$jk.merchantAddrsSave,trans)
                    .then(function(response){
                      if(response.data.code == "SUCCESS"){
                          _this.$message({
                            type: 'success',
                            message: '保存成功'
                          }) 
                          _this.addressFormVisible = false; 
                          _this.resetForm(formName)  
                          _this.addressLists()              
                      }
                    })
                    .catch(function(error){})
              }

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //新增地址弹窗-重置事件
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //新增地址弹窗-取消事件
      cancelForm(formName) {
        this.$refs[formName].resetFields()
        this.addressFormVisible = false
      },
      //删除地址
      delAddress(id){
        let _this = this
        this.$axios.post(this.$$jk.merchantAddrsDelete,{id:id})
          .then(function(response){
            if(response.data.code == "SUCCESS"){
                _this.$message({
                  type: 'success',
                  message: '删除成功'
                }) 
                _this.addressLists()              
            }
          })
          .catch(function(error){})
      },
    //市
    changeProv(value){
			let _this = this;
			this.ruleForm.cityId = '';
			this.ruleForm.areaId = '';
			this.citys = [];
			this.areas = [];
			this.$axios.post(this.$$jk.getCities,{provinceId:value})
			.then(function (response) {
				if(response.data.code == 'SUCCESS'){
					_this.citys = response.data.data;
				}else{
					_this.$message({type: 'error',message: response.data.remark});
				}
			})
			.catch(function (error) {
				_this.$message({type: 'error',message: error});
			});
    },
    //区
		changeCity(value){
			let _this = this;
			this.ruleForm.areaId = '';
			this.areas = [];
			this.$axios.post(this.$$jk.getAreas,{cityId:value})
			.then(function (response) {
				if(response.data.code == 'SUCCESS'){
					_this.areas = response.data.data;
				}else{
					_this.$message({type: 'error',message: response.data.remark});
				}
			})
			.catch(function (error) {
				_this.$message({type: 'error',message: error});
			});
		}      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add-con{
  background:#fff;
  padding:15px;
}
.address-icon{
    display: inline-block;
    height: 50px;
    line-height: 50px;
    background: url('http://smerchant.51myd.com/modules/jifenbao/shop/img/shdz_ico.png') no-repeat left center;
    padding-left: 70px;
    margin: 0;
}
.add-btn{
  display:block;
  margin:0 auto;
}
.address-list-con{
  padding:10px 5px;
  background:#fff;
}
.address-col{
  padding:5px 10px;
  }
.address-ul>li:not(:last-child){
  padding-bottom: 15px;
}
.address-ul>li>span{
  display:inline-block;
  width:48px;
  text-align:right;
  margin-right:10px;
  color:#818181;
}
.box-card{
  position: relative;
}
.box-card::after{
    content: '';
    position: absolute;
    width: 70px;
    height: 70px;
    bottom: -2px;
    right: -2px;
    background: url('http://smerchant.51myd.com/modules/jifenbao/shop/img/default.png') no-repeat;
}
  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }
.header-title{
  float:left;
  padding:3px 0;
}
.add-list-title{
    font-weight:normal;
    margin-bottom: 20px;
    padding-left:15px;
    margin-top: 0;
    font-size: 14px;
    color: #818181;
}
.self-label{
  width:108px;float:left;text-align:right;padding-right:12px;
}
</style>
  
