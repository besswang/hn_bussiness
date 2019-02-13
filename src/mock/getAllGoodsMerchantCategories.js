
export const getAllGoodsMerchantCategories = [
    {
        path: 'getAllGoodsMerchantCategories',
        data: {
			'code':'SUCCESS',
			'data': [
				{
					'goodsMerchantCategories': {
						'id':1,
						'parentId': 0,
						'dpath':1,
						'name': '家用电器',
						'isShow':1
					},
					'goodsMerchantCategoriesList': [
						{
							'id':101,
							'dpath': 2,
							'name':'电视'
						}
					]
				},
				{
					'goodsMerchantCategories': {
						'id': 2,
						'parentId': 0,
						'dpath': 1,
						'name': '手机',
						'isShow': 1
					},
					'goodsMerchantCategoriesList': [
						{
							'id': 201,
							'dpath': 2,
							'name':'小米'
						},
						{
							'id': 202,
						  	'dpath': 2,
						  	'name': 'iPhone'
						}
					]
				}
			]
        }
    }
]

