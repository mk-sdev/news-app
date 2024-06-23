import { View, Text, StyleSheet, ScrollView } from 'react-native'
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

    useEffect(() => {
      getTopHeadline()
    }, [])

    const getTopHeadline = async () => {
      try {
        const result = (await GlobalApi.getTopHeadline).data
        setNewsList(result.articles)
        console.log(result.articles)
      } catch (e) {
        console.error('Error fetching top headlines:', e)
      }
    }
  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.appName}>News</Text>
        <Entypo name="bell" size={24} color="black" />
      </View>
      <CategoryTextSlider />
      <ScrollView>

      <TopHeadlineSlider newsList={newsList} />
      <HeadlineList newsList={newsList} />
      </ScrollView>
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
