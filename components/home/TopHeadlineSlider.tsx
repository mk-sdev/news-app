import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '@/Services/GlobalApi';

export default function TopHeadlineSlider() {
  const [newsList, setNewsList] = useState([])
  useEffect(() => {
    getTopHeadline()
  }, []);

  const getTopHeadline = async ()=>{
    const result = (await GlobalApi.getTopHeadline).data
    // console.log(result)
    setNewsList(result.articles) 
  }

  useEffect(() => {
    console.log(newsList)
  }, [newsList]);

  return (
    <View>
      {/* <FlatList
      
        data={newsList}
        contentContainerStyle={{height: 500}}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <Image
              style={{ height: 100, width: 100 }}
              source={{
                uri: item.urlToImage === null ? null : item.urlToImage,
              }}
            ></Image>
            <Text>{JSON.stringify(item)}</Text>
          </TouchableOpacity>
        )}
      ></FlatList> */}
    </View>
  )
}