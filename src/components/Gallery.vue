<template>
  <div class="container">
    <Loader v-show="!imagesLoaded"/>
    <div class="card-columns" :key="category">
      <div v-for="(image, index) in images" :key="index" class="card" @click="openPopup(index, image.url)">
        <thumbnail :src="image.url" class="card-img-top" @loaded="imageLoaded(index)"/>
      </div>
    </div>
    <button @click="loadMore()" type="button" class="btn btn-primary">More</button>
    <div v-if="popUp.active" class="big-photo">
      <button @click="closePopup">
        X
      </button>
      <button @click="navigate(popUp.index - 1)">Prev</button>
      <button @click="navigate(popUp.index + 1)">Next</button>
      <img :src="popUp.url">
    </div>
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
      perPage: 20,
      images: [],
      popUp: {
        index: 0,
        active: false,
        url: ''
      }
    };
  },
  methods: {
    getImagesUrls(perPage) {
      for (var i = 0; i <= perPage; i++) {
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
      this.getImagesUrls(20);
    },
    openPopup(index, url) {
      this.popUp.index = index
      this.popUp.active = true
      this.popUp.url = url
    },
    closePopup() {
      this.popUp.active = false
    },
    navigate(index) {
      console.log(index)
      this.popUp.index = index
      this.popUp.url = this.images[index].url
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
.big-photo {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
}
</style>
