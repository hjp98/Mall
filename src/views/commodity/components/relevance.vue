<script setup lang="ts">
import { getRelevance, getRelevanceList } from '@/until/api'
const emit = defineEmits(['back', 'finish'])

const ruleForm = reactive({
  list1: [],
  list2: []
})
const list1: any = ref([]) //关联专题
const list2: any = ref([]) //关联优选

const confirm = function () {
  emit('finish', ruleForm)
}
const cancel = function () {
  emit('back', ruleForm)
}
getRelevance().then((res) => {
  let arr = res.data.data
  arr.forEach((item: any) => {
    list1.value.push({ label: item.title, key: item.id })
  })
})
getRelevanceList().then((res) => {
  let arr = res.data.data
  arr.forEach((item: any) => {
    list2.value.push({ label: item.name, key: item.id })
  })
})
// const filterMethod = (query: any, item: any) => {
//   return item.initial.toLowerCase().includes(query.toLowerCase())
// }
</script>

<template>
  <div>
    <el-form :model="ruleForm" label-width="120" label-position="right" class="demo-ruleForm">
      <el-form-item label="关联专题：">
        <el-transfer
          v-model="ruleForm.list1"
          :data="list1"
          filterable
          filter-placeholder="请输入专题名称"
        />
      </el-form-item>
      <el-form-item label="关联优选：">
        <el-transfer
          v-model="ruleForm.list2"
          :data="list2"
          filterable
          filter-placeholder="请输入优选名称"
        />
      </el-form-item>
    </el-form>
    <div class="btn_box">
      <div class="back_btn" @click="cancel">上一步，填写商品属性</div>
      <div class="next_btn" @click="confirm">完成，提交商品</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.btn_box {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 50px;
  .back_btn {
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 4px;
    width: 160px;
    height: 14px;
    line-height: 14px;
    text-align: center;
    border: 1px solid #dcdfe6;
  }
  .next_btn {
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 4px;
    color: #fff;
    background-color: #409eff;
    border-color: #409eff;
    width: 160px;
    height: 14px;
    line-height: 14px;
    text-align: center;
  }
}
</style>
