import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CategoryTextSlider from '@/components/home/CategoryTextSlider'
import { Colors } from '@/constants/Colors'
import { Entypo } from '@expo/vector-icons'
import TopHeadlineSlider from '@/components/home/TopHeadlineSlider'

export default function Index() {
  return (
    <SafeAreaView>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.appName}>News</Text>
        <Entypo name="bell" size={24} color="black" />
      </View>
      <CategoryTextSlider />
      <TopHeadlineSlider />
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
