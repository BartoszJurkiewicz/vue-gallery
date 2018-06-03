<template>
  <transition name="fade">
    <div v-if="active" class="big-photo">
      <button @click="close" class="popup-navigation _close"></button>
      <div class="carousel">
        <img v-if="index > 0" :src="images[index - 1].url" @click="navigate(index - 1)" class="photo prev">
        <img :src="images[index].url" class="photo">
        <img v-if="index < images.length - 1" :src="images[index + 1].url" @click="navigate(index + 1)" class="photo next">
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'popUp',
  props: ['images'],
  data() {
    return {
      active: false,
      index: 0
    }
  },
  methods: {
    open(index) {
      this.index = index
      this.active = true
    },
    close() {
      this.active = false
    },
    navigate(index) {
      this.index = index
    }
  }
}
</script>

<style lang="scss" scoped>
.big-photo {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100vh;
  transform: translateX(-50%) translateY(-50%);
  text-align: center;
  background: rgba(0, 0, 0, .8)
}
.popup-navigation {
  position: absolute;
  background: transparent;
  border: none;
  color: white;
  cursor: pointer;
  z-index: 9;
  &._close {
    top: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
    &:before,&:after {
      content: '';
      position: absolute;
      top: 15px;
      right: 0;
      width: 30px;
      height: 4px;
      transform-origin: 50% 50%;
      background: white;
    }
    &:before {
      transform: rotate(45deg)
    }
    &:after {
      transform: rotate(-45deg)
    }
  }
}
.carousel {
  position: relative;
  display: flex;
  justify-content: center;
  .photo {
    flex: 0 70%;
    width: 70%;
    height: 100%;
    z-index: 1;
    &.prev, &.next {
      position: absolute;
      top: 50%;
      flex: 0 15%;
      width: 15%;
      height: auto;
      transform: translateY(-50%);
      transition: .4s;
      z-index: 0;
      cursor: pointer;
      &:hover {
        transform: translateY(-50%) scale(1.04)
      }
    }
    &.prev {
      left: 0;
    }
    &.next {
      right: 0;
    }
  }
}
</style>

