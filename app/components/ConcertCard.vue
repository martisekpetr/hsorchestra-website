<script setup lang="ts">
// Load translations
const { data: texts } = useTexts()

defineProps<{
  concert: {
    title: string
    datetime: string | Date
    place: string
    description: string
    fb_link?: string
    tickets_link?: string
    invitation?: string
  }
}>()
</script>

<template>
  <article v-if="texts">
    <h3>{{ concert.title }}</h3>
    <p>
      <strong>{{ texts.concerts.date }}</strong> {{ concert.datetime }}
    </p>
    <p>
      <strong>{{ texts.concerts.place }}</strong> {{ concert.place }}
    </p>
    <div v-html="concert.description"></div>
    <div v-if="concert.fb_link">
      <a :href="concert.fb_link" target="_blank">{{ texts.concerts.fbEvent }}</a>
    </div>
    <div v-if="concert.tickets_link">
      <a :href="concert.tickets_link" target="_blank">{{ texts.concerts.tickets }}</a>
    </div>
    <div v-if="concert.invitation">
      <a :href="concert.invitation" target="_blank">{{ texts.concerts.invitation }}</a>
    </div>
  </article>
</template>
