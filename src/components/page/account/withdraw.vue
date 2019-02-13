<template>
  <div class="withdraw">
  
    <div class="source">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">商家中心</el-breadcrumb-item>
        <el-breadcrumb-item>账户管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/my_account' }">我的账户</el-breadcrumb-item>
        <el-breadcrumb-item>现金提现</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>现金提现</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="dialogVisible = true">提现规则</el-button>
      </div>

<!-- <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="店铺名称:">
    <span>{{storeName}}</span>
  </el-form-item>
  <el-form-item label="提现金额:" prop="withdraws">
    <el-input type="Number" v-model="ruleForm.withdraws"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submit('ruleForm')">提交申请</el-button>
  </el-form-item>
</el-form> -->

      <el-form label-width="200px" class="demo-ruleForm" :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="店铺名称:">
            <span>{{storeName}}</span>
        </el-form-item>
        <el-form-item label="提现金额:">
          <el-col :span="12">
              <el-input type="number" v-model="ruleForm.withdraws"></el-input>
          </el-col>
          <el-col :span="12">
              <span class="wd-hint">可提现金额： {{money}}元</span>
          </el-col>
        </el-form-item>
        <el-form-item label="账户名称:">
          {{objInfo.isBusiness==1?'对公账户':'个人账户'}}
        </el-form-item>
        <el-form-item label="银行卡:">
          {{bankName}}
        </el-form-item>
        <el-form-item label="开户银行:">
          {{objInfo.openBank}}
        </el-form-item>
        <el-form-item label="银行卡号:">
          {{objInfo.number}}
        </el-form-item>
        <el-form-item label="提现验证码:" prop="smsCode">
          <el-col :span="12">
            <el-input type="input" v-model="ruleForm.smsCode"></el-input>
            <p class="code-hint">将向您绑定的{{phoneFn(objInfo.phone)}}手机号发送一组验证码，请注意查收</p>
          </el-col>
          <el-col :span="12">
              <el-button type="button" style="padding-left:20px;" :disabled="codeDisabled" @click="timeFn">{{codeText}}</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="支付密码:" prop="paymentPwd">
          <el-col :span="12">
              <el-input type="text" v-model="ruleForm.paymentPwd"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit('ruleForm')">提交申请</el-button>
          <router-link to="/my_account" style="color:#fff;">
            <el-button>取消</el-button>
          </router-link>
        </el-form-item>
      </el-form> 

    </el-card>

    <el-dialog
    title="关于克珞世商城提现规则"
    :visible.sync="dialogVisible"
    width="60%"> 
      <rule></rule>     
    </el-dialog>
<el-dialog
  title=""
  :visible.sync="withdrawDialogVisible"
  width="30%"
  center>
  <span>提交成功，待审核</span>
  <span slot="footer" class="dialog-footer">
    <!-- <el-button @click="goWithdraw">继续提现</el-button> -->
    <el-button type="primary" @click="goTradingList">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>

<script>
import rule from '../../common/rule.vue'//提现规则
import {Button,Breadcrumb,BreadcrumbItem,Form,FormItem,Input, Card, Dialog, Col,Notification } from 'element-ui'
var validFirstFee=(rule, val,callback)=>{
    let value
    let a
    if(val){
      value = val.toString()
      a = value.substring(1,0)
    }
    if (!value){
        callback(new Error('请填写金额/元'))
    }else  if (value.indexOf(".") != -1 && value.substring(value.indexOf("."),value.length).length>3){
      callback(new Error('最多保留两位小数的金额'))
    }else if(value<0){
      callback(new Error('金额不能为负数'))
    }else if(a==0){
      if(value.indexOf('.') != 1){
        callback(new Error('请输入有效金额'))
      }
    }else {
      callback()
    }
}
export default {
  name: 'withdraw',
  components: {
    rule,
    'el-button':Button,
    'el-breadcrumb':Breadcrumb,
    'el-breadcrumb-item':BreadcrumbItem,
    'el-form':Form,
    'el-form-item':FormItem,
    'el-input':Input,
    'el-card':Card,
    'el-dialog':Dialog,
    'el-col':Col
  },
  data () {
      return {
        withdrawDialogVisible:false,
        money:'',//可提现金额
        codeDisabled:false,//获取验证码禁用状态
        countdown:60,//60s倒计时
        codeText:'获取验证码',
        type:'',//0:现金；1：银果
        dialogVisible:false,//提现规则
        storeName:'',//店铺名称
        objInfo:{},//绑定的银行卡信息
        bankName:'',
        ruleForm:{
          withdraws:'',//输入的提现金额
          smsCode:'',//验证码          
          paymentPwd:'',//支付密码
        },
        rules:{
          // withdraws:[{ required:true,validator:validFirstFee,trigger:'blur'} ],
          smsCode:[{ required: true, message: '请填写验证码', trigger: 'blur' }],
          paymentPwd:[{ required: true, message: '请填写支付密码', trigger: 'blur' }]                       
        }
      }
  },
  created () {
      let _this = this
      this.$store.state.adminleftnavnum="/my_account"; //设置左侧导航active     
  },
  mounted(){
      let _this = this
      this.money = this.$route.query.money
      this.type = this.$route.query.type
      let cardInfo=sessionStorage.getItem('cardInfo')
      this.objInfo = JSON.parse(cardInfo)
      this.storeName = sessionStorage.getItem('storeName')
      this.$axios.post(this.$$jk.bankNamesList,{})
          .then(function(response) {
            let r = response.data.data  
            let obj = {}
            obj = r.find((item) => {
              return item.bankId === _this.objInfo.bankId
            })
            _this.bankName = obj.bankName
          })
          .catch(function(error) {
              alert(error);
          }); 

      // let id = sessionStorage.getItem('merchantId')
      // this.$axios.post(this.$$jk.getBankCardsByMerchantId,{merchantId:id})
      //     .then(function(response) {
      //         if(response.data.code == "SUCCESS"){
      //           let r = response.data.data
      //         }
      //     })
      //     .catch(function(error) {
      //         alert(error);
      //     });      
  },
  methods: {
    goWithdraw(){
      this.withdrawDialogVisible = false
      this.ruleForm.withdraws=''//输入的提现金额
      this.ruleForm.smsCode=''//验证码          
      this.ruleForm.paymentPwd=''//支付密码      
    },
    goTradingList(){
      this.withdrawDialogVisible = false
      this.$router.push('/trading_list')
    },
      //获取验证码
      timeFn(){
          let _this = this
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
    vali(){
        var flag = true
        if(Number(this.ruleForm.withdraws) > Number(this.money)){
          this.ruleForm.withdraws = ""
          this.$message({
            message:"金额不能超过可提现金额",
            type:"warning"
          })
          flag = false
        }
        return flag   
    },
    //提交申请
    submit(formName){
      let _this = this 
      let value
      let a
      if(this.ruleForm.withdraws){
        value = this.ruleForm.withdraws.toString()
        a = value.substring(1,0)
        console.log(a)
      }
      if(!this.ruleForm.withdraws){
        this.$message({
          message:"请填写提现金额",
          type:"warning"
        })
        return false        
      }else if(Number(this.ruleForm.withdraws) > Number(this.money)){
        this.ruleForm.withdraws = ""
        this.$message({
          message:"金额不能超过可提现金额",
          type:"warning"
        })
        return false
      }else if(Number(this.ruleForm.withdraws<0)){
        this.ruleForm.withdraws = ""
        this.$message({
          message:"金额不能为负数",
          type:"warning"
        })
        return false
      }else if(a==0 && value.indexOf('.') != 1){
          this.ruleForm.withdraws = ""
          this.$message({
            message:"请输入有效金额",
            type:"warning"
          })
          return false               
      }    
      let id = sessionStorage.getItem("merchantId")  
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let trant = Object.assign(this.ruleForm,{type:this.type},{userKey:id})
          console.log(trant)
          _this.$axios.post(this.$$jk.withdraws,trant)
              .then(function(response) {
                  if(response.data.code == "SUCCESS"){
                    _this.withdrawDialogVisible = true
                  }else if(response.data.code == 'VERIFICATIONCODE_MATCH_FAIL'){
                    _this.$message({
                      message:'验证码匹配失败',
                      type:'warning'
                    })
                    _this.ruleForm.smsCode = ''
                    return false;
                  }else if(response.data.code == 'PAY_PWD_MATCH_FAIL'){
                    _this.$message({
                      message:'支付密码错误',
                      type:'warning'
                    })
                    _this.ruleForm.paymentPwd = ''
                    return false;
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
    } , 
    phoneFn(val){
      if(val){
        return val.substr(0, 3) + '****' + val.substr(7)
      }
    }
  },
  watch:{
      'codeDisabled':function(val,old){
        let _this = this
        let id = sessionStorage.getItem('merchantId')
        if(val == true){
          Notification ({
            title: '提示',
            message: '我们将向您绑定的手机号'+this.objInfo.phone.substr(0, 3) + '****' + this.objInfo.phone.substr(7)+'发送验证码，请注意查收'
          });   
          //发送手机验证码
          this.$axios.post(this.$$jk.sendVerificationCode,{mobile:this.objInfo.phone,userKey:id,key:'bind_bank'})
          .then(function(response) {})
          .catch(function(error) {
              alert(error);
          });       
        }
      }    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wd-hint{
  font-size:14px;
  color:#b6b6b6;
  padding-left:15px;
}
.code-hint{
  font-size:14px;
  color:#b6b6b6;
}
.get-code{
  margin-left:15px;
}
</style>
  
