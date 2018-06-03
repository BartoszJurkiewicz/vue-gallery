<template>
  <div class="container">
    <Loader :progress="progress"/>
    <div class="row" :key="category">
      <div v-for="(image, index) in images" :key="index" class="col-4" @click="openPopup(index)">
        <thumbnail ref="thumbnailWrapper" :src="image.url" :index="index" :per-page="perPage" @loaded="imageLoaded(index)">
          +
        </thumbnail>
      </div>
    </div>
    <button @click="loadMore()" type="button" class="btn btn-primary btn-load-more">More</button>
    <transition name="fade">
      <div v-if="popUp.active" class="big-photo">
        <button @click="closePopup" class="popup-navigation _close">
          X
        </button>
        <button @click="navigate(popUp.index - 1)" class="popup-navigation _prev" :disabled="popUp.index == 0">Prev</button>
        <button @click="navigate(popUp.index + 1)" class="popup-navigation _next" :disabled="popUp.index >= images.length - 1">Next</button>
        <img :src="images[popUp.index].url">
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
      perPage: 10,
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
      this.getImagesUrls(10);
    },
    openPopup(index) {
      this.popUp.index = index
      this.popUp.active = true
    },
    closePopup() {
      this.popUp.active = false
    },
    navigate(index) {
      console.log(index)
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
.thumb-container {
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
  &._close {
    top: 0;
    left: 20px;
  }
  &._prev, &._next {
    top: 50%;
    transform: translateY(-50%)
  }
  &._prev {
    left: 20px;
  }
  &._next {
    right: 20px;
  }
}
</style>
