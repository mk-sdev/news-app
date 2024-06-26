import {z} from 'zod'

export type Category =
  | 'Latest'
  | 'World'
  | 'Sport'
  | 'Finance'
  | 'Politics'
  | 'Culture'

const NewsSourceSchema = z.object({
  id: z.string().nullable(),
  name: z.string().nullable(),
})

const NewsSchema = z.object({
  author: z.string().nullable(),
  content: z.string().nullable(),
  description: z.string().nullable(),
  publishedAt: z.string().datetime().nullable(),
  source: NewsSourceSchema,
  title: z.string().nullable(),
  url: z.string().url().nullable(),
  urlToImage: z.string().url().nullable(),
})

// Typ wygenerowany z schematu
export type News = z.infer<typeof NewsSchema>