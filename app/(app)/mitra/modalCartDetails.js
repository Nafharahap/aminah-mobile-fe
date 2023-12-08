import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router'
import { getDetailMitra } from '../../../services/publicService'
import { API_BASE_URL } from '@env'
import { Entypo, Ionicons } from '@expo/vector-icons';
import { formatCurrencyRp } from '../../../helpers/formatNumber'

const ModalCardDetails = () => {
  const router = useRouter()
  const params = useLocalSearchParams();
  const { id, count } = params
  const [business, setBusiness] = useState(null)
  const [refreshing, setRefreshing] = useState()
  const [isImageExist, setIsImageExist] = useState(true)
  const [unitCount, setUnitCount] = useState(Number(count))

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1, padding: 16 }}>
          <Text style={{ color: '#000000', fontSize: 20, fontWeight: 'bold' }}>{business?.borrower.name}</Text>

          <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 8 }}
          />

          <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
            <Image
              style={{ width: 48, height: 48, borderRadius: '50%' }}
              source={isImageExist ? `${API_BASE_URL}/pendaftaran/${business?.pengajuan?.business_image}` : require('../../../assets/images/profile-placeholder.jpeg')}
              onError={() => setIsImageExist(null)}
            />
            <View style={{ justifyContent: 'center' }}>
              <Text style={{ color: '#000000', fontSize: 16, fontWeight: 'bold' }}>
                {business?.borrower.business_name}
              </Text>
              <Text style={{ color: '#199B57', fontSize: 12, fontWeight: 700 }}>Rp100.000</Text>
            </View>
          </View>

          <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 8 }}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={{ flex: 1, fontWeight: 500, fontSize: 12 }}>Tujuan Pendanaan:</Text>
            <Text style={{ flex: 3, fontWeight: 300, fontSize: 12 }}>{business?.borrower.purpose}</Text>
          </View>

          <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 8 }}
          />

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

          <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 8 }}
          />

          <Text style={{ fontWeight: 500, fontSize: 12, marginBottom: 8 }}>Jumlah Pembelian Unit:</Text>
          <View style={{ paddingHorizontal: 2, paddingVertical: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#D9D9D9', width: '100%', borderRadius: 20, marginBottom: 4 }}>
            <Entypo onPress={() => setUnitCount(unitCount - 1)} name="circle-with-minus" size={20} color="#076E5B" />
            <Text style={{ fontSize: 12 }}>{unitCount}</Text>
            <Entypo onPress={() => setUnitCount(unitCount + 1)} name="circle-with-plus" size={20} color="#076E5B" />
          </View>

          <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 8 }}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={{ fontWeight: 500, fontSize: 12 }}>Nilai Investasi:</Text>
            <Text style={{ fontWeight: 300, fontSize: 12 }}>{formatCurrencyRp(unitCount * 100000)}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={{ fontWeight: 500, fontSize: 12 }}>Biaya Layanan:</Text>
            <Text style={{ fontWeight: 300, fontSize: 12 }}>-</Text>
          </View>


        </View>
      </ScrollView>

      <View style={{ backgroundColor: '#D9D9D9', flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flex: 8, paddingHorizontal: 16, paddingVertical: 8 }}>
          <Text style={{ fontSize: 12, fontWeight: 500 }}>Total Pembayaran:</Text>
          <Text style={{ fontSize: 20, fontWeight: 700, color: '#199B57' }}>{formatCurrencyRp(unitCount * 100000)}</Text>
        </View>
        <View style={{ flex: 4 }}>
          <Pressable style={{ width: '100%', height: '100%', backgroundColor: '#076E5B', justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#FFFFFF', fontWeight: 700 }}>Add to Cart</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ModalCardDetails