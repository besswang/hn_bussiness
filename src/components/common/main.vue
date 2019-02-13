<template>
    <div id="home" class="home" >
        <v-head></v-head>
        <div class="bg-purple-blue">
            <div class="logo-con flex flex-row flex-align-center">
                <img src="../../assets/img/white_logo2.png" alt="">
                <span>商家中心</span>
            </div>
        </div>
        <template v-if="isShowHome">
            <div class="main-cnt flex flex-row">
                <side-nav></side-nav>
                <div class="content flex-1">
                    <router-view :key="key"/>
                </div>
            </div>
            <v-foot></v-foot>
        </template>
        <template v-else>
            <div class="oshop-infobox">
                <p v-if="userId > 0"><img src="../../assets/img/store.png" style="width:360px"></p>
                <p v-html='wordTips'></p>
            </div>
        </template>
    </div>
</template>

<script>
import { Row,Col,Dialog,Button,Breadcrumb,BreadcrumbItem,DatePicker,Form,FormItem,
Input,Tabs,TabPane,Table,TableColumn,MessageBox,Message,Tree} from 'element-ui'

import vHead from './vheader.vue'
import sideNav from './side_nav.vue'
import vFoot from './vfooter.vue'
export default {
    name:'home',
    components:{
        vHead,
        sideNav,
        vFoot,
        MessageBox,
        Message,
        'el-row':Row,
        'el-col':Col,
        'el-dialog':Dialog,
        'el-button':Button,
        'el-breadcrumb':Breadcrumb,
        'el-breadcrumb-item':BreadcrumbItem,
        'el-date-picker':DatePicker,
        'el-form':Form,
        'el-form-item':FormItem,
        'el-input':Input,
        'el-tabs':Tabs,
        'el-tab-pane':TabPane,
        'el-table':Table,
        'el-table-column':TableColumn,
        'el-tree':Tree
    },
    data () {
        return {
            isShowHome:false,
            wordTips:'',
            userId:-1
        }
    },
    computed: {
        key() {
            return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date()
        }
    },
    methods: {      
        goIndexMt () {
            window.location.href = process.env.businessHost.host + '/' + process.env.businessHost.projectName + '/#/index';
        },
        goLoginMt () {
            window.location.href = process.env.businessHost.host + '/' + process.env.businessHost.projectName + '/#/login';
        }
    },
    mounted () {
        // this.$axios.post(this.$$jk.login,{account:"15057187176",password:123456,host:"shop"})
        this.$axios.post('login',{account:"18757183348",password:123456,host:"shop"})
            .then(function(response) {
                //console.log(response.data)
                console.log("登陆成功")
            })
            .catch(function(error) {
                alert(error);
            });
            
        //this.$axios.post(this.$$jk.getLoginUserView,{})
        this.$axios.post('getLoginUserView',{})
        .then((response) => {
            //if(response && response['data'] && response['data']['code'] == 'SUCCESS'){
            if(response){
                let merchantId = response['data']['data']['merchantId'];
                let userId =  response['data']['data']['id'];
                this.userId = response['data']['data']['id'];

                if(Number(userId) > 0){
                    if(Number(merchantId) > 0){
                        this.isShowHome = true;
                        this.wordTips = '';
                        sessionStorage.setItem("merchantId",merchantId);
                        sessionStorage.setItem('userId',userId)
                    }else{
                        sessionStorage.removeItem("merchantId","");
                        sessionStorage.removeItem('userId','')
                        this.isShowHome = false;
                        let url = process.env.businessHost.host + '/' + process.env.businessHost.projectName + '/#/open_store'
                        this.wordTips = '抱歉，您的账号暂未开通过店铺，请先申请开通！'+
                                         '<a style="color: #fff;" href="'+url+'">'+ 
                                             '<button type="button" class="el-button el-button--primary">'+
                                                '申请开店'+
                                             '</button>'+
                                         '</a>';
                    }
                }else{
                    sessionStorage.removeItem("merchantId","");
                    sessionStorage.removeItem('userId','')
                    this.isShowHome = false;
                    this.wordTips = '用户不存在';
                }
               
            }else{
                sessionStorage.removeItem("merchantId","");
//                window.location.href = process.env.businessHost.host + '/' + process.env.businessHost.projectName + '/#/login';
                this.isShowHome = false;
                this.wordTips = response['data']['remark'] || '用户未登录';
            }
        })
        .catch(function(error) {
            console.log(error);
        });
    }
}
</script>
<style scoped>
.oshop-infobox {
    color: #666;
    width: 588px;
    margin: 70px auto;
    position:relative;
}
.oshop-img{
    width:120px;
    border:1px solid #ccc;
    position:absolute;
    left:0;
    top:0;
}
.oshop-cont{
    margin-left:134px;
}
.oshop-cont-tit{
    font-size: 18px;
    line-height: 62px;
    color: #666;
}
.oshop-cont-list{
 line-height:20px;
 color:#666;
}
.home{
    height:100%;
}
.homeNoMess{
    position:fixed;
    width:100%;
    height:100%;
    background:#fff;
}
.homeNoMessCont{
    display:block;
    padding: 12px 32px 32px 32px;
    width:1200px;
    margin:0 auto;
    border:1px solid #ccc;
}
.main-cnt{
    max-width:1220px;
    margin:0 auto;
}
.content{
    width:100%;
    margin-top:20px;
}
/* 商家中心-start */
.bg-purple-blue{
    width:100%;
    background:#4aa6ec;
}
.logo-con{
    margin:0 auto;
    padding:15px 0;
    max-width:1200px;
}
.logo-con>span{
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    padding-left:5px;
}
.sym-nolist-wrap {
    text-align: center;
    line-height: 62px;
    font-size: 18px;
    color: #666666;
    padding-left:20px;
}
</style>
