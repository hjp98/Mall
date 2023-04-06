<script setup lang="ts">
import { getBrand, getOptions } from '@/until/api'
import type { FormInstance, FormRules } from 'element-plus'

const emit = defineEmits(['next'])

const ruleForm = reactive({
  type: '',
  name: '',
  title: '',
  brand: '',
  text: '',
  articleNumber: '',
  price: 0,
  marketPrice: 0,
  stock: 0,
  unit: '',
  weight: 0,
  sort: 0
})
let brandList: any = ref([]) //保存品牌列表
let options: any = ref([]) //保存商品种类

const ruleFormRef = ref<FormInstance>()

const rules = reactive<FormRules>({
  type: [{ required: true, message: '请选择商品分类', trigger: 'blur' }],
  name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
  title: [{ required: true, message: '请输入副标题', trigger: 'blur' }],
  brand: [{ required: true, message: '请选择商品品牌', trigger: 'blur' }]
})

//获取商品种类选择
getOptions('').then((res) => {
  let list = res.data.data
  for (let i = 0; i < list.length; i++) {
    let children = []
    if (list[i].children != null && list[i].children.length > 0) {
      for (let j = 0; j < list[i].children.length; j++) {
        children.push({ label: list[i].children[j].name, value: list[i].children[j].id })
      }
    }
    options.value.push({ label: list[i].name, value: list[i].id, children: children })
  }
})
//获取品牌数组
getBrand({ pageNum: 1, pageSize: 100 }).then((res) => {
  let arr = res.data.data.list
  arr.map((item: any) => {
    brandList.value.push({ label: item.name, value: item.id })
  })
})

const confirm = function (ruleFormRef: FormInstance | undefined) {
  if (!ruleFormRef) return
  ruleFormRef.validate((valid: any) => {
    if (valid) {
      console.log('submit!')
      emit('next',ruleForm)
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>

<template>
  <div>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120"
      label-position="right"
      class="demo-ruleForm"
    >
      <el-form-item prop="type" label="商品分类：">
        <el-cascader v-model="ruleForm.type" :options="options" placeholder="请选择" />
      </el-form-item>
      <el-form-item prop="name" label="商品名称：">
        <el-input v-model="ruleForm.name" input-style="width: 480px;height: 30px;" />
      </el-form-item>
      <el-form-item prop="title" label="副标题：">
        <el-input v-model="ruleForm.title" input-style="width: 480px;height: 30px;" />
      </el-form-item>
      <el-form-item prop="brand" label="商品品牌：">
        <el-select v-model="ruleForm.brand" placeholder="请选择品牌">
          <el-option
            v-for="item in brandList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="text" label="商品介绍：">
        <el-input
          v-model="ruleForm.text"
          type="textarea"
          placeholder="请输入内容"
          input-style="width: 480px;height: 50px;"
        />
      </el-form-item>
      <el-form-item prop="articleNumber" label="商品货号：">
        <el-input v-model="ruleForm.articleNumber" input-style="width: 480px;height: 30px;" />
      </el-form-item>
      <el-form-item prop="price" label="商品售价：">
        <el-input v-model="ruleForm.price" input-style="width: 480px;height: 30px;" />
      </el-form-item>
      <el-form-item prop="marketPrice" label="市场售价：">
        <el-input v-model="ruleForm.marketPrice" input-style="width: 480px;height: 30px;" />
      </el-form-item>
      <el-form-item prop="stock" label="库存：">
        <el-input v-model="ruleForm.stock" input-style="width: 480px;height: 30px;" />
      </el-form-item>
      <el-form-item prop="unit" label="计量单位：">
        <el-input v-model="ruleForm.unit" input-style="width: 480px;height: 30px;" />
      </el-form-item>
      <el-form-item prop="weight" label="商品重量：">
        <el-input v-model="ruleForm.unit" input-style="width: 300px;height: 30px;" />
        <span style="margin-left: 50px">克</span>
      </el-form-item>
      <el-form-item prop="sort" label="排序">
        <el-input v-model="ruleForm.sort" input-style="width: 480px;height: 30px;" />
      </el-form-item>
    </el-form>
    <div class="btn" @click="confirm(ruleFormRef)">下一步，填写商品促销</div>
  </div>
</template>

<style scoped lang="scss">
.btn {
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
  margin: 0 auto;
}
</style>
