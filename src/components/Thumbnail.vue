<template>
  <div class="thumb-container" :class="{loading, 'animate':canAnimate}" :style="`animation-delay: ${(index % perPage) / 10}s`">
    <img ref="thumbnail" :src="src" class="thumbnail">
    <div v-if="slot" class="caption">
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
    slot() {
      return this.$slots.default
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
  box-shadow: 6px 6px 20px 0px rgba(0,0,0,0.25);
  &:hover {
    .caption {
      transform: translateY(0)
    }
  }
}
.thumbnail {
  position: relative;
  top: 0;
  left: 0;
  z-index: 9;
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
  z-index: 9;
}
.gallery {
  overflow-y: visible;
  .thumbnail, &:before, &:after {
    transition: .4s cubic-bezier(0.175, 0.885, 0.320, 1.275);
  }
  &:before, &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, .4);
  }
  &:hover {
    .thumbnail {
      position: relative;
      top: 14px;
      left: 14px;
    }
    &:after {
      transform: translateX(7px) translateY(7px)
    }
  }
}
</style>
