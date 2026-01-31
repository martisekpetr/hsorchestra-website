<template>
  <NuxtLink :to="localePath(href)" :target="props.target">
    <slot />
  </NuxtLink>
</template>

<script setup lang="ts">
// replace all <a> links inside MDC components with the localized version
import type { PropType } from 'vue'

const localePath = useLocalePath()

const props = defineProps({
  href: {
    type: String,
    default: '',
  },
  target: {
    type: String as PropType<
      '_blank' | '_parent' | '_self' | '_top' | (string & object) | null | undefined
    >,
    default: undefined,
    required: false,
  },
})
</script>
