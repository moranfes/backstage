<template>
  <div>
    <el-page-header title content="添加商品信息" class="title" style="margin-left: 100px;"></el-page-header>
    <el-form ref="form" :model="form" label-width="80px" class="form">
      <el-form-item label="商品图片">
        <div class="img">
          <!-- 图片，用来展示用户选择的头像 -->
          <img class="the_img" v-if="!this.form.avatar" src alt />
          <img class="the_img" v-else :src="this.form.avatar" alt />
          <!-- 按钮区域 -->
          <div class="btn-box">
            <input type="file" accept="image/*" style="display: none" ref="iptRef" @change="upload" />
          </div>
          <el-button @click="chooseImg" style="margin-top:10px">上传图片</el-button>
        </div>
      </el-form-item>
      <el-form-item label="商品名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="商品价格">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="商品简介">
        <el-input type="textarea" :rows="5" v-model="form.intro"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="set">立即添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import COS from "cos-js-sdk-v5";
// 填写自己腾讯云cos中的key和id (密钥)
const cos = new COS({
  SecretId: "AKIDo06DJSWdanuySccdktx4Y5lTBIMKJC4A", // 身份识别ID
  SecretKey: "EIE1gfUXwMmKrEZ5J2fTBtgYPIXAjEj4" // 身份秘钥
});
import { setGoodsAPI } from "@/api";
export default {
  data() {
    return {
      form: {
        avatar: "",
        name: "",
        price: "",
        intro: "",
        token: localStorage.getItem("token")
      }
    };
  },
  methods: {
    // 选择图片->点击事件->让选择框出现
    chooseImg() {
      // 模拟点击行为
      this.$refs.iptRef.click();
    },
    // 在选择框中选择图片后触发的改变事件
    upload(res) {
      console.log(res.path[0].files[0]);
      let file = res.path[0].files[0];
      if (file) {
        console.log(res.file);
        // 执行上传操作
        cos.putObject(
          {
            Bucket: "image-1315468302" /* 存储桶 */,
            Region: "ap-chengdu" /* 存储桶所在地域，必须字段 */,
            Key: file.name /* 文件名 */,
            StorageClass: "STANDARD", // 上传模式, 标准模式
            Body: file // 上传文件对象
          },
          (err, data) => {
            console.log(err || data);
            // 上传成功之后
            if (data.statusCode === 200) {
              this.form.avatar = `https:${data.Location}`; // 返回的url地址
              console.log(`https:${data.Location}`);
            }
          }
        );
      }
    },
    set() {
      this.setGoods();
    },
    async setGoods() {
      const { data: res } = await setGoodsAPI(this.form);
      console.log(res);
      if (status == 0) {
        this.$message({
          message: res.message,
          type: "success"
        });
      } else {
        this.$message.error("添加失败");
      }
    }
  }
};
</script>

<style lang='less'>
.form {
  background-color: #fff;
  width: 1500px;
  margin: 10px auto;
  padding: 50px;
  .el-input__inner {
    width: 500px;
  }
  .el-textarea__inner {
    width: 500px;
  }
}
.the_img {
  width: 180px;
  height: 130px;
  margin-bottom: 0px;
}
.img {
  margin-bottom: 20px;
}
</style>