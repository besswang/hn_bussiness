<template>
    <div class="bankInfo">

    <div v-if="bankInfoShow" class="bank-con">
      <el-col :span="8">
        <el-card>
            <div slot="header" class="clearfix">
              <span class="header-title">银行卡</span>
              <!-- <el-button style="float: right; padding: 3px 0" type="text">删除</el-button> -->
            </div>
            <ul class="address-ul">
              <li><span>账户类型: </span>{{bankInfoData.status==1?'对公账户':'个人账户'}}</li>
              <li><span>银行名称: </span>{{bankInfoData.bankName}}</li>
              <li><span>开户行名称: </span>{{bankInfoData.openBank}}</li>
              <li><span>银行卡卡号: </span>{{bankInfoData.number}}</li>
              <li><span>开户人姓名: </span>{{bankInfoData.name}}</li>
              <li><span>手机号: </span>{{bankInfoData.phone}}</li>
            </ul>
        </el-card>
      </el-col>
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
        bankInfoData:{},//银行卡信息
        bankInfoShow:false,//是否绑定银行卡信息
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
          bankId:'',//选择银行
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
            { required: true, message: '请输入银行卡卡号', trigger: 'blur' }
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
        })
        .catch(function(error) {
            alert(error);
        }); 
    this.bankInfo()
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
                    let status = response.data.data.status
                    if(status==0){
                        _this.bankInfoShow = true
                    }else if(status == 2){
                        _this.bankInfoShow = false
                        _this.step = 2
                        // _this.$router.push('/bank_step/step'+status);
                    }else if(status == 3){
                        _this.bankInfoShow = false
                        _this.step = 3
                        // _this.$router.push('/bank_step/step'+status);
                    }else if(status == 1){//绑定成功
                        _this.bankInfoShow = false
                        _this.bankInfoData = response.data.data
                        let obj = {}
                        obj = _this.bankList.find((item) => {
                          return item.bankId === _this.bankInfoData.bankId
                        })
                        _this.bankInfoData['bankName'] = obj.bankName
                    }
                  }else{
                    _this.bankInfoShow = true
                  }
                }
            })
            .catch(function(error) {
                alert(error);
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
      //银行卡验证
      this.$axios.post(this.$$jk.checkBankCards,{id:20,money:value})
      .then(function(response) {
        if(response.data.code=='SUCCESS'){
         _this.$router.push('/bank_step/step4');
         _this.step = 4
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
      handlePreStep: function () {
            this.$router.go(-1);
            this.step--;
            this.goStep(this.step);
            this.bankInfo()

      },
      //下一步
      handleNextStep: function (formName,subForm) {
        let _this = this
        let id = sessionStorage.getItem('merchantId')
        if(this.step==1){
            // if(this.ruleForm.isBusiness == 1){
            //   this.$refs[subForm].validate((valid) => {
            //     if (valid) {
                  
            //     } else {
            //       console.log('error submit!!');
            //       return false;
            //     }
            //   });  
            // }
            this.$refs[formName].validate((valid) => {
              if (valid) {
                  let trans
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
                  this.$axios.post(this.$$jk.bankCardsBind,trans)
                  .then(function(response) {
                    if(response.data.code=='SUCCESS'){
                      _this.$router.push('/bank_step/step'+(_this.step+1));
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
            this.preStep = true;this.nextStep = false;
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
          this.$axios.post(this.$$jk.sendVerificationCode,{mobile:this.ruleForm.phone,userKey:72,key:'bind_bank'})
          .then(function(response) {
            
          })
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
  /* padding:20px; */
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
