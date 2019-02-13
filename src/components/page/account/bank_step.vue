<template>
    <div class="activePublic" :key="$route.path">
      <div class="source">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">商家中心</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/my_account' }">我的账户</el-breadcrumb-item>
          <el-breadcrumb-item>银行卡信息</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <router-view/>
<div v-if="bankAfterShow" class="bank-con">
  <el-col :span="8">
    <el-card>
        <div slot="header" class="clearfix">
          <span class="header-title">银行卡</span>
          <!-- <el-button style="float: right; padding: 3px 0" type="text">删除</el-button> -->
        </div>
        <ul class="address-ul">
          <li><span>账户类型: </span>{{bankInfoData.isBusiness==1?'对公账户':'个人账户'}}</li>
          <li><span>银行名称: </span>{{bankInfoData.bankName}}</li>
          <li><span>开户行名称: </span>{{bankInfoData.openBank}}</li>
          <li><span>银行卡卡号: </span>{{bankInfoData.number}}</li>
          <li><span>开户人姓名: </span>{{bankInfoData.name}}</li>
          <li><span>手机号: </span>{{bankInfoData.phone}}</li>
        </ul>
    </el-card>
  </el-col>
</div>
<div v-if="bankBeforeShow">
      <el-steps :active="step" class="step" align-center >
        <el-step title="提交银行卡信息" description=""></el-step>
        <el-step title="验证金额打入账号中" description=""></el-step>
        <el-step title="确认验证金额" description=""></el-step>
        <el-step title="银行卡绑定" description=""></el-step>
      </el-steps>

      <transition name="fade">
        <div class="step1" v-if="step==1">
              <!-- 个人账户-start -->
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                  <el-form-item label="账户类型:">
                    <el-radio-group v-model="ruleForm.isBusiness">
                      <el-radio :label="1">对公账户</el-radio>
                      <el-radio :label="0">个人账户</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <!-- 对公账户-start -->
                  <transition name="slide-fade">
                    <div v-show="ruleForm.isBusiness == '1'">
                      <label style="display:inline-block;text-align:right;width:108px;line-height:40px;padding-right:8px;float:left;" for=""><span style="color:red">* </span>所在地区:</label>
                      <el-form-item>
                        <v-distpicker :province="province" :city="city" hide-area @province="onChangeProvince" @city="onChangeCity"></v-distpicker>
                      </el-form-item>
                    </div>

                  <!-- <el-form :inline="true" v-show="ruleForm.isBusiness == '1'" :model="subForm" :rules="subRules" ref="subForm"  class="demo-form-inline">
                    <label style="display:inline-block;text-align:right;width:108px;line-height:40px;padding-right:8px;" for=""><span style="color:red">* </span>地区:</label>
                    <el-form-item>
                      <el-form-item prop="prov">
                          <el-select v-model="subForm.prov" placeholder="请选择省" @change="changeProv">
                            <el-option v-for="(prov,index) in subForm.provs" :label="prov.name" :key="index" :value="prov.id"></el-option>
                          </el-select>
                      </el-form-item>
                      <el-form-item prop="city">
                        <el-select v-model="subForm.city" placeholder="请选择市" @change="changeCity">
                          <el-option v-for="(city,index) in subForm.citys" :label="city.name" :key="index" :value="city.id"></el-option>
                        </el-select>  
                      </el-form-item>
                      <el-form-item prop="area">
                        <el-select v-model="subForm.area" placeholder="请选择区">
                          <el-option v-for="(area,index) in subForm.areas" :label="area.name" :key="index" :value="area.id"></el-option>
                        </el-select>
                      </el-form-item>
                   </el-form-item>
                  </el-form>                -->
                  </transition>
                  <!-- 对公账户-end -->
                  <el-form-item label="选择银行:" prop="bankId">
                    <el-select v-model='ruleForm.bankId'>
                      <el-option value="">请选择</el-option>
                      <el-option 
                      v-for="(bank,key) in bankList"
                      :key=key
                      :value="bank.bankId"
                      :label="bank.bankName"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="开户行名称:" prop="openBank">
                    <el-input type="input" v-model="ruleForm.openBank" style="width:50%;"></el-input>
                    <router-link to="/bank_help" style="color: #e44747;padding-left:20px;">如何查询开户行名称？</router-link>
                    <!-- <a href="http://smerchant.51myd.com/inquiry_bank_help" target="_blank" style="color: #e44747;padding-left:20px;">如何查询开户行名称？</a> -->
                  </el-form-item>
                  <el-form-item label="银行卡卡号:" prop="number">
                    <el-input type="input" v-model="ruleForm.number" style="width:50%;"></el-input>
                  </el-form-item>
                  <el-form-item label="开户人姓名:" prop="name">
                    <el-input type="input" style="width:50%;" v-model="ruleForm.name"></el-input>
                  </el-form-item>
                  <el-form-item label="预留手机号:" prop="phone">
                    <el-input type="input" style="width:50%;" v-model="ruleForm.phone"></el-input>
                  </el-form-item>
                  <el-form-item label="手机验证码:" prop="smsCode">
                      <el-input type="input" style="width:50%;" v-model="ruleForm.smsCode"></el-input>
                      <el-button type="button" style="padding-left:20px;" :disabled="codeDisabled" @click="timeFn">{{codeText}}</el-button>
                  </el-form-item>
                </el-form>  
              <!-- 个人账户-end -->
        </div>
      </transition>
      <transition name="fade" v-if="step==2">
        <p class="text-center">提示：验证金额打入账户中</p>
      </transition>
      <transition name="fade" v-if="step==3">
          <el-form :inline="true" class="verify-form">
            <el-form-item>
              <el-input placeholder="请输入金额" v-model="money"></el-input>
            </el-form-item>   
            <el-form-item>
              <el-button type="primary" @click="verify">验证</el-button>
            </el-form-item>  
          </el-form>
      </transition>
      <transition name="fade" v-if="step==4">
        <div>
          <p class="text-center">{{bankResult}}</p>
          <el-button type="primary" 
          v-show="replaceBtn" @click="reBind"
          style="display:block;margin:30px auto;">重新绑定</el-button>
        </div>
      </transition>
      <div class="but-group" v-show="nextStep">
        <!-- <el-button @click.native.prevent="handlePreStep" v-show="preStep">上一步</el-button> -->
        <el-button 
        @click="handleNextStep('ruleForm','subForm')" 
        type="primary"
        style="display:block;margin:0 auto;">下一步</el-button>
      </div>
</div>
    </div>
</template>

  <script>
  import VDistpicker from 'v-distpicker'
  import {Row,Col,Button,Breadcrumb,BreadcrumbItem,Steps,Step,Form ,FormItem,Input,Select,Option,RadioGroup,Radio,Notification, Card} from 'element-ui'
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
  //银行卡
  const regBank = /^([1-9]{1})(\d{14}|\d{15}|\d{18})$/
  var validBank = (rule,val,callback)=>{
      // let val = val.replace(/\s+/g, "")
      if (!val){
          callback(new Error('请输入银行卡卡号'))
      }else  if (!regBank.test(val.replace(/\s+/g, ""))){
        callback(new Error('请输入有效的银行卡号'))
      }else {
        callback()
      }
  }
    export default {
    name:'activePublic',
    components: {
      VDistpicker,
      'el-button':Button,
      'el-breadcrumb':Breadcrumb,
      'el-breadcrumb-item':BreadcrumbItem,
      'el-steps':Steps,
      'el-step':Step,
      'el-row':Row,
      'el-col':Col,
      'el-form':Form,
      'el-form-item':FormItem,
      'el-input':Input,
      'el-select':Select,
      'el-option':Option,
      'el-radio-group':RadioGroup,
      'el-radio':Radio,
      'el-card':Card
    },
    data: function () {
      return {
        bankResult:'',//绑定第四部的结果：成功/失败
        id:'',//银行卡id
        replaceBtn:false,//重新绑定按钮显示
        bankInfoData:{},//银行卡信息
        bankAfterShow:false,//绑定后
        bankBeforeShow:false,//未绑定
        money:'',//验证金额
        subForm:{
            prov: '',
            provs:[],
            city:'',
            citys:[],
            areas:[],
            area: ''
        },
        subRules:{
          prov:[
            { required: true, message: '请选择省', trigger: 'blur' }
          ],
          city:[
            { required: true, message: '请选择市', trigger: 'blur' }
          ],
          area:[
            { required: true, message: '请选择区', trigger: 'blur' }
          ]          
        },
        codeDisabled:false,//获取验证码禁用状态
        countdown:60,//60s倒计时
        codeText:'获取验证码',//
        bankList:[],
        ruleForm: {
          isBusiness:0,//1:对公账户；0:个人账户
          bankId:null,//选择银行
          openBank:'',//开户行名称
          number:'',//银行卡卡号
          name:'',//开户人姓名
          phone:'',//预留手机号
          smsCode:'',//验证码
        },
        province:'',//省
        city:'',//市
        rules: {
          bankId:[
            { required: true, message: '请选择银行', trigger: 'blur' }
          ],
          openBank: [
            { required: true, message: '请输入开户行名称', trigger: 'blur' }
          ],
          number:[
            // { required: true, message: '请输入银行卡卡号', trigger: 'blur' }
            {required:true,validator:validBank,trigger:'blur'}
          ],
          name:[
            { required: true, message: '请输入开户人姓名', trigger: 'blur' }
          ],
          phone:[
            {required:true,validator:validMobile,trigger:'blur'}
          ],
          smsCode:[
            { required: true, message: '请输入验证码', trigger: 'blur' }
          ]
        },

        preStep: false,
        nextStep: true,
        step: 1
      }
    },
  created () {
      this.$store.state.adminleftnavnum="/bank_step"; //设置左侧导航active
  }, 
  mounted(){
    let _this = this
    this.changeRoute()
    this.$axios.post(this.$$jk.bankNamesList,{})
        .then(function(response) {
          _this.bankList = response.data.data
          _this.bankInfo()
          
        })
        .catch(function(error) {
            alert(error);
        }); 
//省
      this.$axios.post(this.$$jk.getAllProvince,{})
          .then(function(response) {
              if(response.data.code == "SUCCESS"){
                _this.subForm.provs = response.data.data;
              }
          })
          .catch(function(error) {
              alert(error);
          });          
  },
  computed:{

  },
    methods: {
      //通过商家Id获取商户银行卡信息
      bankInfo(){
        let _this = this
        let id = sessionStorage.getItem('merchantId')
        this.$axios.post(this.$$jk.getBankCardsByMerchantId,{merchantId:id})
            .then(function(response) {
                if(response.data.code == "SUCCESS"){
                  if(response.data.hasOwnProperty('data')){

                    let r = response.data.data
                    let status = r.status
                    if(status==0){
                        _this.bankBeforeShow = true
                        _this.step = 1
                        //重新绑定，表单回显                   
                        _this.ruleForm.isBusiness = r.isBusiness
                        _this.ruleForm.bankId = r.bankId
                        _this.ruleForm.openBank = r.openBank
                        _this.ruleForm.number = r.number
                        _this.ruleForm.name = r.name
                        _this.ruleForm.phone = r.phone  
                        _this.province = r.province
                        _this.city = r.city  
                        _this.id = r.id                 
                        _this.$router.push('/bank_step');                      
                    }else if(status == 2){
                        console.log(status)
                        _this.bankBeforeShow = true
                        _this.bankAfterShow = false
                        _this.step = 2
                        _this.$router.push('/bank_step/step'+status);
                    }else if(status == 3){
                        _this.bankBeforeShow = true
                        _this.step = 3
                        _this.id = response.data.data.id
                        _this.$router.push('/bank_step/step'+status);
                    }else if(status == 1){//绑定成功
                            let path = _this.$route.path
                            if(path == '/bank_step/step4'){
                              _this.bankResult = "绑定成功"
                              _this.bankBeforeShow = true
                              setTimeout(() => {
                                _this.$router.push('/bank_step');
                              }, 3000);                              
                            }else{
                              _this.bankAfterShow = true
                            }
                            _this.bankInfoData = r
                            _this.ruleForm.bankId = r.bankId
                    }else if(status == 4){
                        _this.step = 4
                        _this.$router.push('/bank_step/step'+status);
                        _this.bankBeforeShow = true
                        _this.bankResult = "绑定失败"
                        _this.replaceBtn = true
                        _this.id = r.id  
                    }
                        if(r.bankId != ""){
                            let obj = {}
                            obj = _this.bankList.find((item) => {
                              return item.bankId === 20
                            })
                            _this.bankInfoData['bankName'] = obj.bankName
                        }                      
                  }else{
                    _this.bankBeforeShow = true
                    _this.bankAfterShow = false
                  }
                }
            })
            .catch(function(error) {
                alert(error);
            }); 
      },
      //银行卡重新绑定
      reBind(){
        let _this = this
        //调接口，把绑定状态改为0
        this.$axios.post(this.$$jk.reBind,{id:this.id})
        .then(function (response) {
            if(response.data.code == 'SUCCESS'){
              _this.step = 1
              _this.$router.push('/bank_step');
              _this.bankInfo()            
            }
        })
        .catch(function (error) {

        });
      },
      onChangeProvince(data) {
        this.province = data.value
      },
      onChangeCity(data) {
        this.city = data.value
      },
          //市
    changeProv(value){
			let _this = this;
			this.subForm.city = '';
			this.subForm.area = '';
			this.subForm.citys = [];
			this.subForm.areas = [];
			this.$axios.post(this.$$jk.getCities,{provinceId:value})
			.then(function (response) {
				if(response.data.code == 'SUCCESS'){
					_this.subForm.citys = response.data.data;
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
			this.subForm.area = '';
			this.subForm.areas = [];
			this.$axios.post(this.$$jk.getAreas,{cityId:value})
			.then(function (response) {
				if(response.data.code == 'SUCCESS'){
					_this.subForm.areas = response.data.data;
				}else{
					_this.$message({type: 'error',message: response.data.remark});
				}
			})
			.catch(function (error) {
				_this.$message({type: 'error',message: error});
			});
		},
      //获取验证码
      timeFn(){
          let _this = this
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          if (!this.ruleForm.phone){
            this.$message({
              message:'请填写预留手机号',
              type:'warning'
            })
            return false;
          }else  if (!reg.test(this.ruleForm.phone)){
            this.$message({
              message:'请输入正确的11位手机号码',
              type:'warning'
            })
            return false;
          } 
        if (this.countdown == 0) { 
            this.codeDisabled = false
            this.codeText="获取验证码"; 
            this.countdown = 60; 
            return;
        } else { 
            this.codeDisabled = true
            this.codeText="重新发送(" + this.countdown + ")"; 
            this.countdown--; 
        } 
        setTimeout(function() { 
            _this.timeFn() }
            ,1000) 
      },
    //验证
    verify(){
      let _this = this
      let value = this.money
      if(!value){
        this.$message({
          message:'请输入金额',
          type:'warning'
        })
        return false
      }else if(value<0){
        this.$message({
          message:'金额不能为负数',
          type:'warning'
        })
        return false
      }else if(value.indexOf(".") !== -1 && value.substring(value.indexOf("."),value.length).length>3){
        this.$message({
          message:'金额保留两位小数',
          type:'warning'
        })
        return false
      }
      let a = value.substring(1,0)
      if(a == 0){
        if(value.indexOf('.') != 1){
          this.$message({
            message:'请输入有效金额',
            type:'warning'
          })
          return false
        }
      }
      //银行卡验证
      this.$axios.post(this.$$jk.checkBankCards,{id:this.id,money:value})
      .then(function(response) {
        if(response.data.code=='SUCCESS'){
          _this.$router.push('/bank_step/step4');
          _this.step = 4
          if(response.data.data == false){
              _this.$message.error('验证失败，请重新绑定');
              _this.replaceBtn = true
              return false
          }else{
            _this.$message({
              message:'绑定成功',
              type:'SUCCESS'
            })
          }
        }
      })
      .catch(function(error) {
          alert(error);
      });       
      
    },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      //上一步
      // handlePreStep: function () {
      //       this.$router.go(-1);
      //       this.step--;
      //       this.goStep(this.step);
      //       this.bankInfo()
      // },
      //下一步
      handleNextStep: function (formName,subForm) {
        let _this = this
        let id = sessionStorage.getItem('merchantId')
        if(this.step==1){
            this.$refs[formName].validate((valid) => {
              if (valid) {
                  let trans
                  this.ruleForm['number'] = this.ruleForm.number.replace(/\s+/g, "");
                  if(this.ruleForm.isBusiness == 1){
                    if(this.province == '省' || this.province == ''){
                      this.$message({
                        message:'请选择省',
                        type:'warning'
                      })
                      return false
                    }else if(this.city == '市' || this.city == ''){
                      this.$message({
                        message:'请选择市',
                        type:'warning'
                      })
                      return false
                    }
                    trans = Object.assign({merchantId:id},this.ruleForm,{userKey:id},{province:this.province},{city:this.city})
                  }else{
                    trans =  Object.assign({merchantId:id},this.ruleForm,{userKey:id})
                  }
                  let repTrans
                  if(this.id){//重新绑定
                    repTrans = Object.assign({id:this.id},trans)
                    this.$axios.post(this.$$jk.bankCardsRebind,repTrans)
                    .then(function(response) {
                      if(response.data.code=='SUCCESS'){
                        _this.$router.push('/bank_step/step'+(_this.step+1));
                      }
                    })
                    .catch(function(error) {
                        alert(error);
                    }); 
                  }else{//绑定
                      repTrans = trans
                      this.$axios.post(this.$$jk.bankCardsBind,repTrans)
                      .then(function(response) {
                        if(response.data.code=='SUCCESS'){
                          _this.$router.push('/bank_step/step'+(_this.step+1));
                        }
                      })
                      .catch(function(error) {
                          alert(error);
                      }); 
                  }

              } else {
                console.log('error submit!!');
                return false;
              }
            });
        }else if(this.step==2){
           this.$router.push('/bank_step/step'+(this.step+1));
        }
          
      },
      goStep: function (n) {
        switch (n) {
          case 1 :
            this.preStep = false;this.nextStep = true;
            break;
          case 2 :
            this.preStep = false;this.nextStep = false;
            break;
          case 3 :
            this.preStep = false;this.nextStep = false;
            break;
          case 4 :
            this.preStep = false;this.nextStep = false;
            break;
        }
      },
      //路由事件
      changeRoute(){
        let n = this.$route.path
        switch (n) {
          case '/bank_step/step2' :
            this.step = 2
            this.goStep(2)
            break;
          case '/bank_step/step3' :
            this.step = 3
            this.goStep(3)
            break;
          case '/bank_step/step4' :
            this.step = 4
            this.goStep(4)
            break;
        }
      }
    },
    watch:{      //监听路由变化
      '$route':'changeRoute',
      'codeDisabled':function(val,old){
        let _this = this
        let id = sessionStorage.getItem('merchantId')
        if(val == true){
          Notification ({
            title: '提示',
            message: '我们将向您绑定的手机号'+this.ruleForm.phone.substr(0, 3) + '****' + this.ruleForm.phone.substr(7)+'发送验证码，请注意查收'
          });   
          //发送手机验证码
          this.$axios.post(this.$$jk.sendVerificationCode,{mobile:this.ruleForm.phone,userKey:id,key:'bind_bank'})
          .then(function(response) {})
          .catch(function(error) {
              alert(error);
          });       
        }
      }
    }
  }

</script>
<style>
.step{
  margin:30px auto;
}
.but-group{
  background:#fff;
  padding-bottom:30px;
}
.but-group .el-button:first-child{
  margin-left:100px;
}
.verify-form{
  width:302px;
  margin:0 auto;
}
.step1{
  background:#fff;
  padding:20px 0;
}
/* .el-input{
  width:50%;
} */
.bank-con{
  padding:20px;
}
.address-ul>li:not(:last-child){
  padding-bottom: 15px;
}
.address-ul>li>span{
  display:inline-block;
  width:74px;
  text-align:right;
  margin-right:10px;
  color:#818181;
}
</style>
