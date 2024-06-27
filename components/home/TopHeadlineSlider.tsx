import { generateLink } from '@/utils/functions'
import { useRouter } from 'expo-router'
import React, { useEffect } from 'react'
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { News } from '../../utils/types'


export default function TopHeadlineSlider({newsList}:{newsList: News[]}) {



  useEffect(() => {
    console.log(newsList)
  }, [newsList])
  const router = useRouter()

  const renderItem = ({ item }: {item:News}) => {
    return item.urlToImage ? (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() =>
          router.push(
            generateLink(item)
          )
        }
      >
        <Image style={styles.image} source={{ uri: item.urlToImage }} />
        <View style={styles.textContainer}>
          <Text style={styles.text}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    ) : (
      null
    )

  }

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        contentContainerStyle={{
          paddingLeft: 10,
        }}
        showsHorizontalScrollIndicator={false}
        data={newsList}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  itemContainer: {
    width: Dimensions.get('window').width * 0.8,
    height: 200,
    backgroundColor: 'transparent', 
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
