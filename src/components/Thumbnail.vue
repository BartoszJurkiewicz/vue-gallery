<template>
  <div class="thumb-container" :class="{loading, 'animate':canAnimate}" :style="`animation-delay: ${(index % perPage) / 10}s`">
    <img ref="thumbnail" :src="src" class="thumbnail">
    <div v-if="slotNotEmpty" class="caption">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Thumbnail",
  props: ["src", "index", "perPage"],
  data() {
    return {
      loading: "loading",
      canAnimate: false
    };
  },
  computed: {
    slotNotEmpty() {
      return this.$slots.default.length
    }
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
.thumb-container {
  position: relative;
  overflow-y: hidden;
  margin-bottom: 30px;
  &:hover {
    .caption {
      transform: translateY(0)
    }
  }
}
.loading {
  opacity: 0;
  visibility: none;
}
.animate {
  animation-name: fadeIn;
  animation-duration: .4s;
  animation-fill-mode: forwards;
}
.caption {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, .8);
  transform: translateY(100%);
  transition: transform .4s;
  text-align: center;
  font-size: 20px;
  color: initial;
}
</style>
