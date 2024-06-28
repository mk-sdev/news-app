import { Category } from '@/utils/types'
import { create } from 'apisauce'
// import {API_KEY} from '@expo-env.d.ts'
const api = create({
  baseURL:
    'https://newsapi.org/v2/',
})

const apiKey = process.env.API_KEY
// const apiKey = '87bc66d4570d4b819cb5c2f5ffefa162'

const getTopHeadline = api.get('/top-headlines?country=us&apiKey=' + apiKey)

const getByCategory = (category: Category | string) =>
  api.get(
    '/everything?q=' + category + '&apiKey='+apiKey
  )

export default {getTopHeadline, getByCategory}