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
    <pop-up ref="popUp" :images="images"/>
  </div>
</template>

<script>
import { imagesLoaded } from "../mixins/mixins";
import Loader from "./Loader";
import Thumbnail from "./Thumbnail";
import PopUp from './PopUp'
export default {
  name: "Gallery",
  components: { Loader, Thumbnail, PopUp },
  mixins: [imagesLoaded],
  data() {
    return {
      perPage: 9,
      images: []
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
      this.$refs.popUp.open(index)
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
</style>
