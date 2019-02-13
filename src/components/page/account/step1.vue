<template>
  <div class="step1">
  
  <el-form label-width="120px">
    <el-form-item label="账户类型:" prop="resource">
      <el-radio-group v-model="switchRadio">
        <el-radio :label="1">对公账户</el-radio>
        <el-radio :label="0">个人账户</el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form> 
<!-- 个人账户-start -->
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
    <!-- 对公账户-start -->
    <transition name="slide-fade">
    <el-form-item v-show="switchRadio == '1'" label="所在地区:">
      <v-distpicker province="浙江省" city="杭州市" area="西湖区"></v-distpicker>
    </el-form-item>
    </transition>
    <!-- 对公账户-end -->
    <el-form-item label="选择银行:" prop="region">
      <el-select v-model='ruleForm.currentBank'>
        <el-option 
        v-for="(bank,key) in bankArr"
        :key=key
        :value="bank.bankName"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="开户行名称:" prop="desc">
      <el-input type="input" v-model="ruleForm.oBankName"></el-input>
      <a href="http://smerchant.51myd.com/inquiry_bank_help" target="_blank" style="color: #e44747;padding-left:20px;">如何查询开户行名称？</a>
    </el-form-item>
    <el-form-item label="银行卡卡号:">
      <el-input type="input"></el-input>
    </el-form-item>
    <el-form-item label="开户人姓名:">
      <el-input type="input"></el-input>
    </el-form-item>
    <el-form-item label="预留手机号:">
      <el-input type="input"></el-input>
    </el-form-item>
    <el-form-item label="手机验证码:">
        <el-input type="input"></el-input>
        <el-button type="text" style="padding-left:20px;">获取验证码</el-button>
    </el-form-item>
  </el-form>  
<!-- 个人账户-end -->
  </div>
</template>

<script>
import VDistpicker from 'v-distpicker'
import { Row,Col,Button,Breadcrumb,BreadcrumbItem,
Form,FormItem,Input,Select,Option,RadioGroup,Radio,Steps,Step } from 'element-ui'
export default {
  name: 'step1',
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
    'el-steps':Steps,
    'el-step':Step
  },
  data () {
      return {
        switchRadio:0,//1:对公账户；0:个人账户
        bankArr:['请选择银行','家银行'],
        ruleForm: {
          currentBank:'请选择银行',//选择银行
          oBankName:''//开户行名称
        },
        rules: {
          oBankName: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ]
        }
      }
  },
  created () {
    this.$store.state.adminleftnavnum="/bank_step"; //设置左侧导航active
  }, 
  mounted(){
      let _this = this
      this.$axios.post('/hn-shop-web/bankNames/bankNamesList',{})
          .then(function(response) {
            let bankList = response.data.data.list
            _this.bankArr = bankList;
            console.log(bankList)

          })
          .catch(function(error) {
              alert(error);
          });      
  },
  methods: {
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
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.step1{
  background:#fff;
  padding:20px 0;
}
.el-input{
  width:50%;
}
</style>
  
