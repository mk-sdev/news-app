export const generateLink=(item:unknown):string=>{
    return  `/Article?title=${item.title}&image=${item.urlToImage}&content=${item.content}&url=${item.url}&author=${item.author}&publishedAt=${item.publishedAt}`
}