import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CategoryTextSlider from '@/components/home/CategoryTextSlider'
import { Colors } from '@/constants/Colors'
import { Entypo } from '@expo/vector-icons'
import TopHeadlineSlider from '@/components/home/TopHeadlineSlider'
import HeadlineList from '@/components/home/HeadlineList'
import GlobalApi from '@/Services/GlobalApi'

export default function Index() {
  const [newsList, setNewsList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // getTopHeadline()
    getNewsByCategory('latest')
  }, [])
  useEffect(() => {
    // getTopHeadline()
    setLoading(false)
    // getNewsByCategory('latest')
  }, [newsList])

  const getNewsByCategory = async (cat: string) => {
    try {
      setLoading(true)
      const result = (await GlobalApi.getByCategory(cat)).data
      setNewsList(result.articles)
      console.log(result.articles)
    } catch (e) {
      console.error('Error fetching top headlines:', e)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.appName}>News</Text>
        <Entypo name="bell" size={24} color="black" />
      </View>
      <CategoryTextSlider
        selectCategory={category => getNewsByCategory(category)}
      />
      {loading ? (
        <View style={{ flex: 1, paddingTop: 300 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView>
          <TopHeadlineSlider newsList={newsList} />
          <HeadlineList newsList={newsList} />
        </ScrollView>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
  },
})
