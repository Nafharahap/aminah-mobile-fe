import { useFocusEffect } from 'expo-router'
import { View, SafeAreaView, Image, StyleSheet, FlatList } from 'react-native'
import { Stack } from "expo-router";
import { BusinessCard } from "../../../components"
import { useCallback, useState } from 'react';
import { getListMitra } from '../../../services/publicService';

export default function BorrowerHome() {
  const [businesses, setBusinesses] = useState([])
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  const getData = async () => {
    setRefreshing(true);
    try {
      const response = await getListMitra()
      if (response) {
        setPage(response.data.payload.mitra.current_page)
        setLastPage(response.data.payload.mitra.last_page)
        setBusinesses(response.data.payload.mitra.data)
      }
    } catch (error) {
      alert(error)
    } finally {
      setRefreshing(false)
    }
  }

  const getMoreData = async () => {
    setRefreshing(true);
    try {
      if (page < lastPage) {
        const nextPage = page + 1
        const response = await getListMitra({ page: nextPage })
        if (response) {
          setPage(response.data.payload.mitra.current_page)
          setBusinesses((prevData) => [...prevData, ...response.data.payload.mitra.data])
        }
      }
    } catch (error) {
      alert(error)
    } finally {
      setRefreshing(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const onRefresh = useCallback(() => {
    getData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 12, backgroundColor: '#D9D9D9' }}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerBackVisible: false,
          headerBackground: () => {
            const logoUrl = require('../../../assets/images/headerBg.png')
            return (
              <Image
                style={{ ...StyleSheet.absoluteFill, height: '100%', width: '100%', resizeMode: 'stretch' }}
                source={logoUrl}
              />
            )
          }
        }}
      />
      <FlatList
        data={businesses}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ index, item }) => (<BusinessCard business={item} index={index} />)}
        style={{ flex: 1, paddingTop: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        keyExtractor={item => item.id}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={getMoreData}
        onEndReachedThreshold={0.1}
        contentContainerStyle={{ paddingBottom: 40, marginTop: -12 }}
      />
    </SafeAreaView >
  );
}