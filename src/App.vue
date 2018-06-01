<template>
  <div id="app" class="container-fluid">
    <transition name="fade" mode="out-in" appear>
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
img {
  max-width: 100%;
}
</style>
