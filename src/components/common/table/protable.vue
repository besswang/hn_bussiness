<template>
  <div class="el-table">
    <div class="el-table__header-wrapper"></div>
    <table-header></table-header>

    <!-- <div>
      <table-body></table-body>
      <div :style="{ width: bodyWidth }" class="el-table__empty-block" v-if="!data || data.length === 0">
        <span class="el-table__empty-text"><slot name="empty"></slot></span>
      </div>
      <div class="el-table__append-wrapper" ref="appendWrapper" v-if="$slots.append">
        <slot name="append"></slot>
      </div>
    </div> -->
    <div>{{message}}</div>
  </div>
</template>

<script type="text/babel">
 import TableHeader from './table-header';
 export default{
    props:['message'],
    components: {
      TableHeader
    }
 }
</script>