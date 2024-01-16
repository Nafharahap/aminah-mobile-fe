import { Link, router, useFocusEffect, useRouter } from 'expo-router'
import { View, Text, SafeAreaView, Pressable, Image, StyleSheet, FlatList, ImageBackground } from 'react-native'
import { Stack } from "expo-router";
import { useSession } from '../../context/auth';
import { BusinessCard } from "../../components"
import { getListMitra } from '../../services/publicService';
import { useCallback, useState } from 'react';
import { MaterialCommunityIcons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

function HeaderRight() {
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
  const router = useRouter()
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
      console.log(error);
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
      console.log(error);
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

  const onAboutUsPressed = () => {
    router.push('/(public)/about')
  }

  const HeaderHome = () => {
    return (
      <View>
        <View style={{
          flex: 1,
          width: '100%',
          minHeight: 200,
          height: 200,
          maxHeight: 200
        }}>
          <ImageBackground
            source={require('../../assets/images/HomePageHeroCut-min.png')}
            resizeMode="cover"
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              position: 'relative'
            }}
            imageStyle={{
              borderRadius: 8
            }}
          >
            <View style={{
              position: 'absolute',
              bottom: 20,
              left: 0,
              paddingLeft: 16,
              paddingRight: 16,
              paddingVertical: 8,
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
              backgroundColor: 'rgba(255, 255, 255, 0.80)'
            }}>
              <Text style={{
                textAlign: 'justify',
                fontWeight: 'bold',
                fontSize: 16,
                color: '#076e5b'
              }}>
                AMINAH
              </Text>
              <Text style={{
                textAlign: 'justify',
                fontWeight: 'bold',
                fontSize: 12,
                color: '#076e5b'
              }}>
                Aman, Terjamin, dan Berbasis Syariah
              </Text>
            </View>
            <Pressable
              onPress={onAboutUsPressed}
              style={{
                position: 'absolute',
                top: 12,
                right: 0,
                paddingHorizontal: 16,
                paddingVertical: 4,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                backgroundColor: '#199B57'
              }}
            >
              <Text style={{
                textAlign: 'justify',
                fontWeight: 'bold',
                fontSize: 12,
                color: '#FFFFFF'
              }}>
                {'Tentang Kami >'}
              </Text>
            </Pressable>
          </ImageBackground>
        </View>

        <View style={{ borderRadius: 8, backgroundColor: '#FFFFFF', padding: 16, marginTop: 12 }}>
          <Text style={{
            textAlign: 'justify',
            fontWeight: 'bold',
            fontSize: 16,
            color: '#076e5b'
          }}>
            CARA KERJA AMINAH
          </Text>

          <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: 1, marginVertical: 8 }}
          />

          <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
            <View style={{ flex: 1, gap: 12, justifyContent: 'flex-start', alignItems: 'center', }}>
              <MaterialCommunityIcons name="file-document-edit" size={36} color="#199B57" />
              <Text style={{ textAlign: 'center', color: '#076E5B', fontWeight: 600, fontSize: 10 }}>Daftar atau Masuk</Text>
            </View>
            <View style={{ flex: 1, gap: 12, justifyContent: 'flex-start', alignItems: 'center', }}>
              <FontAwesome5 name="store" size={36} color="#199B57" />
              <Text style={{ textAlign: 'center', color: '#076E5B', fontWeight: 600, fontSize: 10 }}>Pilih Mitra untuk Didanai</Text>
            </View>
            <View style={{ flex: 1, gap: 12, justifyContent: 'flex-start', alignItems: 'center', }}>
              <FontAwesome5 name="money-check-alt" size={36} color="#199B57" />
              <Text style={{ textAlign: 'center', color: '#076E5B', fontWeight: 600, fontSize: 10 }}>Lakukan Pembayaran</Text>
            </View>
            <View style={{ flex: 1, gap: 12, justifyContent: 'flex-start', alignItems: 'center', }}>
              <MaterialIcons name="loop" size={40} color="#199B57" />
              <Text style={{ textAlign: 'center', color: '#076E5B', fontWeight: 600, fontSize: 10 }}>Raih Imbal Hasil</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }

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
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        keyExtractor={item => item.id}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={getMoreData}
        onEndReachedThreshold={0.1}
        contentContainerStyle={{ paddingVertical: 16 }}
        ListHeaderComponent={HeaderHome}
        ListHeaderComponentStyle={{ marginBottom: 16 }}
      />
    </SafeAreaView >
  );
}