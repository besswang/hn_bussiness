//获取商品列表
export const getMerchantGoodsList = [
    {
        path: 'getMerchantGoodsList',
        data: {
					'code':'SUCCESS',
					'data': {
						'list|5':[
							{
								'id|+1':1,
								'goodsImage': '@dataImage',
								'name':'@cname',
								'price': '@natural(60, 100)',
								'stocks': '@natural(10, 1000)',
								'addTime':'@datetime',
								'isShow|1':[1,0]
							}
						],
						'total':5
					}
        }
    }
]

