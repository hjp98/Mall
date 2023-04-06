<script setup lang="ts">
import { ref } from 'vue'
import Information from './components/Information.vue'
import Market from './components/market.vue'
import Attribute from './components/attribute.vue'
import Relevance from './components/relevance.vue'

let active = ref(0) //控制步骤条

const data: any = ref([]) //保存子组件传过来的值

//下一步
const next = function (val: any) {
  if (active.value < 4) {
    active.value++
    data.value.push(val)
    // console.log(data);
  }
}
//上一步
const back = function () {
  if (active.value > 0) {
    active.value--
  }
}
//完成
const finish = function (val: any) {
  ElMessageBox.confirm('是否要提交该产品?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: 'Delete completed'
      })
      data.value.push(val)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}
</script>

<template>
  <div>
    <div class="box">
      <div class="box1">
        <el-steps :active="active" finish-status="success" :align-center="true">
          <el-step title="填写商品信息" />
          <el-step title="填写商品促销" />
          <el-step title="填写商品属性" />
          <el-step title="选择商品关联" />
        </el-steps>
      </div>
      <div class="box2">
        <Information v-show="active === 0"  @next="next"/>
        <Market  v-show="active === 1" @next="next" @back="back"/>
        <Attribute v-show="active === 2" @next="next" @back="back"/>
        <Relevance v-show="active === 3" @next="next" @finish="finish" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.box {
  margin: 40px auto;
  padding: 35px 35px 15px;
  border: 1px solid #ebeef5;
  font-size: 16px;
  color: #606266;
  width: 800px;
  .box1 {
    width: 688px;
    margin: 0 auto;
  }
  .box2 {
    margin-left: 60px;
    margin-top: 50px;
  }
}
</style>
