<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { userStore } from '@/store/user'
import { useRouter } from 'vue-router'

const formRef = ref<FormInstance>()
const admin = reactive({
  name: 'admin',
  password: ''
})

const router = useRouter()
const store = userStore()

const validateId = (rule: any, value: any, callback: any) => {
  console.log(value)
  if (value === '') {
    callback(new Error('请输入账号'))
  } else if (value !== store.user.name) {
    callback(new Error('账号不正确'))
  } else {
    callback()
  }
}

const validatePass = (rule: any, value: any, callback: any) => {
  console.log(value)
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (value !== store.user.password) {
    callback(new Error('密码不正确'))
  } else {
    callback()
  }
}

const rules = reactive<FormRules>({
  id: [{ validator: validateId, trigger: 'blur' }],
  checkPass: [
    { validator: validatePass, trigger: 'blur' },
    { min: 3, message: '密码不能少于三位', trigger: 'blur' }
  ]
})

const login = (formRef: FormInstance | undefined) => {
  if (!formRef) return
  formRef.validate((valid:any) => {
    if (valid) {
      console.log('submit!')
      // store.login(admin);
      store.tokenCreate()
      router.push({ path: '/' })
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>

<template>
  <div>
    <div class="backdrop">
      <img src="src/assets/img/login_center_bg.5307896.png" alt="" />
    </div>
    <div class="box">
      <div class="head"></div>
      <div class="box1">
        <div class="title">
          <div>
            <svg
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              data-v-ea893728=""
              style="width: 56px; height: 56px; color: rgb(64, 158, 255)"
            >
              <path
                fill="currentColor"
                d="M704 704h64v192H256V704h64v64h384v-64zm188.544-152.192C894.528 559.616 896 567.616 896 576a96 96 0 1 1-192 0 96 96 0 1 1-192 0 96 96 0 1 1-192 0 96 96 0 1 1-192 0c0-8.384 1.408-16.384 3.392-24.192L192 128h640l60.544 423.808z"
              ></path>
            </svg>
          </div>
          <div>Mall</div>
        </div>
        <div class="user">
          <el-form ref="formRef" :model="admin" :rules="rules" class="demo-ruleForm">
            <el-form-item prop="name">
              <el-input
                v-model.number="admin.name"
                placeholder="请输入用户名"
                :prefix-icon="User"
                type="text"
                autocomplete="off"
                minlength="3"
                input-style="width: 260px;height: 40px;"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="admin.password"
                :prefix-icon="Lock"
                type="password"
                placeholder="请输入密码"
                show-password
                minlength="3"
                input-style="width: 260px;height: 40px;"
              />
            </el-form-item>
          </el-form>
        </div>
        <div class="btn">
          <div @click="login(formRef)">登录</div>
          <div @click="$router.push({ path: '/register' })">注册</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.backdrop {
  img {
    background: #409eff;
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
    margin-top: 200px;
  }
}
.box {
  width: 360px;
  height: 400px;
  background-color: #ffffff;
  position: fixed;
  top: 15%;
  left: 40%;
  // padding: 20px;
  border: 1px solid #ebeef5;

  .head {
    background: #409eff;
    height: 10px;
    border-radius: 5px;
  }
  .box1 {
    height: 80%;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    .title {
      font-size: 20px;
      font-weight: 800;
      text-align: center;
      margin-bottom: 10px;
    }
    .user {
      margin-right: 40px;
    }
    .btn {
      display: flex;
      justify-content: space-around;
      width: 100%;
      div {
        width: 144px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #ffffff;
        background-color: #409eff;
        border-radius: 5px;
        // opacity: 0;
      }
      div:hover {
        background-color: #409eff;
        cursor: pointer;
        opacity: 0.5;
      }
    }
  }
}
</style>
