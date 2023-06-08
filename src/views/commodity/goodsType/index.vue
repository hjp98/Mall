<script setup lang="ts">
import router from '@/router';
import { getfoodsType } from '@/until/api'
import { ref, reactive, watch } from 'vue'

const list = ref([])
const type = ref(0)
const pageInfo = reactive({
  pageNum: 1,
  pageSize: 5
})
let total = ref()

const getList = function () {
  getfoodsType(type.value, pageInfo).then((res: any) => {
    list.value = res.data.data.list
    total.value = res.data.data.total
  })
}
getList()

const handleSelectionChange = function () {}
const levelfn = function (val: any) {
  if (val === 0) {
    return '一级'
  } else {
    return '二级'
  }
}
const down = function (val: any) {
  type.value = val
  getList()
}

watch(pageInfo, () => {
  getList()
})
</script>

<template>
  <div class="boxs">
    <div class="box1">
      <div>数据列表</div>
      <div class="add" @click="router.push({path:'/commodity/addType'})">添加</div>
    </div>
    <div class="box2">
      <el-table
        :data="list"
        style="width: 100%"
        :cell-style="{ textAlign: 'center' }"
        :header-cell-style="{ textAlign: 'center' }"
        :border="true"
        @selection-change="handleSelectionChange"
      >
        <el-table-column prop="id" label="编号" width="120"></el-table-column>
        <el-table-column prop="name" label="分类名称"></el-table-column>
        <el-table-column label="级别" width="120">
          <template #default="scope">
            <div>
              {{ levelfn(scope.row.level) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="productCount" label="商品数量" width="120"></el-table-column>
        <el-table-column prop="productUnit" label="数量单位" width="120"></el-table-column>
        <el-table-column label="导航栏" width="120">
          <template #default="scope">
            <el-switch v-model="scope.row.navStatus" :active-value="1" :inactive-value="0" />
          </template>
        </el-table-column>
        <el-table-column label="是否显示" width="120">
          <template #default="scope">
            <el-switch v-model="scope.row.showStatus" :active-value="1" :inactive-value="0" />
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="120"></el-table-column>
        <el-table-column label="设置">
          <template #default="scope">
            <div style="display: flex; justify-content: space-between; align-items: center">
              <div class="text" @click="down(1)" v-if="type === 0">
                <span>查看下级</span>
              </div>
              <div class="text" @click="down(0)" v-else>
                <span>返回上级</span>
              </div>
              <div class="text">
                <span>转移商品</span>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <div style="display: flex; justify-content: space-between; align-items: center">
              <div class="text">
                <span>编辑</span>
              </div>
              <div class="del">
                <span>删除</span>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="box3">
      <el-pagination
        background
        v-model:current-page="pageInfo.pageNum"
        v-model:page-size="pageInfo.pageSize"
        :total="total"
        :page-sizes="[5, 10, 15]"
        layout="total, sizes,prev, pager, next,jumper"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.boxs {
  margin-top: 40px;
  margin-left: 235px;
  margin-right: 30px;
  padding: 20px 0;
  font-size: 16px;
  color: #303133;
  .box1 {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: 1px solid #ebeef5;
    margin-top: 20px;
    .add {
      font-size: 12px;
      color: #606266;
      border: 1px solid #dcdfe6;
      // padding: 12px 20px;
      width: 54px;
      height: 26px;
      line-height: 26px;
      text-align: center;
      border-radius: 3px;
      // display: inline-block;
    }
  }
  .box2 {
    margin-top: 20px;
    .text {
      border: 1px solid #dcdfe6;
      font-size: 12px;
      border-radius: 3px;
      width: 79px;
      height: 27px;
      line-height: 27px;
      text-align: center;
    }
    .text:hover {
      color: #409eff;
      border-color: #409eff;
      background-color: #c3d9eb;
    }
    .del {
      border: 1px solid #f56c6c;
      font-size: 12px;
      border-radius: 3px;
      width: 79px;
      height: 27px;
      line-height: 27px;
      text-align: center;
      color: #fff;
      background-color: #f56c6c;
    }
    .del:hover {
      background-color: #e79898;
    }
  }
  .box3 {
    margin-top: 20px;
    float: right;
  }
}
</style>
