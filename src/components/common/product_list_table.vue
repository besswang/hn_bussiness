<template>
  <div class="list">
    <div class="table-con">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
            v-for="(column,index) in columns"
            :fixed="column.fixed"
            :prop="column.value"
            :label="column.label"
            :key="index"
            :width="column.width"
            :sortable="column.sortable"
            :formatter="column.formatter"
            :class-name="column.className">
            <template slot-scope="scope">
                <img v-show="index==0" :src="scope.row.imgsrc" alt="">
            </template>
        </el-table-column>
        <el-table-column
          prop="opre"
          label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini">关联分类</el-button>
            <el-button type="text" size="mini">编辑</el-button>
            <el-button type="text" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>


<script>
import { Row,Col,Dialog,Button,Breadcrumb,BreadcrumbItem,DatePicker,Form,FormItem,
Input,Tabs,TabPane,Table,TableColumn,MessageBox,Message,Tree} from 'element-ui'
export default {
  name: 'issue',
  components: {
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

    }
  },
  props:{
    tableData:Array,//表格数组
    columns:Array,//表格列配置数据[{vlaue:对应数据对象中的属性，label：对应的是标题文字，className：对应的是列的样式类名}]
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table-con{
  background:#fff;
  padding:0 15px;
}
</style>
  
