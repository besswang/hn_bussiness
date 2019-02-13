<template>
<div class="footer-wrap">
    <div class="footer">
        <ul class="footer-top flex flex-r">
            <li class="flex-1">
                <p>正品保障</p>
                <p>正品行货，质量保证</p>
            </li>
            <li class="flex-1">
                <p>最全特产</p>
                <p>各地特产，一站即得</p>
            </li>
            <li class="flex-1">
                <p>厂家直销</p>
                <p>供货保障，价格实惠</p>
            </li>
            <li class="flex-1">
                <p>银果可消费</p>
                <p>价值回归，银果消费</p>
            </li>
        </ul>
        <div class="footer1">
            <ul>
                <li class="footer-title">新手指南</li>
                <li>
                    <a href="http://suser.51myd.com/manage_static_page/merchant_apply">商家入驻</a></li>
            </ul>
            <ul>
                <li class="footer-title">购物指南</li>
                <li>
                    <a href="http://suser.51myd.com/manage_static_page/shop_flow">购物流程</a></li>
                <li>
                    <a href="http://suser.51myd.com/manage_static_page/search_order">查询订单</a></li>
            </ul>
            <ul>
                <li class="footer-title">用户服务</li>
                <li>
                    <a href="http://suser.51myd.com/manage_static_page/user_register">用户注册</a></li>
                <li>
                    <a href="http://suser.51myd.com/manage_static_page/reset_password">修改密码</a></li>
                <li>
                    <a href="http://suser.51myd.com/manage_static_page/contact_us">联系我们</a></li>
            </ul>
            <ul>
                <li class="footer-title">售后服务</li>
                <li>
                    <a href="http://suser.51myd.com/manage_static_page/after_sales">退款退货</a></li>
            </ul>
            <ul>
                <li class="footer-title">商城规则</li>
                <li>
                    <a href="http://suser.51myd.com/manage_static_page/shop_rules">规则说明</a></li>
            </ul>
            <div class="erweima">
                <img src="../../assets/img/huanniu-pay.png" />
                <span>
                    <p>扫一扫</p>
                    <p>下载克珞世商城APP</p>
                </span>
            </div>
        </div>
    </div>
    <div class="footer2">
        <p>
            <span>北京市朝阳区工体北路21号永利国际1单元507室 E-mail:server@51myd.com</span>
            <span>©️2016-2017克珞世网络科技有限公司 ICP备案号：浙ICP备15004318号-1</span></p>
        <div class="img-wrap">
            <img src="../../assets/img/footer-img1.png" />
            <img src="../../assets/img/footer-img2.png" /></div>
    </div>
</div>
</template>

<script>
    export default {
        data() {
            return {
            }
        }
    }
</script>

<style scoped>
.footer-wrap{width:100%;border-top:1px solid #dfe4e8;background:#fff;background-size:cover}
.footer{max-width:1190px;margin:0 auto;overflow:hidden}
.footer-top{background:url(../../assets/img/footer-bj.png) no-repeat center center;
border-bottom:1px solid #f0f0f0;
padding:50px 0;}
.footer-top p{text-indent:120px;margin-bottom:0!important}
.footer-top p:nth-child(1){font-size:18px;color:#575757;}
.footer-top p:nth-child(2){font-size:16px;color:#9e9e9e}
.footer1{height:178px;padding:30px 0 0 0;overflow:hidden}
.footer1 ul{float:left;margin-right:75px}
.footer1 ul:nth-child(1){margin-left:58px}
.footer1 ul:last-child{margin-right:122px}
.footer-title{font-size:16px!important;color:#575757!important}
.footer1 li{font-size:12px;color:#9e9e9e;margin-bottom:8px}
.footer1 li a{color:#9e9e9e}
.footer1 li a:hover{color:#666}
.erweima{overflow:hidden}
.erweima img{float:left;width:60px;height:60px;margin:4px 20px 0 0}
.erweima span{display:block;width:auto;font-size:12px;color:#575757;line-height:20px;margin-top:8px}
.footer2{padding-bottom:30px;border-top:3px solid #d71f1b;background:#000}
.footer2 p{width:1190px;margin:34px auto 0;font-size:10px;color:#9E9E9E;text-align:left}
.footer2 span{display:inline-block}
.footer2 span:nth-child(1){margin-right:56px}
.footer2 .img-wrap{width:1190px;height:47px;margin:16px auto 0}
.footer2 .img-wrap img{float:left;width:120px;height:48px;margin-right:14px}
</style>
