import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Linking,
  Share,
  Pressable,
} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Entypo } from '@expo/vector-icons'
import { News } from '@/utils/types'
// import { Share } from 'expo-sharing'

export default function ArticleScreen() {
  const {author, title, urlToImage, content, url, publishedAt, description }:Partial<Omit<News, 'source' >> =
    useLocalSearchParams()
    
  const removeLastChars = (str:string) => {
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
      message: title + '\nRead more',
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      {urlToImage && <Image source={{ uri: urlToImage }} style={styles.image} />}
      <View
        style={{
          width: '90%',
          backgroundColor: 'transparent',
          flexDirection: 'row',
          marginTop: 5,
          justifyContent: 'space-between',
        }}
      >
        <Text>{author}</Text>
        <Text>{publishedAt}</Text>
        <Pressable
          onPress={() => handleShare()} // Funkcja po kliknięciu
        >
          <Entypo name="share" size={24} color="black" />
        </Pressable>
      </View>
      {title && <Text style={styles.title}>{title}</Text>}
      {description && <Text>{description}</Text>}
      {content && (
        <Text style={styles.content}>
          {removeLastChars(JSON.stringify(content))}
        </Text>
      )}
      {url && (
        <Button title="READ MORE" onPress={handleReadMore} color="#007bff" />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    marginTop: 20,
    fontSize: 16,
    lineHeight: 25,
  },
})
