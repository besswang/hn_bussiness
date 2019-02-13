import Mock from 'mockjs'
export const getMerchantOrderInfo = [
    {
        path: 'getMerchantOrderInfo',
        data: {
			'code':'SUCCESS',
			'data': {
				'waitingEvaluate':'@natural(1, 100)',
				'waitingReceived':'@natural(1, 100)',
				'waitingPay':'@natural(1, 100)',
				'refunds':'@natural(1, 100)',
				'waitingDelivery':'@natural(1, 100)',
				'recentlyOrders':'@natural(1, 100)'
			},
        }
    }
]

