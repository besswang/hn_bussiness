<template>
  <div class="editor" v-loading="loadUse">
    <ul class="source editor-header flex flex-row">
      <li class="flex-1">填写商品基本信息</li>
      <li class="flex-1 text-right"><span>* </span>表示该项必填</li>
    </ul>

    <div class="form-con">
        <el-form :model="goodsForm" :rules="rules" ref="goodsForm" label-width="250px" class="ruleForm">
          <el-form-item label="商品类目:">
            <el-col :span="12">
                <el-input v-model="classify" disabled></el-input>
            </el-col>
            <el-col :span="12" v-if="!goodsId">
                <el-button style="margin-left:12px;" type="primary" @click="classifyFn">选择类目</el-button>
            </el-col>
          </el-form-item>
          <el-form-item label="商品标题:" prop="name">
            <el-input v-model="goodsForm.name" placeholder="60个字以内" :maxlength="60"></el-input>
          </el-form-item>
          <el-form-item label="价格:" prop="price">
            <el-col :span="12">
              <el-input v-model="goodsForm.price" type="Number">
                <template slot="append">元</template>
              </el-input>
            </el-col>
            <el-col :span="12">
              <p class="text-right">商品在被搜索时会展示此价格</p>
            </el-col>

          </el-form-item>
          <el-form-item v-if="!ediAddlistShow" label="数量:" prop="stocks">
            <el-col :span="12">
              <el-input v-model="goodsForm.stocks" type="Number">
                <template slot="append">件</template>
              </el-input>
            </el-col>
          </el-form-item>
          <el-form-item v-if="!ediAddlistShow" label="重量:" prop="quality">
            <el-col :span="12">
              <el-input v-model="goodsForm.quality" type="Number">
                <template slot="append">KG</template>
              </el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="商品卖点(描述):" prop="detail">
            <el-input v-model="goodsForm.detail" type="textarea" :rows="4" :maxlength="100"></el-input>
            <div class="limit">当前已输入 <span>{{goodsForm.detail.length}}</span> 个字符，您还可以输入 <span>{{detailTotal}}</span> 个字符。</div>
          <hr size="1" color="#e6e6e6">
          </el-form-item>

        </el-form>
<!-- 商品属性-start -->
        <p class="attr-title">商品属性<span>(填错商品属性，可能会引起商品下架或搜索流量减少，影响您的正常销量，请认真准确填写)</span></p>
        <el-form :inline="true" class="good-atr-form" label-width="120px">
          <el-form-item label="品牌:">
            <el-select v-model="brandId" value-key="id" placeholder="请选择" @change="brandIdChange">
                <el-option label="请选择" :value='0'></el-option>
                <el-option
                v-for="brandList in brandArr"
                :key="brandList.id"
                :label="brandList.name"
                :value="brandList.id">
                </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
          v-for="(item,key2) in goodAtrArr"
          :key="key2"
          :label="item.goodsAttributes.name">
            <!-- <el-select v-model="item.goodAtr" value-key="id" placeholder="请选择"
            @change="choose(item,item.goodsAttributeValueses,item.goodAtr)">
                <el-option value=''>请选择</el-option>
                <el-option
                v-for="list in item.goodsAttributeValueses"
                :key="list.id"
                :label="list.name"
                :value="list.id">
                </el-option>
            </el-select> -->
            <el-select v-model="atrAll[key2]" value-key="id" placeholder="请选择"
            @change="choose(item,item.goodsAttributeValueses,atrAll[key2])">
                <el-option value="">请选择</el-option>
                <el-option
                v-for="list in item.goodsAttributeValueses"
                :key="list.id"
                :label="list.name"
                :value="list.id">
                </el-option>
            </el-select>
          </el-form-item>
        </el-form>
<!-- 商品属性-end -->
<!-- 商品图片-start -->
    <section class="upload-con">
      <h5 class="upload-title">商品图片：</h5>
      <div class="img-list">
          <draggable v-model="imagelist" :options="{}">
            <div class="img-content" v-for="(item,key) in imagelist" :key="key">
              <img :src="item">
              <!-- 删除icon -->
              <div class="del">
                <i @click="handleFileRemove(item,key)" class="el-icon-delete"></i>
              </div>
              <!-- 放大icon -->
              <div class="layer" @click="handleFileEnlarge(item)">
                <i class="el-icon-view"></i>
              </div>
            </div>
            <div v-if="!pass && progress !== 0" class="img-content img-progress">
              <el-progress type="circle" :percentage="progress" :status="proStatus"></el-progress>
            </div>
            <div class="img-upload">
              <!-- el-upload添加了这个accept="image/*" 开启文件夹会变慢-->
              <el-upload class="uploader"
                ref="upload"
                list-type="picture-card"
                :show-file-list="false"
                :action="params.action"
                :on-preview="handlePreview"
                :data="params.data"
                :on-change="uploadOnChange"
                :on-success="uploadOnSuccess"
                :on-error="uploadOnError"
                :on-progress="uploadOnProgress"
                :before-upload="beforeImgUpload">
                <i class="el-icon-plus"></i>
                  <!-- <el-button type="primary">点击上传</el-button> -->
              </el-upload>
            </div>
          </draggable>
          <el-dialog title="" :visible.sync="isEnlargeImage" :modal-append-to-body="false" top="8%" width="60%">
            <img @click="isEnlargeImage = false" style="width:100%;" :src="enlargeImage">
          </el-dialog>
      </div>
      <p class="img-hint">可选5张，图片尺寸为800*800，单张大小不超过5M，仅支持JPG、JPEG、PNG、GIF格式。<br>
      第一张为主图，可拖动调换图片位置。</p>
    </section>
<!-- 商品图片-end -->
<!-- 商品详情-start -->
    <section class="editor-con">
      <h5 class="editor-title">商品详情：</h5>
      <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption"
        @change="onEditorChange($event)">
      </quill-editor>
      <div class="limit">当前已输入 <span>{{nowLength}}</span> 个字符，您还可以输入 <span>{{SurplusLength}}</span> 个字符。</div>
    </section>
<!-- 商品详情-end -->
    <el-form :model="ruleForm2" ref="ruleForm2" :rules="rules2" label-width="80px">
      <p>物流服务:</p>
      <el-form-item label="提取方式">
        <el-radio-group v-model="isFreeMail" @change="extractFn">
          <el-radio :label="0">运费模板</el-radio>
          <el-radio :label="1">包邮</el-radio>
        </el-radio-group>
      </el-form-item>
      <transition name="fade">
        <el-form-item prop="currentExtract" label="运费模板" v-show="isFreeMail == '0'">
             <el-select v-model="ruleForm2.currentExtract">
                <el-option
                  v-for="(item,i) in extractArr"
                  :key="i"
                  :label="item.name"
                  :value="item.id"
                  :disabled="item.isShow==0">
                </el-option>
              </el-select>
        </el-form-item>
      </transition>
      <hr size="1" color="#e6e6e6">
      <p>其他信息:</p>
      <el-form-item label="上架时间">
        <el-radio-group v-model="isShow">
          <el-radio :label="1">立刻上架</el-radio>
          <el-radio :label="0">暂不上架</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <!-- <hr size="1" color="#e6e6e6">  -->
    </div>
    <el-row class="btn-con">
      <el-col :span="6">
        <template v-if="goodsId">
            <el-button v-show="hasGoodsId" type="primary" class="save-btn"  @click="issueBtn('goodsForm','ruleForm2',2)">保存</el-button>
        </template>
        <template v-else>
            <!-- <el-button v-show="issueBtnShow" type="primary" class="save-btn"  @click="issueBefore('goodsForm','ruleForm2',1)">发布</el-button> -->
            <el-button type="primary" class="save-btn"  @click="issueBtn('goodsForm','ruleForm2',1)">发布</el-button>
        </template>
      </el-col>
      <el-col :span="6" v-if="!goodsId">
        <el-button type="primary" class="save-btn" @click="previewBtn">预览</el-button>
      </el-col>
      <el-col :span="12" v-if="!ediAddlistShow" v-show="!spcShow">
        <el-button type="primary" class="save-btn" @click.native.prevent="spcSeting">商品规格设置</el-button>
      </el-col>
    </el-row>
<!-- 商品预览-start -->
    <el-dialog title="商品预览" :visible.sync="dialogPreview" :modal-append-to-body="false" top="4%" width="80%">
      <vdetail
      :goodsForm="goodsForm"
      :imagelist="imagelist"
      :sign="sign"
      :content="content"
      :oneImg="oneImg"
      :brandName="brandName"
      ></vdetail>
    </el-dialog>
<!-- 商品预览-end -->
<!-- 商品规格-start-sku的组件 -->
<!-- 参考:https://github.com/wojianishanghaojiugoujia/vue-sku-component -->
<!-- 参考:https://github.com/rossroma/vue-sku -->
    <transition name="slide-fade">
      <addlist
      :spcShow="spcShow"
      :signForm="signForm"
      :addValues="addValues"
      :goodsId="goodsId"
      :goodsCategoryId="categoryId"
      ></addlist>
    </transition>
<!-- 商品规格-end -->
      <edi-addlist
      :ediAddlistShow="ediAddlistShow"
      :goodsId="goodsId"
      :ediAddlistTable='ediAddlistTable'
      :ediAddlistColumn="ediAddlistColumn"></edi-addlist>

  </div>
</template>


<script>
import Vdetail from './goods_detail.vue'
import draggable from 'vuedraggable'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
// 商品规格
import addlist from '../../common/addlist.vue'
import ediAddlist from '../../common/edi_addlist.vue'
import atrTable from '../../common/editor_atrTable.vue'

import { Row,Col,Dialog,Button,Form,FormItem,
Input,Upload,RadioGroup,Radio, Select,Option, TableColumn, Table, Progress, Checkbox, ButtonGroup} from 'element-ui'
var validFirstFee=(rule, val,callback)=>{
    let value = val.toString()
    if (!value){
        callback(new Error('请输入商品价格'))
    }else  if (value.indexOf(".") !== -1 && value.substring(value.indexOf("."),value.length).length>3){
      callback(new Error('最多保留两位小数的金额'))
    }else if(value<0){
      callback(new Error('价格不能为负数'))
    }else {
      callback()
    }

}
var validStocks=(rule, val,callback)=>{
    let value = val.toString()
    if (!value){
        callback(new Error('请输入商品数量'))
    }else  if (value.indexOf(".") !== -1){
      callback(new Error('必须为整数'))
    }else if(value<0){
      callback(new Error('数量不能为负数'))
    }else {
      callback()
    }
}
var validQuality=(rule, val,callback)=>{
    let value = val.toString()
    if(value<0){
      callback(new Error('数量不能为负数'))
    }else {
      callback()
    }
}
export default {
  name: 'issue',
  components: {
    // vPreview,
    addlist,
    ediAddlist,
    atrTable,
    Vdetail,
    quillEditor,
    draggable,
    'el-row':Row,
    'el-col':Col,
    'el-dialog':Dialog,
    'el-button':Button,
    'el-form':Form,
    'el-form-item':FormItem,
    'el-input':Input,
    'el-upload':Upload,
    'el-radio-group':RadioGroup,
    'el-radio':Radio,
    'el-select':Select,
    'el-option':Option,
    'el-table-column':TableColumn,
    'el-table':Table,
    'el-progress':Progress,
    'el-checkbox':Checkbox,
    'el-button-group':ButtonGroup
  },
  data () {
    return {
      ediAddlistShow:false,//
      ediAddlistTable:[],
      ediAddlistColumn:['价格','库存','重量','图片'],
      hasGoodsId:true,//判断是否有goodsId
      loadUse:false,
      addressFlag:true,
      nameObj:[],//除品牌的规格属性name对象
      goodsAttributesName:'',//规格名称
      oneImg:'',
      sign:'',//店招
    activeAtrArr:[],//goodsAttributesIdList对象集合
    goodsId:'',//商品id
    goodsAttributesId:[],//属性所属当前类下的id集合
    atrAll:[], //select里model的集合
    goodsForm:{
        name:'',//商品名称
        price:'',//价格
        stocks:'',//数量
        quality:'',//重量
        detail:''//商品描述
    },
    ruleForm2:{
      currentExtract:'',//运费模板当前
    },
    rules2: {
      currentExtract: [
        { required: true, message: '请选择运费模板', trigger: 'blur' },
      ]
    },
    rules: {
      name: [
        { required: true, message: '请输入商品名称', trigger: 'blur' },
        {  max: 60, message: '长度在 60 个字符以内', trigger: 'blur' }
      ],
      price: [
        // { required: true, message: '请输入商品价格', trigger: 'blur' }
        {required:true,validator:validFirstFee,trigger:'blur'}
      ],
      stocks: [
        // { required: true, message: '请输入商品数量', trigger: 'blur' }
        {required:true,validator:validStocks,trigger:'blur'}
      ],
      quality: [
        { required: true,validator:validQuality, trigger: 'blur' }
      ],
      detail: [
        { required: true, message: '请输入商品卖点描述', trigger: 'blur' }
      ],
    },
    //商品规格-start
    spcShow:false,//商品规格设置显示表单
    signForm: [{
      id:'',//规格id
      addAtrText:'',//添加商品规格
      signFormList: [],//{id:'',title:''}当前规格下的商品属性
      showEdi:false,//false显示保存按钮，true显示编辑按钮
    }],
    addValues: [], // 用来存储要添加的规格属性
    //商品规格-end
        goodAtrArr:[],//商品属性
        goodAtr:'',//选中的商品属性
        goodArr:[],//选中的商品的属性对象
        //atrListId:[],//选中商品属性的id
        brandArr:[],//品牌数组
        brandId:0,//当前商品品牌id
        brandName:'',//当前商品品牌名称
        dialogPreview:false,//商品预览
        extractArr:[],//运费模板数组
        content:'',//富文本内容对应的字段
        editorOption: {
         // something config
        },
        removeHTMLTag(str) {
          str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
          str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
          str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
          str=str.replace(/ /ig,'');//去掉
          return str;
        },
        get nowLength() {
          // if(this.content.length ==0 ){
              return this.removeHTMLTag(this.content).length
          // }else{
          //     return this.removeHTMLTag(this.content).length-7
          // }
        },
        get SurplusLength() {   // 计算属性 获得当前输入字符长度
          let num
          // if(this.content.length ==0 ){
             num = 10000 - Number(this.removeHTMLTag(this.content).length)
          // }else{
          //    num = 10000 - Number(this.content.length)+7
          // }
          if (num > 0) {
            return num
          }else {
            return 0
          }
        },
        get detailTotal(){
          let num
          num = 100 - Number(this.goodsForm.detail.length)
          if (num > 0) {
            return num
          } else {
            return 0
          }
        },
      isFreeMail:1,//是否包邮1：是，0：否
      isShow:1,//上架时间
      invoice:'1',//1：立刻上架；0：暂不上架
      dialogImageUrl: '',
      dialogVisible: false,
      classify:'',//商品类目
      categoryId:'',//三级类目id
      form:{

      },
      progress: 0,//上传进度
			pass: null,//是否上传成功
			isEnlargeImage: false,//放大图片
			enlargeImage: '',//放大图片地址
      imagelist: [],//商品图片数组，最多传5张
			params: {
        // action: 'http://jsonplaceholder.typicode.com/posts/',
        action:'/hn-shop-web/merchant/editor/upload',//上传fty的地址
        data: {}
      },
      c:[]
    }
  },
  computed: {
		proStatus(){//上传状态
			if(this.pass){
				return 'success'
			}else if(this.pass == false){
				return 'exception'
			}else{
				return ''
			}
    },
	},
  created () {
      let _this = this
      let routeClassify = this.$route.query.classify;//从商品发布传过来的分类
      if(routeClassify){//商品发布-填写商品基本信息
        this.$store.state.adminleftnavnum="/issue"; //设置左侧导航active
        this.classify = this.$route.query.classify
        this.categoryId = this.$route.query.categoryId.toString()//获取路由传参三级目录id
        this.getGoodsBrandsFn(this.categoryId)
      }else{//商品列表-编辑
        this.$store.state.adminleftnavnum="/product_list"; //设置左侧导航active
        //商家编辑商品
        this.listGoodsAttributesFn()
        //编辑规格
        this.ediSpecTable()
      }
      this.sign = sessionStorage.getItem('sign')

  },
  methods: {
    //编辑规格table表格
    ediSpecTable(){
      let _this = this
      this.$axios.post(this.$$jk.getGoodsAttributeCategoryIndexSkusDetail,{goodsId:this.goodsId})
      .then((res) => {
        if(res.data.code == "SUCCESS"){
            let r = res.data.data
            if(r.length>0){
              _this.ediAddlistShow = true
              _this.ediAddlistTable = r
              let list = _this.ediAddlistTable[0].goodsAttributeSkusList
              // let list2 = list.concat()
              // list2.reverse()
              var keys=[];//定义一个数组用来接受key
              //var values=[];//定义一个数组用来接受value
              list.forEach(item =>{
                for(var key in item){
                  keys.push(key);
                  _this.ediAddlistColumn.unshift(item[key])
                }
              })
              // console.log(keys)
            }
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    },
    //品牌的change事件
    brandIdChange(val){
      let obj = {}
      obj = this.brandArr.find((item) => {
        return item.id === val
      })
      this.brandName = obj.name
    },
    listGoodsAttributesFn(){
      let _this = this
      this.goodsId = this.$route.query.goodsId.toString();//从商品列表--编辑-传过来的商品id
      if(this.goodsId){
//获取已选属性-start
        //this.$axios.post(this.$$jk.editGoodsForMerchant,{goodsId:this.goodsId})
        this.$axios.post('editGoodsForMerchant',{goodsId:this.goodsId})
        .then(function(response) {
          if(response.data.code == "SUCCESS"){
            let r = response.data.data
            _this.classify = r.goodsCategoriesFirst.name+'>'+r.goodsCategoriesSecond.name+'>'+r.goodsCategoriesThird.name
            _this.goodsForm.name = r.goods.name
            _this.goodsForm.price = r.goods.price
            _this.goodsForm.stocks = r.goods.stocks
            _this.goodsForm.quality = r.goods.quality
            _this.goodsForm.detail = r.goods.detail
            _this.categoryId = r.goods.categoryId.toString()
            _this.imagelist = [r.goods.goodsImage]
            r.goodsImagesList.forEach(item => {
               _this.imagelist.push(item.imageUrl)
            })
            _this.content = r.goods.details
            _this.isFreeMail = r.goods.isFreeMail
            _this.isShow = r.goods.isShow
            //模板
            _this.extractFn(_this.isFreeMail)
            _this.ruleForm2.currentExtract = r.goods.merchantContactId
            //商品属性-品牌
            _this.getGoodsBrandsFn(_this.categoryId)
            _this.brandId = r.goods.brandId
            if(r.goodsAttributesIdList != null){
              _this.activeAtrArr = r.goodsAttributesIdList
            }
          //获取该类商品对应的商品属性（除了品牌）
          let that = _this
          //_this.$axios.post(_this.$$jk.listGoodsAttributes,{categoryId:_this.categoryId})
          _this.$axios.post('listGoodsAttributes',{categoryId:_this.categoryId})
              .then(function(response) {
                if(response.data.code == "SUCCESS"){
                  that.goodAtrArr = response.data.data
                  that.goodAtrArr.forEach(item => {
                      that.goodsAttributesId.push(item.goodsAttributes.id)//原始的
                  })
                  let len = that.activeAtrArr.length
                  for(let j=0;j<len;j++){
                      that.goodsAttributesId.forEach((item,i) => {
                        if(that.activeAtrArr[j][item]){
                          that.atrAll[i] = that.activeAtrArr[j][item]
                        }
                      })
                  }
                }
              })
              .catch(function(error) {
                  alert(error);
              });
          }
        })
        .catch(function(error) {
            alert(error);
        });
//获取已选属性-end
      }
    },
    getGoodsBrandsFn(id){
      let _this = this
      //获取商品对应的品牌
      //this.$axios.post(this.$$jk.getGoodsBrands,{categoryId:id})
      this.$axios.post('getGoodsBrands',{})
      .then(function(response) {
        if(response.data.code == "SUCCESS"){
          _this.brandArr = response.data.data
        }
      })
      .catch(function(error) {
          alert(error);
      });
    },
    //提取方式radio切换
    extractFn(val){
        if(val==0){//运费模板
          this.templateList()
        }else{
          this.ruleForm2.currentExtract = ''
        }
    },
    //获取该店铺的运费模板
    templateList(){
      let _this = this
      let id = sessionStorage.getItem('merchantId')
      // this.$axios.post(this.$$jk.getContactsByMerchantId,{merchantId:id})
      this.$axios.post('getContactsByMerchantId',{merchantId:id})
          .then(function(response) {
              if(response.data.code == "SUCCESS"){
                console.log(response.data.data)
                  _this.extractArr = response.data.data
              }
          })
          .catch(function(error) {
              alert(error);
          });
    },
    berem(file, fileList){
        // console.log(fileList)
    },
    // 商品规格
    spcSeting(){
      if(!this.goodsId){
        this.$message({
          message:'请先发布商品',
          type:'warning'
        })
        this.hasGoodsId = false;
        return false;
      }else{
        this.spcShow = true;
        this.hasGoodsId = true
      }
    },

    //富文本编辑器  文本改变时 设置字段值
    onEditorChange({ editor, html, text }) {
        // let a = this.removeHTMLTag(this.content)
        this.content = html
        let textafter
        if(Number(this.removeHTMLTag(this.content).length)>=10001){
          textafter = text.substring(0,10000)
        }
        if(textafter){
          this.$message({
            message:'商品详情文字超出限定字数',
            type:'warning'
          })
          return false
        }
    },
    //商品属性-除了品牌
    choose(rows,row,value){

      // let filterAtrAll = this.atrAll.filter(function(n) { return n; });
      // console.log(filterAtrAll)

        // let chooseItem = row.filter(item => item.name === value)[0]
        let obj = {
          // pid:rows.goodsAttributes.id,//label的id
          // id:chooseItem.id,//选中属性select的id
          goodsAttributeId:rows.goodsAttributes.id,
          // goodsAttributeValuesId:chooseItem.id
          goodsAttributeValuesId:value
        }
        this.goodArr.unshift(obj);

    },
    //商品属性-品牌
    // chooseBrand(value){
    //   if(value){
    //     let choosenItem = this.brandArr.filter(item => item.name === value)[0];
    //     this.brandId = choosenItem.id
    //   }
    // },
    //选择类目
    classifyFn(){
        this.$router.push({path:'/issue'})
    },
//图片上传
    beforeImgUpload(file){//上传文件之前的钩子
      if(this.imagelist.length>4){
        this.$message({
          message: '最多可上传5张图片',
          type: 'warning'
        });
        return false
      }
      if(!/image\/\w+/.test(file.type)){//判断图片格式
        this.$message({
          message: '图片仅支持JPG、JPEG、PNG、GIF格式',
          type: 'warning'
        });
        return false;
      }
      if(parseInt(file.size) > 1024*1024*5){
        this.$message({
          message: '单张大小不超过5M',
          type: 'warning'
        });
        return false;
      }
    },
    handlePreview(file){
      //console.log("preview事件")
    },
    uploadOnProgress(e,file){//开始上传
      // console.log(e.percent,file)
      //console.log("uploadOnProgress事件")
			this.progress = Math.floor(e.percent)
		},
		uploadOnChange(file){
      //console.log("——————————change——————————")
			if(file.status == 'ready'){
				this.pass = null;
				this.progress = 0;
			}else if(file.status == 'fail'){
				this.$message.error("图片上传出错，请刷新重试！")
			}
		},
    uploadOnSuccess(e,file,fileList){//上传附件
      //console.log(e.url);//ftp返回的url
			this.pass = true;
      this.$message.success("上传成功")
      setTimeout(() => {
        this.imagelist.push(e.url)
      }, 800);
      //this.imagelist.push(e.url)
      //this.imagelist.push(file.url)//本地图片地址
		},
		uploadOnError(e,file){
			// console.log("——————————error——————————")
			this.pass = false;
		},
		handleFileEnlarge(_url){//放大图片
			if(_url){
				this.enlargeImage = _url;
				this.isEnlargeImage = !this.isEnlargeImage;
			}
		},
		handleFileRemove(file,i){//删除图片
      //console.log(file,i)//这里的file就是图片的url
			if(!file){
        return false;
			}
			let that = this;
			this.$confirm('是否删除此图片？','提示',{
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
			}).then(() => {
        this.imagelist.splice(i,1)
				this.$message({
					type: 'success',
					message: '删除成功'
				})
      }).catch((meg) => console.log(meg))

    },
//预览
    previewBtn(){
      this.dialogPreview = true;
    },
//模板判断
currentE(form){
      let flag
      if(this.isFreeMail==0){
          this.$refs[form].validate((valid) => {
            if (valid) {
              flag = true
            } else {
              console.log('error submit!!');
              flag =  false;
            }
          });
      }
      return flag;
},
//发布flag:1,发布，flag:2,修改-保存
    issueBtn(form,form2,flag){
      let _this = this
      //如果不执行choose事件，在修改完其他的参数后，直接提交，在这里重新整理商品属性
      //console.log(this.goodsAttributesId)
      //console.log(this.atrAll)
      // console.log(this.initialGoodsAttributesId)
      this.goodsAttributesId.forEach((item,i) => {
          this.goodArr.unshift({goodsAttributeId:item,goodsAttributeValuesId:this.atrAll[i]})
      })

      //模板判断
      if(this.currentE(form2) == false){
        return false;
      }
      let routeId = this.$route.query.id;
      Array.prototype.deleteEle=function(){
          var newArr = this;
          for (var i=newArr.length-1; i>=0; i--)
          {
              var targetNode = newArr[i].goodsAttributeId;

                  for (var j=0; j<i; j++)
                  {
                      // if(newArr[i].goodsAttributeValuesId == ''){
                      //     newArr.splice(i,1);
                      //     break;
                      // }
                      if(targetNode == newArr[j].goodsAttributeId){
                          newArr.splice(i,1);
                          break;
                      }
                  }
          }
          return newArr;
      }
      this.goodArr.deleteEle()//对象去重

      let newGoodArr = []
      this.goodArr.forEach(item => {//去空
        if(item.goodsAttributeValuesId){
          newGoodArr.push(item)
        }
      })

      if(this.imagelist.length == 0){
        this.$message({
              message: '请上传商品图片',
              type: 'warning'
        });
        return false;
      }
      if(!this.content){
        this.$message({
          message: '请填写商品详情',
          type: 'warning'
        });
        return false
      }
      if(Number(this.removeHTMLTag(this.content).length)>10000){
          this.$message({
            message:'商品详情文字超出限定字数',
            type:'warning'
          })
          return false
      }
      let goodsForm
      this.$refs[form].validate((valid) => {
          if (valid) {
            goodsForm = _this.goodsForm
          } else {
            _this.$message({
              message: '请将信息填写完整',
              type: 'warning'
            });
            return false;
          }
      });
      this.loadUse = true;
      //console.log({goodsAttributeSkusInfoList:this.goodArr})//商品属性，除了品牌{goodsAttributeSkusInfoList:[]}
      //console.log(goodsForm)//商品标题到商品描述
      //console.log({brandId:this.brandId})//商品品牌{brandId:}
      //console.log({goodsImage:this.imagelist})//商品图片{goodsImage:[]}

      //{
      //goodsForm:商品标题到商品描述;
      //categoryId：三级目录id
      //brandId：商品品牌id；
      //goodsImage：商品图片；
      //isFreeMail：是否包邮
      //isShow：是否上架
      //}
      let imagelist = this.imagelist.join(","); //图片数组转字符串
      // let goodArr = JSON.stringify(this.goodArr)
      let goodArr = JSON.stringify(newGoodArr)

      let goods = Object.assign({goodsAttributeValuesInfos: goodArr},goodsForm,{details:this.content},{categoryId:this.categoryId},{brandId:this.brandId},
      {goodsImage:imagelist},{isFreeMail:this.isFreeMail},
      {isShow:this.isShow},{merchantContactId:this.ruleForm2.currentExtract})
      //发布接口
      if(flag == 1){
        this.$axios.post(this.$$jk.goodsRelease,goods)
          .then(function(response) {
              if(response.data.code == "SUCCESS"){
                  _this.$message({
                    message: '发布成功',
                    type: 'success'
                  });
                  if(_this.hasGoodsId){
                      _this.$router.push('/product_list')
                  }
                  _this.goodsId = response.data.data.toString()
              }else{
                _this.$message.error('发布失败');
              }
              setTimeout(() => {
                _this.loadUse = false
              }, 500);
          })
          .catch(function(error) {
              alert(error);
          });
      }else{//编辑-保存
        let saveGoods = Object.assign(goods,{id:this.goodsId})
        this.$axios.post(this.$$jk.updateGoods,saveGoods)
          .then(function(response) {
              if(response.data.code == "SUCCESS"){
                  _this.$message({
                    message: '保存成功',
                    type: 'success',
                    onClose: () => {
                        _this.$router.push('/product_list')
                    }
                  });
              }
              setTimeout(() => {
                _this.loadUse = false
              }, 500);
          })
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
.el-table td{
  border-bottom:1px solid #fff !important;
}
.el-table--enable-row-hover .el-table__body tr:hover>td {
    background:#fff;
}
.commodity-title{
  width:228px;float:left;height:40px;line-height:40px;padding-right:12px;
}
/* 图片上传样式 */
*{
	box-sizing: border-box;
}
.img-list{
	overflow:hidden;
	width:100%;
}
.img-list .img-content{
	float:left;
	text-align:left;
	position:relative;
	display:inline-block;
	width:200px;
	height:240px;
	padding:5px;
	margin:5px 20px 20px 0;
	border:1px solid #d1dbe5;
	border-radius:4px;
	transition:all .3s;
	box-shadow:0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
}
.img-list .img-upload{
	float:left;
	width:200px;
	height:240px;
	display:table;
	text-align:center;
}
.img-list .uploader{
	width:100%;
	display:table-cell;
	vertical-align:middle;
}
.img-list .img-progress{
	text-align:center;
	padding-top:50px;
}
.img-list .img-content img{
	display:block;
	width:100%;
	height:190px;
	margin:0 auto;
	border-radius:4px;
}
.img-list .img-content .name{
	margin-top:10px;
}
.img-list .img-content .name>div{
	width:90%;
	text-overflow:ellipsis;
	overflow:hidden;
	height:25px;
	line-height:25px;
}
.img-list .img-content:hover .del,
.img-list .img-content:hover .layer{
	opacity:1;
}
.img-list .img-content .del,
.img-list .img-content .layer{
	opacity:0;
	transition:all .3s;
}
.img-list .img-content .del{
	position:absolute;
	bottom:10px;
	right:10px;
	color:#8492a6;
	cursor:pointer;
	font-size:1.1em;
}
.img-list .img-content .layer{
	position:absolute;
	left:0;
	right:0;
	top:0;
	height:200px;
	color:#fff;
	text-align:center;
	z-index:5;
	background-color:rgba(0,0,0,.4);
}
.img-list .img-content .layer i{
	font-size:1.6em;
	margin-top:80px;
}
.upload-con,.editor-con{
  padding:20px;
}
.upload-con .upload-title{
  font-size:14px;
  color:#2c3e50;
  font-weight:normal;
  display:inline-block;
}
.upload-con .upload-title::before,.editor-title::before{
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
}

.editor-title{
  font-size:14px;
  color:#2c3e50;
  font-weight:normal;
  display:inline-block;
  padding-bottom:20px;
}
.spc-title{
  font-size:14px;
  color:#2c3e50;
  font-weight:normal;
  padding-bottom:20px;
}
.attr-title{
  padding-left:20px;
}
.attr-title>span{
  color:#ff4545;
}
.limit {
  height: 30px;
  border: 1px solid #ccc;
  line-height: 30px;
  text-align: right;
  color:#8c8c8c
}
.limit>span {
  color: #ee2a7b;
}
.good-atr-form{
  padding-top:20px;
}
.btn-con{
  background:#fff;
  padding-bottom:15px;
}
</style>
<style lang="less">
.quill-editor{
  .ql-container {
    min-height: 100px;
    .ql-editor {
      min-height:100px;
    }
  }
}

 .spec-uploader{
   width:50px;
   margin:0 auto;
    .el-upload{
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      &:hover{
          border-color: #409EFF;
      }
    }
 }
  .specification {
    display: inline-block;
    vertical-align: top;
    .spec-list {
      margin-bottom:15px;
      .item {
        margin-top: 5px;
        &:first-child {
          margin-top: 0;
        }
        .name {
          padding: 2px 8px;
          overflow: hidden;
          .el-input {
            float: left;
            width: 150px;
          }
          .icon {
            display: none;
            color: #929292;
            cursor: pointer;
            &:hover {
              color: #880000;
            }
          }
          &:hover {
            .icon {
              display: inline-block;
            }
          }
        }
        .values {
          padding: 2px 8px;
          .el-tag {
            margin: 8px 0 8px 8px;
          }
          .add-attr {
            display: inline-block;
            vertical-align: middle;
            .el-input {
              width: 200px;
            }
          }
        }
      }
      .add-spec {
        font-size: 13px;
      }
    }
  }
  .stock-table {
    background:#fff;
    margin-top:20px;
    td,
    th {
      padding: 5px 10px;
      border: 1px solid #ddd;
      width: 100px;
      font-size: 14px;
    }
  }
</style>
