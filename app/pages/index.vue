<script setup lang="ts">
// Load translations
const { data: texts } = await useTexts()

const { data: koncerty } = await useAsyncData('koncerty', () => queryCollection('koncerty').all())
const { data: videos } = await useAsyncData('videos', () => queryCollection('videos').all())

// Get upcoming concerts (limit to 3)
const upcomingConcerts = computed(() => {
  if (!koncerty.value) return []
  const now = new Date()
  return koncerty.value
    .filter((concert: any) => new Date(concert.datetime) >= now)
    .sort((a: any, b: any) => new Date(a.datetime).getTime() - new Date(b.datetime).getTime())
    .slice(0, 3)
})

// Sort videos by order
const sortedVideos = computed(() => {
  if (!videos.value) return []
  return [...videos.value].sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
})
</script>

<template>
  <div v-if="texts">
    <!-- Hero Section -->
    <header>
      <h1>{{ texts.hero.title }}</h1>
      <p>{{ texts.hero.subtitle }}</p>
    </header>

    <!-- Upcoming Concerts Section -->
    <section id="koncerty">
      <h2>{{ texts.upcomingConcerts.heading }}</h2>
      <div v-if="upcomingConcerts.length > 0">
        <ConcertCard v-for="concert in upcomingConcerts" :key="concert.path" :concert="concert" />
        <p>
          <NuxtLink to="/koncerty">{{ texts.common.more }}</NuxtLink>
        </p>
      </div>
      <p v-else>{{ texts.upcomingConcerts.noConcerts }}</p>
    </section>

    <!-- About Section -->
    <section id="o-big-bandu">
      <h2>{{ texts.about.heading }}</h2>

      <p>{{ texts.about.mainText }}</p>

      <!-- History Subsection -->
      <h3>{{ texts.about.historyHeading }}</h3>
      <p>{{ texts.about.historyText }}</p>

      <!-- Event Performance Subsection -->
      <h3>{{ texts.about.eventPerformanceHeading }}</h3>
      <p>{{ texts.about.eventPerformanceParagraph1 }}</p>
      <p>{{ texts.about.eventPerformanceParagraph2 }}</p>
      <p>{{ texts.about.eventPerformanceParagraph3 }}</p>
    </section>

    <!-- Members Section -->
    <section id="obsazeni">
      <h2>{{ texts.members.heading }}</h2>
      <MembersList />
    </section>

    <!-- Videos Section -->
    <section id="videa">
      <h2>{{ texts.videos.heading }}</h2>
      <VideosList v-if="sortedVideos.length > 0" :videos="sortedVideos" />
      <p v-else>{{ texts.videos.noVideos }}</p>
    </section>

    <!-- Contact Section -->
    <section id="kontakt">
      <h2>{{ texts.contact.heading }}</h2>
      <p>{{ texts.contact.intro }}</p>
      <ContactInfo />
      <p>{{ texts.contact.socialPrompt }}</p>
    </section>
  </div>
</template>
