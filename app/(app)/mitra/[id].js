import { View, Text, SafeAreaView, ImageBackground, Image, Pressable, StyleSheet } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useRouter, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { getDetailMitra } from '../../../services/publicService';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { API_BASE_URL } from '@env'
import { Entypo, Ionicons } from '@expo/vector-icons';

const BusinessDetailPage = () => {
  const router = useRouter()
  const params = useLocalSearchParams();
  const { id } = params
  const [business, setBusiness] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [isImageExist, setIsImageExist] = useState(true)
  const [unitCount, setUnitCount] = useState(1)

  const getData = async () => {
    setRefreshing(true);
    try {
      const response = await getDetailMitra(id)
      if (response) {
        setBusiness(response.data.payload.funding)
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

  const onButtonBuyPressed = () => {
    router.push({ pathname: '/(app)/mitra/modalCartDetails', params: { id: business.id, count: unitCount } })
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{
          flex: 1,
          width: '100%',
          height: 260,
          maxHeight: 260,
          minHeight: 260
        }}>
          <ImageBackground
            source={isImageExist ? `${API_BASE_URL}/pendaftaran/${business?.borrower.business_image}` : require('../../../assets/images/profile-placeholder.jpeg')}
            resizeMode="cover"
            style={{
              flex: 1,
              width: '100%',
              height: '100%',
              position: 'relative'
            }}
            onError={() => setIsImageExist(null)}
          >
            <Pressable
              onPress={() => router.back()}
              style={{
                width: 40,
                height: 40,
                position: 'absolute',
                top: 16,
                left: 16
              }}
            >
              <Ionicons name="arrow-back" size={32} color="black" />
            </Pressable>
            <Text style={{
              position: 'absolute',
              bottom: 32,
              left: 24,
              textAlign: 'justify',
              fontWeight: 'bold',
              fontSize: 32
            }}>
              {business?.borrower.business_name}
            </Text>
          </ImageBackground>
        </View>
        <View style={{
          flex: 1,
          padding: 16
        }}>
          <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
            <Image
              style={{ width: 48, height: 48, borderRadius: '50%' }}
              source={isImageExist ? `${API_BASE_URL}/pendaftaran/${business?.borrower.business_image}` : require('../../../assets/images/profile-placeholder.jpeg')}
              onError={() => setIsImageExist(null)}
            />
            <View>
              <Text style={{ color: '#000000', fontSize: 16, fontWeight: 'bold' }}>
                {business?.borrower.name}
              </Text>
              <Text style={{ color: '#000000', fontSize: 12, fontWeight: 300 }}>
                {business?.borrower.address}
              </Text>
              <Text style={{ color: '#000000', fontSize: 12, fontWeight: 300 }}>
                {business?.borrower.business_type}
              </Text>
            </View>
          </View>

          <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: StyleSheet.hairlineWidth, marginTop: 16, marginBottom: 4 }}
          />

          <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <View>
              <Text>Test</Text>
            </View>
            <View>
              <Text style={{ color: '#076E5B', fontWeight: 300 }}>
                <Text style={{ color: '#076E5B', fontWeight: 700, marginRight: 8 }}>
                  {business?.fundinglenders.length > 0 ? business?.fundinglenders.length : 0}
                </Text>
                Donatur
              </Text>
            </View>
          </View>

          <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: StyleSheet.hairlineWidth, marginTop: 4, marginBottom: 16 }}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={{ fontWeight: 500, fontSize: 12 }}>Nilai Per Unit Pendanaan:</Text>
            <Text style={{ fontWeight: 300, fontSize: 12 }}>Rp100.000</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={{ fontWeight: 500, fontSize: 12 }}>Estimasi Bagi Hasil:</Text>
            <Text style={{ fontWeight: 300, fontSize: 12 }}>{business?.borrower.profit_sharing_estimate}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={{ fontWeight: 500, fontSize: 12 }}>Lama Pendanaan:</Text>
            <Text style={{ fontWeight: 300, fontSize: 12 }}>{business?.borrower.duration}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={{ fontWeight: 500, fontSize: 12 }}>Siklus Bagi Hasil:</Text>
            <Text style={{ fontWeight: 300, fontSize: 12 }}>Per 1 Bulan</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={{ fontWeight: 500, fontSize: 12 }}>Periode Bagi Hasil:</Text>
            <Text style={{ fontWeight: 300, fontSize: 12 }}>{business?.borrower.duration}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={{ fontWeight: 500, fontSize: 12 }}>Akad:</Text>
            <Text style={{ fontWeight: 300, fontSize: 12 }}>Mudharabah</Text>
          </View>

        </View>
      </ScrollView>

      <View style={{ backgroundColor: '#D9D9D9', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 8 }}>
        <View>
          <Text style={{ fontSize: 8, fontWeight: 500 }}>Harga per unit:</Text>
          <Text style={{ fontSize: 16, fontWeight: 700, color: '#199B57' }}>Rp100.000</Text>
          <Text style={{ fontSize: 8, fontWeight: 300 }}>Estimasi Bagi Hasil: {business?.borrower.profit_sharing_estimate}%. Sisa {business?.sisa_unit} unit</Text>
        </View>
        <View>
          <View style={{ padding: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', width: 80, borderRadius: 20, marginBottom: 4 }}>
            <Entypo onPress={() => setUnitCount(unitCount - 1)} name="circle-with-minus" size={20} color="#076E5B" />
            <Text style={{ fontSize: 12 }}>{unitCount}</Text>
            <Entypo onPress={() => setUnitCount(unitCount + 1)} name="circle-with-plus" size={20} color="#076E5B" />
          </View>
          <Pressable style={{ paddingHorizontal: 16, paddingVertical: 2, width: 80, borderRadius: 20, backgroundColor: '#076E5B' }} onPress={onButtonBuyPressed}>
            <Text style={{ textAlign: 'center', color: '#FFFFFF', fontWeight: 500 }}>Beli</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView >
  )
}

export default BusinessDetailPage