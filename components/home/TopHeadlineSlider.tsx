import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native'
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

    const renderItem = ({ item }) => {
    // Warunkowe renderowanie w zależności od istnienia urlToImage
    return item.urlToImage ? (
      <TouchableOpacity style={styles.itemContainer}>
        <Image
          style={styles.image}
          source={{ uri: item.urlToImage }}
        />
        <Text style={styles.text}>{item.title}</Text>
      </TouchableOpacity>
    ) : (
      null
    );
  };

  return (
    <View style={{backgroundColor: 'red', width: '100%'}}>
      <FlatList
      horizontal
        data={newsList}
        // contentContainerStyle={{height: 500}}
        renderItem={renderItem}
      ></FlatList>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'center', // Dostosowanie elementów do linii
  },
  image: {
    height: 100,
    width: 100,
    marginRight: 10,
  },
  text: {
    flex: 1, // Aby tekst zajął resztę dostępnego miejsca
    flexWrap: 'wrap',
  },
})