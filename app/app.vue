<script setup>
// Load Google Fonts and set favicon
useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: '',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600&family=Source+Sans+Pro:wght@400;500;600&display=swap',
    },
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico',
    },
  ],
})
</script>

<template>
  <div class="app-container">
    <NuxtRouteAnnouncer />
    <main>
      <Header />
      <NuxtPage />
      <Footer />
    </main>
  </div>
</template>

<style>
/* CSS Variables */
:root {
  /* Colors */
  --color-primary: #810101;
  --color-secondary: #812424;
  --color-dark-grey: #333;
  --color-menu-grey: #222;
  --color-light-grey: #666;
  --color-lighter-grey: #777;
  --color-border-grey: #ccc;
  --color-black: #000000;
  --color-white: #ffffff;

  /* Typography */
  --font-primary:
    'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif;
  --font-heading:
    'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue',
    Arial, sans-serif;

  /* Spacing */
  --section-padding-desktop: 80px;
  --section-padding-tablet: 40px;
  --section-padding-mobile: 20px;
  --menu-height: 120px;
  --container-max-width: 1366px;
}

/* CSS Reset */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Base Styles */
html {
  font-size: 16px;
}

body {
  font-family: var(--font-primary);
  font-size: 1.2rem;
  line-height: 1.4;
  color: var(--color-dark-grey);
  background-color: var(--color-white);
  text-align: justify;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

/* Typography */
h1 {
  font-family: var(--font-heading);
  font-size: 2.5rem;
  font-weight: 600;
  letter-spacing: 1px;
  color: var(--color-primary);
  margin-bottom: 1rem;
  margin-top: 1rem;
}

h2 {
  font-size: 2.1rem;
  font-weight: 600;
  color: var(--color-primary);
  margin: 1ex 0 1.5ex 0;
}

h3 {
  font-size: 1.6rem;
  font-weight: 400;
  color: var(--color-primary);
  margin-bottom: 0.8rem;
  margin-top: 1.5rem;
}

p {
  margin-bottom: 1.5em;
}

a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color 0.2s;
}

a:hover {
  color: var(--color-secondary);
}

/* Container & Layout */
.app-container {
  background: linear-gradient(180deg, white 0px, white var(--menu-height), #222 var(--menu-height));
}

main {
  background-color: var(--color-white);
  max-width: var(--container-max-width);
  margin: 0 auto;
}

.container {
  padding-top: 15px;
}

/* Sections */
section {
  padding: 30px var(--section-padding-desktop) 60px;
  background-color: var(--color-white);
}

/* Responsive Typography & Spacing */
@media (max-width: 900px) {
  body {
    font-size: 1.1rem;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.6rem;
  }

  h3 {
    font-size: 1.4rem;
  }

  section {
    padding: 15px var(--section-padding-tablet) 30px;
  }
}

@media (max-width: 600px) {
  body {
    text-align: left;
    font-size: 1rem;
  }

  h1 {
    font-size: 1.6rem;
  }

  h2 {
    font-size: 1.4rem;
  }

  h3 {
    font-size: 1.2rem;
  }

  section {
    padding: 15px var(--section-padding-mobile) 30px;
  }
}
</style>
