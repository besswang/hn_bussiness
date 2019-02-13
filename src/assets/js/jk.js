let jk = function () {
	const businessHost = process.env.businessHost && process.env.businessHost.url;
	return {
		//商品分类接口
		'getAllGoodsMerchantCategories':businessHost + '/merchant/goods/getMerchantOurCategories',//获取商品分类列表
		'oneCategory':businessHost + '/merchant/goods/listAllFirstGoodsMerCate',//一级分类
		'listSecondGoodsMerCate':businessHost + '/merchant/goods/listSecondGoodsMerCate',//二级分类
		'delFirstGoodsMerchantCategories':businessHost + '/merchant/goods/delFirstGoodsMerchantCategories',//删除商品一级分类
		'delSecondGoodsMerchantCategories':businessHost + '/merchant/goods/delSecondGoodsMerchantCategories',//删除商品二级分类
		'goodsCategoriesSave':businessHost + '/merchant/goods/addGoodsMerchantCategories',//添加商品分类
		'goodsCategoriesUpdate':businessHost + '/merchant/goods/updateGoodsMerchantCategories',//修改商品分类
		'getGoodsMerCate':businessHost + '/merchant/goods/getGoodsMerCate',//获取编辑商品分类信息
		'getGoodsMerchantCategoriesDetail':businessHost + '/merchant/goods/getGoodsMerchantCategoriesDetail',//展示商品关联分类
		'getMerchantCategoriesGoods':businessHost+ '/merchant/goods/getMerchantCategoriesGoods',//获取商家自定义分类关联商品
		'addGoodsMerchantCategoryIndices':businessHost + '/merchant/goods/addGoodsMerchantCategoryIndices',//将商品与分类关联
		'removeGoodsFromGoodsMerchantCategory':businessHost +'/merchant/goods/removeGoodsFromGoodsMerchantCategory',//将商品从分类中移除
		//接口模块待分类
		'login': businessHost + '/login', //登录
		'logout': businessHost.replace('/hn-shop-web/shop','/hn-shop-web') + '/logout',//退出
		'getLoginUserView':businessHost + '/shop/user/getLoginUserView',//获取登录用户信息
		'getMerchantGoodsStock': businessHost + '/merchant/goods/getMerchantGoodsStock',//获取商家各种状态的商品的库存
		'getMerchantsForProductDetailsById':businessHost + '/merchant/merchants/getMerchantsForProductDetailsById',//home页，通过id获取商家详情
		'getMerchantOrderInfo':businessHost + '/merchant/merchants/getMerchantOrderInfo',//店铺订单提示
		'goodsCategoriesList':businessHost + '/merchant/goodsCategories/list', //获取商品分类列表
		'getGoodsBrands':businessHost + '/merchant/goods/getGoodsBrands', //获取商品对应的品牌
		'listGoodsAttributes':businessHost + '/merchant/goods/listGoodsAttributes', //获取该类商品对应的商品属性
		'addGoodsAttributeSkus':businessHost + '/merchant/goods/addGoodsAttributeSkus', //添加商品规格
		'updateGoodsAttributeSkus':businessHost + '/merchant/goods/updateGoodsAttributeSkus', //修改商品规格
		'delGoodsAttributeSkus':businessHost + '/merchant/goods/delGoodsAttributeSkus', //删除商品规格
		'addGoodsAttributeValueSkus':businessHost + '/merchant/goods/addGoodsAttributeValueSkus', //添加商品规格属性
		'delGoodsAttributeValueSkus':businessHost + '/merchant/goods/delGoodsAttributeValueSkus', //删除规格属性
		'goodsRelease':businessHost + '/merchant/goods/goodsRelease', //发布商品
		'addGoodsAttributeCategoryIndexSkus2':businessHost + '/merchant/goods/addGoodsAttributeCategoryIndexSkus2', //保存规格销售属性
		'getGoodsAttributeCategoryIndexSkusDetail':businessHost + '/merchant/goods/getGoodsAttributeCategoryIndexSkusDetail',//获取不同销售属性的商品详情
		'updateGoodsAttributeCategoryIndexSkus2':businessHost + '/merchant/goods/updateGoodsAttributeCategoryIndexSkus2',//保存修改后的规格
		'queryBusinessOrderList':businessHost + '/merchant/order/queryBusinessOrderList',//查询商家订单信息
		'queryBusinessOrderDeatil':businessHost + '/merchant/order/queryBusinessOrderDeatil',//查询商家订单详情
		'editMerchantInfo':businessHost + '/merchant/merchants/editMerchantInfo',//发布店铺信息接口
		'getContactsByMerchantId':businessHost + '/merchant/contacts/getContactsByMerchantId',//查询店铺的运费模板
		'contactsSave':businessHost + '/merchant/contacts/save',//新增运费模板
		'kuaidisList':businessHost + '/merchant/kuaidis/list',//获取快递名称
		'getAddrsListByMerchantId':businessHost + '/merchant/merchantAddrs/getAddrsListByMerchantId',//获取退发货地址列表
		'getMerchantGoodsList':businessHost + '/merchant/goods/getMerchantGoodsList',//获取商家商品列表
		'undercarriageGoods':businessHost + '/merchant/goods/undercarriageGoods',//商品下架
		'shelvesGoods':businessHost + '/merchant/goods/shelvesGoods',//商品上架
		'updateGoodsStork':businessHost + '/merchant/goods/updateGoodsStork',//修改商品库存
		'setOrderState':businessHost + '/merchant/orderSubs/setOrderState',//订单-发货
		'getRefundOrdersMerchant':businessHost + '/merchant/orderRefund/getRefundOrdersMerchant',//买家查询退款订单
		'getRefundOrdersInfoMerchant':businessHost + '/merchant/orderRefund/getRefundOrdersInfoMerchant',//卖家查看退款详情
		'exportMerchantOrder':businessHost + '/merchant/excelExport/exportMerchantOrder',//订单导出
		'delete':businessHost + '/merchant/contacts/delete',//删除运费模板
		'update':businessHost + '/merchant/contacts/update',//编辑运费模板
		'disposeRefundOrdersMerchant':businessHost + '/merchant/orderRefund/disposeRefundOrdersMerchant',//订单处理
		'delGoods':businessHost + '/merchant/goods/delGoods',//删除商品
		'getAllProvince':businessHost + '/merchant/goods/getAllProvince',//省
		'getCities':businessHost + '/merchant/goods/getCities',//市
		'getAreas':businessHost +'/merchant/goods/getAreas',//区
		'editGoodsForMerchant':businessHost + '/merchant/goods/editGoodsForMerchant',//商家编辑商品
		'updateGoods':businessHost + '/merchant/goods/updateGoods',//商家修改商品
		'upload':businessHost +'/merchant/editor/upload',//图片上传
		'merchantGetDataByid':businessHost + '/merchant/kuaidis/merchantGetDataByid',//快递单号
		'merchantAddrsSave':businessHost + '/merchant/merchantAddrs/save',//新建收发货地址
		'merchantAddrsEdit':businessHost + '/merchant/merchantAddrs/edit',//编辑地址的保存接口
		'updateAddrsToDefaultById':businessHost +'/merchant/merchantAddrs/updateAddrsToDefaultById',//设置默认地址接口
		'merchantAddrsDelete':businessHost + '/merchant/merchantAddrs/delete',//删除收退货地址
		'bankNamesList':businessHost + '/bankNames/bankNamesList',//查询所有银行名字
		'bankCardsBind':businessHost + '/merchant/bankCards/bankCardsBind',//银行卡绑定
		'sendVerificationCode':businessHost + '/merchant/goods/sendVerificationCode',//发送手机验证码
		'getBankCardsByMerchantId':businessHost +'/merchant/bankCards/getBankCardsByMerchantId',//通过商家Id获取商户银行卡信息
		'getWithdrawsById':businessHost + '/merchant/withdraws/getWithdrawsById',//通过Id获取商家详情
		'checkBankCards':businessHost + '/merchant/bankCards/checkBankCards',//银行卡验证
		'exportMerchantWithdraw':businessHost + '/merchant/excelExport/exportMerchantWithdraw',//商家账户图表导出
		'bankCardsRebind':businessHost + '/merchant/bankCards/bankCardsRebind',//银行卡重新绑定
		'reBind':businessHost + '/merchant/bankCards/reBind',//重新绑定银行卡
		'getBalanceFlowsChangeByMerchantId':businessHost + '/merchant/balanceflows/getBalanceFlowsChangeByMerchantId',//通过商家Id获取账户变动趋势
		'withdraws':businessHost +'/merchant/withdraws/withdraws',//提现
	}
}();

export default jk;