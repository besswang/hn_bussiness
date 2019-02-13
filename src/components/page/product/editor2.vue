<template>
  <div class="editor">
    <ul class="source editor-header flex flex-row">
      <li class="flex-1">填写商品基本信息</li>
      <li class="flex-1 text-right"><span>* </span>表示该项必填</li>
    </ul>

    <div class="form-con">
        <el-form ref="form" :model="form" label-width="250px" class="ruleForm">
          <el-form-item label="商品类目:">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="商品标题:">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="价格:">
            <el-input>
              <template slot="append">元</template>
            </el-input>
          </el-form-item>     
          <el-form-item label="数量:">
            <el-input>
              <template slot="append">件</template>
            </el-input>
          </el-form-item> 
          <el-form-item label="重量:">
            <el-input>
              <template slot="append">KG</template>
            </el-input>
          </el-form-item> 
          <el-form-item label="商品卖点(描述):">
            <el-input type="textarea" :rows="4"></el-input>
          </el-form-item>  
          <hr size="1" color="#e6e6e6"> 
          <el-form-item label="商品图片:">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <p class="img-hint">一次可选5张，图片尺寸为800*800，单张大小不超过1024K。仅支持JPG、JPEG、PNG格式。</p>
          </el-form-item> 
          <hr size="1" color="#e6e6e6">  
          <el-form-item label="其他信息:"></el-form-item> 
          <el-form-item label="上架时间:">
            <el-radio-group v-model="invoice">
              <el-radio label="1">立刻上架</el-radio>
              <el-radio label="0">暂不上架</el-radio>
            </el-radio-group>
          </el-form-item> 
          <el-form-item label="分佣比例:">
            <el-col :span="6">
              <el-input>
                <template slot="append">%</template>
              </el-input>
            </el-col>
            <el-col :span="18">
              <p class="ratio-text">分佣比例是指 此商品成功销售后，销售额将按此比例返佣给区域负责人, 比如商品单价100，比例0.06，结算后商家将获得94，负责人将获得6。</p>
            </el-col>
          </el-form-item>
          <el-button type="primary" class="save-btn"  @click="save">保存</el-button>                       
        </el-form>
    </div>

    <el-dialog :visible.sync="dialogVisible" size="tiny">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>


<script>
import { Row,Col,Dialog,Button,Form,FormItem,
Input,Upload,RadioGroup,Radio} from 'element-ui'
export default {
  name: 'issue',
  components: {
    'el-row':Row,
    'el-col':Col,
    'el-dialog':Dialog,
    'el-button':Button,
    'el-form':Form,
    'el-form-item':FormItem,
    'el-input':Input,
    'el-upload':Upload,
    'el-radio-group':RadioGroup,
    'el-radio':Radio
  },
  data () {
    return {
      invoice:'1',//1：立刻上架；0：暂不上架
      dialogImageUrl: '',
      dialogVisible: false,
      form:{

      }
    }
  },
  created () {
      this.$store.state.adminleftnavnum="/product_list"; //设置左侧导航active
  },
  mounted(){
      let _this = this
      // this.$axios.post('/hn-shop-web/bankNames/bankNamesList',{state:pstate})
      //     .then(function(response) {
      //       let bankList = response.data.data.list
      //       _this.bankArr = bankList;
      //       console.log(bankList)

      //     })
      //     .catch(function(error) {
      //         alert(error);
      //     });      
  },
  methods: {
    //保存
    save(){
        this.$message({
          message: '保存成功',
          type: 'success'
        });
    },
    //图片上传
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
hr{
  margin-bottom:15px;
}
.form-con{
  background:#fff;
  padding:22px 0 15px 0;
}
.editor-header{
  border-bottom: 4px solid #4aa6ec;
}
.editor-header>li>span{
  color:#d71f1b;
}
.ruleForm>.el-form-item{
  padding-right:20%;
}
.img-hint{
  color: #8c8c8c;
  font-size:14px;
}
.ratio-text{
  color: #8c8c8c;
  font-size:14px;
  line-height:20px;
  padding-left:15px;
}
.save-btn{
  display: block;
  margin:0 auto;
  width:30%;
}
</style>
  
