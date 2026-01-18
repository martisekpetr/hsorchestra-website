<script setup lang="ts">
// Load gallery data directly in the component
const { data: gallery } = await useAsyncData('gallery', () => queryCollection('gallery').all())

// Sort gallery by order
const sortedGallery = computed(() => {
  if (!gallery.value) return []
  return [...gallery.value].sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
})
</script>

<template>
  <div v-if="sortedGallery.length > 0" class="gallery-grid">
    <div v-for="photo in sortedGallery" :key="photo.path" class="gallery-item">
      <img :src="photo.image" :alt="photo.title" loading="lazy" />
      <div class="gallery-caption">
        <h4>{{ photo.title }}</h4>
        <p v-if="photo.description">{{ photo.description }}</p>
        <time v-if="photo.date">{{ new Date(photo.date).toLocaleDateString() }}</time>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.gallery-item {
  display: flex;
  flex-direction: column;
}

.gallery-item img {
  width: 100%;
  height: auto;
  aspect-ratio: 16/9;
  object-fit: cover;
  border-radius: 4px;
}

.gallery-caption {
  padding: 0.5rem 0;
}

.gallery-caption h4 {
  margin: 0.5rem 0 0.25rem 0;
  font-size: 1rem;
}

.gallery-caption p {
  margin: 0.25rem 0;
  font-size: 0.9rem;
  color: #666;
}

.gallery-caption time {
  font-size: 0.85rem;
  color: #999;
}
</style>
