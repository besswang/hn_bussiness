<template>
	<div class="shopSpec mt45"  v-if="!isShowSignHandle || (isShowSignHandle && shopDataAssemb.length)">
		<p class="attr-title" style="padding-top:12px;font-size:16px;">规格设置</p>
		<!-- 规格操作 -->
		<div v-if="!isShowSignHandle" class="attr mt45" style="margin-top:20px">
			<template v-for="(item,index) in signList">
				<!-- 填写规格名称 -->
				<div class="w285 pd_tb10">
					<template v-if="item">
						<input v-if="!item.isEdit" type="text" placeholder="输入规格名称" class="layui-input input-auto" maxlength="20" v-model="item.name">
					</template>
					<span v-if="item.isEdit" class="editext">{{item.name}}</span>
					<el-button type="danger" class="padset" icon="el-icon-delete" @click="delAttrNameMt({'index':index,'id':item.id})"></el-button>
					<el-button type="primary" class="padset" v-if="!item.isEdit" @click="saveAttrNameMt(item)">保存</el-button>
					<el-button type="primary"  class="padset" v-if="item.isEdit" @click="item.isEdit = !item.isEdit">修改</el-button>
				</div>
				<!-- 填写规格的下的属性 -->
				<div class="fill-attr">
					<input type="text" class="layui-input attr-name"
					 placeholder="输入规格值" v-model="item.signValue">
					<el-button type="primary" class="padset" @click="addAttrValueMt({'item':item,'id':item.id,'signValue':item.signValue})">添加</el-button>
					<div class="pd_tb6">
						<span class="el-tag mr6" v-for="(chItem,chIndex) of item.attrlist">
				           <span class="el-select__tags-text">{{chItem.name}}</span>
				           <i class="el-tag__close el-icon-close" @click="delAttrValuelistMt({'chIndex':chIndex,'item':item,'id':chItem.id})"></i>
				       </span>
					</div>
				</div>
			</template>
			<div class="mt45" v-if="signList.length < 3">
				<el-button @click="addSignMt">新增规格</el-button>
			</div>
		</div>
		<!-- 规格表格列表 -->
		<table cellspacing="0" cellpadding="0" border="0" class="layui-table">
			<thead>
				<tr v-if="isShowHeadTit">
					<template v-for="(item,index) in signList">
						<th>
							<div class="laytable-cell-1-id">
								{{item.name}}
							</div>
						</th>
					</template>
					<th><div class="laytable-cell-1-id">价格</div></th>
					<th><div class="laytable-cell-1-id">库存</div></th>
					<th><div class="laytable-cell-1-id">重量</div></th>
					<th><div class="laytable-cell-1-id">图片</div></th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item,index) in shopDataAssemb">
					<template v-for="(chItem,chIndex) in signList">
						<td>{{item[chItem.name]['name']}}</td>
					</template>
					<td><div class="laytable-cell-1-id"><input type="text" class="layui-input" v-model="item.price" @change="getTempSpecDataMt(item)"></div></td>
					<td><div class="laytable-cell-1-id"><input type="text" class="layui-input" v-model="item.stocks"  @change="getTempSpecDataMt(item)"></div></td>
					<td><div class="laytable-cell-1-id"><input type="text" class="layui-input" v-model="item.quality" @change="getTempSpecDataMt(item)"></div></td>
					<td>
						<div class="laytable-cell-1-id">
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
						</div>
					</td>
				</tr>
			</tbody>
		</table>
		<!-- 规格表格end -->
		<!-- 保存商品规格 -->
		<el-button type="primary" @click="saveShopSpec">保存规格</el-button>
	</div>
</template>

<script>
import { Row,Col,Dialog,Button,Form,FormItem,
Input,Upload,RadioGroup,Radio, Select,Option, TableColumn, Table, Progress, Checkbox, ButtonGroup} from 'element-ui'
let obj = {};

export default {
	props:['goodsId','categoryId'],
	components:{
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
	data: function() {
		return {
			signList:[{id:'',name:'',attrlist:[],specArrList:[],isEdit:false,signValue:''}],
			shopDataAssemb:[],
			copyShopDataAssemb:""
		}
	},
	methods: {
		getTempSpecDataMt (item) {
			if(!this.copyShopDataAssemb){
				this.copyShopDataAssemb = {};
			}
			let attributeValueSkuId = this.com.clone(item['attributeValueSkuId']);
			this.copyShopDataAssemb[attributeValueSkuId] = item;
			console.log(this.copyShopDataAssemb)
		},
		saveShopSpec () {
		    let data = {
		    	goodsId:this.goodsId,
		    	goodsAttributeCategoryIndexSkusList:JSON.stringify(this.shopDataAssemb)
		    }

		    console.log(JSON.stringify(this.shopDataAssemb))
		    console.log(JSON.stringify(this.signList))
			//this.$axios.post(this.$$jk.addGoodsAttributeCategoryIndexSkus,data)
			//.then((res) => {
			 // if(res.data.code == "SUCCESS"){
			   //	console.log(res)
			 // }
			//})
			//.catch(function(error) {
			  //console.log(error);
			//});
		},
		addSignMt () {
			this.signList.push({id:'',name:'',attrlist:[],specArrList:[],isEdit:false});
			this.setAssembMt()
		},
		saveAttrNameMt (item) {
			if(!item.name.trim()){
				this.$message({
				  message: '商品规格名称不能为空',
				  type: 'warning'
				});
				return false;
			}

			let jkUrl = '',
				data = {},
				messTip = '';

			if(parseInt(item.id) > 0){//修改
				jkUrl = this.$$jk.updateGoodsAttributeSkus;
				data = {goodsAttributeSkusId:item.id,name:item.name.trim()};
				messTip = '修改成功';
			}else{//保存
				jkUrl = this.$$jk.addGoodsAttributeSkus;
				data = {categoryId:this.categoryId,goodsId:this.goodsId,name:item.name.trim()}
				messTip = '保存成功';
			}

			this.$axios.post(jkUrl,data)
			.then((res) => {
			  if(res.data.code == "SUCCESS"){
			    this.$message({
			      message: messTip,
			      type: 'success'
			    }); 

			    if(!parseInt(item.id) > 0){
 					item.id = res['data']['data'];
			    }
			   
			    item.isEdit = true;
			    this.setAssembMt();
			  }
			})
			.catch(function(error) {
			  console.log(error);
			});
		},
		delAttrNameMt (o) {
			if(parseInt(o.id) > 0){
				this.$confirm('此操作将删除商品规格及其商品属性?', '提示', {
				  confirmButtonText: '确定',
				  cancelButtonText: '取消',
				  type: 'warning'
				}).then(() => {         
				    this.$axios.post(this.$$jk.delGoodsAttributeSkus,{goodsAttributeSkusId:o.id})
				    .then((res) => {
				        if(res.data.code == "SUCCESS"){
				            this.$message({
				              type: 'success',
				              message: '删除成功!'
				            });  
				            Array.isArray(this.signList) ? this.signList.splice(o.index,1) : '';
				            this.setAssembMt();            
				        }
				    })
				    .catch((error) => {
				      console(error);
				    });            
				}).catch(() => {
				  this.$message({
				    type: 'info',
				    message: '已取消删除'
				  });          
				}); 
			}else{
				this.signList.splice(o.index,1);
				this.setAssembMt();
			}
		},
		addAttrValueMt (o) {
			let signValue = o.signValue && o.signValue.trim();

			if(!o.item.name){
				this.$message({
					message: '请输入商品规格名称',
					type: 'warning'
				});
				return;
			}

			if(!(parseInt(o.id) > 0)){
				this.$message({
					message: '商品规格名称未保存',
					type: 'warning'
				});
				return;
			}

			if(!signValue){
				this.$message({
					message: '请输入商品规格值',
					type: 'warning'
				});
				return;
			}

			let isAdd = true;
			let attrlist = o.item.attrlist;
			for(let i = 0; i < attrlist.length; i++){//规格名称是否重复
				if(attrlist[i] && attrlist[i]['name'] == signValue){
					isAdd = false;
				}
			}
			
			if(isAdd){
				this.$axios.post(this.$$jk.addGoodsAttributeValueSkus,{goodsId:this.goodsId,name:signValue,goodsAttributeSkuId:o.id})
				.then((res) => {
				    if(res.data.code == "SUCCESS"){
				    	o.item.attrlist.push({
				    		id:res.data.data,
				    		name:signValue
				    	});

				    	o.item.specArrList.push({
				    		price:'',
				    		stocks:'',
				    		quality:'',
				    		imgUrl:''
				    	});
				    	console.log(o)
						this.setAssembMt()
				    }
				})
				.catch((error) => {
				  console.log(error);
				}); 
			}else{
				this.$message({
					message: '商品规格值不能重复',
					type: 'warning'
				});
			}
		},
		delAttrValuelistMt (o) {
			if(!parseInt(o.id) > 0){
				this.$message({
					type: 'error',
					message: '规格id不存在'
				});   
				return;
			}

			this.$axios.post(this.$$jk.delGoodsAttributeValueSkus,{goodsAttributeValuesSkusId:o.id})
			.then((res) =>{
				if(res.data.code == "SUCCESS"){
					this.$message({
						type: 'success',
						message: '删除成功!'
					});       

					o.item.attrlist.splice(o.chIndex,1);
					o.item.specArrList.splice(o.chIndex,1);
					this.setAssembMt()         
				}
			})
			.catch((error) => {
				console.log(error);
			}); 
		},
	    calcSignMt (o) {
		    let newArr = [];
		    let arr = o && o.arr;
		    let _this= this;

		    if(arr && arr.length){
	    	    //获取所有规格名称的id
	    	    let skuId = [];
	    	    for(let k = 0; k < arr.length; k++){
	    	    	skuId.push({id:arr[k]['id'],name:arr[k]['name']});
	    	    	//skuId = Array.from(new Set(skuId));
	    	    	//skuId = skuId.sort((a,b) => a < b);
	    	    }

		    	let way = function(arr,obj){
		    	    var obj = obj || {};

		    	    let skuName = arr[0].name;
		    	    let attrlist = arr[0].attrlist;
		    	    let specArrList = arr[0].specArrList;
		    	  
		    	    for(let i = 0; i < attrlist.length; i++){
		    	       let skuValueArr = attrlist[i];
		             
		    	       obj[skuName] = {
		    	       		name:skuValueArr.name,
		    	       		id:skuValueArr['id']
		    	       };//规格名称

		    	       //obj[skuName]['name'] = skuValueArr.name;

		    	       obj['goodsCategoryId'] = _this.categoryId;//三级分类id
		    	       obj['goodsId'] = _this.goodsId;//goodsId
		    	       let specObj = specArrList[i];
		    	       let lesArr = arr.length > 1 ? arr.slice(1,arr.length) : [];
		    	       
		    	       if(lesArr.length){
		    	    	    way(lesArr,obj);
		    	       }else{
		    	       	    let signObj = _this.com.clone(Object.assign(specObj,obj));
	    	       	    	newArr.push(signObj);
		    	       }
		    	    }

		    	}
		    	way(arr);

		    
		    	if(Array.isArray(newArr) && newArr.length){
		    		newArr.forEach((item,index,arr) => {
		    			let attributeSkuId = [];
		    			let attributeValueSkuId = [];

		    			for(let i = 0; i < skuId.length; i++){
		    				parseInt(skuId[i]['id']) > 0 ? attributeSkuId.push(skuId[i]['id']) : '';

		    				let name = skuId[i]['name'].toString();
		    				attributeValueSkuId.push(item[name]['id'])
		    			}
		    			//给每一行添加attributeValueSkuId字段添加属性id组装
		    			item['attributeValueSkuId'] = Array.isArray(attributeValueSkuId) ? attributeValueSkuId.join(",") : "";
		    			//给每个列字段添加所有规格名称id
		    			item['attributeSkuId'] = Array.isArray(attributeSkuId) ? attributeSkuId.join(",") : "";


		    		    //数据比对替换
		    		    let copyShopDataAssemb = this.copyShopDataAssemb;
		    		    if(copyShopDataAssemb && item['attributeValueSkuId']){
		    		    	let attribute = this.com.clone(copyShopDataAssemb[item['attributeValueSkuId']]);
		    		    	if(typeof attribute == 'object'){
		    		    		item['price'] = attribute['price'];
		    		    		item['stocks'] = attribute['stocks'];
		    		    		item['quality'] = attribute['quality'];
		    		    		item['imgUrl'] = attribute['imgUrl'];
		    		    	}
		    		    }
		    		})
		    	}
		    }
		    
		    return newArr;
		},
		setAssembMt () {
		    this.shopDataAssemb = this.calcSignMt({arr:this.signList});
		},
		handleSpecMt (file,fileList,item) {
			console.log(file)
			this.$nextTick(() => {
				item.imgUrl = file.url;
				this.getTempSpecDataMt(item);
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
		    item.imgUrl = file.url;
		}
	},
	computed:{
		isShowHeadTit () {
			return this.signList.some(function(val,index,arr){
				return val['attrlist'].length;
			})
		},
		isShowSignHandle () {
			return parseInt(this.com.getParamValueByKey('goodsId')) > 0;
		}
	},
	mounted () {
		if(this.isShowSignHandle){//编辑进来后端传来的数据
			this.shopDataAssemb = [{"price":"1","stocks":"1","quality":"1","imgUrl":"http://192.168.0.227:81/20180427/E0A20B0A555440D8FF59CB4A1C092AE8.jpg","颜色":{"name":"红色","id":6028},"goodsCategoryId":"6","goodsId":2375,"尺寸":{"name":"1.0","id":6030},"形状":{"name":"圆形","id":6033},"attributeValueSkuId":"6028,6030,6033","attributeSkuId":"2959,2960,2961"},{"price":"2","stocks":"2","quality":"2","imgUrl":"http://192.168.0.227:81/20180427/A95F5206E6AD2EDA6413CD7DF13F37F4.jpg","颜色":{"name":"红色","id":6028},"goodsCategoryId":"6","goodsId":2375,"尺寸":{"name":"1.0","id":6030},"形状":{"name":"柱形","id":6034},"attributeValueSkuId":"6028,6030,6034","attributeSkuId":"2959,2960,2961"},{"price":"3","stocks":"3","quality":"3","imgUrl":"http://192.168.0.227:81/20180427/B6CC4669ABC8165D7FB7D1AD226895A4.png","颜色":{"name":"红色","id":6028},"goodsCategoryId":"6","goodsId":2375,"尺寸":{"name":"2.0","id":6031},"形状":{"name":"圆形","id":6033},"attributeValueSkuId":"6028,6031,6033","attributeSkuId":"2959,2960,2961"},{"price":"4","stocks":"4","quality":"4","imgUrl":"http://192.168.0.227:81/20180427/FC20CC5F9D1165E51A4E4151B55E4964.jpg","颜色":{"name":"红色","id":6028},"goodsCategoryId":"6","goodsId":2375,"尺寸":{"name":"2.0","id":6031},"形状":{"name":"柱形","id":6034},"attributeValueSkuId":"6028,6031,6034","attributeSkuId":"2959,2960,2961"},{"price":"5","stocks":"5","quality":"5","imgUrl":"http://192.168.0.227:81/20180427/9E21559AF71F5A80A222B5ECEF48C4B2.jpg","颜色":{"name":"绿色","id":6032},"goodsCategoryId":"6","goodsId":2375,"尺寸":{"name":"1.0","id":6030},"形状":{"name":"圆形","id":6033},"attributeValueSkuId":"6032,6030,6033","attributeSkuId":"2959,2960,2961"},{"price":"6","stocks":"6","quality":"6","imgUrl":"http://192.168.0.227:81/20180427/EC0797931ACA9604B405DABC485A513E.png","颜色":{"name":"绿色","id":6032},"goodsCategoryId":"6","goodsId":2375,"尺寸":{"name":"1.0","id":6030},"形状":{"name":"柱形","id":6034},"attributeValueSkuId":"6032,6030,6034","attributeSkuId":"2959,2960,2961"},{"price":"7","stocks":"7","quality":"7","imgUrl":"http://192.168.0.227:81/20180427/1BBF77C4A6B522C7260977FB5F3D814D.png","颜色":{"name":"绿色","id":6032},"goodsCategoryId":"6","goodsId":2375,"尺寸":{"name":"2.0","id":6031},"形状":{"name":"圆形","id":6033},"attributeValueSkuId":"6032,6031,6033","attributeSkuId":"2959,2960,2961"},{"price":"8","stocks":"8","quality":"8","imgUrl":"http://192.168.0.227:81/20180427/AE521A1FE4C1FF54C87D1CF1AA163754.jpg","颜色":{"name":"绿色","id":6032},"goodsCategoryId":"6","goodsId":2375,"尺寸":{"name":"2.0","id":6031},"形状":{"name":"柱形","id":6034},"attributeValueSkuId":"6032,6031,6034","attributeSkuId":"2959,2960,2961"}];

			this.signList = [{"id":2959,"name":"颜色","attrlist":[{"id":6028,"name":"红色"},{"id":6032,"name":"绿色"}],"specArrList":[{"price":"","stocks":"","quality":"","imgUrl":"","尺寸1":{"name":"1.0","id":6027},"goodsCategoryId":"6","goodsId":2375,"颜色":{"name":"红色","id":6028}},{"price":"","stocks":"","quality":"","imgUrl":""}],"isEdit":true,"signValue":"绿色1"},{"id":2960,"name":"尺寸","attrlist":[{"id":6030,"name":"1.0"},{"id":6031,"name":"2.0"}],"specArrList":[{"price":"","stocks":"","quality":"","imgUrl":"","颜色":{"name":"绿色","id":6032},"goodsCategoryId":"6","goodsId":2375,"尺寸":{"name":"1.0","id":6030}},{"price":"","stocks":"","quality":"","imgUrl":"","颜色":{"name":"绿色","id":6032},"goodsCategoryId":"6","goodsId":2375,"尺寸":{"name":"2.0","id":6031}}],"isEdit":true,"signValue":"3.0"},{"id":2961,"name":"形状","attrlist":[{"id":6033,"name":"圆形"},{"id":6034,"name":"柱形"}],"specArrList":[{"price":"","stocks":"","quality":"","imgUrl":"","颜色":{"name":"绿色","id":6032},"goodsCategoryId":"6","goodsId":2375,"尺寸":{"name":"2.0","id":6031},"形状":{"name":"圆形","id":6033}},{"price":"","stocks":"","quality":"","imgUrl":"","颜色":{"name":"绿色","id":6032},"goodsCategoryId":"6","goodsId":2375,"尺寸":{"name":"2.0","id":6031},"形状":{"name":"柱形","id":6034}}],"isEdit":true,"signValue":"柱形1"}];
		}
	}
}	
</script>

<style scoped>
	.w{width:1200px;margin:40px auto}
	.w285{width:285px !important;display:inline-block}
	.mt10{margin-top:10px}
	.mt45{margin-top:45px}
	.mr6{margin-right:6px}
	.pd_tb10{padding:10px 0px}
	.pd_tb6{padding:6px 0px}
	.shopSpec{padding: 20px;padding-top: 0;background: #fff;border: 1px solid #e6e6e6;border-bottom:none}
	.editext{display:inline-block;padding-right:15px}
	.input-auto{display:inline-block !important;width:auto !important}
	.attr .el-button.padset{margin-left:0px !important;padding:6px 10px !important}
	.fill-attr .attr-name{font-size:14px;width:120px;display:inline-block}
	.specinput-img{max-width:50px;max-height:50px}
	.spec-uploader{text-align:center}
	.spec-uploader-icon{font-size: 28px;  color: #8c939d;  width: 50px;  height: 50px;line-height: 50px; text-align: center}
</style>