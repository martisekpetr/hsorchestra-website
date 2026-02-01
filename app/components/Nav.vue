<script setup lang="ts">
// Load translations
const { data: texts } = useTexts()

// Load logo from CMS
const { data: siteImages } = await useAsyncData('siteImages', () =>
  queryCollection('siteImages').first()
)

// Mobile menu state
const mobileMenuOpen = ref(false)
const mobileMenuRef = ref<HTMLElement | null>(null)
const hamburgerRef = ref<HTMLElement | null>(null)

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

// Close menu when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as Node

  // Handle mobile menu
  if (mobileMenuOpen.value) {
    const isClickInsideMenu = mobileMenuRef.value?.contains(target)
    const isClickOnHamburger = hamburgerRef.value?.contains(target)

    if (!isClickInsideMenu && !isClickOnHamburger) {
      closeMobileMenu()
    }
  }
}

// Close menu on scroll
const handleScroll = () => {
  if (mobileMenuOpen.value) {
    closeMobileMenu()
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
  <nav v-if="texts">
    <!-- Desktop Menu -->
    <ul class="nav-menu desktop-menu">
      <li>
        <NuxtLink :to="$localePath('/#o-big-bandu')">{{ texts.nav.about }}</NuxtLink>
      </li>
      <li>
        <NuxtLink :to="$localePath('/koncerty')">{{ texts.nav.concerts }}</NuxtLink>
      </li>
      <li>
        <NuxtLink :to="$localePath('/#obsazeni')">{{ texts.nav.members }}</NuxtLink>
      </li>

      <!-- Logo -->
      <NuxtLink
        v-if="siteImages?.logo"
        :to="$localePath('/')"
        class="logo-link desktop-logo"
        @click="closeMobileMenu"
      >
        <img :src="siteImages.logo" alt="HSO Big Band Logo" class="logo" height="90" />
      </NuxtLink>

      <li>
        <NuxtLink :to="$localePath('/repertoar')">{{ texts.nav.repertoire }}</NuxtLink>
      </li>
      <li>
        <NuxtLink :to="$localePath('/#videa')">{{ texts.nav.videos }}</NuxtLink>
      </li>
      <li>
        <NuxtLink :to="$localePath('/#kontakt')">{{ texts.nav.contact }}</NuxtLink>
      </li>
    </ul>

    <div class="nav-mobile">
      <!-- Mobile Logo (centered) -->
      <NuxtLink
        v-if="siteImages?.logo"
        :to="$localePath('/')"
        class="logo-link mobile-logo"
        @click="closeMobileMenu"
      >
        <img :src="siteImages.logo" alt="HSO Big Band Logo" class="logo" />
      </NuxtLink>

      <!-- Hamburger Button (Mobile Only) -->
      <button
        ref="hamburgerRef"
        class="hamburger"
        :class="{ active: mobileMenuOpen }"
        aria-label="Toggle menu"
        @click.stop="toggleMobileMenu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile Menu Drawer -->
    <ul ref="mobileMenuRef" class="nav-menu mobile-menu" :class="{ open: mobileMenuOpen }">
      <li>
        <NuxtLink :to="$localePath('/')" @click="closeMobileMenu">{{ texts.nav.home }}</NuxtLink>
      </li>
      <li>
        <NuxtLink :to="$localePath('/#o-big-bandu')" @click="closeMobileMenu">
          {{ texts.nav.about }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="$localePath('/koncerty')" @click="closeMobileMenu">
          {{ texts.nav.concerts }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="$localePath('/#obsazeni')" @click="closeMobileMenu">
          {{ texts.nav.members }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="$localePath('/repertoar')" @click="closeMobileMenu">
          {{ texts.nav.repertoire }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="$localePath('/#videa')" @click="closeMobileMenu">
          {{ texts.nav.videos }}
        </NuxtLink>
      </li>
      <li>
        <NuxtLink :to="$localePath('/#kontakt')" @click="closeMobileMenu">
          {{ texts.nav.contact }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
img {
  width: 100%;
  max-width: 100%;
}
</style>

<style scoped>
/* Logo */
.logo-link {
  flex-grow: 2;
  padding: 10px 20px;
  align-items: center;
  text-align: center;
}

.logo {
  height: 90px;
  width: auto;
}

/* Mobile Logo - hidden by default */
.mobile-logo {
  display: none;
}

/* Desktop Logo - visible by default */
.desktop-logo {
  display: block;
}

nav {
  height: var(--menu-height);
}

.nav-mobile {
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  height: var(--menu-height);
  position: relative;
}

/* Desktop Menu */
.desktop-menu {
  list-style: none;
  display: flex;
  justify-content: space-around;
  flex-direction: row;
  height: var(--menu-height);
  position: relative;
  width: 100%;
  padding: 0 10px;
}

.desktop-menu > li {
  flex: 1 1 10%;
  text-align: center;
}

.desktop-menu > li > a {
  display: block;
  padding: 0 10px;

  font-size: 1.4rem;
  font-weight: 500;
  text-transform: uppercase;
  color: var(--color-menu-grey);
  line-height: var(--menu-height);
  height: var(--menu-height);
  position: relative;
  transition: color 0.2s;
  text-decoration: none;

  white-space: nowrap;
}

.desktop-menu > li > a:hover {
  color: var(--color-menu-grey);
}

/* Underline Animation */
.desktop-menu > li > a::after {
  content: '';
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 5px;
  background-color: var(--color-light-grey);
  transition: width 0.2s;
}

.desktop-menu > li > a:hover::after {
  width: 100%;
}

/* Hamburger Button */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  right: 30px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 3px;
  background-color: var(--color-menu-grey);
  transition: all 0.3s;
}

.hamburger.active span:nth-child(1) {
  transform: translateY(10.5px) rotate(45deg);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: translateY(-10.5px) rotate(-45deg);
}

/* Mobile Menu */
.mobile-menu {
  display: none;
  position: absolute;
  top: var(--menu-height);
  right: 0;
  width: 200px;
  background-color: var(--color-white);
  box-shadow: -5px 5px 5px 0px rgba(0, 0, 0, 0.1);
  list-style: none;
  z-index: 5;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.4s ease;
}

.mobile-menu.open {
  max-height: 600px;
}

.mobile-menu li {
  border-bottom: 1px solid var(--color-border-grey);
}

.mobile-menu li a {
  display: block;
  padding: 15px 20px;
  font-size: 1.1rem;
  font-weight: 500;
  text-transform: uppercase;
  color: var(--color-menu-grey);
  transition: background-color 0.2s;
}

.mobile-menu li a:hover {
  background-color: #f5f5f5;
}

/* Responsive */
@media (max-width: 900px) {
  .desktop-menu {
    display: none;
  }

  /* Hide desktop logo, show mobile logo */
  .desktop-logo {
    display: none;
  }

  .mobile-logo {
    display: flex;
    flex: 0 1 auto;
    padding: 10px;
  }

  .mobile-logo .logo {
    height: 80px;
  }

  .hamburger {
    display: flex;
  }

  .mobile-menu {
    display: block;
  }
}
</style>
