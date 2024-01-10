import { useFocusEffect } from 'expo-router'
import { View, SafeAreaView, Image, StyleSheet, FlatList, Pressable } from 'react-native'
import { BusinessCard } from "../../../../components"
import { useCallback, useState } from 'react';
import { getListMitra } from '../../../../services/publicService';

export default function LenderHome() {
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
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 16, backgroundColor: '#D9D9D9' }}>
      <FlatList
        data={businesses}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ index, item }) => (<BusinessCard business={item} index={index} />)}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        keyExtractor={item => item.id}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={getMoreData}
        onEndReachedThreshold={0.1}
        contentContainerStyle={{ paddingVertical: 16 }}
      />
    </SafeAreaView >
  );
}