import Mock from 'mockjs'
export const goodsCategoriesList = [
    {
        path: 'goodsCategoriesList',
        data: {
			'code':'SUCCESS',
			'data': [{
				'id': 1,
				'name':'家用电器',
				'dpath':1,
				'children':[
					{
						'id':101,
						'name':'电视',
						'dpath':2,
						'parentId':1,
						'children':[
							{
								'id':1001,
								'name':'曲面电视',
								'dpath':3,
								'parentId':101
							}
						]
					}
				]
			},{
				'id': 2,
				'name':'手机/运营商/数码',
				'dpath':1,
				'children':[
					{
						'id':102,
						'name':'手机通讯',
						'dpath':2,
						'parentId':2,
						'children':[
							{
								'id':1002,
								'name':'手机',
								'dpath':3,
								'parentId':102
							}
						]
					}
				]
			},{
				'id': 3,
				'name':'电脑/办公',
				'dpath':1,
				'children':[
					{
						'id':103,
						'name':'电脑整机',
						'dpath':2,
						'parentId':3,
						'children':[
							{
								'id':1003,
								'name':'笔记本',
								'dpath':3,
								'parentId':103
							}
						]
					}
				]
			}]
        }
    }
]

