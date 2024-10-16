import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import BreakingNews from '@/components/BreakingNews'
import { NewsDataType } from "@/types"
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import axios from "axios"

type Props = {}

const Page = (props: Props) => {
  const {top: safeTop} = useSafeAreaInsets()
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const getBreakingNews = async () => {
    try {
      const url = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&country=br,us&language=en,pt&removeduplicate=1&size=5`
      const response = await axios.get(url)

      if(response && response.data) {
        setBreakingNews(response.data.results)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getBreakingNews();
  }, []);

  return (
    <View style={[styles.container, {paddingTop: safeTop}]}>
      <Header />
      <SearchBar />
      {isLoading ? (
        <ActivityIndicator size={'large'} />
      ) : (
        <BreakingNews newsList={breakingNews} />
      )}
      
    </View>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})