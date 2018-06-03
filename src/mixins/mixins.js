export const imagesLoaded = {
  computed: {
    imagesLoaded() {
      return this.images.every(image => {
        return image.loaded;
      });
    },
    progress() {
      let total = this.images.length
      let loaded = this.images.filter(image => {
        return image.loaded
      }).length
      return Math.floor(loaded/total * 100)
    }
  },
  methods: {
    imageLoaded(index) {
      this.images[index].loaded = true;
    },
    animateThumbnails() {
      let thumbnails = this.$refs.thumbnailWrapper
      thumbnails.forEach((t, i) => {
        t.canAnimate = true
      })
    }
  },
  watch: {
    imagesLoaded(val) {
      if(val) this.animateThumbnails()
    }
  }
}
