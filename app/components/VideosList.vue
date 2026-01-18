<template>
  <section>
    <h2>Videa</h2>
    <div v-for="video in videos" :key="video.videoId">
      <h3>{{ video.description }}</h3>
      <p><strong>YouTube ID:</strong> {{ video.videoId }}</p>
      <p>URL: https://www.youtube.com/watch?v={{ video.videoId }}</p>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  videos: Array<{
    videoId: string
    description: string
    order?: number
  }>
}>()
</script>
