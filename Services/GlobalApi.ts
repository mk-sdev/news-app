// showLastCommitMessageForThisLibrary.js
import { create } from 'apisauce'

// define the api
const api = create({
  baseURL:
    'https://newsapi.org/v2/',
})

const apiKey = '?country=us&apiKey=87bc66d4570d4b819cb5c2f5ffefa162'

const getTopHeadline = api.get('/top-headlines'+apiKey)

export default {getTopHeadline}