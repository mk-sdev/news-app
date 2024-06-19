import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import GlobalApi from '@/Services/GlobalApi';

export default function TopHeadlineSlider() {
  useEffect(() => {
    getTopHeadline()
  }, []);

  const getTopHeadline = async ()=>{
    const result = (await GlobalApi.getTopHeadline).data
    console.log(result)
  }

  return (
    <View>
      <Text>TopHeadlineSlider</Text>
    </View>
  )
}