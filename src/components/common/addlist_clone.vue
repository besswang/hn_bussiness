<template>
    <div class="specification" v-show="spcShow">
        <section class="specification">
        <h5 class="spc-title">商品规格:</h5>
        <ul class="spec-list">
            <li class="item" v-for="(signFormItem,key) of signForm" :key="key">
            <div class="name">
                <el-input v-show="!signFormItem.showEdi" v-model="signFormItem.addAtrText" class="spc-input" type="text" placeholder="请输入属性名"></el-input>
                <span class="editext" v-show="signFormItem.showEdi">{{signFormItem.addAtrText}}</span>
                <el-button-group>
                <el-button type="danger" icon="el-icon-delete" @click.native="delSpec(key,signFormItem.id)"></el-button>
                <el-button v-show="!signFormItem.showEdi" type="primary" @click.native="saveSpec(key,signFormItem.id)">保存</el-button>
                <el-button v-show="signFormItem.showEdi" type="primary" @click.native="ediSpec(key,signFormItem.id)">修改</el-button>
                </el-button-group>
            </div>
            <div class="values">
                <span class="el-tag" v-for="(item,index) of signFormItem.signFormList" :key="index">
                    <span class="el-select__tags-text">{{item.title}}</span>
                    <i class="el-tag__close el-icon-close" @click="delSpecSub(key, index,item.id)"></i>
                </span>
                <div class="add-attr">
                    <el-input v-model="addValues[key]" size="mini"></el-input>
                    <el-button size="mini" type="danger" icon="el-icon-plus" @click="addSpecSub(signFormItem.id,addValues[key],key)" @keyup.native.enter="addSpecTag(signFormItem.id,addValues[key],key)"></el-button>
                </div>
            </div>
            </li>
        </ul>
        <el-button v-show="signForm.length<3?true:false" 
        class="spc-btn" :span="24" type="primary" size="large" @click.native="addSpec">新增销售属性</el-button>
            <table class="stock-table" id="specTable">
                <thead>
                <tr>
                    <th v-for="(item,key) in signForm" :key="key">{{item.addAtrText}}</th>
                    <th>价格</th>
                    <th>库存</th>
                    <th>重量</th>
                    <th>图片</th>
                </tr>
                </thead>
                <tbody>
                <!-- <tr v-for="(item, index) in countSum(0)" :key="index"> -->
                <tr v-for="(item, index) in tableData" :key="index">
                    <!-- <td
                    v-for="(n, specIndex) in signForm.length"
                    :key="specIndex">
                    {{getSpecAttr(specIndex, index).title}}{{getSpecAttr(specIndex, index).id}}
                    </td> -->
                    <td>
                        {{item.name}}
                    </td>                   
                    <td>
                        <el-input v-model="item.price"></el-input>
                    </td>
                    <td>
                        <el-input v-model="item.stocks"></el-input>
                    </td>
                    <td>
                    <el-input v-model="item.quality"></el-input>
                    </td>
                    <td>
                        <el-upload
                            :ref="'upload'+index"
                            class="spec-uploader"
                            action="/hn-shop-web/editor/upload"
                            :show-file-list="false"
                            :on-success="(file, fileList) => handleSpecMt(file,fileList,item)" 
                            :on-change="(file, fileList) => changeSpecMt(file,fileList,item)">
                            <img v-if="item.imgUrl" :src="item.imgUrl" class="specinput-img"/>
                            <i v-else class="el-icon-plus spec-uploader-icon"></i>
                        </el-upload>                      
                    </td>
                </tr>
                </tbody>
            </table>
            <el-button size="mini" type="primary" style="margin-top:15px;" @click.native="specTable()">提交</el-button>
        </section>  
    </div>
</template>

<script>
import { Input, ButtonGroup, Button, Upload } from 'element-ui'
export default {
    name:"specification",
    props:{
        spcShow:{
            type: Boolean,
            default: false               
        },
        signForm:{//规格
            type:Array,
            default:[]
        },
        addValues:{//规格属性的值
            type:Array,
            default:[]
            
        }
    },
    components:{
        'el-input':Input,
        'el-button-group':ButtonGroup,
        'el-button':Button,
        'el-upload':Upload
    },
    data() {
        return {
            tableData:[
                // {
                //     price:'',
                //     stocks:'',
                //     quality:'',
                //     imgUrl:''
                // }
            ],//整理table数据
            // price:[],//价格
            // stocks:[],//库存
            // quality:[],//重量
      imgUrl:''
        }
    },
    mounted(){

    },
    methods:{
		handleSpecMt (file,fileList,item) {
			console.log(file)
			this.$nextTick(() => {
				item.imgUrl = file.url;
				// this.getTempSpecDataMt(item);
			})
		},
		changeSpecMt (file,fileList,item) {
		    const extension = file.name.split('.')[1];
		    const isLt2M = file.size / 1024 / 1024 < 2;

		    if (!(extension == 'png' || extension == 'GIF' || extension == 'jpg' || extension == 'jpeg')) {
		    	this.$message.error('上传头像图片只能是 jpg,png,jpeg,gif 格式!');
		    	return;
		    }
		    if (!isLt2M) {
		        this.$message.error( '上传图片大小不能超过 2MB!!');
		        return;
		    }
		    item.imgUrl = file.url;
		},    
        //规格属性上传之前
        specBeforeUpload(){

        },       
        //规格属性图片上传
        specUploadSuccess(res,file){
            // console.log(res,file)
            // this.specImageUrl = URL.createObjectURL(file.raw);
        },  
        specTable(){
            let all = []
            //规格id集合
            let attributeSkuId = []
            this.signForm.forEach(item =>{
                attributeSkuId.push(item.id)
            })
            attributeSkuId = attributeSkuId.join(' ')
            for(var index=0;index<this.countSum(0);index++){
                all.push({
                    // price:this.price[index],
                    // stocks:this.stocks[index],
                    // quality:this.quality[index],
                    goodsCategoryId:'105',
                    goodsId:'1991',
                    attributeValueSkuId:this.specTable2(index),
                    attributeSkuId:attributeSkuId
                })
            }
            console.log(all)
        },      
        //规格属性表格提交
        specTable2(num){
            //规格属性id集合
            let attributeValueSkuId = []
            // console.log(this.signForm)
            // console.log(this.signForm.length)
            // console.log(this.countSum(0))
            for(var specIndex=0 ; specIndex<this.signForm.length ; specIndex++){
                    // if(specIndex==0 && num!=0){
                    //     a.push(this.getSpecAttr(specIndex,num-1).id)
                    // }else{
                    //     a.push(this.getSpecAttr(specIndex,num).id)
                    // }
                attributeValueSkuId.push(this.getSpecAttr(specIndex,num).id) 
                  
            }
            attributeValueSkuId = attributeValueSkuId.join(' ')
            return attributeValueSkuId
        },     
            /*
        根据传入的属性值，拿到相应规格的属性
        @params
            specIndex 规格项目在 advancedSpecification 中的序号
            index 所有属性在遍历时的序号
        */
        getSpecAttr (specIndex, index) {
            // 获取当前规格项目下的属性值
            const currentValues = this.signForm[specIndex].signFormList
            let indexCopy
            // 判断是否是最后一个规格项目
            if (this.signForm[specIndex + 1] && this.signForm[specIndex + 1].signFormList.length) {
                indexCopy = index / this.countSum(specIndex + 1)
            } else {
                indexCopy = index
            }
            // const i = indexCopy % currentValues.length
            // if (i.toString() !== 'NaN' && i % 1 === 0) {
            //     return currentValues[i]
            // } else {
            //     return ''
            // }
            const i = Math.floor(indexCopy % currentValues.length)
            if (i.toString() !== 'NaN') {
              return currentValues[i]
            } else {
              return ''
            }
        },        
        // 根据传入的条件，来判断是否显示该td
        //specIndex:规格属性索引，index：规格索引
        showTd (specIndex, index) {
            // 如果当前项目下没有属性，则不显示
            if (!this.signForm[specIndex]) {
                return false
            } else if (index % this.countSum(specIndex + 1) === 0) {
                return true
            } else {
                return false
            }
        },         
            /*
        计算属性的乘积
        @params
            specIndex 规格项目在 advancedSpecification 中的序号
        */
        countSum (specIndex) {
            let num = 1
            this.signForm.forEach((item, index) => {
                if (index >= specIndex && item.signFormList.length) {
                    num *= item.signFormList.length
                }
            })
            return num
        },        
        //新增规格
        addSpec(){
            this.signForm.push ({
            id:'',//规格id
            addAtrText:'',//规格文本
            signFormList: [],//当前规格下的商品属性
            showEdi:false//保存||修改
            })
        },
        // 删除规格(规格索引，规格id)
        delSpec (key,id) {
            let _this = this
            if(id==""){//当没有规格id的时候，根据下标删除
                this.signForm.splice(key,1)
            }else{//当存在id的时候根据规格id删除
                this.$confirm('此操作将删除商品规格及其商品属性?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {         
                    //删除商品规格{goodsAttributeSkusId:商品规格id}
                    //'/hn-shop-web/goods/delGoodsAttributeSkus'
                    this.$axios.post(this.$$jk.delGoodsAttributeSkus,{goodsAttributeSkusId:id})
                    .then(function(response) {
                        if(response.data.code == "SUCCESS"){
                            _this.signForm.splice(key,1)
                            _this.$message({
                            type: 'success',
                            message: '删除成功!'
                            });              
                        }
                    })
                    .catch(function(error) {
                    alert(error);
                    });            
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
                });        
            }
            
        }, 
        //保存规格
        saveSpec(key,id){
            let _this = this
            let addAtrText = this.signForm[key].addAtrText
            let routeId = this.$route.query.id;
            if(!addAtrText){
                this.$message({
                message: '请输入商品规格',
                type: 'warning'
                });
                return false;
            }else{
                if(id==""){//保存
                    //添加商品规格{categoryId:分类三级目录id；goodsId:商品id；name:商品规格名称}
                    this.$axios.post(this.$$jk.addGoodsAttributeSkus,{categoryId:'105',goodsId:'1991',name:addAtrText})
                    .then(function(response) {
                        if(response.data.code == "SUCCESS"){
                        //显示修改按钮
                        _this.signForm[key].showEdi = true
                        _this.signForm[key].id = response.data.data
                        _this.$message({
                            message: '保存成功',
                            type: 'success'
                        }); 
                        }
                    })
                    .catch(function(error) {
                        alert(error);
                    });
                }else{//修改后保存
                    //修改商品规格{goodsAttributeSkusId:商品规格id；name：商品规格name}
                    //'/hn-shop-web/goods/updateGoodsAttributeSkus'
                    this.$axios.post(this.$$jk.updateGoodsAttributeSkus,{goodsAttributeSkusId:id,name:addAtrText})
                    .then(function(response) {
                        if(response.data.code == "SUCCESS"){
                        //显示修改按钮
                        _this.signForm[key].showEdi = true
                        _this.$message({
                            message: '修改成功',
                            type: 'success'
                        });                  
                        }
                    })
                    .catch(function(error) {
                        alert(error);
                    });
                }
            }
        },  
        //修改规格（索引，规格id）
        ediSpec(key,id){
            this.signForm[key].showEdi = false
            this.signForm[key].id = id
        }, 
        // 添加&保存规格属性(规格id，规格属性文本，规格索引)
        addSpecSub (id,name,index) {
            console.log(this.signForm)
            console.log(this.tableData)
            // console.log(this.specTable())
            let _this = this
            if(!id){
                this.$message({
                type: 'warning',
                message: '请先填写商品规格并保存!'
                }); 
                return false;
            }else{
                if(!name){
                    this.$message({
                    type: 'warning',
                    message: '请先填写商品规格属性名称!'
                    }); 
                    return false;
                }else{
                    //添加商品规格属性{goodsId:商品id;name:商品规格属性名称;goodsAttributeSkuId:商品规格Id}
                    //'/hn-shop-web/goods/addGoodsAttributeValueSkus'
                    this.$axios.post(this.$$jk.addGoodsAttributeValueSkus,{goodsId:"1991",name:name,goodsAttributeSkuId:id})
                    .then(function(response) {
                        if(response.data.code == "SUCCESS"){
                            _this.signForm.forEach(element => {
                                if(element.id==id){
                                // element.signFormList[key].showAtr = true;
                                // element.signFormList[key].id = response.data.data
                                let arr = [{title:_this.addValues[index].trim(),id:response.data.data}]
                                let newArr = _this.signForm[index].signFormList.concat(arr)
                                newArr = Array.from(new Set(newArr)) // 去重
                                _this.$set(_this.signForm[index], 'signFormList', newArr)
                                _this.clearAddValues(index)
                                }
                            }) 
                            _this.tableData.push({
                                name:name,
                                id:response.data.data,
                                price:'',
                                stocks:'',
                                quality:'',
                                imgUrl:''
                            })
                        }
                    })
                    .catch(function(error) {
                        alert(error);
                    }); 
                }
            }
        }, 
        // 删除规格属性(规格索引，规格属性索引,规格属性id)
        delSpecSub (key,index,id) {
            let _this = this
            //'/hn-shop-web/goods/delGoodsAttributeValueSkus'
            this.$axios.post(this.$$jk.delGoodsAttributeValueSkus,{goodsAttributeValuesSkusId:id})
                .then(function(response) {
                    if(response.data.code == "SUCCESS"){
                        _this.signForm[key].signFormList.splice(index, 1)
                        _this.$message({
                        type: 'success',
                        message: '删除成功!'
                        }); 
                        _this.tableData.forEach((item,i) =>{
                            if(item.id == id){
                                _this.tableData.splice(i,1)
                            }
                        }) 
                    }
                })
                .catch(function(error) {
                alert(error);
                });       
        },        
        // 清空 addValues
        clearAddValues (index) {
            this.$set(this.addValues, index, '')
        },                
    }
}
</script>

<style scoped>
.atrtext{
  display:inline-block;height:28px;line-height:28px;
}
.editext{
  display:inline-block;
  padding-right:15px;
}
.spc-section{
  background:#fff;
  padding:20px 15px;
  margin-top:10px;
}
.spc-section .spc-input{
  width:33%;
  margin-bottom:15px;
}
.spc-section .spc-list{
  margin-bottom:15px;
}
.spec-uploader-icon {
font-size: 28px;
color: #8c939d;
width: 50px;
height: 50px;
line-height: 50px;
text-align: center;
}
.spec-img {
width: 50px;
height: 50px;
display: block;
}
</style>
