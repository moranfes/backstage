<template>
  <div>
    <el-page-header title content="个人信息" class="title" style="margin-left: 100px;"></el-page-header>
    <el-row :gutter="20" class="box" style="margin: 10px auto;">
      <el-col :span="2" :push="2">
        <el-avatar shape="square" :size="100" :src="squareUrl"></el-avatar>
      </el-col>
      <el-col :span="14" :push="2">
        <el-descriptions class="header">
          <el-descriptions-item label="用户名">{{userinfo.username}}</el-descriptions-item>
          <el-descriptions-item label="昵称">{{userinfo.nickname}}</el-descriptions-item>
          <el-descriptions-item label="邮箱">{{userinfo.email}}</el-descriptions-item>
          <el-descriptions-item label="备注">
            <el-tag size="small">管理员</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
      <el-col :span="2" :push="2">
        <el-button type="danger" plain @click="exit">退出登录</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { userInfoAPI } from "@/api";
export default {
  name: "MyUser",
  data() {
    return {
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      userinfo: {
        username: "",
        nickname: "",
        email: ""
      }
    };
  },
  methods: {
    async users() {
      const { data: res } = await userInfoAPI(localStorage.getItem("token"));
      console.log(res);
      if (res.data.user_pic != null) {
        this.squareUrl = res.data.user_pic;
      }
      this.userinfo.username = res.data.username;
      this.userinfo.nickname = res.data.nickname;
      this.userinfo.email = res.data.email;
    },
    exit(){
      localStorage.removeItem('token')
      this.$router.replace('/')
    }
  },
  created() {
    this.users();
  }
};
</script>

<style lang='less'>
.title {
  .el-page-header__left {
    display: none;
  }
}
.box {
  width: 1500px;
  height: 200px;
  background-color: #fff;
  .el-col {
    height: 200px;
    line-height: 200px;
    display: flex;
    align-items: center;
  }
}
.header {
  line-height: 30px;
  .el-descriptions__body {
    padding: 30px;
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>