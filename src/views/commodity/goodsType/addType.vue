<script setup lang="ts">
import { getfoodsType, getwithAttr } from '@/until/api'
import type { FormInstance, FormRules } from 'element-plus'
const _form = {
  name: '',
  type: '无上级分类',
  productUnit: '',
  sort: 0,
  showStatus: '0',
  navStatus: '0',
  icon: '',
  keywords: '',
  description: ''
}
let form = reactive(_form)
const list: any = ref([{ value: '' }]) //筛选属性
const options: any = ref([{ label: '无上级分类', value: 0 }])
const optionsList: any = ref([])

const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  name: [{ required: true, message: '请输入品牌名称', trigger: 'blur' }]
})

const getData = function () {
  getfoodsType(0, { pageNum: 1, pageSize: 100 }).then((res: any) => {
    res.data.data.list.map((item: any) => {
      options.value.push({ label: item.name, value: item.id })
    })
  })
}
getData()
const getList = function () {
  getwithAttr().then((res) => {
    let list = res.data.data
    for (let i = 0; i < list.length; i++) {
      let children = []
      if (list[i].productAttributeList != null && list[i].productAttributeList.length > 0) {
        for (let j = 0; j < list[i].productAttributeList.length; j++) {
          children.push({
            label: list[i].productAttributeList[j].name,
            value: list[i].productAttributeList[j].id
          })
        }
      }
      optionsList.value.push({ label: list[i].name, value: list[i].id, children: children })
    }
  })
}
getList()

const handleChange = (values: any) => {
  // console.log(values)
}

const add = function () {
  if (list.value.length < 3) {
    list.value.push({
      value: ''
    })
  } else {
    ElMessage({
      message: '最多只能添加三条',
      type: 'warning',
      duration: 1000
    })
  }
}

const del = function (index: any) {
  console.log(index,list.value.length)
  if (list.value.length === 1) {
    list.value.pop()
    list.value.push({
      value: ''
    })
    ElMessage({
      message: '最少要留一条',
      type: 'warning',
      duration: 1000
    })
  } else {
    list.value.splice(index, 1)
    // console.log(list.value)
  }
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
  <div class="boxs">
    <el-card class="box-card">
      <el-form :model="form" :rules="rules" ref="ruleFormRef" label-width="160px">
        <el-form-item label="分类名称：" prop="name">
          <el-input v-model="form.name" width="700" size="large" />
        </el-form-item>
        <el-form-item label="上级分类：" prop="type">
          <el-select
            v-model="form.type"
            :collapse-tags="true"
            :collapse-tags-tooltip="true"
            placeholder="无上级分类"
            size="large"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="数量单位：" prop="productUnit">
          <el-input v-model="form.productUnit" width="700" size="large" />
        </el-form-item>
        <el-form-item label="排序：" prop="sort">
          <el-input v-model="form.sort" width="700" size="large" />
        </el-form-item>
        <el-form-item label="是否显示：" prop="showStatus">
          <el-radio-group v-model="form.showStatus">
            <el-radio label="1" size="large">是</el-radio>
            <el-radio label="0" size="large">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否显示在导航栏：" prop="navStatus">
          <el-radio-group v-model="form.navStatus">
            <el-radio label="1" size="large">是</el-radio>
            <el-radio label="0" size="large">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="分类图标：" prop="icon">
          <el-upload v-model="form.icon" multiple :limit="3">
            <el-button type="primary">点击上传</el-button>
            <template #tip>
              <div style="margin-top: 20px">只能上传jpg/png文件，且不超过10MB</div>
            </template>
          </el-upload>
        </el-form-item>
        <el-form-item
          :label="index == 0 ? '筛选属性：' : ''"
          v-for="(item, index) in list"
          :key="item"
          prop="list"
        >
          <el-cascader size="large" @change="handleChange" :options="optionsList" />
          <div
            style="
              margin-left: 20px;
              margin-left: 20px;
              width: 70px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              border: 1px solid #dcdfe6;
              border-radius: 5px;
            "
            @click.prevent="del(index)"
          >
            <span>删除</span>
          </div>
        </el-form-item>
        <el-form-item>
          <div
            style="
              width: 54px;
              height: 30px;
              line-height: 30px;
              text-align: center;
              border: 1px solid #409eff;
              background-color: #409eff;
              color: #ffffff;
              border-radius: 5px;
            "
            @click="add()"
          >
            <span>新增</span>
          </div>
        </el-form-item>
        <el-form-item label="关键词：" prop="keywords">
          <el-input v-model="form.keywords" width="700" size="large" />
        </el-form-item>
        <el-form-item label="分类描述：" prop="description">
          <el-input v-model="form.description" width="700" size="large" />
        </el-form-item>
        <el-form-item>
          <div style="display: flex; justify-content: space-between; align-items: center">
            <div
              style="
                width: 70px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                border: 1px solid #409eff;
                background-color: #409eff;
                color: #ffffff;
                border-radius: 5px;
              "
            >
              <span>提交</span>
            </div>
            <div
              style="
                width: 70px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                border: 1px solid #dcdfe6;
                border-radius: 5px;
                margin-left: 20px;
              "
              @click="resetForm(ruleFormRef)"
            >
              <span>重置</span>
            </div>
          </div>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style lang="scss">
.boxs {
  margin-top: 40px;
  margin-left: 235px;
  margin-right: 30px;
  padding: 20px 0;
  font-size: 16px;
  color: #303133;
  .box-card {
    width: 960px;
    margin: 0 auto;
    padding: 20px;
  }
}
</style>
