<template>
    <div class="specification" v-show="ediAddlistShow">
        <section class="specification">
        <h5 class="spc-title">商品规格:</h5>
            <table class="stock-table" id="specTable">
                <thead>
                <tr>
                    <th v-for="(col,key) in ediAddlistColumn" :key="key">{{col}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in ediAddlistTable" :key="index">
                    <td style="text-align:center;" v-for="(list,i) in changeGoodsAttributeSkusList(item.goodsAttributeSkusList)" :key="i">
                        {{goodsAttributeSkusList(list)}}
                    </td>
                    <td style="text-align:center;">
                        <el-input v-model="item.price"></el-input>
                    </td>
                    <td style="text-align:center;">
                        <el-input v-model="item.stocks"></el-input>
                    </td>
                    <td>
                        <el-input v-model="item.quality"></el-input>
                    </td>
                    <td>
                        <el-upload
                            class="spec-uploader"
                            action="/hn-shop-web/editor/upload"
                            :show-file-list="false"
                            :on-success="(file, fileList) => handleSpecMt(file,fileList,item)" 
                            :on-change="(file, fileList) =>
                            changeSpecMt(file,fileList,item)">
                            <img style="max-width:60px;" v-if="item.imgUrl" :src="item.imgUrl" class="specinput-img"/>
                            <i v-else class="el-icon-plus spec-uploader-icon"></i>
                        </el-upload>   
                    </td>
                </tr>
                </tbody>
            </table>
            <el-button size="mini" type="primary" style="margin-top:15px;" @click.native="ediSaveTable()">保存</el-button>
        </section>  
    </div>
</template>

<script>
import { Input, ButtonGroup, Button, Upload } from 'element-ui'
export default {
    name:"specification",
    props:{
        ediAddlistShow:{
            type:Boolean,
            default:true
        },
        goodsId:{//商品id
            type:String,
            default:''
        },
        ediAddlistTable:{
            type:Array,
            default:[]
        },
        ediAddlistColumn:{
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
            
        }
    },
    computed:{  

    },     
    mounted(){
        // console.log(this.ediAddlistTable)
    },
    methods:{
        changeGoodsAttributeSkusList(item){
            let arr = []
            item.forEach(list=>{
                arr.unshift(list)
            })
            return arr
        },
        goodsAttributeSkusList(list){
            for(var key in list){   
                return key
            } 
        },
        //编辑保存
        ediSaveTable(){
            // console.log(this.changeEdiAddlistTable)
            let _this = this
            JSON.stringify
            let ediAddlistTable = JSON.stringify(this.ediAddlistTable)
			this.$axios.post(this.$$jk.updateGoodsAttributeCategoryIndexSkus2,{goodsId:this.goodsId,goodsAttributeCategoryIndexSkus :ediAddlistTable})
			.then((res) => {
			 if(res.data.code == "SUCCESS"){  	
                _this.$message({
                    message: '规格保存成功',
                    type: 'success'
                });
                _this.$router.push('/product_list')
			 }
			})
			.catch(function(error) {
			  console.log(error);
			});            
        },
		handleSpecMt (file,fileList,item) {
			console.log(file)
			this.$nextTick(() => {
				item.imgUrl = file.url;
            })
		},
		changeSpecMt (file,fileList,item) {
		    const extension = file.name.split('.')[1];
		    const isLt2M = file.size / 1024 / 1024 < 2;

		    if (!(extension == 'png' || extension == 'GIF' || extension == 'jpg' || extension == 'jpeg')) {
		    	this.$message.error('上传头像图片只能是 jpg,png,jpeg,gif 格式!');
		    	//this.$refs.upload.clearFiles();
		    	return;
		    }

		    if (!isLt2M) {
		        this.$message.error( '上传图片大小不能超过 2MB!!');
		       // this.$refs.upload.clearFiles();
                return;
            }          
		}                
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
