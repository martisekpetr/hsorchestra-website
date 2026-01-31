<script setup lang="ts">
const { locale } = useI18n()

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

const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat(locale.value, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }).format(date)
}
</script>

<template>
  <div class="concert">
    <h3>
      {{ concert.title }}
    </h3>
    <div class="info-strip">
      <span>
        <span class="icon-wrapper">
          <font-awesome-layers full-width>
            <font-awesome icon="calendar" :style="{ color: '#222' }" />
            <font-awesome-layers-text
              transform="shrink-8 down-3"
              :value="new Date(concert.datetime).getDate()"
              class="fa-inverse"
            />
          </font-awesome-layers>
        </span>
        {{ formatDate(concert.datetime as string) }}
      </span>

      <span>
        <span class="icon-wrapper">
          <font-awesome icon="map-marker-alt" :style="{ color: '#222' }" />
        </span>
        {{ concert.place }}
      </span>
    </div>

    <MDC :value="concert.description" class="description" />

    <div class="footer">
      <span v-if="concert.fb_link">
        <span class="icon-wrapper">
          <font-awesome :icon="['fab', 'facebook']" :style="{ color: '#222' }" />
        </span>
        <a :href="concert.fb_link">fb událost</a>
      </span>
      <span v-if="concert.tickets_link">
        <span class="icon-wrapper">
          <font-awesome icon="ticket-alt" :style="{ color: '#222' }" />
        </span>
        <a :href="concert.tickets_link">vstupenky</a>
      </span>

      <span v-if="concert.invitation">
        <span class="icon-wrapper">
          <font-awesome icon="paperclip" :style="{ color: '#222' }" />
        </span>
        <a :href="concert.invitation">pozvánka</a>
      </span>
    </div>

    <img src="/images/contact.jpg" />
  </div>
</template>

<style scoped>
.concert {
  border-top: 1px solid #222;
  border-bottom: 1px solid #222;
  margin: 10px 0 30px 0px;
  padding: 10px 0;
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto 1fr auto;
  grid-template-areas: 'title img' 'info img' 'description img' 'footer img';
  column-gap: 3%;
  font-size: 1rem;
}

img {
  display: block;
  max-height: 300px;
  max-width: 100%;
  width: auto;
  height: auto;
  white-space: nowrap;
  text-align: right;
  grid-area: img;
  align-self: center;
  justify-self: center;
}

h3 {
  font-weight: 400;
  font-size: 1.4rem;
  color: #222;
  margin-top: 10px;
  margin-bottom: 15px;
  grid-area: title;
}

.info-strip {
  color: #333;
  font-weight: 600;
  font-size: 17px;
  margin: 10px 0 10px 0;
  display: flex;
  justify-content: space-between;
  column-gap: 20px;
  row-gap: 0.5em;
  grid-area: info;
}

.footer {
  color: #333;
  font-weight: 600;
  font-size: 17px;
  margin: 10px 0 10px 0;
  display: flex;
  column-gap: 20px;
  justify-content: flex-start;
  grid-area: footer;
}

.description {
  margin: 25px 0;
  flex: 1 1 auto;
  grid-area: description;
}

a {
  color: #777;
}

a:hover {
  color: black;
}

.icon-wrapper {
  display: inline-block;
  width: 30px;
  text-align: center;
}

@media only screen and (max-width: 800px) {
  .concert {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto 1fr auto auto;
    grid-template-areas: 'title' 'info' 'description' 'img' 'footer';

    .description {
      margin-bottom: 1em;

      & :deep(p) {
        margin-bottom: 0;
      }
    }
  }
  .info-strip {
    flex-direction: column;
  }
}

@media only screen and (max-width: 450px) {
  .footer {
    flex-direction: column;
    row-gap: 0.5em;
  }
}
</style>
