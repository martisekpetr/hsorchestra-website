export function extractYoutubeVideoId(url: string): string | null {
  try {
    if (!url || typeof url !== 'string') {
      return null
    }

    const urlObj = new URL(url)

    if (urlObj.hostname === 'youtu.be') {
      const videoId = urlObj.pathname.slice(1).split('?')[0]
      return videoId || null
    }

    if (
      urlObj.hostname === 'www.youtube.com' ||
      urlObj.hostname === 'youtube.com' ||
      urlObj.hostname === 'm.youtube.com'
    ) {
      if (urlObj.pathname === '/watch') {
        return urlObj.searchParams.get('v')
      }

      if (urlObj.pathname.startsWith('/embed/')) {
        return urlObj.pathname.split('/')[2] || null
      }

      if (urlObj.pathname.startsWith('/v/')) {
        return urlObj.pathname.split('/')[2] || null
      }
    }

    return null
  } catch {
    return null
  }
}
