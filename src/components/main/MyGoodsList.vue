<template>
  <div>
    <el-page-header title content="商品信息列表" class="title" style="margin-left: 100px;"></el-page-header>
    <el-table :data="newData" align="center" border style="width: 1500px;margin:10px auto">
      <el-table-column prop="goods_id" label="商品编号" width="80"></el-table-column>
      <el-table-column label="商品图片" width="150">
        <!-- v-for="i in tableData" :key="i.goods_id" -->
        <template slot-scope="scope">
          <el-image :src="scope.row.goods_pic" style="width:'100px'">
            <div slot="placeholder" class="image-slot">
              加载中
              <span class="dot">...</span>
            </div>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column prop="goods_name" label="商品名称" width="280"></el-table-column>
      <el-table-column prop="goods_price" label="商品价格" width="180"></el-table-column>
      <el-table-column prop="goods_intro" label="商品介绍"></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <Btn :id="scope.row.goods_id"></Btn>
        </template>
      </el-table-column>
    </el-table>
    <pagination :total="listLen" @getPage="getnewPage"></pagination>
  </div>
</template>

<script>
import { getGoodsAPI } from "@/api";
import Btn from "@/components/main/goodsListCom/GoodsBtn.vue";
import pagination from "@/components/main/goodsListCom/GoodsPagination.vue";
export default {
  components: {
    Btn,
    pagination
  },
  data() {
    return {
      tableData: [],
      newData: [],
      listLen: 0,
      currentPage: 1,
      size: 5
    };
  },
  methods: {
    getnewPage(val) {
      console.log("商品列表" + val);
      this.currentPage = val;
      console.log(this.currentPage);
      this.getnewDate();
    },
    async getGoosInfo() {
      const { data: res } = await getGoodsAPI();
      console.log(res);
      this.tableData = res.data;
      this.listLen = res.data.length;
      this.newtableData();
    },
    newtableData() {
      this.newData = this.tableData.slice(
        (this.currentPage - 1) * this.size,
        this.currentPage * this.size
      );
    },
    getnewDate() {
      this.newData = this.tableData.slice(
        (this.currentPage - 1) * this.size,
        this.currentPage * this.size
      );
      console.log("new");
      console.log(this.tableData);
      console.log(this.currentPage);
    }
  },
  created() {
    this.getGoosInfo();
  }
};
</script>

<style lang='less'>
.title {
  .el-page-header__left {
    display: none;
  }
}
</style>