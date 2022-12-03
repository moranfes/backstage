<template>
  <div class="container">
    <div class="input">
      <h1>汽车商场后台管理系统</h1>
      <el-form ref="form" :model="form" label-width="55px" class="form">
        <el-form-item label="账号" class="item">
          <el-input v-model="form.username" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" class="item">
          <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { LoginAPI } from "@/api";
export default {
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    async onSubmit() {
      const { data: res } = await LoginAPI(this.form);
      console.log(res);
      if (res.status == 0) {
        localStorage.setItem('token',res.token)
        this.$router.replace('/home')
        this.$message({
          message: res.message,
          type: "success"
        });
      } else {
        this.$message.error('登录失败，请检查账号密码是否输入正确')
      }
    }
  }
};
</script>

<style lang='less'>
.container {
  background-color: #0984e3;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .input {
    width: 500px;
    text-align: center;
    .form {
      text-align: center;
    }
    h1 {
      color: #fff;
    }
    .item .el-form-item__label {
      color: #fff;
      font-size: 16px;
    }
  }
}
</style>