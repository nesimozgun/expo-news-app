import React, { useEffect, useState } from 'react'
import Header from '@/components/Header'
import SearchBar from '@/components/SearchBar'
import BreakingNews from '@/components/BreakingNews'
import Categories from '@/components/Categories'
import NewsList from '@/components/NewsList';
import Loading from '@/components/Loading';
import { NewsDataType } from "@/types"
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import axios from "axios"

type Props = {}

const Page = (props: Props) => {
  const {top: safeTop} = useSafeAreaInsets()
  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([])
  const [news, setNews] = useState<NewsDataType[]>([]);
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

  const getNews = async (category: string = "") => {
    try {
      let categoryString = "";
      if (category.length !== 0) {
        categoryString = `&category=${category}`;
      }
      const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&language=en&category=business&image=1&removeduplicate=1&size=5`;
      const res = await axios.get(URL);
      if (res && res.data) {
        setNews(res.data.results);
        setIsLoading(false);
      }
    } catch (error: any) {
      console.log("Breaking news error: ", error);
    }
  };

  const onCatChanged = (category: string) => {
    console.log("Category:", category);
    setNews([]);
    getNews(category);
  };

  useEffect(() => {
    getBreakingNews();
    getNews();
  }, []);

  return (
    <ScrollView style={[styles.container, { paddingTop: safeTop }]}>
      <Header />
      <SearchBar />
      {isLoading ? (
        <Loading size={"large"} />
      ) : (
        <BreakingNews newsList={breakingNews} />
      )}
      <Categories onCategoryChanged={onCatChanged} />
      <NewsList newsList={news} />
    </ScrollView>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})