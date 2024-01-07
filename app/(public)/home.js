import { Link, useFocusEffect } from 'expo-router'
import { View, SafeAreaView, Pressable, Image, StyleSheet, FlatList } from 'react-native'
import { Stack } from "expo-router";
import { useSession } from '../../context/auth';
import { BusinessCard } from "../../components"
import { getListMitra } from '../../services/publicService';
import { useCallback, useState } from 'react';

function HeaderRight(props) {
  return (
    <Pressable style={{
      paddingHorizontal: 12,
      paddingVertical: 4,
      backgroundColor: '#076E5B',
      borderRadius: 20,
      marginRight: 12
    }}>
      <Link href={'/auth/login'} style={{ color: '#FFFFFF' }}>Masuk</Link>
    </ Pressable>
  )
}

function LogoImage() {
  const logoUrl = require('../../assets/images/logo-aminah-01.png')
  return (
    <Image
      style={{ width: 160, height: 40, marginLeft: -20 }}
      source={logoUrl}
    />
  )
}

export default function Home() {
  const { session } = useSession();
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
      alert(error.message)
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
      alert(error.message)
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
          headerRight: () => <HeaderRight session={session} />,
          headerTitle: () => <LogoImage />,
          headerBackground: () => {
            const logoUrl = require('../../assets/images/headerBg.png')
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