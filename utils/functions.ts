import { News } from "./types"

export const generateLink=(news: News):string=>{
    return  `/Article?title=${news.title}&urlToImage=${news.urlToImage}&content=${news.content}&url=${news.url}&author=${news.author}&publishedAt=${news.publishedAt}&description=${news.description}`
}