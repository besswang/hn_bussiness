<template>
<div class="topBar">
    <div class="header-wrap">
        <div class="header">
            <!--头部左边-->
            <ul class="header-left">
                <li>
                   <a class="goback-index" @click.stop="goIndexMt">返回首页&nbsp;&nbsp;&nbsp;&nbsp;</a> 
                </li>
                <template v-if="userMess">
                    <li>
                       <span id="userNames" style="position:relative;">{{userMess || '---'}}</span>
                       <a @click="loginOutMt">退出</a>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import 'element-ui/lib/theme-chalk/index.css'

export default {
    data () {
        return {
            userMess:""
        }
    },
    methods:{
        goIndexMt () {
            window.location.href = process.env.businessHost.host + '/' + process.env.businessHost.projectName + '/#/index';
        },
        getUserMessMt () {

            // this.$$.ajax({
            //     // url: this.$$jk.getLoginUserView,
            //     url:'getLoginUserView',
            //     type: 'POST',
            //     success: (function(res){
            //         console.log(res)
            //         if(res && res.code == 'SUCCESS'){

                        // this.userMess = sessionStorage.getItem('name')
                        // console.log(this.userMess)
            //         }
            //     }).bind(this),
            //     error: function (res) {
            //         console.log(res);
            //     }
            // })
            // this.$axios.post('getLoginUserView',{})
            // .then(function(res) {
            //     console.log(res.data.name)
            //     if(res && res.data.code == 'SUCCESS'){
            //         //this.userMess = res.data.name;
            //     }                
            // })
            // .catch(function(error) {
            //     alert(error);
            // });
        },
        loginOutMt () {
            this.$$.ajax({
                url: this.$$jk.logout,
                type: 'POST',
                success: (function(res){
                    if(res && res.code == 'SUCCESS'){
                     // location.reload();
                     window.location.href=process.env.businessHost.host+'/'+process.env.businessHost.projectName+'/#/login';
                    }
                }).bind(this),
                error: function(res){
                    console.log(res);
                }
            })
        }
    },
    mounted () {
        this.getUserMessMt();
    }
}
</script>

<style scoped>
.topBar{position:relative;z-index:10}
.header-wrap{background:#f2f2f2;border-bottom:1px solid #d5d5d5;position:relative;z-index:1600}
.header{width:1200px;height:35px;line-height:35px;margin:0 auto;font-size:12px;color:#8c8c8c}
.header ul{margin:0!important}
.header-left{float:left}
.header a,.header-left a{color:#8c8c8c;cursor:pointer;vertical-align: middle}
.header a:hover{text-decoration:none;color:#d71f1b}
.goback-index {display:inline-block;}
.header-right{float:right}
.header-right li{position:relative;padding:0 10px}
.header-left li,.header-right li{float:left;}
.header-phone{margin-left:10px;}
.header-right li.header-div-show div{display:block}
.header-phone div{display:none;position:absolute;-webkit-box-sizing:content-box;box-sizing:content-box;top:36px;left:50%;margin-left:-45px;width:90px;height:130px;padding:5px 10px;border:1px solid #d5d5d5;border-top:none;background:#fff;z-index:301}
.header-phone div p{line-height:20px;height:40px;overflow:hidden}
.header-phone div>img{width:90px;height:90px}
.header-phone div:before{position:absolute;left:50%;margin-left:-3px;top:-5px;width:0;height:0;content:"";border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:6px solid #fff;z-index:200}
</style>
