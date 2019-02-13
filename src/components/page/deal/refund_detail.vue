<template>
  <div class="refund">

    <div class="source">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">商家中心</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/order_list' }">订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>退款管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <el-row class="refund-row">
      <el-col class="refund-col" :span="18">
        <div class="left-col">
          <div v-if="type==1&&status==1">
            <!-- 已发货 -->
            <h1 style="padding:30px 0;">买家申请退款退货，待商家处理</h1>
            <el-button type="primary" @click="dialogRefund=true">直接退款</el-button>
            <el-button type="success" @click="disposeFn(2)">同意退款退货申请</el-button>
            <el-button type="danger" @click="dialogFormVisible = true,rejectReason=''">拒绝退款</el-button>
          </div>
          <div v-else-if="status==-3">
            <h1 style="padding:30px 0;">取消退款</h1>
          </div>
          <div v-else-if="status==-1">
            <h1 style="padding:30px 0;">商家拒绝退货</h1>
            <p>原因：{{rejectReason}}</p>
          </div>
          <div v-else-if="type==2&&status==1">
            <h1 style="padding:30px 0;">买家申请退款，待商家处理</h1>
            <el-button type="primary" @click="dialogRefund=true">直接退款</el-button>
            <!-- <el-button type="success" @click="disposeFn(2)">同意退货</el-button> -->
            <el-button type="danger" @click="dialogFormVisible = true,rejectReason=''">拒绝退款</el-button>
            <el-button type="success" v-if="orderState==-1" @click.prevent="send()">发货</el-button>
          </div>
          <div v-else-if="status==2">
            <h1 style="padding:30px 0;">{{information}}</h1>
            <p style="padding-bottom:15px;">如果您逾期未响应，视作同意买家申请，系统将自动退款给买家</p>
            <el-button type="primary" @click="dialogRefund=true">直接退款</el-button>
            <el-button type="danger" @click="dialogFormVisible = true,rejectReason=''">拒绝退款</el-button>
          </div>
          <h1 v-else-if="status==3" style="padding:30px 0;">已同意退款</h1>
          <h1 v-else-if="status==4" style="padding:30px 0;">退款中</h1>
          <h1 v-else-if="status==5" class="refund-title"><i class="el-icon-circle-check"></i>退款已完成！</h1>
          <p class="step-title">退款退货进度</p>
          <div class="step-con">
            <ul class="flex flex-c step-ul">
              <li class="flex-1 flex flex-row" :class="key==0?'active':''" v-for="(list,key) in refundOrderTableList"
              :key="key">
                  <p class="time">{{list.updatedAt}}</p>
                  <dl>
                    <dd>{{list.operator}} - {{list.operateAction}}</dd> 
                    <dd v-if="JSON.parse(list.operateDetail).shippingCode">快递单号: {{JSON.parse(list.operateDetail).shippingCode}}</dd>
                    <dd v-if="JSON.parse(list.operateDetail).kuaidiName">快递公司: {{JSON.parse(list.operateDetail).kuaidiName}}</dd> 
                    <dd v-if="JSON.parse(list.operateDetail).contact">收货人: {{JSON.parse(list.operateDetail).contact}}</dd> 
                    <dd v-if="JSON.parse(list.operateDetail).address">收货地址: {{JSON.parse(list.operateDetail).address}}</dd>
                    <dd v-if="JSON.parse(list.operateDetail).mobile">联系方式: {{JSON.parse(list.operateDetail).mobile}}</dd>
                    <dd v-if="JSON.parse(list.operateDetail).refunds_reason">退款原因: {{JSON.parse(list.operateDetail).refunds_reason}}</dd>         
                    <dd v-if="explanationFn(JSON.parse(list.operateDetail))!=''">退款说明: {{explanationFn(JSON.parse(list.operateDetail))}}</dd>
                    <dd>
                      <img 
                       v-for="(img,i) in operateDetailFn(JSON.parse(list.operateDetail))" :key="i"
                      style="max-width:80px;display:inline-block;margin-right:10px;" :src="img" alt="">
                    </dd>
                  </dl>
              </li>
              <!-- <li class="active flex-1 flex flex-row">
                  <p class="time">2017-07-27 21:10:14</p>
                  <dl>
                    <dd>幻牛测试账户-确认打款</dd>
                    <dd>货款将返回到你的账户中</dd>
                  </dl>
              </li>
              <li class="flex-1 flex flex-row">
                  <p class="time">2017-07-27 21:10:14</p>
                  <dl>
                    <dd>-申请退款退货</dd>
                    <dd>原因：未按约定时间发货</dd>
                    <dd>退款类型：退款退货</dd>
                    <dd>退款金额：0.01</dd>
                  </dl>
              </li> -->
            </ul>
          </div>
        </div>
      </el-col>
      <el-col class="refund-col" :span="6">
          <h5 class="refund-header">订单信息</h5>
          <ul class="order-ul">
            <li class="flex flex-row flex-align-center bborder">
              <div class="order-img">
                <img :src="goodsImage" alt="">
              </div>
              <p>{{goodsName}}</p>
            </li>
            <li class="flex flex-row">
              <span>买家姓名:</span>
              <p>{{buyerName}}</p>
            </li>
            <li class="flex flex-row">
              <span>订单编号:</span>
              <el-button class="text-word" type="text" style="padding:0;" @click="detail">{{orderNumber}}</el-button>
            </li>
            <li class="flex flex-row bborder">
              <span>单价:</span>
              <p>{{price}}元*1(数量)</p>
            </li>
            <li class="flex flex-row">
              <span>运费:</span>
              <p>{{shippingFee}}元</p>
            </li>
            <li class="flex flex-row">
              <span>退款编号:</span>
              <p class="text-word">{{refOrderNumber}}</p>
            </li> 
            <li class="flex flex-row">
              <span>退款金额:</span>
              <p>{{refundAmount}}</p>
            </li>   
            <li class="flex flex-row">
              <span>原因:</span>
              <p>{{reasonFn(reason)}}</p>
            </li>
            <li class="flex flex-row">
              <span>退款类型:</span>
              <p>{{type==1?"退款退货":"退款"}}</p>
            </li>
            <li class="flex flex-row">
              <span>商品状态:</span>
              <p>{{refSatusFn(refSatus)}}</p>
            </li> 
            <li class="flex flex-row">
              <span>说明:</span>
              <p style="white-space:normal;word-warp:break-word;word-break:break-all;">{{explanation}}</p>
            </li>                                                          
          </ul>
      </el-col>
    </el-row>
<el-dialog title="填写决绝理由" :visible.sync="dialogFormVisible">
  <el-input
    type="textarea"
    :rows="3"
    placeholder="请输入拒绝理由"
    v-model="rejectReason">
  </el-input>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="rejectFn">确 定</el-button>
  </div>
</el-dialog>
<el-dialog title="直接退款" :visible.sync="dialogRefund">
  <p>您确定要直接退款给会员吗?</p>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogRefund = false">取 消</el-button>
    <el-button type="primary" @click="refundFn">确 定</el-button>
  </div>
</el-dialog>
<!-- 退款退货申请的直接退款 -->
    <el-dialog title="订单发货" :visible.sync="sendFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="快递" :label-width="formLabelWidth" prop="currentExpress">
          <el-select v-model="form.currentExpress" @change="formstocksF">
            <el-option
            v-for="(express,key) in kuaidisList"
            :key="key"
            :value="express.name">
            </el-option>
            <!-- <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="物流单号" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" auto-complete="off" @focus="formstocksF" type="number"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="sendCancel('form')">取 消</el-button>
        <el-button type="primary" @click="sendVali('form')" :disabled="sendDisabled">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 如果订单中有退货中的商品，需要弹出提示 -->
    <el-dialog :visible.sync="refundSendVis" title="温馨提示">
      <p>建议您先找买家沟通，买家同意后再发货，如果未经买家同意，淘宝介入后核实是您的责任，将影响您店铺的纠纷退款率.</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="refundSendVis=false">取 消</el-button>
        <el-button type="primary" @click="kuaidisListFn()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import { Row,Col,Button,Breadcrumb,BreadcrumbItem, Step, Steps, Dialog, Input, Select,Option,Form, FormItem} from 'element-ui'
export default {
  name: 'refund',
  components: {
    'el-row':Row,
    'el-col':Col,
    'el-button':Button,
    'el-breadcrumb':Breadcrumb,
    'el-breadcrumb-item':BreadcrumbItem,
    'el-steps':Steps,
    'el-step':Step,
    'el-dialog':Dialog,
    'el-input':Input,
    'el-select':Select,
    'el-option':Option,
    'el-form':Form,
    'el-form-item':FormItem
  },
  data () {
    return {
      orderGoodsIds:[],//订单下商品的id
      updateTime:'',//上次更新时间
      sendDisabled:false,
      refundSendVis:false,
      kuaidisList:[],
      sendFormVisible:false,
      form:{
            name:'',//物流单号
            currentExpress:''//快递id
        },
        rules: {
          currentExpress:[
            { required: true, message: '请选择快递', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入物流单号', trigger: 'blur' }
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ]
      },
      formLabelWidth:'120px',
      orderState:null,//订单状态：-1:待发货;1:已发货;2:已收货;',
      dialogRefund:false,//直接退款弹窗
      goodsImage:'',//商品图片
      goodsName:'',//商品名称
      buyerName:'',//买家姓名
      orderNumber:'',//订单编号
      price:'',//单价
      shippingFee:'',//运费
      refOrderNumber:'',//退款编号
      refundAmount:'',//退款金额
      reason:'',//退货原因
      type:'',//退款类型
      refSatus:'',//商品状态
      explanation:'',//说明
      orderSubsId:'',//订单id
        refundOrderTableList:[],//进度列表
        status:'',//订单状态
        orderId:'',//refundOrdersId
        operation:'',//买家操作内容
        dialogFormVisible:false,//拒绝弹窗
        rejectReason:'',//拒绝理由
        information:'',//物流信息
        type:''
    }
  },
  created () {
      this.$store.state.adminleftnavnum="/order_list"; //设置左侧导航active
  }, 
  mounted(){
      let _this = this
      //卖家查看退款详情(商品订单id,退款订单编号)
      //this.orderId = this.$route.query.id   
      this.detailFn()
  },
  methods: {
    explanationFn(obj){
      if(obj.explanation){
        return obj.explanation
      }else{
        return ''
      }
    },
    operateDetailFn(obj){
      if(obj.voucher_images){
        return obj.voucher_images.split(',')
      }
    },
    formstocksF(){
      this.sendDisabled = false;
    },
    //退货原因
    reasonFn(n){
              switch(n)
              {
              case 2:
                return '收到商品破损'
                break;
              case 3:
                return '商品需要维修'
                break;
              case 4:
                return '商品错发/漏发'
                break;
              case 5:
                return '未按约定时间发货'
                break;
              case 6:
                return '7天无理由退换货'
                break; 
              case 7:
                return '商品质量问题'
                break;  
              case 8:
                return '收到商品与描述不符'
                break;  
              case 9:
                return '退运费'
                break; 
              case 10:
                return '发票问题'
                break; 
              case 11:
                return '配送超时'
                break;  
              case 12:
                return '其他'
                break;                                                                                                
              }
    },
    //商品状态
    refSatusFn(n){
      switch(n){
        case -3:
          return '用户取消退款';
          break;
        case -1:
          return '商家驳回退款';
          break;
        case 1:
          return '发起退款';
          break;
        case 2:
          return '商家同意退款申请';
          break;
        case 3:
          return '确认退款';
          break;
        case 4:
          return '退款中...'
          break;
        case 5:
          return '退款成功'
          break;
        default:
          return '没有状态'
      }
    },
      detailFn(){
        let _this = this
        let id = this.$route.query.orderGoodId
        this.$axios.post(this.$$jk.getRefundOrdersInfoMerchant,{orderGoodId:id})
        .then(function(response) {
          if(response.data.code == 'SUCCESS'){
              let r = response.data.data
              _this.refundOrderTableList = r.refundOrderTableList.reverse()
              _this.status = r.refundOrders.status
              _this.type = r.refundOrders.type
              _this.rejectReason = r.refundOrders.rejectReason
              if(r.refundOrders.status == 2){
                if(r.refundOrders.shippingCode == null){
                    _this.information = '买家未提交物流信息'
                }else{
                  _this.information = '买家已提交退货物流，待商家处理'
                }
              }
              _this.goodsImage = r.orderGoods.goodsImage
              _this.goodsName = r.orderGoods.goodsName
              _this.buyerName = r.orderSubs.buyerName
              _this.orderState = r.orderSubs.orderState
              _this.orderNumber = r.orderSubs.orderNumber
              _this.price = r.orderGoods.price
              _this.shippingFee = r.orderSubs.shippingFee
              _this.refOrderNumber = r.refundOrders.orderNumber
              _this.refundAmount = r.refundOrders.refundAmount
              _this.reason = r.refundOrders.refundsReasonId
              _this.type = r.refundOrders.type
              _this.refSatus = r.refundOrders.status
              _this.explanation = r.refundOrders.explanation
              _this.orderSubsId = r.orderSubs.id
              _this.updateTime = r.orderSubs.updateTime
              _this.orderId = r.refundOrders.id
              _this.orderGoodsIds.push(r.orderGoods.id)
          }
        })
        .catch(function(error) {
            alert(error);
        });
      },   
      //订单编号
      detail(){
        this.$router.push({path:'/order_detail?orderGoodId='+this.orderSubsId})
      },
      //退款弹窗确定
      rejectFn(){
          if(!this.rejectReason){
            this.$message({
              message:'请填写拒绝原因',
              type:'warning'
            })
            return false
          }
          this.disposeFn(3)
          this.dialogFormVisible = false
      },
      //直接退款确定弹窗
      refundFn(){
          this.disposeFn(1)
          this.dialogRefund = false
      },
      //订单处理(买家操作内容)
      disposeFn(operation){
        let _this = this
        let id = sessionStorage.getItem('merchantId')
        if(operation==1){//直接退款
          this.operation = "direct"
        }else if(operation==2){//同意退货
          this.operation = 'agree'
        }else if(operation==3){//拒绝
          this.operation = "reject"
        }
        let trant = {
          merchantId:id,
          refundOrdersId:this.orderId,
          operation:this.operation,
          rejectReason:this.rejectReason
        }

        this.$axios.post(this.$$jk.disposeRefundOrdersMerchant,trant)
        .then(function(response) {
          if(response.data.code == 'SUCCESS'){
              _this.detailFn()
          }
        })
        .catch(function(error) {
            alert(error);
        }); 
        },
    //发货表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    sendCancel(formName){
      this.sendFormVisible=false
      this.refundSendVis=false
      this.form.name=''
      this.form.currentExpress = ''
      this.$refs[formName].resetFields();
    },
    //发货
    send(){
      this.refundSendVis = true
    },
    //发货弹窗
    kuaidisListFn(){
      let _this = this
      this.sendDisabled = false;
      this.sendFormVisible = true;
      this.form.name=''
      this.form.currentExpress = ''
      //获取快递名称
      this.$axios.post(this.$$jk.kuaidisList,{})
      .then(function(response){
          if(response.data.code == "SUCCESS"){
              _this.kuaidisList = response.data.data
          }
      })
      .catch(function(error){})      
    },
    //发货-确定
    sendVali(formName){
      this.sendDisabled = true
      let _this = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let kuaidi= this.kuaidisList.filter(item => item.name == this.form.currentExpress)   
          //调快递单号接口
          this.$axios.post(this.$$jk.merchantGetDataByid,{id:kuaidi[0].id,postId:this.form.name})
          .then(function(response){
              if(response.data.code == "SUCCESS"){
                  let r = JSON.parse(response.data.data)
                  console.log(r.message)
                  if(r.message == "ok"){
                    _this.sendFormVisible = false;
                    _this.refundSendVis = false;
                    _this.sendAfter()
                  }else{
                    let msg
                    if(r.status == 201){
                        // msg = r.message
                      msg = '快递公司选择错误'
                    }else{
                      // msg = "物流单号："+r.message
                      msg = '物流单号填写错误'
                    }
                    _this.$message({
                      message:msg,
                      type:'warning'
                    })
                    return false;
                  }
              }
          })
          .catch(function(error){

          })  
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    //出库
    sendAfter(){
      let kuaidi= this.kuaidisList.filter(item => item.name == this.form.currentExpress)   
      let orderGoodsIds = this.$route.query.orderGoodsIds
      let trans = {
          orderSubsId:this.orderSubsId,
          orderState:1,
          updateTime:this.updateTime,
          kuaidiId:kuaidi[0].id,
          shippingCode:this.form.name,
          orderGoodsIds:orderGoodsIds
      }      
      this.loadUse = true
      let _this = this;
      this.$axios.post(this.$$jk.setOrderState,trans)
      .then(function(response){
          if(response.data.code == "SUCCESS"){
                // setTimeout(() => {
                    _this.$message({
                      message:'发货成功',
                      type:'SUCCESS'
                    })
                    _this.$router.push({path:'/refund_detail?orderGoodId='+_this.orderSubsId})
                // }, 1000); 
          }
      })
      .catch(function(error){

      })  
    }            
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h5{
  font-weight:normal;
}
.refund-row .refund-col:first-child{
  padding-right:15px;
}
.left-col{
  background:#fff;
  padding:20px 15px;
}
.refund-row .refund-col:last-child{
  background:#fff;
  padding:20px 15px;
}
.refund-title{
  font-size:24px;
  padding-top:30px;
  text-align:center;
}
.refund-header{
  padding-bottom:20px;
  border-bottom:1px solid #e0e6eb;
}
.step-title{
  margin-top:30px;
  padding:10px;
  background:#fff;
  border:1px solid #e0e6eb;
}
.step-con{
  border:1px solid #e0e6eb;
  border-top:0;
  background:#f6f6f6;
  /* height:230px; */
  padding:15px 30px;
}
.step-ul li{
    position: relative;
    min-height: 100px;
    border-left: 2px solid #e5e5e5;
    padding-top:2px;
}
.step-ul li::before{
    position: absolute;
    top: 0;
    left: -9px;
    width: 10px;
    height: 10px;
    content: " ";
    border-radius: 50%;
    background: #e5e5e5;
    border:4px solid #fff;
}
.step-ul li.active::before{
    background: #4380eb;
}
.step-ul li .time{
    margin: 0 20px;
}
.step-ul li dl>dd{
  padding-bottom:10px;
}
.el-icon-circle-check{
  color:#67c23a;
}
.order-img{
  width:52px;
  min-width:52px;
  height:52px;
  border-radius:50%;
  overflow:hidden;
  margin-right:12px;
}
.order-img img{
  display:block;
  max-height:100%;
  margin:0 auto;
}
.order-ul{
  /* padding:20px 0; */
}
.order-ul li{
  padding:10px 0;
}
.order-ul li>span{
  display:block;
  width:66px;
  min-width:66px;
  color:#999;
}
.order-ul li.bborder{
    border-bottom:1px solid #e0e6eb;
}
.text-word{
  white-space: normal;
  word-wrap: break-word;
  word-break: break-all;
  line-height:26px;
  text-align:left;
}
</style>
  
