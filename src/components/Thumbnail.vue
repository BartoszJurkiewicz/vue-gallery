<template>
  <div class="thumb-container" :class="[loading, canAnimate?'animate':'']">
    <img ref="thumbnail" :src="src" class="thumbnail" :style="`animation-delay: ${(index % perPage) / 10}s`">
    <div v-if="defaultSlot" class="caption">
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
    defaultSlot() {
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
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
  padding-bottom: 100%;
  box-shadow: 6px 6px 20px 0px rgba(0,0,0,0.25);
  transition: transform .4s;
  overflow: hidden;
  background: lightgray;
}
.thumbnail {
  position: absolute;
  height: 100%;
  max-width: initial;
  top: 0;
  opacity: 0;
  visibility: hidden;
}
.animate {
  &:hover {
    transform: scale(1.02);
    .caption {
      transform: translateY(0)
    }
  }
  .thumbnail{
    animation-name: fadeIn;
    animation-duration: .4s;
    animation-fill-mode: forwards;
  }
  .caption {
    opacity: 1;
    visibility: visible
  }
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
  font-size: 60px;
  color: initial;
  z-index: 9;
  opacity: 0;
  visibility: hidden;
}
.gallery {
  overflow: visible;
  .thumbnail {
    z-index: 1;
  }
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
      transform: translateX(14px) translateY(14px)
    }
    &:after {
      transform: translateX(7px) translateY(7px)
    }
  }
}
</style>
