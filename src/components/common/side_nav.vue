<template>
    <div class="sidenav">
        <el-menu 
        :default-active="navselected" 
        :active="navselected" 
        class="el-menu" 
        @select="selectItems"
        :default-openeds="openends" 
        router>
            <el-submenu index="1">
                <template slot="title">
                    <span class="group-title">我的店铺</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item @click.native="clickLink('/home')" index="/home">店铺首页</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title">
                    <span class="group-title">商品管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item @click.native="clickLink('/issue')" index="/issue">商品发布</el-menu-item>
                    <el-menu-item @click.native="clickLink('/product_list')" index="/product_list">商品列表</el-menu-item>
                    <el-menu-item @click.native="clickLink('/product_classify')" index="/product_classify">商品分类</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                    <span class="group-title">交易管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item @click.native="clickLink('/order_list')" index="/order_list">订单管理</el-menu-item>
                    <el-menu-item @click.native="clickLink('/freight_template')" index="/freight_template">运费模板</el-menu-item>
                    <el-menu-item @click.native="clickLink('/address')" index="/address">发货地址</el-menu-item>
                    <el-menu-item @click.native="clickLink('/returnAddress')" index="/returnAddress">退货地址</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                    <span class="group-title">店铺管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item @click.native="clickLink('/shopInfo')" index="/shopInfo">店铺信息</el-menu-item>
                </el-menu-item-group>
            </el-submenu>  
            <!-- <el-submenu index="5">
                <template slot="title">
                    <span class="group-title">客服中心</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="5-1">客服消息</el-menu-item>
                </el-menu-item-group>
            </el-submenu>    -->
            <el-submenu index="6">
                <template slot="title">
                    <span class="group-title">账户管理</span>
                </template>
                <el-menu-item-group>             
                    <el-menu-item @click.native="clickLink('/my_account')" index="/my_account">我的账户</el-menu-item>
                    <el-menu-item @click.native="clickLink('/bank_step')" index="/bank_step">银行卡信息</el-menu-item>
                    <!-- <el-menu-item index="/commission_list">佣金统计</el-menu-item> -->
                </el-menu-item-group>
            </el-submenu>                     
        </el-menu>
    </div>
</template>

<script>
    import { Menu,Submenu,MenuItem,MenuItemGroup } from 'element-ui'
    export default {
        components:{
            'el-menu':Menu,
            'el-submenu':Submenu,
            'el-menu-item':MenuItem,
            'el-menu-item-group':MenuItemGroup
        },
        data () {
            return {
                navselected:"/",
                openends:['1','2','3','4','5','6'],//默认menu展开
            }
        },
        // created () {
        //     this.$store.state.adminleftnavnum="/"; //设置左侧导航2-2 active
        // },
        mounted(){
            // console.log(this.navselected)   
        },
        methods:{
            clickLink(path) {
                this.$router.push({
                    path,
                    query: {
                    t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
                    }
                })
            },
            getNavType(){
                this.navselected=this.$store.state.adminleftnavnum;
                //store.state.adminleftnavnum里值变化的时候，设置navselected
            },
            selectItems(index){
                // console.log(index)
                this.$store.state.adminleftnavnum=index;
               //按钮选中之后设置当前的index为store里的值。
            }
        },
        watch: {
            // 监测store.state
            '$store.state.adminleftnavnum': 'getNavType'
        }
    }
</script>
<style scoped>
.sidenav{
    background:#fff;
    max-width:140px;
}
.el-menu{
    max-width:200px;
    padding-top:15px;
}
.group-title{
    display:block;
    font-size:14.5px;
    color:#222;
}
.el-submenu__title{
    height:40px !important;
    line-height:40px !important;
}
.el-submenu .el-menu-item{
    color:#666;
    font-size:12.5px;
    height:40px;
    line-height:40px;
    padding:0;
    min-width:139px;
}
.el-submenu .el-menu-item:first-child{
    margin-top:-14px;
}
.el-menu-item.is-active{
    background:#409EFF;
    color:#fff;
}
</style>
