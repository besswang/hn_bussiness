<template>
  <div class="step4">
    <p class="text-center">完成</p>
  </div>
</template>


<script>
import { Row,Col,Button,Breadcrumb,BreadcrumbItem,
Form,FormItem,Input,Select,Option,RadioGroup,Radio,Steps,Step } from 'element-ui'
export default {
  name: 'step4',
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
    'el-steps':Steps,
    'el-step':Step
  },
  data () {
      return {
          
      }
  },
  created () {
      this.$store.state.adminleftnavnum="/bank_step/step1"; //设置左侧导航active
  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
  
