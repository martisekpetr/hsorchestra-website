<script setup lang="ts">
const { data: texts } = await useTexts()

const { data: members } = await useAsyncData('members', () => queryCollection('members').all())

// Filter only active members
const activeMembers = computed(() => {
  if (!members.value) return []
  return members.value.filter((member: any) => member.status === 'active')
})

// Instrument name type
type InstrumentName =
  | 'trumpet'
  | 'trombone'
  | 'flute'
  | 'clarinet'
  | 'altoSax'
  | 'tenorSax'
  | 'baritoneSax'
  | 'guitar'
  | 'piano'
  | 'bass'
  | 'drums'
  | 'vocals'
  | 'conductor'

// Instrument positions - exact coordinates from old website
const instruments: Array<{ name: InstrumentName; style: Record<string, string>; icon: string }> = [
  {
    name: 'trumpet',
    style: { left: '7%', top: '67%', width: '8%' },
    icon: 'images/instruments/trumpet.svg',
  },
  {
    name: 'trombone',
    style: { left: '24%', top: '71%', width: '12%' },
    icon: 'images/instruments/trombone.svg',
  },
  {
    name: 'flute',
    style: { left: '50%', top: '48%', width: '12%' },
    icon: 'images/instruments/flute.svg',
  },
  {
    name: 'clarinet',
    style: { left: '36%', top: '57%', width: '9%' },
    icon: 'images/instruments/clarinet.svg',
  },
  {
    name: 'altoSax',
    style: { left: '65%', top: '58%', width: '8%' },
    icon: 'images/instruments/alt_sax.svg',
  },
  {
    name: 'tenorSax',
    style: { left: '80%', top: '68%', width: '8%' },
    icon: 'images/instruments/tenor_sax.svg',
  },
  {
    name: 'baritoneSax',
    style: { left: '93%', top: '58%', width: '8%' },
    icon: 'images/instruments/bariton_sax.svg',
  },
  {
    name: 'guitar',
    style: { left: '68%', top: '20%', width: '10%' },
    icon: 'images/instruments/guitar.svg',
  },

  {
    name: 'piano',
    style: { left: '87%', top: '16%', width: '19%' },
    icon: 'images/instruments/piano.svg',
  },
  {
    name: 'bass',
    style: { left: '34%', top: '20%', width: '10%' },
    icon: 'images/instruments/bass.svg',
  },
  {
    name: 'drums',
    style: { left: '50%', top: '12%', width: '17%' },
    icon: 'images/instruments/drums.svg',
  },
  {
    name: 'vocals',
    style: { left: '15%', top: '18%', width: '13%' },
    icon: 'images/instruments/singers.svg',
  },
  {
    name: 'conductor',
    style: { left: '50%', top: '85%', width: '10%' },
    icon: 'images/instruments/conductor.svg',
  },
]

// Get musicians for a specific instrument
const getMusiciansForInstrument = (instrumentName: InstrumentName) => {
  if (!activeMembers.value) return []
  return activeMembers.value
    .filter((member: any) => member.instrument.includes(instrumentName))
    .sort((a: any, b: any) => {
      if (typeof a.order === 'undefined') return 1
      if (typeof b.order === 'undefined') return -1
      return a.order - b.order
    })
}
</script>

<template>
  <section v-if="texts" id="obsazeni">
    <h2>{{ texts.members.heading }}</h2>
    <div class="diagram">
      <div
        v-for="instrument in instruments"
        :key="instrument.name"
        class="instrument"
        :style="instrument.style"
      >
        <img
          :src="instrument.icon"
          :alt="texts.members.instrumentNames[instrument.name]"
          class="instrument-icon"
        />
        <div class="title">{{ texts.members.instrumentNames[instrument.name] }}</div>
        <div
          v-for="musician in getMusiciansForInstrument(instrument.name)"
          :key="musician.name"
          class="names"
        >
          {{ musician.name }}
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.diagram {
  margin: 20px 0;
  height: 600px;
  width: 100%;
  position: relative;
}

.instrument {
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, -50%);
  text-align: center;
  white-space: nowrap;
}

.instrument-icon {
  width: 100%;
  height: auto;
  max-height: 9rem;
}

.title {
  font-weight: bold;
  font-size: 1rem;
  margin-top: 0.5rem;
}

.names {
  font-size: 1rem;
}

/* Responsive adjustments */
@media (max-width: 1100px) {
  .title,
  .names {
    font-size: 0.9rem;
  }
}

@media (max-width: 900px) {
  .title,
  .names {
    font-size: 0.85rem;
  }

  .instrument-icon {
    height: 100%;
  }
}

@media (max-width: 600px) {
  .diagram {
    height: auto;
    margin: 0;
  }

  .instrument-icon {
    display: none;
  }

  .instrument {
    position: initial;
    transform: none;
    margin-bottom: 1.5em;
    width: 100% !important;
  }

  .title,
  .names {
    font-size: inherit;
  }

  .names {
    margin-top: 0.1em;
  }
}
</style>
