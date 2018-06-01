export const imagesLoaded = {
  computed: {
    imagesLoaded() {
      return this.images.every(image => {
        return image.loaded;
      });
    }
  },
  methods: {
    imageLoaded(index) {
      this.images[index].loaded = true;
    }
  }
}
