<template>
  <div class="bankHelp">
    <div class="source">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">商家中心</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/my_account' }">我的账户</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/bank_step' }">银行卡信息</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/bank_help' }">查询开户行名称</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <h1>各大银行开户行网点查询方式（短信+电话）</h1>
      <el-row>
        <p>在进行一些业务办理的时候，经常需要去自己银行卡的开户行进行办理，但是有时候自己也忘记了开户行是哪里，
          那么这个时候该如何查询并确定自己的开户行呢？其实大多数的银行查询的方法都差不多，但是在细节上还是有一定的区别。
          现在就来为你介绍一下各个银行开户行查询的方法。
          <span class="red">请注意在填写开户行时，只需要填写银行告诉您的开户行名称，不要自行添加任何其他文字。</span>
        </p>
      </el-row>
      <el-row>
        <el-col :span="12">
          <img src="../../../assets/img/bank1.jpg" alt="">
        </el-col>
        <el-col :span="12">
          <h3>中国工商银行开户网点查询方法</h3>
          <p>编辑短信"KHH#银行卡号"发送至95588如：KHH#622208************ 发送到95588 .</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <img src="../../../assets/img/bank2.jpg" alt="">
        </el-col>
        <el-col :span="12">
          <h3>中国建设银行开户网点查询方法</h3>
          <p>编辑短信 "KHCX#银行卡号" 发送至 95533 或者拨打95533 → 按 1 查询 → 按6开户查询 → 输入卡号如：khcx#6227*************** 发送到95533</p>         
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <img src="../../../assets/img/bank3.jpg" alt="">
        </el-col>
        <el-col :span="12">
          <h3>中国农业银行开户网点查询方法</h3>
          <p>电话拨打 95599 → 按 0 进入人工 → 查询银行卡开户网点。</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <img src="../../../assets/img/bank4.jpg" alt="">
        </el-col>
        <el-col :span="12">
          <h3>中国邮政储蓄银行开户网点查询方法</h3>
          <p>电话拨打 95580 → 按 1 选择中文服务 → 按0选择人工服务 → 按 3 选择业务咨询 → 按 1 选择人民币服务 → 提供卡号。</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <img src="../../../assets/img/bank5.jpg" alt="">
        </el-col>
        <el-col :span="12">
          <h3>交通银行开户网点查询方法</h3>
          <p>电话拨打 95559 → 按2账户查询 → 输入卡号 → 密码→ 按3开户网点查询。</p>
        </el-col>
      </el-row> 
      <el-row>
        <el-col :span="12">
          <img src="../../../assets/img/bank6.jpg" alt="">
        </el-col>
        <el-col :span="12">
          <h3>中国银行开户网点查询方法</h3>
          <p>电话拨打 95566 → 按 1 选择中文 → 银行服务按1 → 人工服务按 0  →  进入人工服务请求查询银行卡开户网。</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <img src="../../../assets/img/bank7.jpg" alt="">
        </el-col>
        <el-col :span="12">
          <h3>招商银行开户网点查询方法</h3>
          <p>电话拨打 95555 → 按 2 人工服务 → 按 1 进入 人工服务 → 请求查询开户网点</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <img src="../../../assets/img/bank8.jpg" alt="">
        </el-col>
        <el-col :span="12">
          <h3>广发银行开户网点查询方法</h3>
          <p>电话拨打 4008308003 → 按 0 进入人工服务 → 按 1 个人业务 。</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <img src="../../../assets/img/bank9.jpg" alt="">
        </el-col>
        <el-col :span="12">
          <h3>中信银行开户网点查询方法</h3>
          <p>电话拨打 95558 → 按 0 进入人工服务 → 按1，说“开户行”→ 输入卡号，以#号键结束。</p>
        </el-col>
      </el-row> 
      <el-row>
        <el-col :span="12">
          <img src="../../../assets/img/bank10.jpg" alt="">
        </el-col>
        <el-col :span="12">
          <h3>浦发银行开户网点查询方法</h3>
          <p>电话拨打95528 → 按1普通话 → 按0进入人工服务 → 按5网点查询 。</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <img src="../../../assets/img/bank11.jpg" alt="">
        </el-col>
        <el-col :span="12">
          <h3>兴业银行开户网点查询方法</h3>
          <p>电话拨打95561，接通电话语音提示后按4键根据语音提示完成查询。</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <img src="../../../assets/img/bank12.jpg" alt="">
        </el-col>
        <el-col :span="12">
          <h3>中国民生银行开户网点查询方法</h3>
          <p>电话拨打95568 → 按1借记卡服务 → 按0人工服务→ 按1网点查询 。</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <img src="../../../assets/img/bank13.jpg" alt="">
        </el-col>
        <el-col :span="12">
          <h3>平安银行开户网点查询方法</h3>
          <p>电话拨打95561，电话拨打 95511 → 按 3 选择银行业务 → 按 3 进入人工服务→ 按2选择个人业务→提供卡号 。</p>
        </el-col>
      </el-row>                            
    </div>
  </div>
</template>

<script>
import { Breadcrumb,BreadcrumbItem, Row, Col } from 'element-ui'
export default {
  name: 'bankHelp',
  components: {
    'el-breadcrumb':Breadcrumb,
    'el-breadcrumb-item':BreadcrumbItem,
    'el-row':Row,
    'el-col':Col
  },
  data () {
      return {
      }
  },
  created () {
    this.$store.state.adminleftnavnum="/bank_step"; //设置左侧导航active
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-row {
    margin-bottom: 20px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;    
}
.el-col>img{
  width:50%;
  margin:0 auto;
}
.container{
  background:#fff;
  width:100%;
  padding:20px;
  line-height: 1.8
}
</style>
  
