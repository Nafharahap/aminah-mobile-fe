import { View, Text, Image, StyleSheet, Pressable } from 'react-native'
import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import { useFocusEffect, useLocalSearchParams, useNavigation, useRouter } from 'expo-router'
import { getDetailMitra } from '../../../../services/publicService'
import { API_BASE_URL } from '@env'
import { Entypo } from '@expo/vector-icons';
import { formatCurrencyRp } from '../../../../helpers/formatNumber'
import { useCart } from '../../../../context/cart'

const ModalCardDetails = () => {
  const navigation = useNavigation()
  const { addToCart } = useCart()
  const params = useLocalSearchParams();
  const { id, count } = params
  const { cart } = useCart()
  const [business, setBusiness] = useState(null)
  const [unitCount, setUnitCount] = useState(Number(count))

  const getData = async () => {
    try {
      const response = await getDetailMitra(id)
      if (response) {
        console.log(response.data.payload.funding);
        setBusiness(response.data.payload.funding)
      }
    } catch (error) {
      alert(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const subtractCount = () => {
    if (unitCount > 1) {
      setUnitCount(unitCount - 1)
    }
  }

  const addCount = () => {
    if (unitCount < business?.sisa_unit) {
      setUnitCount(unitCount + 1)
    }
  }

  const onAddToCartPressed = () => {
    const cartItem = cart.find((item) => item.id === business.id)

    const cartItemQuantity = cartItem ? cartItem.quantity : 0
    console.log(unitCount, cartItemQuantity, business?.sisa_unit);

    if (unitCount + cartItemQuantity > business?.sisa_unit) {
      alert('Tidak ada unit tersedia')
    } else {
      const cartItem = {
        id: business.id,
        borrower_id: business.borrower_id,
        borrower_user_id: business.borrower.user.id,
        name: business.borrower.business_name,
        borrower_name: business.borrower.name,
        image: business.borrower.business_image,
        price: 100000,
        quantity: unitCount,
        maxQuantity: business?.sisa_unit,
        selected: true
      }
      addToCart(cartItem)
      alert('Berhasil Tambah Cart')
      navigation.goBack()
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ flex: 1 }}>
        <View style={{ padding: 16 }}>
          <Text style={{ color: '#000000', fontSize: 20, fontWeight: 'bold' }}>{business?.borrower.name}</Text>

          <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 8 }}
          />

          <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
            <Image
              style={{ width: 48, height: 48, borderRadius: 48 / 2 }}
              source={{ uri: `${API_BASE_URL}/pendaftaran/${business?.pengajuan?.business_image}` }}
              defaultSource={require('../../../../assets/images/profile-placeholder.jpeg')}
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
            <Text style={{ flex: 1, fontWeight: 500, fontSize: 12 }}>Tujuan Pengajuan:</Text>
            <Text style={{ flex: 3, fontWeight: 300, fontSize: 12 }}>{business?.borrower.purpose}</Text>
          </View>

          <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 8 }}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={{ fontWeight: 500, fontSize: 12 }}>Estimasi Bagi Hasil:</Text>
            <Text style={{ fontWeight: 300, fontSize: 12 }}>{business?.borrower.profit_sharing_estimate}%</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={{ fontWeight: 500, fontSize: 12 }}>Lama Pendanaan:</Text>
            <Text style={{ fontWeight: 300, fontSize: 12 }}>{business?.borrower.duration} Bulan</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={{ fontWeight: 500, fontSize: 12 }}>Siklus Bagi Hasil:</Text>
            <Text style={{ fontWeight: 300, fontSize: 12 }}>Per 1 Bulan</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={{ fontWeight: 500, fontSize: 12 }}>Periode Bagi Hasil:</Text>
            <Text style={{ fontWeight: 300, fontSize: 12 }}>{business?.borrower.duration} Bulan</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={{ fontWeight: 500, fontSize: 12 }}>Akad:</Text>
            <Text style={{ fontWeight: 300, fontSize: 12 }}>Mudharabah</Text>
          </View>

          <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 8 }}
          />

          <Text style={{ fontWeight: 500, fontSize: 12, marginBottom: 8 }}>Jumlah Pembelian Unit:</Text>
          <View style={{ paddingHorizontal: 2, paddingVertical: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#D9D9D9', width: '100%', borderRadius: 20, marginBottom: 4 }}>
            <Entypo onPress={subtractCount} name="circle-with-minus" size={20} color="#076E5B" />
            <Text style={{ fontSize: 12 }}>{unitCount}</Text>
            <Entypo onPress={addCount} name="circle-with-plus" size={20} color="#076E5B" />
          </View>

        </View>

        <View style={{ position: 'absolute', bottom: 0, backgroundColor: '#D9D9D9', flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flex: 8, paddingHorizontal: 16, paddingVertical: 8 }}>
            <Text style={{ fontSize: 12, fontWeight: 500 }}>Total Pembayaran:</Text>
            <Text style={{ fontSize: 20, fontWeight: 700, color: '#199B57' }}>{formatCurrencyRp(unitCount * 100000)}</Text>
          </View>
          <View style={{ flex: 4 }}>
            <Pressable onPress={onAddToCartPressed} style={{ width: '100%', height: '100%', backgroundColor: '#076E5B', justifyContent: 'center' }}>
              <Text style={{ textAlign: 'center', color: '#FFFFFF', fontWeight: 700 }}>Add to Cart</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </SafeAreaView >
  )
}

export default ModalCardDetails