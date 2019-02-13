<template>
  <div class="list1">
    <div class="table-con">
      <table class="table">
        <thead>
          <tr>
            <th :width="i==0?300:100" v-for="(title,i) in columns" :key="i">{{title}}</th>
          </tr>
        </thead>
      </table>
    </div>
    <div v-for="(item,key) in listData" :key="key" class="tableData3">
      <el-row class="list-header">
        <el-col :span="14"><p class="list-col">订单编号：{{item.orderNumber}}</p></el-col>
        <el-col :span="6"><p class="list-col">创建时间：{{item.addTime}}</p></el-col>
        <el-col :span="4">
          <!-- <el-button type="primary" size="mini" style="margin-left:80px;" @click.prevent="goDetail(item.id)">查看订单</el-button> -->
        </el-col>
      </el-row>
      <table class="listtable">
        <tbody>
          <tr v-for="(list,index) in item.orderGoodsList" :key="index">
            <td width="300">
              <div class="flex flex-row flex-align-center pro-info">
                <img :src="list.goodsImage" alt="" width=60 height=60>
                <div style="display:block;width:100%;">
                  <el-button
                  style="white-space:normal;word-warp:break-word;word-break:break-all;line-height:26px"
                  type="text"
                  @click="detail(list.goodsId)">{{list.goodsName}}</el-button>
                  <!-- <p size="mini">{{statusFn(list.status)}}</p> -->
                </div>
                <!-- <p class="proname">{{list.proname}}</p> -->
              </div>
            </td>
            <td width="100" v-text="list.price"></td>
            <td width="100" v-text="list.goodsNum"></td>
            <td width="100">
              {{statusFn(list.status)}}
              <el-button v-show="list.status==3" type="text" @click="refundInfo(list.id,item.orderState,item.orderGoodsList)">请卖家处理</el-button>
              <el-button v-show="list.status==4" type="text" @click="refundInfo(list.id,null,null)">退款成功</el-button>
              <el-button v-show="list.status==5" type="text" @click="refundInfo(list.id,null,null)">已退款</el-button>
            </td>
            <td width="100" v-text="item.buyerName" :rowspan="item.orderGoodsList.length" v-if="index==0"></td>
            <td width="100" v-text="item.paymentName" :rowspan="item.orderGoodsList.length" v-if="index==0"></td>
            <td width="100" v-text="item.orderAmount" :rowspan="item.orderGoodsList.length" v-if="index==0"></td>
            <td width="100" :rowspan="item.orderGoodsList.length" v-if="index==0">
              <p v-if="item.tradeStatus==-10">交易取消</p>
              <p v-else-if="item.tradeStatus==20&&item.orderState!=-1&&item.orderState!=1&&list.status!=3&&list.status!=1">交易完成</p>
              <!-- 交易状态：tradeStatus{10:默认,20:交易完成,-10:交易取消} -->
              <!-- 订单状态:item.orderState{-1:待发货;1:已发货;2:已收货;'} -->
              <!-- 付款状态:{10(默认):未付款;20:已付款;-10:取消;} -->
              <!-- 状态:list.status{0-无状态 2-已收货 3-退款中 4-退款完成5-确认打款'} -->
              <div v-else>
                      <!-- <p>{{orderStateFn(item.orderState)}} {{payState(item.payState)}}</p> -->
                      <el-button v-show="item.orderState==-1&&item.payState!=-10&&item.payState!=10" type="primary" size="mini" style="margin-top:15px;"
                      @click.prevent="send(item.id,item.updateTime,item.orderGoodsList)">发货</el-button>
              </div>
              <!-- <p>{{orderStateFn(item.orderState)}} {{payState(item.payState)}}</p> -->
              <!-- <el-button v-show="item.orderState==-1&&item.payState!=-10?true:false" type="primary" size="mini" style="margin-top:15px;" @click.prevent="send(item.id,item.updateTime,item.orderGoodsList)">发货</el-button> -->
              <el-button style="margin:0 auto" type="text" @click.prevent="goDetail(item.id)">订单详情</el-button>
              <el-button style="margin:0 auto;padding-top:0" type="text"
              v-if="item.tradeStatus!=-10&&item.orderState!=-1"
              @click.prevent="logistics(item.kuaidiId,item.shippingCode,item.kuaidiName)">物流详情</el-button>
            </td>
          </tr>
        </tbody>
      </table>
      <p class="leave-message text-left"><span>留言：{{item.orderMessage}}</span></p>
    </div>

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
        <el-button type="primary" @click="sendOk('form')" :disabled="sendDisabled">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 如果订单中有退货中的商品，需要弹出提示 -->
    <el-dialog :visible.sync="refundSendVis">
      <p>本订单中的部分宝贝，买家已经提交退款申请，进行发货操作将撤销订单中所有退款，是否继续</p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="refundSendVis=false">取 消</el-button>
        <el-button type="primary" @click="kuaidisListFn()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>


<script>
import { Row,Col,Button,Form,FormItem,Input,Select,Option,Dialog} from 'element-ui'
export default {
  name: 'list1',
  props:{
    listData:Array,
    columns:Array
  },
  components: {
    'el-row':Row,
    'el-col':Col,
    'el-button':Button,
    'el-form':Form,
    'el-form-item':FormItem,
    'el-input':Input,
    'el-select':Select,
    'el-option':Option,
    'el-dialog':Dialog
  },
  data () {
    return {
      orderGoodsIds:[],//每个订单下商品id集合
      refundSendVis:false,//订单中有退款的发货弹窗
      sendDisabled:false,//弹窗确定按钮禁用
        updateTime:'',//上次更新时间
        kuaidisList:[],
        sendFormVisible:false,//发货弹窗开关
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
        sendid:'',//发货id
    }
  },
  created () {
       this.$store.state.adminleftnavnum="/order_list"; //设置左侧导航active
  },
  mounted(){

  },
  methods: {
    //物流详情
    logistics(id,postId,kuaidiName){
      this.$router.push({path:'/logistics_detail',query:{id:id,postId:postId,kuaidiName:kuaidiName}})
    },
    statusFn(val){
      switch (val) {
          case 3://请卖家处理
              return ""
              break;
          case 0:
              return ""
              break;
          case 2:
              return "已收货"
              break
          case 4://退款成功
              return ""
              break
      }
    },
    formstocksF(){
      this.sendDisabled = false;
    },
    //发货状态：-1:待发货;1:已发货;2:已收货;
    orderStateFn(flag){
        if(flag == -1){
          return ""//显示发货按钮
        }else if(flag == 1){
          return "已发货"
        }else{
          return "已收货"
        }
    },
    //付款状态：10(默认):未付款;20:已付款;-10:取消;
    payState(flag){
      if(flag == 10){
        return "未付款"//显示付款按钮
      }else if(flag == 20){
        return "已付款"
      }else if(flag == -10){
        return "已取消"
      }
    },
    //商品页面
    detail(id){
      window.open(process.env.businessHost.host+'/'+process.env.businessHost.projectName+'/#/goods_detail?id='+id)
    },
    //查看订单
    goDetail(itemid){
      this.$router.push({path: '/order_detail', query: {id: itemid}});
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
    send(listid,time,item){
      this.orderGoodsIds = []
      this.sendid = listid;
      this.updateTime = time
      item.forEach(el =>{
        if(el.status!=4 && el.status!=5){
          this.orderGoodsIds.push(el.id)
        }
      })
      let obj={}
      obj = item.find((el) => {
        return el.status == 3
      })
      // Object.keys(obj).length==0
      if(!obj || obj==null){//状态为3的对象是空的
        this.kuaidisListFn()
      }else{
        this.refundSendVis = true
      }
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
      .catch(function(error){

      })

    },
    //发货-确定
    sendOk(formName){
      this.sendDisabled = true
      let _this = this
      let orderGoodsIds = this.orderGoodsIds.join(",")
      console.log(orderGoodsIds)
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let kuaidi= this.kuaidisList.filter(item => item.name == this.form.currentExpress)
          let trans = {
              orderSubsId:this.sendid,
              orderState:1,
              updateTime:this.updateTime,
              kuaidiId:kuaidi[0].id,
              shippingCode:this.form.name,
              orderGoodsIds:orderGoodsIds
          }
          console.log(trans)
          //调快递单号接口
          this.$axios.post(this.$$jk.merchantGetDataByid,{id:kuaidi[0].id,postId:this.form.name})
          .then(function(response){
              if(response.data.code == "SUCCESS"){
                  let r = JSON.parse(response.data.data)
                  console.log(r.message)
                  if(r.message == "ok"){
                    _this.sendFormVisible = false;
                    _this.refundSendVis = false;
                    _this.$emit("send-ok",trans)
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
    //退款详情，退款处理
    refundInfo(id,orderState,item){
      let _this = this
      if(orderState==-1){
        this.orderGoodsIds = []
        item.forEach(el =>{
          this.orderGoodsIds.push(el.id)
        })
        let orderGoodsIds = this.orderGoodsIds.join(",")
        this.$router.push({
          path: '/refund_detail',
          query: {
            orderGoodId:id,
            orderGoodsIds:orderGoodsIds
          }
        })
      }else{
        this.$router.push({
          path: '/refund_detail',
          query: {
            orderGoodId:id
          }
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-con{
  background:#fff;
  padding:0 15px;
}
.leave-message{
  padding:12px;
  border:1px solid #dbeeff;
  border-top:none;
}
.leave-message>span{
  color:#ff4545;
}
.order-num{
  padding-bottom:10px;
}
.table-con{
  padding:0 15px;
}
.table,.listtable{
    width: 100%;
    max-width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
    text-align:center;
}
.table>thead>tr>th{
  padding:12px 0;
  background:#f9f9f9;
}
.tableData3{
  background:#fff;
  padding:15px;
}
.proname{
  padding-left:12px;
}
/* .el-table__fixed-header-wrapper {
    display:none;
} */
.list-header{
  padding:10px 12px;
  background:#f2f9ff;
  border:1px solid #dbeeff;
  border-bottom:0;
}
.list-header .list-col{
  line-height:30px;
}
.tableData3 .listtable>tbody>tr>td{
    border:1px solid #dbeeff;
}
.tableData3 .listtable:nth-child(odd)>tbody>tr>td{
  border-top:0;
}
.pro-info{
  padding:12px;
}
.pro-info>img{
  height:50px;
  max-width:50px;
}
</style>
<style lang="less">
// .el-loading-parent--relative{
//   .el-loading-mask{
//     .el-loading-spinner{
//       top:10%;
//     }
//   }
// }
</style>

