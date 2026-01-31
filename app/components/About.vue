<script setup lang="ts">
const { data: texts } = await useTexts()

const { data: siteImages } = await useAsyncData('siteImages', () =>
  queryCollection('siteImages').first()
)
</script>

<template>
  <section v-if="texts" id="o-big-bandu">
    <h2>{{ texts.about.heading }}</h2>
    <img
      v-if="siteImages?.about"
      :src="String(siteImages.about)"
      :alt="texts.about.heading"
      class="img-float"
    />
    <MDC :value="texts.about.mainText" tag="p" unwrap="p" />
    <img
      v-if="siteImages?.about"
      :src="String(siteImages.about)"
      :alt="texts.about.heading"
      class="img-below"
    />

    <h3>{{ texts.about.historyHeading }}</h3>
    <MDC :value="texts.about.historyText" tag="p" unwrap="p" />

    <h3>{{ texts.about.eventPerformanceHeading }}</h3>
    <MDC :value="texts.about.eventPerformanceParagraph1" tag="p" unwrap="p" />
    <MDC :value="texts.about.eventPerformanceParagraph2" tag="p" unwrap="p" />
    <MDC :value="texts.about.eventPerformanceParagraph3" tag="p" unwrap="p" />
  </section>
</template>

<style scoped>
.img-float {
  float: right;
  margin: 0 0 20px 20px;
  max-width: 50%;
}
.img-below {
  display: none;
  float: none;
  margin: 0 0 20px 0;
  max-width: 100%;
}

@media (max-width: 900px) {
  .img-float {
    display: none;
  }
  .img-below {
    display: block;
  }
}
</style>
