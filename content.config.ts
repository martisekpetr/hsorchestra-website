import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const blogSchema = z.object({
  layout: z.string().default('blog'),
  title: z.string(),
  date: z.string().or(z.date()),
  rating: z.number().min(1).max(5),
})

export default defineContentConfig({
  collections: {
    // English blog posts
    blog_en: defineCollection({
      type: 'page',
      source: 'blog/en/**/*.md',
      schema: blogSchema
    }),

    // German blog posts
    blog_de: defineCollection({
      type: 'page',
      source: 'blog/de/**/*.md',
      schema: blogSchema
    }),

    // French blog posts
    blog_fr: defineCollection({
      type: 'page',
      source: 'blog/fr/**/*.md',
      schema: blogSchema
    }),

    // Pages collection - mirrors Decap CMS "pages" collection
    pages: defineCollection({
      type: 'data',
      source: 'about.yml',
      schema: z.object({
        title: z.string(),
      })
    }),
  },
})
