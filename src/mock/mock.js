// 使用 Mock
//var Mock = require('mockjs')
import Mock from 'mockjs'
import {login} from './login'
import {getLoginUserView} from './getLoginUserView'
import {getMerchantsForProductDetailsById} from './getMerchantsForProductDetailsById'
import {getMerchantGoodsStock} from './getMerchantGoodsStock'
import {getMerchantOrderInfo} from './getMerchantOrderInfo'
import {goodsCategoriesList} from './goodsCategoriesList'
import {getAddrsListByMerchantId} from './getAddrsListByMerchantId'
import {getMerchantGoodsList} from './getMerchantGoodsList'
import {
  queryBusinessOrderList
}from './queryBusinessOrderList'
// page-product-product_classify --start
import {getAllGoodsMerchantCategories} from './getAllGoodsMerchantCategories'
import {oneCategory} from './oneCategory'
import {
  flag
} from './flag'
// page-product-product_classify --end

// page-product-editor --start
// 编辑下获取的商品信息
import {
  editGoodsForMerchant
} from './editGoodsForMerchant'
// 商品品牌
import {
  getGoodsBrands
} from './getGoodsBrands'
// 除了品牌的商品select属性
import {
  listGoodsAttributes
} from './listGoodsAttributes'
// 运费模板
import {
  getContactsByMerchantId
} from './getContactsByMerchantId'
// page-product-editor --end
let data = [].concat(login, getLoginUserView, getMerchantsForProductDetailsById, getMerchantGoodsStock,
    getMerchantOrderInfo, goodsCategoriesList, getAddrsListByMerchantId, getGoodsBrands, listGoodsAttributes,
    getMerchantGoodsList, editGoodsForMerchant, getContactsByMerchantId, getAllGoodsMerchantCategories, oneCategory, flag, queryBusinessOrderList);
data.forEach(function(res){
	if(res){
         Mock.mock(res.path, res.data);
         // 输出结果
        //console.log(Mock.mock(res.data), null, 4)
	}
});

export default Mock;