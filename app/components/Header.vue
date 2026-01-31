<script setup lang="ts">
// Load site images (hero)
const { data: siteImages } = await useAsyncData('siteImages', () =>
  queryCollection('siteImages').first()
)
</script>

<template>
  <header>
    <Nav />
    <div class="hero-container">
      <img
        v-if="siteImages?.hero"
        :src="String(siteImages.hero)"
        alt="HSO Big Band"
        class="hero-image"
      />
      <LanguageSwitcher />
    </div>
  </header>
</template>

<style scoped>
.hero-container {
  position: relative;
  width: 100%;
}

.hero-image {
  width: 100%;
  max-width: 100%;
  height: auto;
  display: block;
}
</style>
