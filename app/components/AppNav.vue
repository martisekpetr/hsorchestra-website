<script setup lang="ts">
// Load translations
const { data: texts } = useTexts()
</script>

<template>
  <nav v-if="texts">
    <ul>
      <li>
        <NuxtLink to="/">{{ texts.nav.home }}</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/#o-big-bandu">{{ texts.nav.about }}</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/koncerty">{{ texts.nav.concerts }}</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/#obsazeni">{{ texts.nav.members }}</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/repertoar">{{ texts.nav.repertoire }}</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/#videa">{{ texts.nav.videos }}</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/#kontakt">{{ texts.nav.contact }}</NuxtLink>
      </li>
    </ul>
  </nav>
</template>
