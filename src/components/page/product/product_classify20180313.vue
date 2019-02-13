<template>
  <div class="classify">

    <div class="source">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">商家中心</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="add-btn">
      <el-button type="primary" @click="addClassify()">新增分类</el-button>
    </div>

  <!-- 新增分类弹窗 -->
  <el-dialog title="添加商品分类" :visible.sync="dialogFormVisible">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
      <el-form-item label="父级分类">
        <el-select v-model="ruleForm.currentRegion" placeholder="请选择活动区域">
          <el-option 
           v-for='(region,key) in regionArr'
           :key=key
           :value="region"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="分类名" prop="classifyName">
        <el-input v-model="ruleForm.classifyName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="展示">
        <el-radio-group v-model="ruleForm.radio">
          <el-radio label="1">是</el-radio>
          <el-radio label="0">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelFn('ruleForm')">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
    </div>
  </el-dialog>

  <el-table
    :data="tableData5"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item>
            <span>{{ props.row.name }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>

    <el-table-column
      label="分类名"
      prop="name">
    </el-table-column>
    <el-table-column
      label="是否展示"
      prop="sw">
    </el-table-column>
    <el-table-column
      label="操作"
      prop="operation">
    </el-table-column>
  </el-table>

  </div>
</template>


<script>
import { Row,Col,Button,Breadcrumb,BreadcrumbItem,Dialog,Form,FormItem,Select,
Option,Input,RadioGroup,Radio,Table,TableColumn } from 'element-ui'
export default {
  name: 'issue',
  components: {
    'el-row':Row,
    'el-col':Col,
    'el-button':Button,
    'el-breadcrumb':Breadcrumb,
    'el-breadcrumb-item':BreadcrumbItem,
    'el-dialog':Dialog,
    'el-form':Form,
    'el-form-item':FormItem,
    'el-option':Option,
    'el-select':Select,
    'el-input':Input,
    'el-radio-group':RadioGroup,
    'el-radio':Radio,
    'el-table':Table,
    'el-table-column':TableColumn
  },
  data () {
    return {
        dialogTableVisible: false,
        dialogFormVisible: false,
        regionArr:['顶级类别','二级类别'],
        ruleForm: {
          currentRegion:'顶级类别',//父级分类当前类别
          classifyName: '',//分类名
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          radio: '1'
        },
        rules: {
          classifyName: [//分类名
            { required: true, message: '请输入分类名，最多20个字', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ]
        },
         tableData5: [
            {
              id: '12987122',
              name: '好滋好味鸡蛋仔',
              sw:'是',
              operation:'编辑'
            }
            // ,{
            //   id: '12987122',
            //   name: 'b页面',
            //   sw:'是',
            //   operation:'编辑',
            //   sublistArr:[{
            //     parentid:12987122,
            //     id:1,
            //     name:'二级类目b',
            //     sw:'否',
            //     operation:'编辑'
            //   }]}
        ]
    }
  },
  created () {
      this.$store.state.adminleftnavnum="/product_classify"; //设置左侧导航active
  },
  methods: {
    //新增分类按钮事件
    addClassify(){
      //开启弹窗
      this.dialogFormVisible = true;
      //向后台请求父级分类列表
    },
    //新增分类弹窗-确定事件
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm);
          alert('submit!');
          //关闭弹窗
          this.dialogFormVisible = false
          //重置表单
          this.$refs[formName].resetFields();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //新增分类弹窗-取消事件
    cancelFn(formName){
        //关闭弹窗
        this.dialogFormVisible = false
        //重置表单
        this.$refs[formName].resetFields();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.add-btn{
  background:#fff;
  margin-bottom:20px;
  padding:15px;
}
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
  
