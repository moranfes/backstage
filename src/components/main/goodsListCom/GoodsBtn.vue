<template>
  <!-- 商品列表的按钮组件 -->
  <div>
    <el-button type="success" plain @click="modify">修改</el-button>
    <el-button type="danger" plain @click="open">删除</el-button>

    <!-- 弹出框 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <div class="img">
          <!-- 图片，用来展示用户选择的头像 -->
          <img class="the_img" v-if="!this.form.avatar" src alt />
          <img class="the_img" v-else :src="this.form.avatar" alt />
          <!-- 按钮区域 -->
          <div class="btn-box">
            <input type="file" accept="image/*" style="display: none" ref="iptRef" @change="upload" />
          </div>
          <el-button
            type="primary"
            icon="el-icon-plus"
            @click="chooseImg"
            style="margin-top:20px"
          >修改图片</el-button>
        </div>
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品介绍" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="form.textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="setGoodsInfo">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import COS from "cos-js-sdk-v5";
// 填写自己腾讯云cos中的key和id (密钥)
const cos = new COS({
  SecretId: "AKIDo06DJSWdanuySccdktx4Y5lTBIMKJC4A", // 身份识别ID
  SecretKey: "EIE1gfUXwMmKrEZ5J2fTBtgYPIXAjEj4" // 身份秘钥
});
import { getGoodsListAPI, setGoodsInfoAPI, delInfoAPI } from "@/api";
export default {
  props: ["id"],
  inject: ["reload"],
  data() {
    return {
      dialogFormVisible: false,
      form: {
        avatar: "",
        name: "",
        price: "",
        textarea: "",
        id: this.id,
        token: localStorage.getItem("token")
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    modify() {
      this.dialogFormVisible = true;
      this.getGoodsInfo();
    },
    async getGoodsInfo() {
      const { data: res } = await getGoodsListAPI(this.id);
      console.log(res.data);
      this.form.avatar = res.data[0].goods_pic;
      this.form.name = res.data[0].goods_name;
      this.form.price = res.data[0].goods_price;
      this.form.textarea = res.data[0].goods_intro;
    },
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
    // 修改
    async setGoodsInfo() {
      const { data: res } = await setGoodsInfoAPI(this.form);
      console.log(res);
      if (res.status == 0) {
        this.$message({
          message: res.message,
          type: "success"
        });
        this.dialogFormVisible = false;
        this.reload();
      } else {
        this.$message.error("修改失败");
      }
    },
    open() {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.delgoods();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 删除
    async delgoods() {
      const { data: res } = await delInfoAPI(
        this.id,
        localStorage.getItem("token")
      );
      console.log(res);
      if (res.status == 0) {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.reload();
      } else {
        this.$message.error("删除失败");
      }
    }
  }
};
</script>

<style>
.the_img {
  width: 180px;
  margin-bottom: 20px;
}
.img {
  margin-left: 50px;
  margin-bottom: 20px;
}
</style>