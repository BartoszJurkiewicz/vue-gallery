<template>
  <div class="container">
    <Loader v-show="!imagesLoaded"/>
    <div class="card-columns" :key="category">
      <div v-for="(image, index) in images" :key="index" class="card">
        <thumbnail :src="image.url" class="card-img-top" @loaded="imageLoaded(index)"/>
      </div>
    </div>
    <button @click="loadMore()" type="button" class="btn btn-primary">More</button>
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
      images: []
    };
  },
  methods: {
    getImagesUrls(perPage) {
      for (var i = 0; i <= perPage; i++) {
        this.images.push({
          url: `https://loremflickr.com/640/${this.getRandomHeight()}/${this.category}`,
          loaded: false
        });
      }
    },
    getRandomHeight() {
      return Math.floor(Math.random() * 620) + 240;
    },
    loadMore() {
      this.getImagesUrls(20);
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

<style lang="scss">
</style>
