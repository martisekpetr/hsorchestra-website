<script setup lang="ts">
// Load translations
const { data: texts } = await useTexts()
</script>

<template>
  <section v-if="texts" id="videa" class="videos-section">
    <!-- <h2>{{ texts.videos.heading }}</h2> -->
    <VideosGrid />
  </section>
</template>

<style scoped>
.videos-section {
  background-color: var(--color-black);
  color: var(--color-white);
  padding: 30px 0 60px;
}

.videos-section h2 {
  color: var(--color-white);
  text-align: center;
  padding: 0 var(--section-padding-desktop) 20px;
  margin: 0;
}

@media (max-width: 900px) {
  .videos-section h2 {
    padding: 0 var(--section-padding-tablet) 15px;
  }
}

@media (max-width: 600px) {
  .videos-section h2 {
    padding: 0 var(--section-padding-mobile) 10px;
  }
}
</style>
