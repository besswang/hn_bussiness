<template>
  <div class="step2">
    <p class="text-center">提示：验证金额打入账户中</p>
  </div>
</template>


<script>
export default {
  name: 'step2',
  data () {
      return {

      }
  },
  created () {
      this.$store.state.adminleftnavnum="/bank_step/step1"; //设置左侧导航active
  }, 
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
  
