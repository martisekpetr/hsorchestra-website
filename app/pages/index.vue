<script setup lang="ts">
const { data: texts } = useTexts()
</script>

<template>
  <div class="container">
    <section v-if="texts">
      <h1>{{ texts.hero.title }}</h1>
      <MDC :value="texts.hero.subtitle" tag="p" unwrap="p" />
    </section>
    <UpcomingEvents />
    <About />
    <Gallery />
    <Members />
    <Videos />
    <Contact />
  </div>
</template>
