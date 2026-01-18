import { defineContentConfig, defineCollection, z } from '@nuxt/content'

// Koncerty (Concerts) schema
const koncertySchema = z.object({
  datetime: z.string().or(z.date()),
  place: z.string(),
  title: z.string(),
  description: z.string(),
  fb_link: z.string().optional(),
  tickets_link: z.string().optional(),
  invitation: z.string().optional(),
  image: z.string().optional(),
})

// Repertoár (Songs) schema
const repertoarSchema = z.object({
  title: z.string(),
  author: z.string(),
  singer: z.string().optional(),
  lang: z.enum(['czech', 'foreign']),
})

// Members schema
const membersSchema = z.object({
  name: z.string(),
  instrument: z.array(z.string()),
  order: z.number(),
  status: z.enum(['active', 'inactive', 'left']).default('active'),
})

// Videos schema
const videosSchema = z.object({
  videoId: z.string(),
  description: z.string(),
  order: z.number().optional(),
})

// Contact schema
const contactSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
})

// Locale schema (translations)
const localeSchema = z.object({
  siteName: z.string(),
  siteDescription: z.string(),
  nav: z.object({
    home: z.string(),
    about: z.string(),
    concerts: z.string(),
    members: z.string(),
    repertoire: z.string(),
    videos: z.string(),
    contact: z.string(),
  }),
  hero: z.object({
    title: z.string(),
    subtitle: z.string(),
  }),
  upcomingConcerts: z.object({
    heading: z.string(),
    moreButton: z.string(),
    noConcerts: z.string(),
  }),
  about: z.object({
    heading: z.string(),
    mainText: z.string(),
    historyHeading: z.string(),
    historyText: z.string(),
    eventPerformanceHeading: z.string(),
    eventPerformanceParagraph1: z.string(),
    eventPerformanceParagraph2: z.string(),
    eventPerformanceParagraph3: z.string(),
    repertoireLink: z.string(),
    contactLink: z.string(),
  }),
  members: z.object({
    heading: z.string(),
    noMembers: z.string(),
    instruments: z.string(),
    status: z.string(),
  }),
  videos: z.object({
    heading: z.string(),
    noVideos: z.string(),
  }),
  contact: z.object({
    heading: z.string(),
    intro: z.string(),
    manager: z.string(),
    email: z.string(),
    phone: z.string(),
    socialPrompt: z.string(),
    noContactInfo: z.string(),
  }),
  concerts: z.object({
    pageTitle: z.string(),
    upcoming: z.string(),
    past: z.string(),
    noPastConcerts: z.string(),
    date: z.string(),
    place: z.string(),
    fbEvent: z.string(),
    tickets: z.string(),
    invitation: z.string(),
  }),
  repertoire: z.object({
    pageTitle: z.string(),
    intro: z.string(),
    songList: z.string(),
    noSongs: z.string(),
    viewConcerts: z.string(),
  }),
  common: z.object({
    showAll: z.string(),
    more: z.string(),
    back: z.string(),
    loading: z.string(),
    error: z.string(),
  }),
  footer: z.object({
    copyright: z.string(),
    instagram: z.string(),
    facebook: z.string(),
    youtube: z.string(),
  }),
})

export default defineContentConfig({
  collections: {
    // Koncerty (Concerts)
    koncerty: defineCollection({
      type: 'page',
      source: 'koncerty/**/*.md',
      schema: koncertySchema,
    }),

    // Repertoár (Songs)
    repertoar: defineCollection({
      type: 'page',
      source: 'repertoar/**/*.md',
      schema: repertoarSchema,
    }),

    // Members
    members: defineCollection({
      type: 'page',
      source: 'members/**/*.md',
      schema: membersSchema,
    }),

    // Videos
    videos: defineCollection({
      type: 'page',
      source: 'videos/**/*.md',
      schema: videosSchema,
    }),

    // Contact info
    contact: defineCollection({
      type: 'data',
      source: 'contact.yml',
      schema: contactSchema,
    }),

    // Locales (translations)
    localesCs: defineCollection({
      type: 'data',
      source: 'locales/cs/common.yml',
      schema: localeSchema,
    }),

    localesEn: defineCollection({
      type: 'data',
      source: 'locales/en/common.yml',
      schema: localeSchema,
    }),

    localesDe: defineCollection({
      type: 'data',
      source: 'locales/de/common.yml',
      schema: localeSchema,
    }),
  },
})
