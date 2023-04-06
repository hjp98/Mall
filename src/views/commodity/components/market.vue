<script setup lang="ts">
const emit = defineEmits(['next', 'back'])

const ruleForm = reactive({
  grade: 0, //积分
  leve: 0, //成长值
  limit: 0,
  herald: 0,
  online: 0,
  isNew: 0,
  isRecommend: 0,
  isReturn: false,
  isRefund: false,
  isFranking: false,
  title: '',
  text: '',
  keywords: '',
  remarks: '',
  startTime: '',
  endTime: '',
  promotionPrice: '',
  vip1: '',
  vip2: '',
  vip3: '',
  priceList: [{ amount: 0, discount: 0 }],
  reduction: [{ full: 0, del: 0 }]
})
let brandList: any = ref([]) //保存品牌列表
let options: any = ref([]) //保存商品种类

const radio = ref(0)

const addPrice = function () {
  if (ruleForm.priceList.length < 3) {
    ruleForm.priceList.push({
      amount: 0,
      discount: 0
    })
  } else {
    ElMessage({
      message: '最多只能添加三条',
      type: 'warning'
    })
  }
}
const delPrice = function (index: any) {
  if (ruleForm.priceList.length === 1) {
    ruleForm.priceList.pop()
    ruleForm.priceList.push({
      amount: 0,
      discount: 0
    })
  } else {
    ruleForm.priceList.splice(index, 1)
  }
}

const addReduction = function () {
  if (ruleForm.reduction.length < 3) {
    ruleForm.reduction.push({
      full: 0,
      del: 0
    })
  } else {
    ElMessage({
      message: '最多只能添加三条',
      type: 'warning'
    })
  }
}
const delReduction = function (index: any) {
  if (ruleForm.reduction.length === 1) {
    ruleForm.reduction.pop()
    ruleForm.reduction.push({
      full: 0,
      del: 0
    })
  } else {
    ruleForm.reduction.splice(index, 1)
  }
}

const confirm = function () {
  emit('next', ruleForm)
}
const cancel = function(){
  emit('back', ruleForm)
}
</script>

<template>
  <div>
    <el-form :model="ruleForm" label-width="120" label-position="right" class="demo-ruleForm">
      <el-form-item prop="grade" label="赠送积分:">
        <el-input v-model="ruleForm.grade" input-style="width: 480px;height: 30px;" />
      </el-form-item>
      <el-form-item prop="leve" label="赠送成长值：">
        <el-input v-model="ruleForm.leve" input-style="width: 480px;height: 30px;" />
      </el-form-item>
      <el-form-item prop="limit" label="积分购买限制：">
        <el-input v-model="ruleForm.limit" input-style="width: 480px;height: 30px;" />
      </el-form-item>
      <el-form-item prop="herald" label="预告商品：">
        <template #default="scope">
          <div>
            <el-switch :active-value="1" :inactive-value="0" v-model="ruleForm.herald" />
          </div>
        </template>
      </el-form-item>

      <el-form-item prop="online" label="商品上架：">
        <template #default="scope">
          <div>
            <el-switch :active-value="1" :inactive-value="0" v-model="ruleForm.online" />
          </div>
        </template>
      </el-form-item>
      <el-form-item prop="recommend" label="商品推荐：">
        <template #default="scope">
          <div>
            <span>新品：</span>
            <span>
              <el-switch :active-value="1" :inactive-value="0" v-model="ruleForm.isNew" />
            </span>
          </div>
          <div style="margin-left: 20px">
            <span>推荐：</span>
            <span>
              <el-switch :active-value="1" :inactive-value="0" v-model="ruleForm.isRecommend" />
            </span>
          </div>
        </template>
      </el-form-item>
      <el-form-item prop="guarantee" label="服务保障：">
        <template #default="scope">
          <el-checkbox v-model="ruleForm.isReturn" label="无忧退货" />
          <el-checkbox v-model="ruleForm.isRefund" label="快速退款" />
          <el-checkbox v-model="ruleForm.isFranking" label="免费包邮" />
        </template>
      </el-form-item>
      <el-form-item prop="title" label="详细页标题：">
        <el-input v-model="ruleForm.title" input-style="width: 480px;height: 30px;" />
      </el-form-item>
      <el-form-item prop="text" label="详细页描述：">
        <el-input v-model="ruleForm.text" input-style="width: 480px;height: 30px;" />
      </el-form-item>
      <el-form-item prop="keywords" label="商品关键字：">
        <el-input v-model="ruleForm.keywords" input-style="width: 480px;height: 30px;" />
      </el-form-item>
      <el-form-item prop="remarks" label="商品备注：">
        <el-input
          v-model="ruleForm.remarks"
          type="textarea"
          input-style="width: 500px;height: 50px;"
        />
      </el-form-item>
      <el-form-item label="选择优惠方式：">
        <el-radio-group v-model="radio">
          <el-radio-button :label="0">无优惠</el-radio-button>
          <el-radio-button :label="1">特惠促销</el-radio-button>
          <el-radio-button :label="2">会员价格</el-radio-button>
          <el-radio-button :label="3">阶梯价格</el-radio-button>
          <el-radio-button :label="4">满减价格</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="radio === 1">
        <template #default="scope">
          <div style="width: 100%; margin-bottom: 10px">
            <span>开始时间：</span>
            <el-date-picker
              v-model="ruleForm.startTime"
              type="datetime"
              placeholder="请选择开始时间"
            />
          </div>
          <div style="width: 100%; margin-bottom: 10px">
            <span>结束时间：</span>
            <el-date-picker
              v-model="ruleForm.endTime"
              type="datetime"
              placeholder="请选择开始时间"
            />
          </div>
          <div>
            <span>促销价格：</span>
            <el-input v-model="ruleForm.promotionPrice" input-style="width: 200px;height: 30px;" />
          </div>
        </template>
      </el-form-item>
      <el-form-item v-show="radio === 2">
        <div style="width: 100%; margin-bottom: 10px">
          <span>黄金会员：</span>
          <el-input v-model="ruleForm.vip1" input-style="width: 200px;height: 30px;" />
        </div>
        <div style="width: 100%; margin-bottom: 10px">
          <span>白金会员：</span>
          <el-input v-model="ruleForm.vip2" input-style="width: 200px;height: 30px;" />
        </div>
        <div>
          <span>钻石会员：</span>
          <el-input v-model="ruleForm.vip3" input-style="width: 200px;height: 30px;" />
        </div>
      </el-form-item>
      <el-form-item v-show="radio === 3">
        <el-table
          :data="ruleForm.priceList"
          style="width: 420px"
          :cell-style="{ textAlign: 'center' }"
          :header-cell-style="{ textAlign: 'center' }"
          :border="true"
        >
          <el-table-column prop="amount" label="数量" width="120">
            <template #default="scope">
              <el-input v-model="scope.row.amount" input-style="width: 50px;height: 30px;" />
            </template>
          </el-table-column>
          <el-table-column prop="discount" label="折扣" width="120">
            <template #default="scope">
              <el-input v-model="scope.row.discount" input-style="width: 50px;height: 30px;" />
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: space-around;
                  color: #409eff;
                "
              >
                <span @click="delPrice(scope.$index)">删除</span>
                <span @click="addPrice">添加</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item v-show="radio === 4">
        <el-table
          :data="ruleForm.reduction"
          style="width: 420px"
          :cell-style="{ textAlign: 'center' }"
          :header-cell-style="{ textAlign: 'center' }"
          :border="true"
        >
          <el-table-column prop="full" label="满" width="120">
            <template #default="scope">
              <el-input v-model="scope.row.full" input-style="width: 50px;height: 30px;" />
            </template>
          </el-table-column>
          <el-table-column prop="del" label="立减" width="120">
            <template #default="scope">
              <el-input v-model="scope.row.del" input-style="width: 50px;height: 30px;" />
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <div
                style="
                  display: flex;
                  align-items: center;
                  justify-content: space-around;
                  color: #409eff;
                "
              >
                <span @click="delReduction(scope.$index)">删除</span>
                <span @click="addReduction">添加</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
    </el-form>
    <div class="btn_box">
      <div class="back_btn" @click="cancel">上一步，填写商品信息</div>
      <div class="next_btn" @click="confirm">下一步，填写商品属性</div>
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
