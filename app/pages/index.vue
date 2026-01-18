<script setup lang="ts">
const { locale } = useI18n()

const { data: blogPosts } = await useAsyncData(
  `blog-posts-${locale.value}`,
  () => queryCollection(`blog_${locale.value}`).all()
)
</script>


<template>
  <div>
    <h1>Welcome to HSOrchestra</h1>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </p>

    <p>
      Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore
      eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
      sunt in culpa qui officia deserunt mollit anim id est laborum.
    </p>

    <section>
      <h2>Blog Posts</h2>
      <div v-if="blogPosts && blogPosts.length > 0">
        <article v-for="post in blogPosts" :key="post.path" style="margin-bottom: 3rem; border-bottom: 1px solid #ccc; padding-bottom: 2rem;">
          <h3>{{ post.title }}</h3>
          <p><small>{{ new Date(post.date).toLocaleDateString() }} - Rating: {{ post.rating }}/5</small></p>
          <ContentRenderer :value="post" />
        </article>
      </div>
      <p v-else>No blog posts found.</p>
    </section>
  </div>
</template>
