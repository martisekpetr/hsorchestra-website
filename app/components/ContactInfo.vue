<script setup lang="ts">
// Load translations
const { data: texts } = useTexts()
const { data: contact } = await useAsyncData('contact', () => queryCollection('contact').first())
</script>

<template>
  <div v-if="texts && contact">
    <p>
      <strong>{{ texts.contact.manager }}</strong> {{ contact.name }}
    </p>
    <p>
      <strong>{{ texts.contact.email }}</strong>
      <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
    </p>
    <p>
      <strong>{{ texts.contact.phone }}</strong>
      <a :href="`tel:${contact.phone}`">{{ contact.phone }}</a>
    </p>
  </div>
</template>
