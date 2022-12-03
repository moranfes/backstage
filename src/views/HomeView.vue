<template>
  <div class="home">
    <el-container>
      <el-header>
        <h1>汽车商场后台管理系统</h1>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Aside />
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Aside from "@/components/Aside.vue";

export default {
  name: "Home",
  components: {
    Aside
  }
};
</script>

<style scoped>
.el-header {
  background-color: #0984e3;
  color: #fff;
  text-align: center;
  line-height: 60px;
}
.el-header h1 {
  margin: 0;
}
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  height: 93vh;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  height: 93vh;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
