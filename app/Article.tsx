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
  ScrollView,
} from 'react-native'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Entypo } from '@expo/vector-icons'
import { News } from '@/utils/types'
import { Colors } from '@/constants/Colors'
// import { Share } from 'expo-sharing'

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
      <ScrollView contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 50 }}>
        {title && <Text style={styles.title}>{title}</Text>}
        {urlToImage && (
          <Image source={{ uri: urlToImage }} style={styles.image} />
        )}
        <View
          style={{
            width: '100%',
            //   backgroundColor: 'red',
            flexDirection: 'row',
            marginTop: 5,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}
        >
          <Text style={{ opacity: 0.5 }}>
            {author} | {publishedAt?.slice(0, 10)}
          </Text>
          {/* <Text style={{ opacity: 0.5 }}>{publishedAt?.slice(0, 10)}</Text> */}
          <Pressable
            onPress={() => handleShare()} // Funkcja po kliknięciu
          >
            <Entypo name="share" size={24} color="black" />
          </Pressable>
        </View>
        {description && (
          <Text style={{ fontSize: 18, lineHeight: 30, padding: 10 }}>
            {description}
          </Text>
        )}
        {content && (
          <Text style={styles.content}>
            {removeLastChars(JSON.stringify(content))}
          </Text>
        )}
        {url && (
          <Pressable onPress={handleReadMore}>
            <Text
              style={{
                color: Colors.primary,
                padding: 10,
                fontSize: 17,
                textDecorationLine: 'underline',
              }}
            >
              Read More
            </Text>
          </Pressable>
        )}
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // padding: 10,
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
  content: {
    marginTop: 20,
    // width: '95%',
    fontSize: 16,
    lineHeight: 30,
    paddingHorizontal: 10,
  },
})
