<script setup lang="ts">
const { data: texts } = await useTexts()
const { data: contact } = await useAsyncData('contact', () => queryCollection('contact').first())
const { data: siteImages } = await useAsyncData('siteImages', () =>
  queryCollection('siteImages').first()
)
</script>

<template>
  <section v-if="texts && contact" id="kontakt">
    <h2>{{ texts.contact.heading }}</h2>
    <div class="contact-layout">
      <div class="contact-left">
        <MDC :value="texts.contact.intro" tag="p" unwrap="p" />
        <div class="contact-grid">
          <div class="contact-label">{{ texts.contact.manager }}</div>
          <div class="contact-value">{{ contact.name }}</div>

          <div class="contact-label">{{ texts.contact.email }}</div>
          <div class="contact-value">
            <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
          </div>

          <div class="contact-label">{{ texts.contact.phone }}</div>
          <div class="contact-value">
            <a :href="`tel:${contact.phone}`">{{ contact.phone }}</a>
          </div>
        </div>
        <MDC :value="texts.contact.socialPrompt" tag="p" unwrap="p" />
        <div class="socials">
          <a
            href="https://www.instagram.com/horacek_swing_orchestra/"
            aria-label="Instagram"
            class="icon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
            Instagram
          </a>
          <a
            href="https://www.facebook.com/hsorchestra"
            aria-label="Facebook"
            class="icon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon />
            Facebook
          </a>
          <a
            href="https://www.youtube.com/channel/UC13p9isjtBm0SH2A1KfP9Ew"
            aria-label="YouTube"
            class="icon"
            target="_blank"
            rel="noopener noreferrer"
          >
            <YoutubeIcon />
            <div>YouTube</div>
          </a>
        </div>
      </div>
      <div class="contact-right">
        <img
          v-if="siteImages?.contact"
          :src="String(siteImages.contact)"
          :alt="texts.contact.heading"
          class="contact-image"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-layout {
  display: flex;
  justify-content: space-between;
  gap: 10%;
}

.contact-left,
.contact-right {
  flex: 1;
}

.contact-image {
  margin-bottom: 1rem;
  max-width: 100%;
}

@media (max-width: 900px) {
  .contact-layout {
    flex-direction: column;
    gap: 2rem;
  }
  .contact-right {
    text-align: center;
  }
}

.contact-grid {
  display: grid;
  grid-template-columns: 40% 60%;
  column-gap: 20px;
  row-gap: 0.4rem;
  margin-bottom: 2rem;
}

.contact-label {
  font-weight: 600;
  justify-self: right;
  text-align: right;
}

.contact-value {
  text-align: left;
}

.contact-value a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color 0.2s;
}

.contact-value a:hover {
  color: var(--color-secondary);
}

.socials {
  display: flex;
  justify-content: space-around;
}
.icon {
  display: flex;
  vertical-align: middle;
  align-items: center;

  svg {
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
  }
}
.icon:hover {
  opacity: 0.7;
}

@media (max-width: 450px) {
  .contact-grid {
    grid-template-columns: 1fr;
    row-gap: 0.2rem;
  }

  .contact-label {
    justify-self: left;
    text-align: left;
  }
}
</style>
