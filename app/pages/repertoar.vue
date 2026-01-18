<script setup lang="ts">
// Load translations
const { data: texts } = useTexts()

// Query all repertoire songs
const { data: repertoar } = await useAsyncData('repertoar', () =>
  queryCollection('repertoar').all()
)

// Sort songs alphabetically by title
const sortedRepertoar = computed(() => {
  if (!repertoar.value) return []
  return [...repertoar.value].sort((a: any, b: any) => a.title.localeCompare(b.title))
})
</script>

<template>
  <div v-if="texts">
    <h1>{{ texts.repertoire.pageTitle }}</h1>

    <p>{{ texts.repertoire.intro }}</p>

    <section>
      <h2>{{ texts.repertoire.songList }}</h2>
      <ul v-if="sortedRepertoar.length > 0">
        <li v-for="song in sortedRepertoar" :key="song.path">
          <strong>{{ song.title }}</strong> ({{ song.author }})
          <span v-if="song.singer"> - zpěv: {{ song.singer }}</span>
          <span v-if="song.lang"> [{{ song.lang }}]</span>
        </li>
      </ul>
      <p v-else>{{ texts.repertoire.noSongs }}</p>
    </section>

    <p>
      <NuxtLink to="/koncerty">{{ texts.repertoire.viewConcerts }}</NuxtLink>
    </p>
  </div>
</template>
