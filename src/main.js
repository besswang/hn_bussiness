// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/common.css'
// import './assets/css/layui/css/layui.css'
import Mock from './mock/mock'
import store from './vuex/store'
import jquery from 'jquery';
import common from './assets/js/common.js';
import jk from './assets/js/jk.js';
// import _ from 'lodash'
import dash from 'lodash'
import "babel-polyfill";
import "es6-shim"
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
//全局变量
import G from './assets/js/global'
Vue.use(G);
Vue.config.productionTip = false
import {Message,MessageBox,Confirm,Loading} from 'element-ui'
Message.install = function (Vue, options) {
    Vue.prototype.$message = Message
}
MessageBox.install = function (Vue,options){
    Vue.prototype.$confirm = MessageBox.confirm
    //Vue.prototype.$confirm = MessageBox
    //Vue.prototype.$prompt = MessageBox
    //Vue.prototype.$alert = MessageBox
}
Loading.install = function(Vue,options){
    Vue.prototype.$loading = Loading.service;
}
Vue.use(Message)
Vue.use(MessageBox)
Vue.use(Loading.directive);
Vue.prototype.com = common;
Vue.prototype.$$ = jquery;
Vue.prototype.$dash = dash
Vue.prototype.$$jk = jk;
Vue.prototype.com = common;
Vue.prototype.bus = new Vue()
// 封装接口-start
import axios from 'axios'
import qs from 'qs'
let axiosIns = axios.create({});
axiosIns.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest';
axiosIns.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest';
axiosIns.defaults.responseType = 'json';
axiosIns.defaults.transformRequest = [function (data) {
    //数据序列化
    return qs.stringify(data);
}
];
axiosIns.defaults.validateStatus = function (status) {
    return true;
};
axiosIns.interceptors.request.use(function (config) {
    //配置config
    config.headers.Accept = 'application/json';
    return config;
});
axiosIns.interceptors.response.use(function (response) {
    let data = response.data;
    let status = response.status;
    if (status === 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
});

let ajaxMethod = ['get', 'post'];
let api = {};
ajaxMethod.forEach((method)=> {
    //数组取值的两种方式
    api[method] = function (uri, data, config) {
        return new Promise(function (resolve, reject) {
            axiosIns[method](uri, data, config).then((response)=> {
                /*根据后台数据进行处理
                 *1 code===200   正常数据+错误数据     code!==200   网络异常等
                 *2 code===200   正常数据     code!==200   错误数据+网络异常等
                 * 这里使用的是第一种方式
                 * ......
                 */
                if (response.data.code == 'UNAUTHORIZED') {
                    Message({
                        message:response.data.remark,
                        type:"warning"
                    })
                    setTimeout(() => {
                        window.location.href = process.env.businessHost.host + '/' + process.env.businessHost.projectName + '/#/login';
                    }, 3000);
                    //toast封装：  参考ele-mint-ui
                    // Toast({
                    //     message: response.data.Message,
                    //     position: 'top',
                    //     duration: 2000
                    // });
                    // if (response.data.Message === '未登录') {
                    //     Toast({
                    //         message: response.data.Message,
                    //         position: '',
                    //         duration: 2000
                    //     });
                    //     //使用vue实例做出对应行为  change state or router
                    //     //instance.$store.commit('isLoginShow',true);
                    // }
                }else {
                    resolve(response);
                }

            }).catch((response)=> {
                //reject response
            })
        })
    }
});
Vue.prototype.$axios = api;
// 封装接口-end

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
