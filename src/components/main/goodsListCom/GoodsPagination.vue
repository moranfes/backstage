<template>
  <div>
    <el-pagination
      @current-change="handleCurrentChange"
      :hide-on-single-page="true"
      :page-size="5"
      layout="total, prev, pager, next, jumper"
      :total="total"
      style="text-align:center"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  props: ["total"],
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$emit("getPage", val);
    }
  },

  data() {
    return {};
  }
};
</script>

<style>
</style>