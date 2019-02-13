<template>
  <div class="list">

    <div class="source">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">商家中心</el-breadcrumb-item>
        <el-breadcrumb-item>账户管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/my_account' }">我的账户</el-breadcrumb-item>
        <el-breadcrumb-item>充值</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

<div class="form-con">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" >
    <el-form-item label="选择续费时间:">
      <el-radio-group v-model="ruleForm.rcTime">
        <el-radio label="0" border>1个月/99元</el-radio>
        <el-radio label="1" border>3个月/297元</el-radio>
        <el-radio label="2" border>6个月/594元</el-radio>
        <el-radio label="3" border>12个月/1188元</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item class="pay-con">
      <el-col :span="1">
        <el-radio disabled></el-radio>
      </el-col>
      <el-col :span="19">
          <div class="img-con">
            <img src="https://img00.51myd.com/modules/shop/upload/2018/01/15/merchant/20180115163721_5a5c6841b7374.jpeg" alt="">
          </div>
          银果支付 
          <span>(您有1.00个银果)</span>
      </el-col>
      <el-col :span="4">
          <div>支付<span v-text="ruleForm.money"></span>元</div>
      </el-col>
    </el-form-item>
    <el-form-item label="支付密码" prop="pass">
      <el-col :span="12">
        <el-input type="password" v-model="ruleForm.pass"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">确认支付</el-button>
      <!-- <el-button>取消</el-button> -->
    </el-form-item>
  </el-form>
</div>

  </div>
</template>


<script>
import {Button,Breadcrumb,BreadcrumbItem,Radio,RadioGroup,Form,FormItem,Input,Col} from 'element-ui'
export default {
  name: 'issue',
  components: {
    'el-button':Button,
    'el-breadcrumb':Breadcrumb,
    'el-breadcrumb-item':BreadcrumbItem,
    'el-radio':Radio,
    'el-radio-group':RadioGroup,
    'el-form':Form,
    'el-form-item':FormItem,
    'el-input':Input,
    'el-col':Col
    
  },
  data () {
      return {
          status:false,//是否在输入框中显示校验结果反馈图标
          ruleForm:{
            rcTime:'0',//续费时间
            money:'99.00',//支付金额
            pass:''//支付密码
          },
        rules: {
          pass: [
            { required: true, message: '请输入支付密码', trigger: 'blur' }
          ]
        }
      }
  },
  created () {
      this.$store.state.adminleftnavnum="/home"; //设置左侧导航active
  },
  methods: {
    //确认绑定
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  },
  watch:{
    'ruleForm.rcTime':function(){
        let flag = this.ruleForm.rcTime
        switch(flag)
        {
        case '0':
          this.ruleForm.money = '99.00'
          break;
        case '1':
          this.ruleForm.money = '297.00'
          break;
        case '2':
        this.ruleForm.money = '594.00'
        break;
        default:
          this.ruleForm.money = '1188.00'
        }


     }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form-con{
  background:#fff;
  padding:20px 30px;
}
.img-con{
  display:inline-block;
  width:30px;
  height:30px;
  overflow: hidden;
  vertical-align: middle;
  margin-right:15px;
}
.img-con>img{
  display: block;
  max-height:100%;
  margin:0 auto;
}
.pay-con{
  border:1px solid #d71f1b;
  padding:15px 0;
}
</style>
  
