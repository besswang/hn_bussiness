//除品牌以外的商品属性
export const listGoodsAttributes = [
    {
        path: 'listGoodsAttributes',
        data: {
			'code':'SUCCESS',
			'data':[
				{
					'goodsAttributes':{
						'id':1,
						'name':'颜色',
					}
					,
					'goodsAttributeValueses':[
						{
							'id':101,
							'name':'红色'
						}, {
						  'id': 102,
						  'name': '黑色'
						}
					]
				},
				{
					'goodsAttributes': {
						'id': 2,
						'name': '尺寸',
					},
					'goodsAttributeValueses': [
						{
						'id': 201,
						'name': '大'
						}, {
						'id': 202,
						'name': '中'
						}, {
						  'id': 203,
						  'name': '小'
						}
					]
				}
			]
        }
    }
]

