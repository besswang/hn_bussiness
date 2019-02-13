<template>
  <div class="list">

    <div class="source">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">商家中心</el-breadcrumb-item>
        <el-breadcrumb-item>店铺管理</el-breadcrumb-item>
        <el-breadcrumb-item>店铺信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <div class="info-con">
      <el-form label-width="192px" class="ruleForm" ref="form" :model="form" id="inlineForm" :rules="rulesForm">
        <el-form-item label="店招:">
          <el-upload
            class="avatar1-uploader"
            :action="upAction"
            :show-file-list="false"
            :on-success="handleAvatarSuccess1"
            :on-error="handleAvatarError1"
            :on-progress="uploadProgress1"
            :before-upload="beforeAvatarUpload1">
            <img v-if="sign" :src="sign" class="avatar1">
            <i v-else class="el-icon-plus avatar1-uploader-icon"></i>
          </el-upload>
          <el-progress :percentage="progressNum1" :status="status1" v-show="progressShow1"></el-progress>
          <p class="text-smaller redHint">请上传图片大小为1920*160格式的图片</p>
        </el-form-item>

        <el-form-item label="店铺logo:">
          <el-upload
            class="avatar-uploader"
            :action="upAction"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :on-error="handleAvatarError"
            :on-progress="uploadProgress"
            :before-upload="beforeAvatarUpload">
            <img v-if="image" :src="image" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-progress :percentage="progressNum" :status="status" v-show="progressShow"></el-progress>
        </el-form-item>
        <el-form-item label="联系电话:" prop="mobile">
          <el-input v-model="form.mobile" type="number"></el-input>
        </el-form-item>
        <el-form-item label="营业时间:">
          <el-input type="textarea" v-model="week"></el-input>
          <p class="text-smaller redHint">例如:周一至周五9:00 - 18:00 或者全天24小时</p>
        </el-form-item>
				<el-form-item label="地区">
					<el-select v-model="form.prov" placeholder="请选择省" @change="changeProv">
						<el-option v-for="(prov,index) in form.provs" :label="prov.name" :key="index" :value="prov.id"></el-option>
					</el-select>
					<el-select v-model="form.city" placeholder="请选择市" @change="changeCity">
						<el-option v-for="(city,index) in form.citys" :label="city.name" :key="index" :value="city.id"></el-option>
					</el-select>
					<el-select v-model="form.area" placeholder="请选择区">
						<el-option v-for="(area,index) in form.areas" :label="area.name" :key="index" :value="area.id"></el-option>
					</el-select>
				</el-form-item>
        <el-form-item label="详细地址:">
            <el-input type="textarea" v-model="areaInfo"></el-input>
        </el-form-item> 
        <el-form-item label="配送方式:">
           <el-checkbox-group v-model="logisticsType">
              <el-checkbox label="1" disabled>快递</el-checkbox>
              <!-- <el-checkbox :label="2">商家上门</el-checkbox>
              <el-checkbox :label="3">买家自提</el-checkbox> -->
            </el-checkbox-group>         
        </el-form-item>
        <el-form-item label="是否提供发票:">
          <el-radio-group v-model="isInvoice">
            <el-radio :label="0">否</el-radio>
            <el-radio :label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- <el-form-item label="地区服务:">
            <el-checkbox>1小时送达</el-checkbox>
        </el-form-item> 
        <el-form-item label="配送费:">
            <el-input>
              <template slot="append">元</template>
            </el-input>
        </el-form-item>   
        <el-form-item label="起送金额:">
            <el-input>
              <template slot="append">元</template>
            </el-input>
        </el-form-item>
        <el-form-item label="免配送费金额:">
            <el-input>
              <template slot="append">元</template>
            </el-input>
        </el-form-item>  
        <el-form-item label="配送范围:">
            <el-input>
              <template slot="append">km</template>
            </el-input>
        </el-form-item>  -->
        <el-button type="primary" class="issue-btn"  @click="issue('form')">发布</el-button>         
      </el-form>
    </div>

  </div>
</template>


<script>
import VDistpicker from 'v-distpicker'
import { Row,Col,Button,Breadcrumb,BreadcrumbItem,
Form,FormItem,Input,Select,Option,RadioGroup,Radio,Dialog,Card,Upload,Progress,Checkbox, CheckboxGroup} from 'element-ui'
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
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
    VDistpicker,
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
    'el-upload':Upload,
    'el-progress':Progress,
    'el-checkbox':Checkbox,
    'el-checkbox-group':CheckboxGroup
  },
  data () {
      return {
        logisticsType:[],//配送方式
        upAction:this.$$jk.upload,//图片上传
        form:{
            prov: '',
            provs:[],
            city:'',
            citys:[],
            areas:[],
            area: '',
            mobile:'',//联系电话
        },
        rulesForm:{
          mobile:[
            {required:true,validator:validMobile,trigger:'blur'}
          ]
        },
        sign: '',//店招
        image: '',//店铺logo
        week:'',//营业时间
        areaInfo:'',//详细地址
    
        isInvoice:0,//是否提供发票
          progressShow1:false,//进度条显示开关
          progressNum1:0,//进度条百分比值
          status1:'',//进度条的状态（success/exception）
          progressShow:false,//进度条显示开关
          progressNum:0,//进度条百分比值
          status:'',//进度条的状态（success/exception）
          ruleForm: {

          },
          rules: {
            // name: [
            //   { required: true, message: '请输入联系人姓名（最多20字）', trigger: 'blur' },
            //   { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
            // ]
          }
      };
  },
  created () {
      this.$store.state.adminleftnavnum="/shopInfo"; //设置左侧导航active  
  }, 
  mounted(){
      let _this = this
      let id = sessionStorage.getItem('merchantId')
      this.$axios.post(this.$$jk.getMerchantsForProductDetailsById,{merchantId:id})
          .then(function(response) {
              if(response.data.code == "SUCCESS"){
                  let r = response.data.data
                  _this.sign = r.sign
                  _this.image = r.image
                  _this.form.mobile = r.mobile
                  _this.week = r.week
                  _this.form.prov = r.provinceId
                  _this.changeProv(r.provinceId)
                  _this.changeCity(r.cityId)
                  _this.form.city = r.cityId
                  _this.form.area = r.areaId
                  _this.areaInfo = r.areaInfo
                  // let arr = _this.logisticsType.concat(r.logisticsType)
                  // _this.logisticsType = [...new Set(arr)]; 
                  // _this.logisticsType = JSON.parse(r.logisticsType)
                  _this.logisticsType.push(r.logisticsType)
                  _this.isInvoice = r.isInvoice
              }
          })
          .catch(function(error) {
              alert(error);
          }); 
//省
      this.$axios.post(this.$$jk.getAllProvince,{})
          .then(function(response) {
              if(response.data.code == "SUCCESS"){
                _this.form.provs = response.data.data;
              }
          })
          .catch(function(error) {
              alert(error);
          });           
  },
  methods: {
    //市
    changeProv(value){
			let _this = this;
			this.form.city = '';
			this.form.area = '';
			this.form.citys = [];
			this.form.areas = [];
			this.$axios.post(this.$$jk.getCities,{provinceId:value})
			.then(function (response) {
				if(response.data.code == 'SUCCESS'){
					_this.form.citys = response.data.data;
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
			this.form.area = '';
			this.form.areas = [];
			this.$axios.post(this.$$jk.getAreas,{cityId:value})
			.then(function (response) {
				if(response.data.code == 'SUCCESS'){
					_this.form.areas = response.data.data;
				}else{
					_this.$message({type: 'error',message: response.data.remark});
				}
			})
			.catch(function (error) {
				_this.$message({type: 'error',message: error});
			});
		},
    //发布
    //这里注意提交省市区的id
      issue(form) {
        let _this = this
        let logisticsType = this.logisticsType.join(",")
        let id = sessionStorage.getItem('merchantId')
        this.$refs[form].validate((valid) => {
          if (valid) {
              let obj = {
                id:id,//商家id
                sign:this.sign,//店招
                image:this.image,//商家logo
                week:this.week,//商家营业时间
                provinceId:this.form.prov,
                cityId:this.form.city,//市id
                areaId:this.form.area,//区id
                areaInfo:this.areaInfo,//详细地址
                mobile:this.form.mobile,
                logisticsType:logisticsType,//配送方式
                isInvoice:this.isInvoice//是否提供发票
              }
              this.$axios.post(this.$$jk.editMerchantInfo,obj)
                  .then(function(response) {
                      if(response.data.code == "SUCCESS"){
                        _this.$message({
                          message: '修改成功',
                          type: 'success'
                        });
                        sessionStorage.setItem('sign',_this.sign)
                      }else{
                        _this.$message({
                          message: '修改失败',
                          type: 'waring'
                        });                  
                      }
                  })
                  .catch(function(error) {
                      alert(error);
                  }); 
          } else {
            console.log('error submit!!');
            return false;
          }
        });

        
         


      },
    //店招-start
          //上传成功
      handleAvatarSuccess1(res, file) {
        // this.sign = URL.createObjectURL(file.raw);
        setTimeout(() => {
          this.sign = res.url
        }, 800);
        this.progressNum1 = 100
        this.status1 = 'success'
      },
      //上传失败
      handleAvatarError1(){
        this.progressNum1 = 50
        this.status1 = 'exception'
      },
      //上传时
      uploadProgress1(){
        console.log("上传过程中")
        this.progressShow1 = true
      },
      //上传之前
      beforeAvatarUpload1(file) {
        if(!/image\/\w+/.test(file.type)){//判断图片格式
          this.$message({
            message: '图片仅支持JPG、JPEG、PNG格式',
            type: 'warning'
          });
          return false;
        }
        if(parseInt(file.size) > 1024*1024*2){
          this.$message({
            message: '上传头像图片大小不能超过 2MB!',
            type: 'warning'
          });
          return false;
        }
        this.progressNum1 = 0
        this.status1 = ''
      },
//店招-end
//店铺logo-start
      //上传成功
      handleAvatarSuccess(res, file) {
        // this.image = URL.createObjectURL(file.raw);
        setTimeout(() => {
          this.image = res.url
        }, 800);
        this.progressNum = 100
        this.status = 'success'
      },
      //上传失败
      handleAvatarError(){
        this.progressNum = 50
        this.status = 'exception'
      },
      //上传时
      uploadProgress(){
        console.log("上传过程中")
        this.progressShow = true
      },

      //上传之前
      beforeAvatarUpload(file) {
        if(!/image\/\w+/.test(file.type)){//判断图片格式
          this.$message({
            message: '图片仅支持JPG、JPEG、PNG格式',
            type: 'warning'
          });
          return false;
        }
        if(parseInt(file.size) > 1024*1024*2){
          this.$message({
            message: '上传头像图片大小不能超过 2MB!',
            type: 'warning'
          });
          return false;
        }
        this.status = ''
        this.progressNum = 0
      }
//店铺logo-end
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ruleForm{
  /* width:722px; */
  width:864px;
}
.info-con{
  background:#fff;
  padding:30px 15px;
}
.avatar1-uploader{
  width:auto;
  max-height:100px;
  overflow:hidden;
}
.avatar1-uploader-icon {
  border: 1px dashed #d9d9d9;
  font-size: 28px;
  color: #8c939d;
  /* height:98px; */
  height:94px;
  width:470px;
  line-height:98px;
  text-align:center;
}

.avatar1 {
  max-height:100px;
  max-width:500px;
  display: block;
  float:left;
}

.avatar-uploader{
  width:50px;
  height:50px;
  border-radius:50%;
  overflow:hidden;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9;
  font-size: 20px;
  color: #8c939d;
  width:48px;
  height:48px;
  line-height:48px;
  text-align:center;
  border-radius:50%;
}
.avatar {
  width: 100%;
  display: block;
  float:left;
}
.issue-btn{
  display: block;
  margin:0 auto;
  width:30%;
}
.redHint{
  color:#FF0000
}
</style>
  
