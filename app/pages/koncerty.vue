<script setup lang="ts">
const { data: texts } = useTexts()
const { locale } = useI18n()

const { data: koncerty } = await useAsyncData('koncerty', () => queryCollection('koncerty').all())

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

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}
</script>

<template>
  <div v-if="texts" class="container">
    <section>
      <h2>{{ texts.concerts.pageTitle }}</h2>

      <h3>{{ texts.concerts.upcoming }}</h3>
      <div v-if="upcomingConcerts.length > 0">
        <Concert v-for="concert in upcomingConcerts" :key="concert.path" :concert="concert" />
      </div>
      <p v-else>{{ texts.upcomingConcerts.noConcerts }}</p>

      <h3>{{ texts.concerts.past }}</h3>
      <ul v-if="pastConcerts.length > 0">
        <li v-for="concert in pastConcerts" :key="concert.datetime">
          <h5>{{ concert.title }}</h5>
          {{ formatDate(concert.datetime) }} - {{ concert.place }}
        </li>
      </ul>
      <p v-else>{{ texts.concerts.noPastConcerts }}</p>
    </section>
  </div>
</template>

<style scoped>
ul {
  padding-left: 1em;
}
li {
  list-style: none;
  margin-bottom: 1em;
}
h5 {
  font-size: 1.1rem;
}
</style>
