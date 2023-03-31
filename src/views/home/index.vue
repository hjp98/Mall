<script setup lang="ts">
import { ref, reactive } from 'vue'

const menu = reactive([
  {
    title: '商品',
    children: ['商品列表', '添加商品', '商品分类', '商品类型', '品牌管理']
  },
  {
    title: '订单',
    children: ['订单列表', '订单设置', '退货申请处理', '退货原因设置']
  },
  {
    title: '营销',
    children: [
      '秒杀活动列表',
      '优惠劵列表',
      '品牌推荐',
      '新品推荐',
      '人气推荐',
      '专题推荐',
      '广告列表'
    ]
  },
  {
    title: '权限',
    children: ['用户列表', '角色列表', '菜单列表', '资源列表']
  }
])

const activeNames = ref(['0'])
const handleChange = (value: any) => {
  // console.log(value)
}
</script>

<template>
  <div>
    <div class="box">
      <div class="box_left">
        <div class="top">首页</div>
        <el-collapse
          v-model="activeNames"
          @change="handleChange"
          v-for="(item, index) in menu"
          :key="index"
        >
          <el-collapse-item :title="item.title" :name="index">
            <div v-for="(items, index) in item.children" :key="index" class="title">
              {{ items }}
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div></div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.box {
  height: 100%;
  font-size: 18px;
  font-weight: 600;
  .box_left {
    width: 10%;
    height: 100vh;
    color: rgb(191, 203, 217);
    background-color: #304156;
    .top{
      height: 56px;
      line-height: 56px;
      padding: 0 20px;
    }
    :deep(.el-collapse-item__header) {
      color: rgb(191, 203, 217);
      background-color: #304156;
      padding: 0 20px;
      font-size: 18px;
      font-weight: 600;
      line-height: 56px;
      height: 56px;
    }
    :deep(.el-collapse-item__content) {
      color: rgb(191, 203, 217);
      background-color: #1f2d3d !important;
      padding-bottom: 0;
      font-size: 18px;
      font-weight: 600;
    }
    .title {
      padding-left: 45px;
      height: 50px;
      line-height: 50px;
      text-align: center;
    }
    .el-collapse {
      border: none;
      --el-collapse-border-color: none;
      .el-collapse-item {
        border: none;
      }
    }
  }
}
</style>
