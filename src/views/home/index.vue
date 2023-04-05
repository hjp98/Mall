<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'

const main = ref() //使用ref创建虚拟DOM引用，使用时用main.value
let echart = echarts
onMounted(() => {
  init()
})

onUnmounted(() => {
  echart.dispose
})

const init = function () {
  // 基于准备好的dom，初始化echarts实例
  let myChart = echart.init(main.value)
  //配置图表的数据
  let option = {
    legend: {},
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'line'
      }
    },
    grid: {
      show: 'true'
    },
    xAxis: [
      {
        type: 'category',
        axisLabel: {
          formatter: '{value}'
        },
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          onZero: true,
          // onZeroyAxisIndex: 0
        },
        data: ['2023-3-1', '2023-3-2', '2023-3-3', '2023-3-4', '2023-3-5', '2023-3-6', '2023-3-7']
      }
    ],
    yAxis: [
      {
        type: 'value',
        name: '订单金额',
        min: 0,
        max: 10000,
        position: 'right',
        axisLabel: {
          formatter: '{value}'
        },
        axisLine: {
          show: true
        },
      },
      {
        type: 'value',
        name: '订单数量',
        min: 0,
        max: 80,
        position: 'left',
        axisLabel: {
          formatter: '{value}'
        },
        axisLine: {
          show: true
        }
      }
    ],
    series: [
      {
        name: '订单金额',
        type: 'line',
        yAxisIndex: 0,
        data: [2230, 3623, 6423, 8492, 6293, 2293, 6293],
        areaStyle: {
          color: '#5cc0e3'
        }
      },
      {
        name: '订单数量',
        type: 'line',
        smooth: true,
        yAxisIndex: 1,
        data: [20, 33, 50, 80, 60, 20, 60],
        areaStyle: {
          color: '#5ee1c6'
        }
      }
    ]
  }

  //使用刚指定的配置项和数据显示图表
  myChart.setOption(option)
}
</script>

<template>
  <div>
    <div class="box">
      <div class="box1">
        <div class="head">
          <div class="pic">
            <img src="src/assets/img/title1.png" alt="" />
          </div>
          <div class="text">
            <div>今日订单总数</div>
            <div class="num">200</div>
          </div>
        </div>
        <div class="head">
          <div class="pic">
            <img src="src/assets/img/title2.png" alt="" />
          </div>
          <div class="text">
            <div>今日销售总额</div>
            <div class="num">￥5000.00</div>
          </div>
        </div>
        <div class="head">
          <div class="pic">
            <img src="src/assets/img/title3.png" alt="" />
          </div>
          <div class="text">
            <div>昨日销售总额</div>
            <div class="num">￥5000.00</div>
          </div>
        </div>
      </div>
      <div class="box2">
        <div class="title">待处理事务</div>
        <div class="box_con">
          <div class="box_item">
            <span class="">待付款订单</span>
            <span class="amount">(10)</span>
          </div>
          <div class="box_item">
            <span class="">已完成订单</span>
            <span class="amount">(10)</span>
          </div>
          <div class="box_item">
            <span class="">待确认收货订单</span>
            <span class="amount">(10)</span>
          </div>
          <div class="box_item">
            <span class="">待发货订单</span>
            <span class="amount">(10)</span>
          </div>
          <div class="box_item">
            <span class="">新缺货登记</span>
            <span class="amount">(10)</span>
          </div>
          <div class="box_item">
            <span class="">待处理退款申请</span>
            <span class="amount">(10)</span>
          </div>
          <div class="box_item">
            <span class="">已发货订单</span>
            <span class="amount">(10)</span>
          </div>
          <div class="box_item">
            <span class="">待处理退货订单</span>
            <span class="amount">(10)</span>
          </div>
          <div class="box_item">
            <span class="">广告位即将到期</span>
            <span class="amount">(10)</span>
          </div>
        </div>
      </div>
      <div class="box3">
        <div class="box3_boxs">
          <div class="title">商品总览</div>
          <div class="boxs">
            <div>
              <div class="amount">100</div>
              <div>已下架</div>
            </div>
            <div>
              <div class="amount">400</div>
              <div>已上架</div>
            </div>
            <div>
              <div class="amount">50</div>
              <div>库存紧张</div>
            </div>
            <div>
              <div class="amount">500</div>
              <div>全部商品</div>
            </div>
          </div>
        </div>
        <div class="box3_boxs">
          <div class="title">用户总览</div>
          <div class="boxs">
            <div>
              <div class="amount">100</div>
              <div>今日新增</div>
            </div>
            <div>
              <div class="amount">200</div>
              <div>昨日新增</div>
            </div>
            <div>
              <div class="amount">1000</div>
              <div>本月新增</div>
            </div>
            <div>
              <div class="amount">5000</div>
              <div>会员总数</div>
            </div>
          </div>
        </div>
      </div>
      <div class="box4">
        <div class="title">订单统计</div>
        <div class="box4_con">
          <div class="box4_left">
            <div>
              <div class="text_title">本月订单总数</div>
              <div class="text_num">10000</div>
              <div class="proportion">
                <span class="positive">+10%</span>
                <span>同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px">
              <div class="text_title">本周订单总数</div>
              <div class="text_num">1000</div>
              <div class="proportion">
                <span class="negative">-10%</span>
                <span>同比上周</span>
              </div>
            </div>
            <div style="margin-top: 20px">
              <div class="text_title">本月销售总额</div>
              <div class="text_num">100000</div>
              <div class="proportion">
                <span class="positive">+10%</span>
                <span>同比上月</span>
              </div>
            </div>
            <div style="margin-top: 20px">
              <div class="text_title">本周订单总数</div>
              <div class="text_num">5000</div>
              <div class="proportion">
                <span class="negative">-10%</span>
                <span>同比上周</span>
              </div>
            </div>
          </div>
          <div class="box4_right">
            <div></div>
            <div>
              <div ref="main" style="width: 100%; height: 400px"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.box {
  // width: 80%;
  margin-top: 40px;
  margin-left: 235px;
  margin-right: 100px;
  padding: 20px;
  font-size: 16px;
  color: #606266;
  .title {
    padding: 15px 20px;
    background: #f2f6fc;
    font-weight: 700;
  }
  .amount {
    color: #f56c6c;
  }
  .box1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .head {
      display: flex;
      align-items: center;
      border: 1px solid #dcdfe6;
      padding: 20px;
      // height: 100px;
      width: 20%;
      .pic {
        width: 60px;
        height: 60px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .text {
        margin-left: 10px;
        font-size: 16px;
        color: #909399;
        .num {
          margin-top: 10px;
          font-size: 18px;
          color: #606266;
        }
      }
    }
  }
  .box2 {
    border: 1px solid #dcdfe6;
    margin-top: 20px;
    .box_con {
      padding: 20px 40px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .box_item {
        border-bottom: 1px solid #ebeef5;
        padding: 10px;
        display: flex;
        justify-content: space-between;
        width: 30%;
        // margin-right: 5px;
      }
      .box_item {
      }
    }
  }
  .box3 {
    // border: 1px solid #dcdfe6;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .box3_boxs {
      width: 50%;
      border: 1px solid #dcdfe6;
      .boxs {
        padding: 40px;
        display: flex;
        justify-content: space-around;
        text-align: center;
        .amount {
          font-size: 24px;
          margin-bottom: 10px;
        }
      }
    }
    .box3_boxs:nth-of-type(1) {
      margin-right: 20px;
    }
  }
  .box4 {
    border: 1px solid #dcdfe6;
    margin-top: 20px;
    .box4_con {
      width: 100%;
      display: flex;
      .box4_left {
        width: 200px;
        padding: 20px;
        font-size: 14px;
        border-right: 1px solid #dcdfe6;
        .text_title {
          color: rgb(144, 147, 153);
        }
        .text_num {
          color: rgb(96, 98, 102);
          font-size: 24px;
          padding: 10px 0px;
        }
        .proportion {
          color: rgb(192, 196, 204);
          span {
            margin-right: 5px;
          }
          .negative {
            color: #f56c6c;
          }
          .positive {
            color: #67c23a;
          }
        }
      }
      .box4_right {
        width: 80%;
        margin-top: 20px;
      }
    }
  }
}
</style>
