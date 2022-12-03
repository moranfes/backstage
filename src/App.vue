<template>
  <div>
    <router-view v-if="isReload"></router-view>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      reload: this.reload
    };
  },

  data() {
    return {
      isReload: true
    };
  },

  methods: {
    reload() {
      this.isReload = false;

      this.$nextTick(() => {
        this.isReload = true;
      });
    }
  }
};

</script>

<style>
html body{
    margin: 0;
    padding: 0;
}
</style>