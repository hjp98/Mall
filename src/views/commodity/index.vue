<script setup lang="ts">
import { getList } from '@/until/api'

let list = reactive([])
getList({ pageNum: 1, pageSize: 5 }).then((res) =>{
  console.log(res);
  
})
</script>

<template>
  <div>
    {{ list }}
  </div>
</template>

<style scoped lang="scss"></style>
