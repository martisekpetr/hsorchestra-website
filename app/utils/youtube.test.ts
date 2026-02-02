import { describe, it, expect } from 'vitest'
import { extractYoutubeVideoId } from './youtube'

describe('extractYoutubeVideoId', () => {
  describe('standard youtube.com URLs', () => {
    it('extracts video ID from standard watch URL', () => {
      const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      expect(extractYoutubeVideoId(url)).toBe('dQw4w9WgXcQ')
    })

    it('extracts video ID from watch URL without www', () => {
      const url = 'https://youtube.com/watch?v=dQw4w9WgXcQ'
      expect(extractYoutubeVideoId(url)).toBe('dQw4w9WgXcQ')
    })

    it('extracts video ID from mobile URL', () => {
      const url = 'https://m.youtube.com/watch?v=dQw4w9WgXcQ'
      expect(extractYoutubeVideoId(url)).toBe('dQw4w9WgXcQ')
    })

    it('extracts video ID from URL with timestamp', () => {
      const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s'
      expect(extractYoutubeVideoId(url)).toBe('dQw4w9WgXcQ')
    })

    it('extracts video ID from URL with playlist parameter', () => {
      const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf'
      expect(extractYoutubeVideoId(url)).toBe('dQw4w9WgXcQ')
    })

    it('extracts video ID from URL with multiple query parameters', () => {
      const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=120&list=PLtest&index=5'
      expect(extractYoutubeVideoId(url)).toBe('dQw4w9WgXcQ')
    })
  })

  describe('shortened youtu.be URLs', () => {
    it('extracts video ID from short URL', () => {
      const url = 'https://youtu.be/dQw4w9WgXcQ'
      expect(extractYoutubeVideoId(url)).toBe('dQw4w9WgXcQ')
    })

    it('extracts video ID from short URL with timestamp', () => {
      const url = 'https://youtu.be/dQw4w9WgXcQ?t=30'
      expect(extractYoutubeVideoId(url)).toBe('dQw4w9WgXcQ')
    })

    it('extracts video ID from short URL with multiple parameters', () => {
      const url = 'https://youtu.be/dQw4w9WgXcQ?t=30&feature=share'
      expect(extractYoutubeVideoId(url)).toBe('dQw4w9WgXcQ')
    })
  })

  describe('embed URLs', () => {
    it('extracts video ID from embed URL', () => {
      const url = 'https://www.youtube.com/embed/dQw4w9WgXcQ'
      expect(extractYoutubeVideoId(url)).toBe('dQw4w9WgXcQ')
    })

    it('extracts video ID from embed URL with query parameters', () => {
      const url = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
      expect(extractYoutubeVideoId(url)).toBe('dQw4w9WgXcQ')
    })

    it('extracts video ID from embed URL without www', () => {
      const url = 'https://youtube.com/embed/dQw4w9WgXcQ'
      expect(extractYoutubeVideoId(url)).toBe('dQw4w9WgXcQ')
    })
  })

  describe('older /v/ format URLs', () => {
    it('extracts video ID from /v/ URL', () => {
      const url = 'https://www.youtube.com/v/dQw4w9WgXcQ'
      expect(extractYoutubeVideoId(url)).toBe('dQw4w9WgXcQ')
    })

    it('extracts video ID from /v/ URL with query parameters', () => {
      const url = 'https://www.youtube.com/v/dQw4w9WgXcQ?version=3'
      expect(extractYoutubeVideoId(url)).toBe('dQw4w9WgXcQ')
    })
  })

  describe('real video IDs from the project', () => {
    it('extracts video ID: SDikeOCbBYg', () => {
      const url = 'https://www.youtube.com/watch?v=SDikeOCbBYg'
      expect(extractYoutubeVideoId(url)).toBe('SDikeOCbBYg')
    })

    it('extracts video ID: O_2loW_Mtak', () => {
      const url = 'https://www.youtube.com/watch?v=O_2loW_Mtak'
      expect(extractYoutubeVideoId(url)).toBe('O_2loW_Mtak')
    })

    it('extracts video ID: iGKy4IpEpmA', () => {
      const url = 'https://www.youtube.com/watch?v=iGKy4IpEpmA'
      expect(extractYoutubeVideoId(url)).toBe('iGKy4IpEpmA')
    })

    it('extracts video ID: GDG_9j_1LGQ', () => {
      const url = 'https://www.youtube.com/watch?v=GDG_9j_1LGQ'
      expect(extractYoutubeVideoId(url)).toBe('GDG_9j_1LGQ')
    })

    it('extracts video ID: EinPZoIOt5M', () => {
      const url = 'https://www.youtube.com/watch?v=EinPZoIOt5M'
      expect(extractYoutubeVideoId(url)).toBe('EinPZoIOt5M')
    })
  })

  describe('edge cases and invalid inputs', () => {
    it('returns null for empty string', () => {
      expect(extractYoutubeVideoId('')).toBe(null)
    })

    it('returns null for non-string input', () => {
      expect(extractYoutubeVideoId(null as any)).toBe(null)
      expect(extractYoutubeVideoId(undefined as any)).toBe(null)
      expect(extractYoutubeVideoId(123 as any)).toBe(null)
    })

    it('returns null for invalid URL', () => {
      expect(extractYoutubeVideoId('not a url')).toBe(null)
    })

    it('returns null for non-YouTube URL', () => {
      const url = 'https://example.com/watch?v=dQw4w9WgXcQ'
      expect(extractYoutubeVideoId(url)).toBe(null)
    })

    it('returns null for YouTube URL without video ID', () => {
      const url = 'https://www.youtube.com/watch'
      expect(extractYoutubeVideoId(url)).toBe(null)
    })

    it('returns null for YouTube homepage', () => {
      const url = 'https://www.youtube.com'
      expect(extractYoutubeVideoId(url)).toBe(null)
    })

    it('returns null for YouTube channel URL', () => {
      const url = 'https://www.youtube.com/channel/UC13p9isjtBm0SH2A1KfP9Ew'
      expect(extractYoutubeVideoId(url)).toBe(null)
    })

    it('returns null for YouTube playlist URL without video', () => {
      const url = 'https://www.youtube.com/playlist?list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf'
      expect(extractYoutubeVideoId(url)).toBe(null)
    })

    it('returns null for youtu.be URL without video ID', () => {
      const url = 'https://youtu.be/'
      expect(extractYoutubeVideoId(url)).toBe(null)
    })
  })

  describe('video IDs with special characters', () => {
    it('extracts video ID with underscores', () => {
      const url = 'https://www.youtube.com/watch?v=dQw_4w9_WgXcQ'
      expect(extractYoutubeVideoId(url)).toBe('dQw_4w9_WgXcQ')
    })

    it('extracts video ID with hyphens', () => {
      const url = 'https://www.youtube.com/watch?v=dQw-4w9-WgXcQ'
      expect(extractYoutubeVideoId(url)).toBe('dQw-4w9-WgXcQ')
    })

    it('extracts 11-character video ID', () => {
      const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      const videoId = extractYoutubeVideoId(url)
      expect(videoId).toBe('dQw4w9WgXcQ')
      expect(videoId?.length).toBe(11)
    })
  })

  describe('protocol variations', () => {
    it('extracts video ID from HTTP URL', () => {
      const url = 'http://www.youtube.com/watch?v=dQw4w9WgXcQ'
      expect(extractYoutubeVideoId(url)).toBe('dQw4w9WgXcQ')
    })

    it('extracts video ID from HTTPS URL', () => {
      const url = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
      expect(extractYoutubeVideoId(url)).toBe('dQw4w9WgXcQ')
    })
  })
})
