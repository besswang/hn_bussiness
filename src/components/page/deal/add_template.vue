<template>
  <div class="list">

    <div class="source">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">商家中心</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/freight_template' }">运费模板</el-breadcrumb-item>
        <el-breadcrumb-item>{{temTitle}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="expressForm">
      <el-form-item label="运费模板:" prop="name">
        <el-col :span="12">
          <el-input v-model="ruleForm.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="快递名称:" prop="kuaidiId">
        <el-col :span="12">
          <el-select style="width:100%;" v-model="ruleForm.kuaidiId">
            <el-option 
            v-for="(express,key) in kuaidisList" 
            :key="key"
            :id="express.id"
            :value="express.name"></el-option>
          </el-select>
        </el-col>
      </el-form-item>
      <el-form-item label="寄件方式:">
        <span>按重量</span>
      </el-form-item>
      <!-- <el-form-item label="运送方式:" prop="delType"></el-form-item> -->
      <el-form-item label="默认运费:">
        <el-col :span="6">
          <el-form-item prop="firstWeight">
            <el-input v-model="ruleForm.firstWeight" type="Number">
              <template slot="append">Kg内,</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item prop="firstFee">
            <el-input v-model="ruleForm.firstFee" type="Number" ref="firstFee">
              <template slot="append">元，</template>
            </el-input>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="每增加:" prop="addedWeight">
        <el-col :span="12">
        <el-input v-model="ruleForm.addedWeight" type="Number">
          <template slot="append">Kg，</template>
        </el-input>
        </el-col>
      </el-form-item> 
      <el-form-item label="增加运费:" prop="addedFee">
        <el-col :span="12">
        <el-input v-model="ruleForm.addedFee" type="Number">
          <template slot="append">元。</template>
        </el-input>
        </el-col>
      </el-form-item>           
      <el-form-item label="是否启用:">
          <el-radio-group v-model="ruleForm.isShow">
            <el-radio :label=1>是</el-radio>
            <el-radio :label=0>否</el-radio>
          </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :disabled="disabledSave" @click="submitForm('ruleForm')">保存并返回</el-button>
        <el-button type="warning" @click="resetForm('ruleForm')">重置</el-button>
        <router-link to="/freight_template" style="color:#fff;">
          <el-button type="info">取消</el-button>
        </router-link>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { Row,Col,Button,Breadcrumb,BreadcrumbItem,
Form,FormItem,Input,Select,Option,RadioGroup,Radio} from 'element-ui'
  var validFirstFee=(rule, val,callback)=>{
      let value
      let a
      if(val){
        value = val.toString()
        a = value.substring(1,0)
        console.log(a)
      }
      if (!value){
          callback(new Error('请填写默认金额/元'))
      }else  if (value.indexOf(".") != -1 && value.substring(value.indexOf("."),value.length).length>3){
        callback(new Error('最多保留两位小数的金额'))
      }else if(value<0){
        callback(new Error('金额不能为负数'))
      }else if(a==0){
        if(value.indexOf('.') != 1){
          callback(new Error('请输入有效金额'))
        }else{
          callback()
        }
      }else {
        callback()
      }
  }
  var validFirstWeight=(rule,val,callback)=>{
      let value 
      let a 
      if(val){
        value = val.toString()
        a = value.substring(1,0)
      }
      if(!value){
        callback(new Error('请填写重量/kg'))
      }else if(value<0){
        callback(new Error('重量不能为负数'))
      }else if(!/^\d+$/.test(value)){
        callback(new Error('重量必须为整数'))
      }else if(a==0){
        if(value.indexOf('.') != 1){
          callback(new Error('请输入有效金额'))
        }
      }else {
        callback()
      }
  }
export default {
  name: 'issue',
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
    'el-radio':Radio
  },
  data () {
      return {
        disabledSave:false,//保存并返回
        temTitle:'',//当前导航名称
        temList:'',
        kuaidisList:[],
        ruleForm: {
          name: '',//运费模板
          kuaidiId:'',//快递名称
          firstWeight:'',//首重
          firstFee:'',//首重续费
          addedWeight:'',//续重
          addedFee:'',//续重单价
          isShow:1,//是否启用
        },
        rules: {
          name: [//运费模板
            { required: true, message: '请输入运费模板', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          kuaidiId: [//快递名称
            { required: true,message: '请选择快递名称', trigger: 'blur' }
          ],
          firstWeight:[
            // { required: true, message: '请填写默认运费/kg', trigger: 'blur' }
            {required:true,validator:validFirstWeight,trigger:'blur'} 
          ],
          firstFee:[
            //  { required: true, message: '请填写默认运费/元', trigger: 'blur' }    
            {required:true,validator:validFirstFee,trigger:'blur'}      
          ],
          addedWeight:[
            // { required: true, message: '请填写每增加/kg', trigger: 'blur' }
            {required:true,validator:validFirstWeight,trigger:'blur'} 
          ],
          addedFee:[
            // { required: true, message: '请填写每增加运费/元', trigger: 'blur' }
            {required:true,validator:validFirstFee,trigger:'blur'}   
          ]
        }
      };
  },
  created:function(){
    //     let _this = this
    // //获取快递名称
    //   this.$axios.post(this.$$jk.kuaidisList,{})
    //     .then(function(response){
    //         if(response.data.code == "SUCCESS"){
    //             _this.kuaidisList = response.data.data
    //         }
    //     })
    //     .catch(function(error){

    //     })
        // this.kuaidisList = this.$store.state.kuaidisList 
        this.$store.state.adminleftnavnum="/freight_template"; //设置左侧导航active 
  },
  mounted(){
    let _this = this
        let temList = this.$route.query;
        if(!temList || temList==null || temList.id){  
          this.ruleForm.isShow = temList.isShow
          this.ruleForm.name = temList.name
          this.temTitle = '编辑'+ temList.name 
          this.ruleForm.firstWeight = Number(temList.firstWeight)//默认运费/kg
          this.ruleForm.firstFee = Number(temList.firstFee)//默认运费/元
          this.ruleForm.addedWeight = Number(temList.addedWeight)//每增加/kg
          this.ruleForm.addedFee = Number(temList.addedFee)//每增加/元   
          this.disabledSave = false;                    
        }else{
          this.ruleForm.isShow = 1//是否启用 
          this.temTitle = '新增运费模板'
        }  
        //获取快递名称
        this.$axios.post(this.$$jk.kuaidisList,{})
          .then(function(response){
              if(response.data.code == "SUCCESS"){
                  _this.kuaidisList = response.data.data
                  // _this.$store.state.kuaidisList = response.data.data
                  _this.kuaidisList.forEach(item => {
                    if(temList.kuaidiId){
                      if(item.id == temList.kuaidiId){
                        _this.ruleForm.kuaidiId = item.name
                      }
                    }
                  })                
              }
          })
          .catch(function(error){

          })
  },
  methods: {
 
    //保存
      submitForm(formName) {
        let _this = this
        let id = this.$route.query.id
        console.log("2233")
        console.log(id)
        this.$refs[formName].validate((valid) => {
          if (valid) {
            
            let kuaidi= this.kuaidisList.filter(item => item.name == this.ruleForm.kuaidiId)
            //this.ruleForm.kuaidiId = String(kuaidi[0].id)
            let ruleForm = {
                name: this.ruleForm.name,
                kuaidiId:Number(kuaidi[0].id),
                firstWeight:this.ruleForm.firstWeight,
                firstFee:this.ruleForm.firstFee,
                addedWeight:this.ruleForm.addedWeight,
                addedFee:this.ruleForm.addedFee,
                isShow:Number(this.ruleForm.isShow),
            }
            console.log(ruleForm)
            if(id){//编辑模板
              let trans = Object.assign({id:id},ruleForm)
              this.$axios.post(this.$$jk.update,trans)
                .then(function(response){
                  if(response.data.code == "SUCCESS"){
                      _this.$message({
                        type: 'success',
                        message: '保存成功',
                        onClose: () => {
                          _this.$router.go(-1)
                        }
                      })                    
                  }
                })
                .catch(function(error){})
            }else{//新增模板
              this.$axios.post(this.$$jk.contactsSave,ruleForm)
                .then(function(response){
                  if(response.data.code == "SUCCESS"){
                      _this.$message({
                        type: 'success',
                        message: '保存成功',
                        onClose: () => {
                          _this.$router.go(-1)
                        }
                      })                    
                  }
                })
                .catch(function(error){})
            }
            

            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //重置
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
      // temListFn(){
      //     let temList = this.$route.query;
      //     console.log(temList,temList.name,a.name);
      // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.expressForm{
  background:#fff;
  padding:15px 15px 15px 0;
}
</style>
  
