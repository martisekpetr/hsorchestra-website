<script setup lang="ts">
// Load translations
const { data: texts } = useTexts()

// Query all concerts
const { data: koncerty } = await useAsyncData('koncerty', () => queryCollection('koncerty').all())

// Split concerts into upcoming and past
const now = new Date()

const upcomingConcerts = computed(() => {
  if (!koncerty.value) return []
  return koncerty.value
    .filter((concert: any) => new Date(concert.datetime) >= now)
    .sort((a: any, b: any) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
})

const pastConcerts = computed(() => {
  if (!koncerty.value) return []
  return koncerty.value
    .filter((concert: any) => new Date(concert.datetime) < now)
    .sort((a: any, b: any) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime())
})
</script>

<template>
  <div v-if="texts">
    <h1>{{ texts.concerts.pageTitle }}</h1>

    <!-- Upcoming Concerts -->
    <section>
      <h2>{{ texts.concerts.upcoming }}</h2>
      <div v-if="upcomingConcerts.length > 0">
        <ConcertCard v-for="concert in upcomingConcerts" :key="concert.path" :concert="concert" />
      </div>
      <p v-else>{{ texts.upcomingConcerts.noConcerts }}</p>
    </section>

    <!-- Past Concerts -->
    <section>
      <h2>{{ texts.concerts.past }}</h2>
      <div v-if="pastConcerts.length > 0">
        <ConcertCard v-for="concert in pastConcerts" :key="concert.path" :concert="concert" />
      </div>
      <p v-else>{{ texts.concerts.noPastConcerts }}</p>
    </section>

    <p><NuxtLink to="/repertoar">Zobrazit repertoár</NuxtLink></p>
  </div>
</template>
