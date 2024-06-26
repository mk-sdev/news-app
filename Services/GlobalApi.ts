// showLastCommitMessageForThisLibrary.js
import { Category } from '@/utils/types'
import { create } from 'apisauce'

// define the api
const api = create({
  baseURL:
    'https://newsapi.org/v2/',
})

const apiKey = '?country=us&apiKey=87bc66d4570d4b819cb5c2f5ffefa162'

const getTopHeadline = api.get('/top-headlines'+apiKey)

const getByCategory = (category: Category) =>
  api.get(
    '/everything?q=' + category + '&apiKey=87bc66d4570d4b819cb5c2f5ffefa162'
  )

export default {getTopHeadline, getByCategory}