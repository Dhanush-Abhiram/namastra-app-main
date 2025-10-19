import { MetadataRoute } from 'next'
import { MOCK_NAMES, DEITIES } from '@/data/names.mock'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://namastra.com'
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ]

  // Name pages
  const namePages = MOCK_NAMES.map((name) => ({
    url: `${baseUrl}/name/${name.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Deity pages
  const deityPages = DEITIES
    .filter(deity => deity !== "None")
    .map((deity) => ({
      url: `${baseUrl}/deity/${deity.toLowerCase()}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  return [...staticPages, ...namePages, ...deityPages]
}
