import CategoryTextSlider from '@/components/home/CategoryTextSlider'
import HeadlineList from '@/components/home/HeadlineList'
import TopHeadlineSlider from '@/components/home/TopHeadlineSlider'
import { Colors } from '@/constants/Colors'
import GlobalApi from '@/Services/GlobalApi'
import { Category } from '@/utils/types'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, View, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Index() {
  const [newsList, setNewsList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getNewsByCategory('Latest')
  }, [])

  useEffect(() => {
    setLoading(false)
  }, [newsList])

  const getNewsByCategory = async (cat: Category) => {
    try {
      setLoading(true)
      const result: any = (await GlobalApi.getByCategory(cat)).data
      setNewsList(result.articles)
      console.log(result.articles)
    } catch (e) {
      console.error('Error fetching top headlines:', e)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: 50,
          paddingHorizontal: 20,
        }}
      ></View>
      <CategoryTextSlider
        selectCategory={category => getNewsByCategory(category)}
      />
      {loading ? (
        <View style={{ flex: 1, paddingTop: 300 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={
            <TopHeadlineSlider
              newsList={newsList.filter((_, index) => (index + 1) % 10 === 0)}
            />
          }
          data={newsList}
          renderItem={({ item }) => <HeadlineList newsList={[item]} />}
          keyExtractor={(item, index) => index.toString()}
          nestedScrollEnabled
        />
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
  container: {},
})
