<script setup lang="ts">
// Load translations
const { data: texts } = await useTexts()

const { data: koncerty } = await useAsyncData('koncerty', () => queryCollection('koncerty').all())

// Get upcoming concerts (limit to 3)
const upcomingConcerts = computed(() => {
  if (!koncerty.value) return []
  const now = new Date()
  return koncerty.value
    .filter((concert: any) => new Date(concert.datetime) >= now)
    .sort((a: any, b: any) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
    .slice(0, 3)
})
</script>

<template>
  <section v-if="texts" id="koncerty">
    <h2>{{ texts.upcomingConcerts.heading }}</h2>
    <div v-if="upcomingConcerts.length > 0">
      <!-- <ConcertCard v-for="concert in upcomingConcerts" :key="concert.path" :concert="concert" /> -->
      <Concert v-for="concert in upcomingConcerts" :key="concert.path" :concert="concert" />
      <p>
        <NuxtLink to="/koncerty">{{ texts.common.more }}</NuxtLink>
      </p>
    </div>
    <MDC v-else :value="texts.upcomingConcerts.noConcerts" tag="p" unwrap="p" />
  </section>
</template>
