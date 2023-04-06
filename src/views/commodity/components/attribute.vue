<script setup lang="ts">
import { attrType, attrList } from '@/until/api'
const emit = defineEmits(['next', 'back'])

const ruleForm = reactive({
  type: '',
  color: '',
  size: [],
  goodsId: '',
  list: []
})
const typeList = reactive<any>([])
const specsList: any = ref([]) //商品规格
const parameterList: any = ref([]) //商品参数

const getType = function () {
  attrType({ pageNum: 1, pageSize: 100 }).then((res) => {
    let list = res.data.data.list
    list.forEach((item: any) => {
      typeList.push({ label: item.name, value: item.id })
    })
  })
}
getType()

const selectValue = function (val: any) {
  if (val === undefined || val == null || val === 0) {
    return
  } else {
    getspecsList(0, val)
    getspecsList(1, val)
  }
}

const getspecsList = function (type: any, val: any) {
  let params = { pageNum: 1, pageSize: 100, type: type }
  if (type === 0) {
    attrList(val, params).then((res) => {
      specsList.value = res.data.data.list
      console.log(specsList.value)
    })
  } else {
    attrList(val, params).then((res) => {
      parameterList.value = res.data.data.list
      console.log(parameterList.value)
    })
  }
}
//处理inputList
const fliter = function (val: any) {
  return val.split(',')
}
const confirm = function () {
  emit('next', ruleForm)
}
const cancel = function () {
  emit('back', ruleForm)
}
</script>

<template>
  <div>
    <el-form :model="ruleForm" label-width="120" label-position="right" class="demo-ruleForm">
      <el-form-item prop="type" label="属性类型：">
        <el-select v-model="ruleForm.type" @change="selectValue" placeholder="请选择属性类型">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品规格：">
        <el-card body-style="background: #f8f9fc;width: 600px;" shadow="never">
          <template v-for="(item, index) in specsList" :key="index">
            <div style="width: 100%">
              <div>{{ item.name }}：</div>
              <el-input
                v-if="item.handAddStatus === 1"
                v-model="ruleForm.color"
                input-style="width: 200px;height: 30px;"
              />
              <span
                v-if="item.handAddStatus === 1"
                style="
                  margin-left: 50px;
                  border: 1px solid #dcdfe6;
                  font-size: 12px;
                  border-radius: 3px;
                  padding: 6px 15px;
                "
                >增加</span
              >
              <el-checkbox-group v-if="item.handAddStatus === 0">
                <el-checkbox :label="items" v-for="items in fliter(item.inputList)" :key="items" />
              </el-checkbox-group>
            </div>
          </template>
        </el-card>
      </el-form-item>
      <el-form-item label="商品参数：">
        <el-card body-style="background: #f8f9fc;width: 600px;" shadow="never">
          <template v-for="(item, index) in parameterList" :key="index">
            <div style="width: 100%; margin-bottom: 10px">
              <div
                style="display: inline-block; width: 100px; text-align: right; padding-right: 10px"
              >
                {{ item.name }}：
              </div>
              <el-select
                v-model="ruleForm.list"
                v-if="item.inputType === 1"
                placeholder="请选择属性类型"
              >
                <el-option
                  v-for="items in fliter(item.inputList)"
                  :key="items"
                  :label="items"
                  :value="items"
                >
                </el-option>
              </el-select>
              <el-input
                v-else
                v-model="ruleForm.goodsId"
                input-style="width: 200px;height: 30px;"
              ></el-input>
            </div>
          </template>
        </el-card>
      </el-form-item>
    </el-form>
    <div class="btn_box">
      <div class="back_btn" @click="cancel">上一步，填写商品促销</div>
      <div class="next_btn" @click="confirm">下一步，填写商品关联</div>
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
