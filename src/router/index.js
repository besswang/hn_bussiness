import Vue from 'vue'
import Router from 'vue-router'
//内容区域
//import Main from '@/components/common/main'
//我的店铺-店铺首页
//import Home from '@/components/page/home/home'
//商品管理-商品发布
//import Issue from '@/components/page/product/product_issue'
Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'main',
//       component: Main,
//       children:[
//         {
//           path: '/home',
//           component: Home
//         },{
//           path: '/issue',
//           component: Issue
//         }
//       ]
//     }
//   ]
// })

const routes = [
  {
    path:'/',//商家中心
    component:resolve => require(['@/components/common/main'],resolve),
    children:[
      {
        path:'/',//我的店铺-店铺首页
        component:resolve => require(['@/components/page/home/home'],resolve)
      },
      {
        path:'/home',//我的店铺-店铺首页
        component:resolve => require(['@/components/page/home/home'],resolve)
      },
      {
        path:'/issue',//商品管理-商品发布
        component:resolve => require(['@/components/page/product/product_issue'],resolve)
      },
      {
        path:'/product_list',//商品管理-商品发布
        component:resolve => require(['@/components/page/product/product_list'],resolve)
      },
      {
        path:'/editor',//商品管理-商品列表--编辑页面
        component:resolve => require(['@/components/page/product/editor'],resolve)
      },
      {
        path:'/product_classify',//商品管理-商品发布
        component:resolve => require(['@/components/page/product/product_classify'],resolve)
      },
      {
        path:'/order_list',//交易管理-订单管理
        component:resolve => require(['@/components/page/deal/order_list'],resolve),
        children: [
          {
            path: '', 
            component:resolve => require(['@/components/page/deal/list1'],resolve),
          },
          {
            path: 'list1',
            component:resolve => require(['@/components/page/deal/list1'],resolve),
          },
          {
            path: 'list2',
            component:resolve => require(['@/components/page/deal/list2'],resolve),
          }
        ]
      },
      {
        path: '/order_detail',//交易管理-订单管理-订单详情
        component:resolve => require(['@/components/page/deal/order_detail'],resolve),
      },
      {
        path: '/logistics_detail',//交易管理-订单管理-物流详情
        component:resolve => require(['@/components/page/deal/logistics_detail'],resolve),
      },      
      {
        path: '/refund_detail',//交易管理-订单管理-退款申请-退款详情
        component:resolve => require(['@/components/page/deal/refund_detail'],resolve),
      },
      {
        path:'/freight_template',//交易管理-运费模板
        component:resolve => require(['@/components/page/deal/freight_template'],resolve)
      },
      {
        path:'/add_template',//交易管理-运费模板-新增运费模板
        component:resolve => require(['@/components/page/deal/add_template'],resolve)
      },
      {
        path:'/address',//交易管理-发货地址/退货地址（别名）
        component:resolve => require(['@/components/page/deal/address'],resolve),
        alias:'/returnAddress'
      },
      // {
      //   path:'/returnAddress',//交易管理-发货地址/退货地址（别名）
      //   redirect:'/address'
      // },
      {
        path:'/shopInfo',//店铺管理-店铺信息
        component:resolve => require(['@/components/page/shop/shopInfo'],resolve)
      },
      {
        path:'/recharge',//我的账户-账户管理-充值
        component:resolve => require(['@/components/page/account/recharge'],resolve)
      },
      {
        path:'/bank_step',//账户管理-银行卡信息-step1
        component:resolve => require(['@/components/page/account/bank_step'],resolve)
        // children: [
        //   {
        //     path: '', 
        //     component:resolve => require(['@/components/page/account/step1'],resolve),
        //   },
        //   {
        //     path: 'step1',
        //     name: 'step1',
        //     component:resolve => require(['@/components/page/account/step1'],resolve),
        //   },
        //   {
        //     path: 'step2',
        //     name: 'step2',
        //     component:resolve => require(['@/components/page/account/step2'],resolve),
        //   },
        //   {
        //     path: 'step3',
        //     name: 'step3',
        //     component:resolve => require(['@/components/page/account/step3'],resolve),
        //   },
        //   {
        //     path: 'step4',
        //     path: 'step4',
        //     component:resolve => require(['@/components/page/account/step4'],resolve),
        //   }
        // ]
      },
      {
        path:'/bank_step/step2',//账户管理-银行卡信息-step1
        component:resolve => require(['@/components/page/account/bank_step'],resolve)
      },
      {
        path:'/bank_step/step3',//账户管理-银行卡信息-step1
        component:resolve => require(['@/components/page/account/bank_step'],resolve)
      },
      {
        path:'/bank_step/step4',//账户管理-银行卡信息-step1
        component:resolve => require(['@/components/page/account/bank_step'],resolve)
      },
      {
        path:'/bank_help',//账户管理-银行卡信息-如何查询开户行名称
        component:resolve => require(['@/components/page/account/bank_help'],resolve),
      },
      {
        path:'/my_account',//账户管理-我的账户
        component:resolve => require(['@/components/page/account/my_account'],resolve),
      },
      {
        path:'/withdraw',//账户管理-我的账户-提现
        component:resolve => require(['@/components/page/account/withdraw'],resolve),
      },
      {
        path:'/trading_list',//账户管理-我的账户-查看记录
        component:resolve => require(['@/components/page/account/trading_list'],resolve),
      },
      {
        path:'/commission_list',//账户管理-佣金统计
        component:resolve => require(['@/components/page/account/commission_list'],resolve),
      }
    ]
  }
]

const router = new Router({
  routes
})
export default router;


