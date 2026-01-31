<script setup lang="ts">
const { data: texts } = useTexts()

const { data: repertoar } = await useAsyncData('repertoar', () =>
  queryCollection('repertoar').all()
)

const sortedRepertoar = computed(() => {
  if (!repertoar.value) return []
  return [...repertoar.value].sort((a: any, b: any) => a.title.localeCompare(b.title))
})
</script>

<template>
  <div v-if="texts" class="container">
    <section>
      <h2>{{ texts.repertoire.pageTitle }}</h2>

      <MDC :value="texts.repertoire.intro" tag="p" unwrap="p" />

      <ul v-if="sortedRepertoar.length > 0">
        <li v-for="song in sortedRepertoar" :key="song.path">
          {{ song.title }} ({{ song.author }})
        </li>
      </ul>
      <MDC v-else :value="texts.repertoire.noSongs" tag="p" unwrap="p" />
    </section>
  </div>
</template>

<style scoped>
ul {
  margin-top: 50px;
  padding: 0;
}
li {
  list-style: none;
  text-align: center;
  padding: 0.2em;
}
</style>
