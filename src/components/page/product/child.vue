<template>
    <el-table
        :data="data"
        border
        style="width: 100%"
        :row-style="showTr">
        <el-table-column v-for="(column, index) in columns" :key="column.dataIndex"
                         :width="column.width"
                         :label="column.text">
            <template slot-scope="scope" v-if="spaceIconShow(index)">
                <span v-for="(space, levelIndex) in scope.row._level" class="ms-tree-space" :key="levelIndex"></span>
                <button  :style="{marginLeft:scope.row._level?childMargin(scope.row._level):'0'}" class="button is-outlined is-primary is-small" v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)">
                    <i v-if="!scope.row._expanded" class="el-icon-plus" aria-hidden="true"></i>
                    <i v-if="scope.row._expanded" class="el-icon-minus"  aria-hidden="true"></i>
                </button>
                <span v-else-if="index===0" class="ms-tree-space"></span>
                <div :style="{color:scope.row[column.dataIndex]===0?'red':''}">{{scope.row[column.dataIndex] | isVisitTo}}</div>


            </template>
        </el-table-column>
        <el-table-column label="操作" v-if="treeType === 'normal'">
            <template slot-scope="scope">
                <router-link :to="{name:'cat_edit',query: {id: scope.row.id}}" >编辑</router-link>
                <!--<a @click="routerLink(scope.row)">编辑</a>-->
            </template>
        </el-table-column>
    </el-table>
</template>

<script>

    function DataTransfer (data) {

        if (!(this instanceof DataTransfer)) {
            return new DataTransfer(data, null, null)
        }
    }
    DataTransfer.treeToArray = function (data, parent, level, expandedAll) {
        // console.log(11)
        let tmp = [];
        Array.from(data).forEach(function (record) {
            if (record._expanded === undefined) {
                Vue.set(record, '_expanded', expandedAll)
            }
            if (parent) {
                Vue.set(record, '_parent', parent)
            }else {
                Vue.set(record, '_parent', {
                    pd:'0,0'
                })
            }
            let _level = 0;
            if (level !== undefined && level !== null) {
                _level = level + 1
            }
            Vue.set(record, '_level', _level);
            vm.$set(record, 'pd',`${record.id},${record.dpath}`);
            vm.$set(record,'parent_pd',`${record.parentId},${record.dpath-1}`);
            tmp.push(record);
            if (record.children && record.children.length > 0 ) {
                let children = DataTransfer.treeToArray(record.children, record, _level, expandedAll);
                tmp = tmp.concat(children)
            }
        });
        return tmp
    };
    import Vue from 'vue'
    import {Table,TableColumn } from 'element-ui'
    export default {
        name:'child',
        components:{
            'el-table':Table,
            'el-table-column':TableColumn
        },
        props: {
            // 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
            treeStructure: {
                type: Boolean,
                default: function () {
                    return false
                }
            },
            // 这是相应的字段展示
            columns: {
                type: Array,
                default: function () {
                    return []
                }
            },
            // 这是数据源
            dataSource: {
                type: Array,
                default: function () {
                    return []
                }
            },
            // 这个作用是根据自己需求来的，比如在操作中涉及相关按钮编辑，删除等，需要向服务端发送请求，则可以把url传过来
            requestUrl: {
                type: String,
                default: function () {
                    return ''
                }
            },
            // 这个是是否展示操作列
            treeType: {
                type: String,
                default: function () {
                    return 'normal'
                }
            },
            // 是否默认展开所有树
            defaultExpandAll: {
                type: Boolean,
                default: function () {
                    return false
                }
            },
            // loading :{
            //     type: Boolean,
            //     default:function () {
            //         return false
            //     }
            // }
        },
        data () {
            return {

            }
        },
        updated(){



        },

        filters: {
            isVisitTo: function (value) {
                switch (value){
                    case 0:
                        return '否';
                        break;
                    case 1:
                        return '是';
                        break;
                    default :
                        return value
                }
            },

        },

        computed: {
            // 格式化数据源
            data:function () {
                let me = this;
                if (me.treeStructure) {
                    let data = DataTransfer.treeToArray(me.dataSource, null, null, me.defaultExpandAll);
                    console.log(data)
                    // data.map(item=>{
                    //     item['isShow']=item.isShow===1?"是":'否';
                    //     item['indexIsShow']=item.indexIsShow===1?"是":'否';
                    //     return item
                    // })
                    return data
                }
                return me.dataSource
            },

        },
        methods: {

            // ...vm.$mapActions("goodsManagement",{
            //     goodsSelectList:'goodsSelectList',
            // }),

            // 显示行
            showTr: function ({row, index}) {
                let show = (row._parent && row._parent.pd!=='0,0' ? (row._parent._expanded && row._parent._show) : true);
                row._show = show;
                return show ? '' : 'display:none;'
            },

            childMargin: function (index) {
                return index*20+'px'
            },

            // 展开下级
            toggle: function (trIndex) {
                let me = this;
                let record = me.data[trIndex];
                record._expanded = !record._expanded
            },
            // 显示层级关系的空格和图标
            spaceIconShow (index) {
                let me = this;
                if (me.treeStructure && index === 0) {
                    return true
                }
                return false
            },
            // 点击展开和关闭的时候，图标的切换
            toggleIconShow (index, record) {
                let me = this;
                if (me.treeStructure && index === 0 && record.children && record.children.length > 0) {
                    return true
                }
                return false
            },
        }
    }
</script>

<style scoped>

</style>
