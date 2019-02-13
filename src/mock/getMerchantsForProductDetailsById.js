import Mock from 'mockjs'
export const getMerchantsForProductDetailsById = [
    {
        path: 'getMerchantsForProductDetailsById',
        data: {
			'code':'SUCCESS',
			'data': {
				'realName':Mock.Random.cname(),
				'name|1':['良品铺子','三只松鼠','美妆'],
				'mobile|1':['13531544954','13632250649','15820292420','15999905612'],
				//'isShelves':Mock.Random.integer(-1, 1),
				'isShelves':1,
				'image|1':['https://s1.ax1x.com/2018/04/09/CiLtaR.png','https://s1.ax1x.com/2018/06/01/CIhCMd.png','https://s1.ax1x.com/2018/04/27/C3DcFA.jpg'],
				'serviceEndTime':Mock.Random.date(),
				'qrCode':'https://s1.ax1x.com/2018/09/16/iVwl1s.png'
			},
        }
    }
]

