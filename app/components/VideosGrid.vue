<script setup lang="ts">
import emblaCarouselVue from 'embla-carousel-vue'
import { extractYoutubeVideoId } from '~/utils/youtube'

const { data: videos } = await useAsyncData('videos', () => queryCollection('videos').all())

const sortedVideos = computed(() => {
  if (!videos.value) return []
  return [...videos.value].sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
})

const getThumbnailUrl = (url: string) => {
  const videoId = extractYoutubeVideoId(url)
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : ''
}

const [emblaRef, emblaApi] = emblaCarouselVue({
  loop: true,
  align: 'start',
  slidesToScroll: 1,
  skipSnaps: false,
  containScroll: 'trimSnaps',
  dragFree: false,
})

const scrollPrev = () => emblaApi.value?.scrollPrev()
const scrollNext = () => emblaApi.value?.scrollNext()

const selectedIndex = ref(0)
const scrollSnaps = ref<number[]>([])

watchEffect(() => {
  if (!emblaApi.value) return

  scrollSnaps.value = emblaApi.value.scrollSnapList()

  emblaApi.value.on('select', () => {
    selectedIndex.value = emblaApi.value.selectedScrollSnap()
  })
})

const scrollTo = (index: number) => emblaApi.value?.scrollTo(index)

const modalVisible = ref(false)
const currentVideoUrl = ref('')
const iframeLoading = ref(false)

const embedUrl = computed(() => {
  if (!currentVideoUrl.value) return ''
  const videoId = extractYoutubeVideoId(currentVideoUrl.value)
  if (!videoId) return ''
  return `https://www.youtube.com/embed/${videoId}?autoplay=1`
})

const openVideo = (url: string) => {
  currentVideoUrl.value = url
  modalVisible.value = true
  iframeLoading.value = true
}

const closeModal = () => {
  modalVisible.value = false
  currentVideoUrl.value = ''
}

const onIframeLoad = () => {
  iframeLoading.value = false
}

// Scroll lock when modal is open
watch(modalVisible, newVal => {
  if (newVal) {
    document.documentElement.style.overflow = 'hidden'
  } else {
    document.documentElement.style.overflow = 'auto'
  }
})
</script>

<template>
  <div v-if="sortedVideos.length > 0" class="videos-container">
    <!-- Embla Carousel -->
    <div ref="emblaRef" class="embla">
      <div class="embla__container">
        <div v-for="video in sortedVideos" :key="video.url" class="embla__slide">
          <div class="embla__slide__inner" @click="openVideo(video.url)">
            <img :src="getThumbnailUrl(video.url)" :alt="video.description" />
            <div class="play-button-overlay">
              <div class="play-button">▶</div>
            </div>
            <div class="video-description">
              <MDC :value="video.description" tag="p" unwrap="p" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Controls -->
    <div class="embla__controls">
      <button
        class="embla__button embla__button--prev"
        aria-label="Previous videos"
        @click="scrollPrev"
      >
        &#10094;
      </button>
      <button
        class="embla__button embla__button--next"
        aria-label="Next videos"
        @click="scrollNext"
      >
        &#10095;
      </button>
    </div>

    <!-- Dot Navigation -->
    <div class="embla__dots">
      <button
        v-for="(snap, index) in scrollSnaps"
        :key="index"
        class="embla__dot"
        :class="{ 'embla__dot--selected': index === selectedIndex }"
        :aria-label="`Go to slide ${index + 1}`"
        @click="scrollTo(index)"
      />
    </div>

    <!-- Modal (keep existing implementation) -->
    <ClientOnly>
      <Teleport to="body">
        <div v-if="modalVisible" class="video-modal" @click.self="closeModal">
          <div class="modal-content">
            <button class="modal-close" aria-label="Close video" @click="closeModal">
              &times;
            </button>

            <!-- Loading spinner -->
            <div v-if="iframeLoading" class="loading-spinner">
              <div class="dual-ring"></div>
            </div>

            <!-- YouTube iframe -->
            <iframe
              v-if="embedUrl"
              v-show="!iframeLoading"
              :src="embedUrl"
              frameborder="0"
              allow="
                accelerometer;
                autoplay;
                clipboard-write;
                encrypted-media;
                gyroscope;
                picture-in-picture;
              "
              allowfullscreen
              @load="onIframeLoad"
            />

            <!-- Error state -->
            <div v-if="!embedUrl && !iframeLoading" class="error-message">
              Unable to load video. Invalid YouTube URL.
            </div>
          </div>
        </div>
      </Teleport>
    </ClientOnly>
  </div>
</template>

<style scoped>
/* Container */
.videos-container {
  position: relative;
}

/* Embla Carousel Base */
.embla {
  overflow: hidden;
  position: relative;
  padding: 0 50px; /* Space for navigation buttons */
}

.embla__container {
  display: flex;
  padding: 20px 0;
  backface-visibility: hidden;
  margin-left: -7.5px;
  margin-right: -7.5px;
}

.embla__slide {
  flex: 0 0 calc(100% / 3); /* 3 slides on desktop */
  min-width: 0;
  padding: 0 7.5px; /* 15px total gap (7.5px on each side) */
}

.embla__slide__inner {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  background-color: #000;
  backface-visibility: hidden;
  transform: translate3d(0, 0, 0);
}

.embla__slide__inner img {
  width: 100%;
  height: auto;
  display: block;
  transition: transform 0.3s ease;
}

.embla__slide:hover .embla__slide__inner img {
  transform: scale(1.05);
}

/* Play Button Overlay */
.play-button-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
  pointer-events: none;
}

.play-button {
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 48px;
  padding-left: 4px; /* Optical alignment for play triangle */
  transition: all 0.3s ease;
}

.embla__slide:hover .play-button-overlay {
  background-color: rgba(0, 0, 0, 0.5);
}

.embla__slide:hover .play-button {
  transform: scale(1.1);
}

/* Video Description (keep existing hover effect) */
.video-description {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  color: #f5f5f5;
  padding: 10px;
  font-size: 0.9em;
  transform: translateY(100%);
  transition: transform 0.6s ease;
  z-index: 1;
}

.video-description p {
  margin: 0;
}

.embla__slide:hover .video-description {
  transform: translateY(0);
}

/* Navigation Controls */
.embla__controls {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  pointer-events: none;
  z-index: 10;
}

.embla__button {
  pointer-events: auto;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  border: none;
  padding: 15px;
  cursor: pointer;
  font-size: 24px;
  transition: background-color 0.3s;
}

.embla__button:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.embla__button--prev {
  margin-left: 10px;
}

.embla__button--next {
  margin-right: 10px;
}

/* Dot Navigation */
.embla__dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;
}

.embla__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #bbb;
  border: 1px solid #aaa;
  cursor: pointer;
  padding: 0;
  transition: background-color 0.3s;
}

.embla__dot:hover {
  background-color: #999;
}

.embla__dot--selected {
  background-color: #717171;
}

/* Responsive Breakpoints */
@media (max-width: 900px) {
  .embla__slide {
    flex: 0 0 50%; /* 2 slides on tablet */
  }
}

@media (max-width: 600px) {
  .embla {
    padding: 0 40px;
  }

  .embla__slide {
    flex: 0 0 100%; /* 1 slide on mobile */
    padding: 0 5px; /* Smaller gap on mobile */
  }

  .embla__container {
    margin-left: -5px;
    margin-right: -5px;
  }

  .embla__button {
    padding: 12px;
    font-size: 18px;
  }
}

/* Modal */
.video-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  position: relative;
  width: 90%;
  max-width: 1200px;
  aspect-ratio: 16 / 9;
  background-color: #000;
}

.modal-close {
  position: absolute;
  top: -40px;
  right: 0;
  background: none;
  border: none;
  color: #fff;
  font-size: 40px;
  cursor: pointer;
  z-index: 10001;
  padding: 0;
  line-height: 1;
}

.modal-close:hover {
  opacity: 0.7;
}

.modal-content iframe {
  width: 100%;
  height: 100%;
}

/* Loading spinner */
.loading-spinner {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10000;
}

.dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}

.dual-ring:after {
  content: ' ';
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: dual-ring 1.2s linear infinite;
}

@keyframes dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Error message */
.error-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  text-align: center;
  padding: 20px;
  background-color: rgba(255, 0, 0, 0.8);
  border-radius: 8px;
}
</style>
