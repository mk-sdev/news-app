import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { generateLink } from '@/utils/functions'
import { News } from '@/utils/types'
import { Colors } from '@/constants/Colors'

export default function HeadlineList({ newsList }: { newsList: News[] }) {
  const router = useRouter()

  const renderItem = ({ item }: { item: News }) => {
    return item.urlToImage ? (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.itemContainer}
        onPress={() => router.push(generateLink(item))}
      >
        <Image style={styles.image} source={{ uri: item.urlToImage }} />
        <View style={styles.textContainer}>
          <Text numberOfLines={3} style={styles.text}>
            {item.title}
          </Text>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <Text style={{ color: Colors.primary }}>{item.source.name}</Text>
            <Text style={{ color: Colors.lightGray }}>
              {item.publishedAt?.slice(0, 10)}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    ) : null
  }

  return (
    <View style={styles.container}>
      <FlatList
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
    margin: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 100,
    backgroundColor: 'white',
    marginBottom: 5,
    borderRadius: 5,
    overflow: 'hidden',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 1,
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 5,
    marginRight: 10,
    marginLeft: -2,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
    height: '100%',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flexWrap: 'wrap',
  },
})
