
export const queryBusinessOrderList = [
    {
        path: 'queryBusinessOrderList',
        data: {
			'code':'SUCCESS',
			'data': {
					'list|10':[
						{
							'id|+1':1,
							'orderNumber': '@natural',
							'addTime': '@datetime',
							'updateTime': '@datetime',
							'buyerName':'@cname',
							'paymentName|1':['支付宝','微信'],
							'orderAmount':4000,
							'orderState|1':[-1,1,2],
							'tradeStatus|1':[-10,20,10],
							'payState|1':[10,-10,20],
							'orderMessage': '@csentence',
							'orderGoodsList':[
								{
									'goodsImage': '@dataImage',
									'goodsId|+10':1,
									'goodsName|1':['手机','冰箱','空调','吸尘器','收纳盒','床品套件','雨伞','补水','洁面','图书'],
									'price':2000,
									'goodsNum':2,
									'status|1':[0,2,3,4,5]
								}
							]
						}
					],
					'total':1
				}
        }
    }
]

