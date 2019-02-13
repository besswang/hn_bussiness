<template>
    <div class="rule">

        <p class="text-right">最新版本生效日期 2017年06月23日</p>
        <h4>一、	账户</h4>
        <p>我们根据不同的收入来源将为每位商家开通两个独立的收入账户，分别为银果账户和现金账户</p>
        <p>银果账户：所有通过银果交易完成后的订单金额将进入此账户。</p>
        <p>银果账户：所有通过银果交易完成后的订单金额将进入此账户。</p>
        <h4>二、	可提现余额</h4>
        <p>关于可提现余额，是指商家可以从平台直接提现的余额或银果，
            <span class="red">关于部分交易货款将在交易成功后15天内保留在商户的不可用余额账户中</span>
            。期间如发生售后，则会根据最终判责结果确定是否作为赔付使用。
        </p>
        <h4>三、	限额</h4>
        <p><span class="red">1.	单笔提现/兑换金额下限不得低于200.00元。</span></p>
        <p><span class="right">2.	单笔提现/兑换金额的基数必须为100的倍数。</span></p>
        <p><span class="red">3.	单笔提现/兑换金额上限不得高于50000元。</span></p>
        <h4>四、	克珞世商城针对支付订单不加收手续费</h4>
        <p>克珞世商城遵循<span class="red">“支付通道商”</span>
        官网公示的费率（0.6%）为基准，不加收任何手续费，同时为便于商家合算具体手续费，
        我们将汇总支付宝支付订单产生的手续费和银行转账手续费来计算具体手续费，
        并在商户提现时统一扣除相关手续费用。</p>
        <p>我们根据两种支付账户来分别计算具体手续费</p>
        <strong>银果账户：</strong>
        <p><span class="red">提现手续费=银行转账手续费。</span></p>
        <strong>现金账户：</strong>
        <p><span class="red">提现手续费=支付宝手续费+银行转账手续费（此处银行转账手续费基数为“可提现金额-支付宝手续费”）</span></p>
        <p>银行转账手续费计算方法：（根据最新条例更新）</p>
        <table class="table table-bordered text-center">
            <tbody>
                <tr>
                    <td>小额汇划费用清单</td>
                    <td colspan="4" style="padding: 0">
                        <table class="table table-bordered" style="margin-bottom: 0; border: 0">
                            <tbody>
                                <tr>
                                    <td colspan="4">单笔金额&lt;50000</td>
                                </tr>
                                <tr>
                                    <td>同行同城</td>
                                    <td>同行异地</td>
                                    <td>跨行同城</td>
                                    <td>跨行异地</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>对公</td>
                    <td>免费</td>
                    <td>
                        &lt;1万 5元
                        <br>
                        &lt;5万 10元
                    </td>
                    <td>免费</td>
                    <td>免费</td>
                </tr>
                <tr>
                    <td>对私</td>
                    <td>免费</td>
                    <td>
                        免费
                    </td>
                    <td>免费</td>
                    <td>免费</td>
                </tr>
            </tbody>
        </table>
        <p>以上手续费全由支付宝及银行直接向商家收取，克珞世不经手。</p>

    </div>
</template>

<script>
    export default {
        name:'rule',
        data() {
            return {

            }
        }
    }
</script>

<style scoped>
.table-bordered {
    border: 1px solid #ddd;
}
.table {
    width: 100%;
    max-width: 100%;
    margin-bottom: 20px;
    border-spacing: 0;
    border-collapse: collapse;
}
.table-bordered>tbody>tr>td{
  border: 1px solid #ddd;
}
</style>
