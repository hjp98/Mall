<script setup lang="ts">
import { getList, getOptions, getBrand, detail, type } from '@/until/api'
import { Edit, Search } from '@element-plus/icons-vue'
import { imageEmits } from 'element-plus'

let searchList = reactive({
  name: '',
  articleNumber: '',
  classGoods: '',
  brand: '',
  onLine: '',
  check: ''
})
let options: any = ref([])
let brandList: any = ref([])
const onLineList: any = ref([
  { label: '上架', value: '1' },
  { label: '下架', value: '0' }
])
const checkList: any = ref([
  { label: '审核通过', value: '1' },
  { label: '未审核', value: '0' }
])
const batchOptions = ref([
  {
    label: '商品上架',
    value: 'publishOn'
  },
  {
    label: '商品下架',
    value: 'publishOff'
  },
  {
    label: '设为推荐',
    value: 'recommendOn'
  },
  {
    label: '取消推荐',
    value: 'recommendOff'
  },
  {
    label: '设为新品',
    value: 'newOn'
  },
  {
    label: '取消新品',
    value: 'newOff'
  },
  {
    label: '转移到分类',
    value: 'transferCategory'
  },
  {
    label: '移入回收站',
    value: 'recycle'
  }
])
let batchValue = ref() //保存批量操作的值

const dialogVisible = ref(false)
let input3 = ref() //按sku编号搜索

let list = ref([])
let sellList: any = ref([])
// let spData = ref([])
let typeList: any = ref([])
let checkArr: any = ref([]) //保存选中数据
const pageInfo = reactive({
  pageSize: 5,
  pageNum: 1
})
let total = ref() //总页数
//获取第一页的数据
function getData() {
  getList({ pageNum: pageInfo.pageNum, pageSize: pageInfo.pageSize }).then((res) => {
    // console.log(res)
    list.value = res.data.data.list
    total.value = res.data.data.total
    console.log(list.value)
  })
}
getData()
//获取品牌数组
getBrand({ pageNum: 1, pageSize: 100 }).then((res) => {
  console.log(res.data);
  let arr = res.data.data.list
  arr.map((item: any) => {
    brandList.value.push({ label: item.name, value: item.id })
  })
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
const handleChange = function () {}
const reset = function () {
  searchList = {
    name: '',
    articleNumber: '',
    classGoods: '',
    brand: '',
    onLine: '',
    check: ''
  }
  console.log(searchList)
}
const serach = function () {
  console.log(searchList)
}

const handleSelectionChange = (val: any) => {
  checkArr.value.push(val)
}
//点击后获取对应的详情
const handleEdit = function (val: any, el: any) {
  // console.log(val)
  let id = el.id
  detail(id).then((res: any) => {
    sellList.value = res.data.data
  })
  //获取颜色和容量的数组
  type({ type: 0 }).then((res: any) => {
    typeList.value = res.data.data.list
    // console.log(res.data.data.list);
  })
  dialogVisible.value = true
}
const handleClose = function () {}
//过滤spData的value
const filterStr = function (row: any, index: any) {
  // console.log(row)
  let spData = JSON.parse(row.spData)
  // let spData = eval(row.spData)
  if (spData != null && index < spData.length) {
    // console.log(spData[index].value)
    return spData[index].value
  } else {
    return null
  }
}

//点击批量操作按钮的处理函数
const batchConfirm = function () {
  if (batchValue == null) {
    ElMessage({
      message: '请选择操作类型',
      type: 'warning',
      duration: 1000
    })
    return
  }
  if (checkArr.value == null || checkArr.value.length < 1) {
    ElMessage({
      message: '请选择要操作的商品',
      type: 'warning',
      duration: 1000
    })
    return
  }
  ElMessageBox.confirm('是否要进行该批量操作?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      ElMessage({
        type: 'success',
        message: 'Delete completed'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'Delete canceled'
      })
    })
}

/* 获取上一页的数据 */
watch(pageInfo, () => {
  getData()
})
</script>

<template>
  <div>
    <div class="box">
      <div class="head">
        <div class="title">
          <div class="title_text">筛选搜索</div>
          <div class="btn_box">
            <div class="reset" @click="reset()">重置</div>
            <div class="search" @click="serach()">查询结果</div>
          </div>
        </div>
        <div class="search_box">
          <div class="item">
            <span>商品名称：</span>
            <el-input v-model="searchList.name" placeholder="商品名称" />
          </div>
          <div class="item">
            <span>商品货号：</span>
            <el-input v-model="searchList.articleNumber" placeholder="商品货号" />
          </div>
          <div class="item">
            <span>商品分类：</span>
            <el-cascader
              v-model="searchList.classGoods"
              :options="options"
              @change="handleChange"
              placeholder="请选择"
            />
          </div>
          <div class="item">
            <span>商品品牌：</span>
            <el-select v-model="searchList.brand" placeholder="请选择品牌">
              <el-option
                v-for="item in brandList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="item">
            <span>上架状态：</span>
            <el-select v-model="searchList.onLine" placeholder="全部">
              <el-option
                v-for="item in onLineList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="item">
            <span>审核状态：</span>
            <el-select v-model="searchList.check" placeholder="全部">
              <el-option
                v-for="item in checkList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="box2">
        <div>数据列表</div>
        <div class="add">添加</div>
      </div>
      <div class="box3">
        <el-table
          :data="list"
          style="width: 100%"
          :cell-style="{ textAlign: 'center' }"
          :header-cell-style="{ textAlign: 'center' }"
          :border="true"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column prop="id" label="编号" width="120"></el-table-column>
          <el-table-column label="商品图片" width="120">
            <template #default="scope">
              <img :src="scope.row.pic" alt="" style="max-width: 80px; max-height: 80px" />
            </template>
          </el-table-column>
          <el-table-column label="商品名称" width="370">
            <template #default="scope">
              <div>{{ scope.row.name }}</div>
              <div>
                <span>品牌：</span>
                <span>{{ scope.row.brandName }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="价格/货号" width="125">
            <template #default="scope">
              <div>
                <span>价格：￥</span>
                <span>{{ scope.row.price }}</span>
              </div>
              <div>
                <span>货号：</span>
                <span>{{ scope.row.productSn }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="标签" width="140">
            <template #default="scope">
              <div>
                <span>上架：</span>
                <span>
                  <el-switch
                    :active-value="1"
                    :inactive-value="0"
                    v-model="scope.row.publishStatus"
                  />
                </span>
              </div>
              <div>
                <span>新品：</span>
                <span>
                  <el-switch :active-value="1" :inactive-value="0" v-model="scope.row.newStatus" />
                </span>
              </div>
              <div>
                <span>推荐：</span>
                <span>
                  <el-switch
                    :active-value="1"
                    :inactive-value="0"
                    v-model="scope.row.recommandStatus"
                  />
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="排序" prop="sort" />
          <el-table-column label="SKU库存">
            <template #default="scope">
              <el-icon
                style="
                  color: #fff;
                  background-color: #409eff;
                  border-color: #409eff;
                  width: 40px;
                  height: 40px;
                  border-radius: 50%;
                "
                @click="handleEdit(scope.$index, scope.row)"
              >
                <Edit />
              </el-icon>
            </template>
          </el-table-column>
          <el-table-column label="销量" prop="sale" />
          <el-table-column label="审核状态">
            <template #default="scope">
              <div>{{ scope.row.verifyStatus ? '已审核' : '未审核' }}</div>
              <div style="color: #409eff">审核详情</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="160">
            <template #default="scope">
              <div
                style="
                  display: flex;
                  flex-wrap: wrap;
                  justify-content: space-around;
                  font-size: 12px;
                  color: #606266;
                "
              >
                <div style="border: 1px solid #dcdfe6; width: 45%">查看</div>
                <div style="border: 1px solid #dcdfe6; width: 45%">编辑</div>
                <div style="border: 1px solid #dcdfe6; width: 45%; margin-top: 10px">日志</div>
                <div style="border: 1px solid #dcdfe6; width: 45%; margin-top: 10px">删除</div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div>
        <el-dialog
          v-model="dialogVisible"
          title="编辑出货信息"
          width="50%"
          :before-close="handleClose"
          :close-on-click-modal="true"
        >
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 20px;
            "
          >
            <div>
              <span>商品货号：</span>
              <span>6946605</span>
            </div>
            <span style="width: 50%">
              <el-input v-model="input3" placeholder="按sku编号搜索">
                <template #append>
                  <el-button :icon="Search" />
                </template>
              </el-input>
            </span>
          </div>
          <el-table
            :data="sellList"
            border
            style="width: 100%"
            :cell-style="{ textAlign: 'center' }"
            :header-cell-style="{ textAlign: 'center' }"
          >
            <el-table-column label="SKU编号" width="180">
              <template #default="scope">
                <el-input v-model="scope.row.skuCode"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              :label="item.name"
              v-for="(item, index) in typeList"
              :key="index"
              width="80"
            >
              <template #default="scope">
                <div>{{ filterStr(scope.row, index) }}</div>
              </template>
            </el-table-column>
            <el-table-column label="销售价格">
              <template #default="scope">
                <el-input v-model="scope.row.price"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="商品库存">
              <template #default="scope">
                <el-input v-model="scope.row.stock"></el-input>
              </template>
            </el-table-column>
            <el-table-column label="库存预警值">
              <template #default="scope">
                <el-input v-model="scope.row.lowStock"></el-input>
              </template>
            </el-table-column>
          </el-table>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="dialogVisible = false"> 确认 </el-button>
            </span>
          </template>
        </el-dialog>
      </div>
      <div class="box4">
        <div class="batch_box">
          <div>
            <el-select v-model="batchValue" class="m-2" placeholder="批量操作" size="large">
              <el-option
                v-for="item in batchOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="batch_btn" @click="batchConfirm()">确定</div>
        </div>
        <div>
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
    </div>
  </div>
</template>

<style scoped lang="scss">
.box {
  margin-top: 40px;
  margin-left: 235px;
  margin-right: 30px;
  padding: 20px 0;
  font-size: 16px;
  color: #303133;
  .head {
    border: 1px solid #ebeef5;
    padding: 20px;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      line-height: 31px;
      text-align: center;
      .btn_box {
        display: flex;
        font-size: 12px;
        .reset {
          width: 55px;
          height: 31px;
          color: #606266;
          border: 1px solid #dcdfe6;
          border-radius: 3px;
          margin-right: 10px;
        }
        .search {
          width: 79px;
          color: #fff;
          background-color: #409eff;
          border: 1px solid #409eff;
          border-radius: 3px;
        }
      }
    }
  }
  .search_box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 20px 40px;
    font-size: 14px;
    color: #606266;
    height: 100px;
    .item {
      width: 30%;
      display: flex;
      align-items: center;
      // justify-content: space-around;
      .el-input {
        width: 220px;
      }
    }
  }
  .box2 {
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
  .box3 {
    margin-top: 20px;
  }
  .box4 {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .batch_box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .batch_btn {
        width: 54px;
        height: 30px;
        line-height: 30px;
        font-size: 12px;
        text-align: center;
        background: #66b1ff;
        border-color: #66b1ff;
        border-radius: 3px;
        color: #fff;
        margin-left: 20px;
      }
    }
  }
}
</style>
