<template>
  <div class="login-box">
    <div class="login-from">
      <el-form label-width="0px" :rules="rules" :model="loginForm" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" type="password" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item class="login-btn">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset(loginFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import getData from "@/api/url";

export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456"
      },
      // 表单验证规则
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    async login() {
      const { data: res } = await getData.login(this.loginForm);
      console.log(res);
      if (res.meta.status == 200) {
        this.$message.success("登录成功");
      } else {
        this.$message.error("登录失败");
      }
      sessionStorage.setItem("token", res.data.token);

      this.$router.push("/home");
      console.log(this);
    },
    reset(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="less" scoped>
.login-box {
  background: #2b4b6b;
  height: 100%;
}

.login-from {
  background: #fff;
  width: 450px;
  height: 200px;
  margin: 0 auto;
  position: relative;
  top: 50%;
  transform: translate(0, -50%);
  padding: 20px;
}

.login-btn {
  text-align: end;
}
</style>

