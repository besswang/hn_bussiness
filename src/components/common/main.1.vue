<template>
    <div class="home">
        <v-head></v-head>
        <div class="bg-purple-blue">
            <div class="logo-con flex flex-row flex-align-center">
                <img src="http://smerchant.51myd.com/modules/jifenbao/shop/img/white_logo.png" alt="">
                <span>商家中心</span>
            </div>
        </div>
        <div class="main-cnt flex flex-row">
            <side-nav></side-nav>
            <div class="content flex-1">
                <router-view/>
            </div>
        </div>
        <v-foot></v-foot>
    </div>
</template>

<script>
    import vHead from './vheader.vue'
    import sideNav from './side_nav.vue'
    import vFoot from './vfooter.vue'
    export default {
        name:'home',
        components:{
            vHead,
            sideNav,
            vFoot
        },
        mounted () {
            let _this = this
            this.$axios.post('/hn-shop-web/login',{account:"admin",password:123456})
                .then(function(response) {
                    console.log("登陆成功")
                })
                .catch(function(error) {
                    alert(error);
                }); 
        },
        methods:{

        }
    }
</script>
<style scoped>
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
</style>
