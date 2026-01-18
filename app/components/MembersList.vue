<script setup lang="ts">
const { data: texts } = await useTexts()
const { data: members } = await useAsyncData('members', () => queryCollection('members').all())

// Sort members by order and filter active
const sortedMembers = computed(() => {
  if (!members.value) return []
  return [...members.value]
    .filter((member: any) => member.status === 'active')
    .sort((a: any, b: any) => a.order - b.order)
})
</script>

<template>
  <section v-if="texts && members">
    <h2>{{ texts.members.heading }}</h2>
    <div v-if="sortedMembers.length === 0">
      <p>{{ texts.members.noMembers }}</p>
    </div>
    <div v-for="member in sortedMembers" v-else :key="member.name">
      <h3>{{ member.name }}</h3>
      <p>
        <strong>{{ texts.members.instruments }}:</strong>
        {{ member.instrument.join(', ') }}
      </p>
      <p>
        <strong>{{ texts.members.status }}:</strong>
        {{ member.status }}
      </p>
    </div>
  </section>
</template>
