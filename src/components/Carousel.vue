<template>
  <div class="photo-container">
    <img :src="src" class="photo">
    <img :src="nextSrc" class="photo">
  </div>
</template>

<script>
export default {
  name: 'galleryItem',
  props: ['src', 'nextSrc', 'prevSrc', 'direction']
}
</script>

<style lang="scss" scoped>
.photo-container {
  position: relative;
}
</style>
