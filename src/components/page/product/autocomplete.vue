<template>
    <div class="autocomplete">
        <div class="input-con">
            <el-input 
            placeholder="请输入商品类别" 
            v-model="searchText"
            >
                <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
        </div>
        <section class="list-con">
            <ul class="list-ul flex flex-c">
                <li><a href="#">2233</a></li>
                <li><a href="#">看看</a></li>
            </ul>
        </section>
        <!-- <input type="text"  
                        :id="id"  
                        :name="name"  
                        :placeholder="placeholder"  
                        v-model="inputmodel"  
                        @input="input(inputmodel)"  
                        @blur="hideAll"  
                        @keydown="keydown"  
                        @focus="focus" />  
    
        <div class="autocomplete transition autocomplete-{{ name }}" id="autocomplete-{{ name }}" v-show="showList">  
            <ul>  
                <li v-for="data in json"
                    :key="data"   
                    transition="showAll"  
                    :class="activeClass($index)">  
                    <a href="#"  
                        @click.prevent="$emit('selectList',data)"  
                        @mousemove="mousemove($index)">  
                        <b>{{ data[anchor] }}</b>  
                    </a>  
                </li>  
            </ul>  
        </div>   -->
    </div>
</template>

<script>
import { Button,Input,} from 'element-ui'
export default {
    name: 'autocomplete',
    components: {
        'el-button':Button,
        'el-input':Input
    },
    data () {
        return {
          searchText:''  
        }
    }
}
</script>

<style scoped>
.autocomplete{
    background:#fff;
}
.input-con{
    width:300px;
    margin:0 auto;
    padding-top:15px;
}   
.list-con{
    width:300px;
    margin:0 auto;
    position: relative;
}
.list-con .list-ul{
    padding:10px 0;
    width:300px;
    position: absolute;
    left:0;
    top:0;
    z-index:10;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.list-con .list-ul>li>a{
    width:calc(100% - 30px);
    display:inline-block;
    padding:10px 15px;
}
.list-con .list-ul>li>a:hover{
    background:#4aa6ec;
    color:#fff;
}
</style>
