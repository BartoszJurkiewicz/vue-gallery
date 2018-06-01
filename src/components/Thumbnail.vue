<template>
    <img ref="thumbnail" :src="src" :class="loading" class="thumbnail">
</template>

<script>
export default {
  name: "Thumbnail",
  props: ["src"],
  data() {
    return {
      loading: "loading"
    };
  },
  mounted() {
    this.$refs.thumbnail.addEventListener("load", () => {
      this.loading = "loaded";
      this.$emit("loaded");
    });
  }
};
</script>

<style lang="scss" scoped>
.thumbnail {
  transition: opacity 0.4s;
}
.loading {
  opacity: 0;
  visibility: none;
}
</style>
