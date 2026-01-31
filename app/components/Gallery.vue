<script setup lang="ts">
import VueEasyLightbox from 'vue-easy-lightbox'

const { data: gallery } = await useAsyncData('gallery', () => queryCollection('gallery').all())

const sortedGallery = computed(() => {
  if (!gallery.value) return []
  return [...gallery.value].sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
})

const getThumbnailUrl = (photo: any) => {
  return photo.thumbnail || photo.image
}

const imageUrls = computed(() => {
  return sortedGallery.value.map((photo: any) => photo.image)
})

const visibleRef = ref(false)
const indexRef = ref(0)

const showImg = (index: number) => {
  indexRef.value = index
  visibleRef.value = true
}

const onHide = () => {
  visibleRef.value = false
}

watch(visibleRef, newVal => {
  if (newVal) {
    document.documentElement.style.overflow = 'hidden'
  } else {
    document.documentElement.style.overflow = 'auto'
  }
})
</script>

<template>
  <section id="galerie" class="gallery-section">
    <div v-if="sortedGallery.length > 0" class="gallery-grid">
      <div
        v-for="(photo, index) in sortedGallery"
        :key="photo.path"
        class="gallery-item"
        @click="showImg(index)"
      >
        <img :src="getThumbnailUrl(photo)" :alt="photo.title" />
      </div>
    </div>

    <ClientOnly>
      <VueEasyLightbox
        :visible="visibleRef"
        :imgs="imageUrls"
        :index="indexRef"
        :rotate-disabled="true"
        @hide="onHide"
      />
    </ClientOnly>
  </section>
</template>

<style scoped>
.gallery-section {
  background-color: var(--color-black);
  color: var(--color-white);
  padding: 0;
}
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 0;
  margin: 0;
  padding: 0;
}

.gallery-item {
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}

.gallery-item:hover img {
  transform: scale(1.05);
}

@media (max-width: 600px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
  }
}
</style>
