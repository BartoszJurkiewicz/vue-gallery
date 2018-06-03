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
body {
  font-family: 'Lato', sans-serif;
}
a {
  &:hover {
    text-decoration: none;
  }
}
.container-fluid {
  padding-top: 15px;
  padding-left: 30px;
  padding-right: 30px;
}
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
@keyframes fadeIn {
  from {
    opacity: 0;
    visibility: hidden;
  }
  to {
    opacity: 1;
    visibility: visible;
  }
}
</style>
