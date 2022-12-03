<template>
  <el-container style="height: 800px;">
    <el-aside width="100%" style="background-color: rgb(211,220,230);">
      <el-menu :default-openeds="['1', '3']">
        <el-menu-item index="1">
          <router-link to="/home/user">
            <i class="el-icon-user-solid"></i>
            个人信息
          </router-link>
        </el-menu-item>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-goods"></i>商品管理
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">
              <router-link to="/home/goods">添加商品</router-link>
            </el-menu-item>
            <el-menu-item index="2-2">
              <router-link to="/home/goodslist">商品列表</router-link>
            </el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>
  </el-container>
</template>

<script>
export default {};
</script>

<style scoped>
a {
  text-decoration: none;
  display: inline-block;
  padding: 0;
  width: 100%;
}
.el-dropdown-menu__item,
.el-menu-item {
  padding: 0 30px;
}
</style>