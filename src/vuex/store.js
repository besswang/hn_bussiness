import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
//注册Store

// const store = new Vuex.Store({
//     state: {
//         count: 0,
//         adminleftnavnum:"1"  //管理后台左侧导航
//     },
//     mutations: {
//         increment (state) {
//             state.count++
//         }
//     }
// })
const state = {
    count: 0,
    adminleftnavnum:"/",  //管理后台左侧导航
    activeName:'',//订单管理tab状态
    shopid:72,//72商家id
    name:'',//商家姓名
    sectionType:'',//时间区间类型
    isShelves:'',//-1到期下架，1上架
    kuaidiList:[]
}
const mutations = {
    increment (state) {
        state.count++
    },
    getName:state => state.name,
    setName:state => state.name  
}
// const actions = {...}
export default new Vuex.Store({
    state,
    mutations
});