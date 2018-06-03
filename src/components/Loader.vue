<template>
    <div v-show="progress < 100" class="loader" :style="`width: ${progress}%`"></div>
</template>

<script>
export default {
  name: "Loader",
  props: ["progress"]
};
</script>

<style lang="scss" scoped>
.loader {
  position: fixed;
  left: 0;
  top: 0;
  height: 6px;
  background: lightgreen;
  transition: width .4s;
  z-index: 9;
}
</style>
