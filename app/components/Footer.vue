<script setup lang="ts">
const { data: texts } = useTexts()
const { data: contact } = await useAsyncData('contact', () => queryCollection('contact').first())

const year = computed(() => new Date().getFullYear())
</script>

<template>
  <footer v-if="texts && contact">
    <div class="mail">
      <span>
        <EnvelopeIcon />
        <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
      </span>
    </div>

    <small>&copy; {{ year }} {{ texts.footer.copyright }}</small>

    <div class="socials">
      <a
        href="https://www.instagram.com/horacek_swing_orchestra/"
        aria-label="Instagram"
        class="icon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <InstagramIcon />
      </a>
      <a
        href="https://www.facebook.com/hsorchestra"
        aria-label="Facebook"
        class="icon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FacebookIcon />
      </a>
      <a
        href="https://www.youtube.com/channel/UC13p9isjtBm0SH2A1KfP9Ew"
        aria-label="YouTube"
        class="icon"
        target="_blank"
        rel="noopener noreferrer"
      >
        <YoutubeIcon />
      </a>
    </div>
  </footer>
</template>

<style scoped>
footer {
  border-top: 1px solid var(--color-border-grey);
  color: var(--color-dark-grey);
  padding: 30px 50px 20px 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas: 'mail copy socials';
  font-size: 1rem;
}

.mail {
  white-space: nowrap;
  grid-area: mail;
}

.mail a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color 0.2s;
}

.mail a:hover {
  color: var(--color-secondary);
}

.mail svg {
  margin-right: 5px;
}

small {
  white-space: nowrap;
  color: var(--color-lighter-grey);
  grid-area: copy;
  text-align: center;
}

.socials {
  text-align: right;
  grid-area: socials;
  display: flex;
  gap: 15px;
  justify-content: flex-end;
  align-items: center;
}

.socials .icon {
  display: inline-block;
  transition: opacity 0.2s;
}

.socials .icon:hover {
  opacity: 0.7;
}

@media (max-width: 900px) {
  footer {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    grid-template-areas: 'mail socials' 'copy copy';
    row-gap: 10px;
  }

  small {
    text-align: right;
    white-space: initial;
  }
}

@media (max-width: 400px) {
  footer {
    grid-template-columns: 1fr;
    grid-template-areas: 'mail' 'socials' 'copy';
  }

  .mail {
    text-align: right;
  }

  .socials {
    justify-content: flex-end;
  }
}
</style>
