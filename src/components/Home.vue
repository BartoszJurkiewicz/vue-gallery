<template>
  <div class="row">
    <Loader :progress="progress"/>
    <div v-for="(image, index) in images" :key="index" class="col-12 col-sm-6 col-md-3">
      <router-link :to="`/${image.slug}`">
        <thumbnail ref="thumbnailWrapper" :src="`https://loremflickr.com/640/640/${image.slug}`" :index="index" :per-page="images.length" @loaded="imageLoaded(index)" class="gallery"/>
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
        }
      ]
    };
  }
};
</script>

