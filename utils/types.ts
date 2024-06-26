export type Category =
  | 'Latest'
  | 'World'
  | 'Sport'
  | 'Finance'
  | 'Politics'
  | 'Culture'

export type News = {
  author: string | null
  content: string | null
  description: string | null
  publishedAt: string | null
  source: { id: string | null; name: string | null }
  title: string | null
  url: string | null
  urlToImage: string | null
}
