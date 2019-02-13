<template>
  <div class="step3">
    <el-form :inline="true" class="verify-form">
      <el-form-item>
        <el-input placeholder="请输入金额"></el-input>
      </el-form-item>   
      <el-form-item>
        <el-button type="primary" @click="verify">验证</el-button>
      </el-form-item>  
    </el-form>
  </div>
</template>


<script>
import {Button,Form,FormItem,Input } from 'element-ui'
export default {
  name: 'step3',
  components: {
    'el-button':Button,
    'el-form':Form,
    'el-form-item':FormItem,
    'el-input':Input
  },
  data () {
      return {
        
      }
  },
  created () {
      this.$store.state.adminleftnavnum="/bank_step/step1"; //设置左侧导航active
  },
  methods: {
    //验证
    verify(){
      this.$router.push('/bank_step/step4');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.verify-form{
  width:302px;
  margin:0 auto;
}
</style>
  
