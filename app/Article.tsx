import { Colors } from '@/constants/Colors'
import { News } from '@/utils/types'
import { Entypo } from '@expo/vector-icons'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  View,
} from 'react-native'


export default function ArticleScreen() {
  const {
    author,
    title,
    urlToImage,
    content,
    url,
    publishedAt,
    description,
  }: Partial<Omit<News, 'source'>> = useLocalSearchParams()

  const removeLastChars = (str: string) => {
    if (str.length > 15) {
      return str.slice(0, -15)
    } else {
      return ''
    }
  }

  const handleReadMore = () => {
    if (url) {
      Linking.openURL(url).catch(err =>
        console.error('Failed to open URL:', err)
      )
    }
  }

  const handleShare = () => {
    console.log('ss')
    Share.share({
      //@ts-ignore
      message: url,
    })
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {title && <Text style={styles.title}>{title}</Text>}
      {urlToImage && (
        <Image source={{ uri: urlToImage }} style={styles.image} />
      )}
      <View style={styles.infoContainer}>
        <Text style={styles.author}>
          {author} | {publishedAt?.slice(0, 10)}
        </Text>
        <Pressable onPress={handleShare}>
          <Entypo name="share" size={24} color="black" />
        </Pressable>
      </View>
      {description && <Text style={styles.description}>{description}</Text>}
      {content && (
        <Text style={styles.content}>
          {removeLastChars(JSON.stringify(content))}
        </Text>
      )}
      {url && (
        <Pressable onPress={handleReadMore}>
          <Text style={styles.readMore}>Read More</Text>
        </Pressable>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingHorizontal: 10,
    paddingBottom: 50,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 50,
  },
  infoContainer: {
    width: '100%',
    flexDirection: 'row',
    marginTop: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  author: {
    opacity: 0.5,
  },
  description: {
    fontSize: 18,
    lineHeight: 30,
    padding: 10,
  },
  content: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 30,
    paddingHorizontal: 10,
  },
  readMore: {
    color: Colors.primary,
    padding: 10,
    fontSize: 17,
    textDecorationLine: 'underline',
  },
})
