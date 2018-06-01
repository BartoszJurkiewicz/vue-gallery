<template>
  <div class="row">
    <Loader v-show="!imagesLoaded"/>
    <div v-for="(image, index) in images" :key="index" class="col">
      <router-link :to="`/${image.slug}`">
        <thumbnail :src="`https://loremflickr.com/640/480/${image.slug}`" @loaded="imageLoaded(index)"/>
      </router-link>
    </div>
  </div>
</template>

<script>
import { imagesLoaded } from '../mixins/mixins'
import Loader from "./Loader";
import Thumbnail from "./Thumbnail";
export default {
  name: "Home",
  components: { Loader, Thumbnail },
  mixins: [imagesLoaded],
  data() {
    return {
      images: [
        {
          slug: "animals",
          loaded: false
        },
        {
          slug: "arch",
          loaded: false
        },
        {
          slug: "nature",
          loaded: false
        },
        {
          slug: "people",
          loaded: false
        },
        {
          slug: "tech",
          loaded: false
        }
      ]
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
