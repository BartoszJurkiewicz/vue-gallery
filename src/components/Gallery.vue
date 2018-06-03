<template>
  <div class="container">
    <Loader :progress="progress"/>
    <div class="row" :key="category">
      <div v-for="(image, index) in images" :key="index" class="col-12 col-sm-6 col-md-4" @click="openPopup(index)">
        <thumbnail ref="thumbnailWrapper" :src="image.url" :index="index" :per-page="perPage" @loaded="imageLoaded(index)">
          +
        </thumbnail>
      </div>
    </div>
    <button @click="loadMore()" type="button" class="btn btn-primary btn-load-more">More</button>
    <transition name="fade">
      <div v-if="popUp.active" class="big-photo">
        <button @click="closePopup" class="popup-navigation _close"></button>
        <div class="carousel">
          <img v-if="popUp.index > 0" :src="images[popUp.index - 1].url" @click="navigate(popUp.index - 1)" class="photo prev">
          <img :src="images[popUp.index].url" class="photo">
          <img v-if="popUp.index < images.length - 1" :src="images[popUp.index + 1].url" @click="navigate(popUp.index + 1)" class="photo next">
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { imagesLoaded } from "../mixins/mixins";
import Loader from "./Loader";
import Thumbnail from "./Thumbnail";
export default {
  name: "Gallery",
  components: { Loader, Thumbnail },
  mixins: [imagesLoaded],
  data() {
    return {
      perPage: 9,
      images: [],
      popUp: {
        index: 0,
        active: false
      }
    };
  },
  methods: {
    getImagesUrls(perPage) {
      for (var i = 0; i < perPage; i++) {
        this.images.push({
          url: `https://loremflickr.com/1280/${this.getRandomHeight()}/${this.category}`,
          loaded: false
        });
      }
    },
    getRandomHeight() {
      return Math.floor(Math.random() * 720) + 400;
    },
    loadMore() {
      this.getImagesUrls(this.perPage);
    },
    openPopup(index) {
      this.popUp.index = index
      this.popUp.active = true
    },
    closePopup() {
      this.popUp.active = false
    },
    navigate(index) {
      this.popUp.index = index
    }
  },
  computed: {
    category() {
      return this.$route.params.slug;
    }
  },
  created() {
    this.getImagesUrls(this.perPage);
  }
};
</script>

<style lang="scss" scoped>
.thumb-container.animate {
  cursor: pointer;
  &:hover {
    background-color: lightyellow;
  }
}
.btn-load-more {
  position: fixed;
  left: 50%;
  bottom: 20px;
  transform: translateX(-50%)
}
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
