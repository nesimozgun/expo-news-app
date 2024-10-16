import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import { NewsDataType } from "@/types"
import axios from "axios"

import { useSafeAreaInsets } from 'react-native-safe-area-context'

type Props = {}

const Page = (props: Props) => {
  const {top: safeTop} = useSafeAreaInsets()
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([])
  const getBreakingNews = async () => {
    try {
      const url = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&country=br,us&language=en,pt&removeduplicate=1&size=5`
      const response = await axios.get(url)

      if(response && response.data) {
        setBreakingNews(response.data.results)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={[styles.container, {paddingTop: safeTop}]}>
      <Header />
      <SearchBar />
      {breakingNews.map((item, index) => (
        <Text>{item.title}</Text>
      ))}
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})