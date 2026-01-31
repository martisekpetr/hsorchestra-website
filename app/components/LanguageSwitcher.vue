<script setup lang="ts">
// Language switching
const { locale, locales, setLocale, localeProperties } = useI18n()

// Language dropdown state
const langDropdownOpen = ref(false)
const langDropdownRef = ref<HTMLElement | null>(null)

const toggleLangDropdown = () => {
  langDropdownOpen.value = !langDropdownOpen.value
}

const closeLangDropdown = () => {
  langDropdownOpen.value = false
}

const chooseLocale = (code: any) => {
  setLocale(code)
  closeLangDropdown()
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node

  if (langDropdownOpen.value) {
    const isClickInsideLangDropdown = langDropdownRef.value?.contains(target)

    if (!isClickInsideLangDropdown) {
      closeLangDropdown()
    }
  }
}

// Close menu on scroll
const handleScroll = () => {
  if (langDropdownOpen.value) {
    closeLangDropdown()
  }
}

// Add event listeners on mount, remove on unmount
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('scroll', handleScroll, true)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('scroll', handleScroll, true)
})
</script>

<template>
  <div ref="langDropdownRef" class="language-switcher">
    <button
      class="lang-button"
      :class="{ active: langDropdownOpen }"
      @click.stop="toggleLangDropdown"
    >
      <span>{{ localeProperties.switcherLabel }}</span>
      <svg
        class="chevron"
        :class="{ open: langDropdownOpen }"
        width="8"
        height="5"
        viewBox="0 0 8 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 1L4 4L7 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
      </svg>
    </button>
    <ul v-if="langDropdownOpen" class="lang-dropdown">
      <li v-for="loc in locales" :key="loc.code">
        <a
          href="#"
          :class="{ active: locale === loc.code }"
          class="lang-option"
          @click.prevent.stop="chooseLocale(loc.code)"
        >
          {{ loc.switcherLabel }}
        </a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Language Switcher Pill */
.language-switcher {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
}

.lang-button {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 12px;
  font-size: 0.9rem;
  font-weight: 500;
  font-family: var(--font-primary);
  text-transform: uppercase;
  color: var(--color-white);
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s;
  white-space: nowrap;
}

.lang-button:hover {
  background: rgba(0, 0, 0, 0.5);
  border-color: rgba(255, 255, 255, 0.3);
}

.chevron {
  transition: transform 0.2s;
  opacity: 0.8;
}

.chevron.open {
  transform: rotate(180deg);
}

/* Dropdown menu */
.lang-dropdown {
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  list-style: none;
  padding: 4px;
  margin: 0;
  min-width: 60px;
  z-index: 100;
}

.lang-option {
  display: block;
  padding: 6px 12px;
  font-size: 0.9rem;
  font-weight: 500;
  font-family: var(--font-primary);
  text-transform: uppercase;
  color: var(--color-white);
  text-decoration: none;
  transition: background-color 0.15s;
  white-space: nowrap;
  text-align: center;
  border-radius: 8px;
}

.lang-option:hover {
  background: rgba(255, 255, 255, 0.15);
}

.lang-option.active {
  background: rgba(255, 255, 255, 0.2);
}
</style>
