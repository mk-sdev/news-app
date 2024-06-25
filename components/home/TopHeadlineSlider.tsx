import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '@/Services/GlobalApi'
import { useRouter } from 'expo-router'

export default function TopHeadlineSlider({newsList}) {



  // useEffect(() => {
  //   console.log(newsList)
  // }, [newsList])
  const router = useRouter()

  const renderItem = ({ item }) => {
    return item.urlToImage ? (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() =>
          router.push(
            `/Article?title=${item.title}&image=${item.urlToImage}&content=${item.content}&url=${item.url}`
          )
        }
      >
        <Image style={styles.image} source={{ uri: item.urlToImage }} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    ) : (
      <Text>s</Text>
    )

  }

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={newsList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        // contentContainerStyle={{height: '100%'}}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 10, 
  },
  itemContainer: {
    width: Dimensions.get('window').width * 0.8,
    height: 200,
    backgroundColor: 'transparent', // No background color for the container
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    flexWrap: 'wrap',
  },
})
