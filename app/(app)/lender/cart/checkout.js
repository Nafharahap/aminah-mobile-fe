import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState, useCallback } from 'react'
import { useCart } from '../../../../context/cart'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'
import { formatCurrencyRp } from '../../../../helpers/formatNumber'
import { getProfileLender, postCheckoutCart } from '../../../../services/lenderService'
import { useFocusEffect, useRouter } from 'expo-router'

const CheckoutItem = ({ item, index }) => {
  return (
    <View>
      <Text style={{ fontSize: 16, fontWeight: 800, marginBottom: 4 }}>{item.name} - {item.borrower_name}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
        <Text style={{ fontSize: 14, fontWeight: 600 }}>Harga Per Unit:</Text>
        <Text style={{ fontSize: 14, fontWeight: 600 }}>Rp100.000</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
        <Text style={{ fontSize: 14, fontWeight: 600 }}>Jumlah Unit:</Text>
        <Text style={{ fontSize: 14, fontWeight: 600 }}>{item.quantity} Unit</Text>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
        <Text style={{ fontSize: 14, fontWeight: 600, color: '#199B57' }}>Total Harga:</Text>
        <Text style={{ fontSize: 14, fontWeight: 600, color: '#199B57' }}>{formatCurrencyRp(item.quantity * 100000)}</Text>
      </View>

      <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 4 }}
      />
    </View>
  )
}

const CheckoutPage = () => {
  const { cart, removeAllCartItem } = useCart()
  const [profile, setProfile] = useState(null)
  const router = useRouter()

  const sumTotalHarga = () => {
    const sum = cart.reduce((result, obj) => {
      return result + obj.quantity
    }, 0)

    return sum * 100000
  }


  const getData = async () => {
    try {
      const response = await getProfileLender()
      if (response) {
        setProfile(response.data.payload.user)
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

  const isSufficient = () => {
    return Number(sumTotalHarga()) <= profile?.sumAmount
  }

  const isProfileCompleted = () => {
    return profile?.checkProfile
  }

  const onButtonPayPressed = async () => {
    try {
      if (!isSufficient()) {
        throw Error('Saldo Tidak Cukup')
      } else if (!isProfileCompleted()) {
        throw Error('Silahkan Lengkapi Profil Terlebih Dahulu')
      } else if (cart.length < 1) {
        throw Error('Maaf, tidak ada item di keranjang')
      }

      const data = new FormData();
      data.append('metodePembayaran', 1)
      data.append('cartItems', JSON.stringify(cart))

      const response = await postCheckoutCart(data)
      console.log(response);
      removeAllCartItem()
      alert('Berhasil Checkout')
      router.back()
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#D9D9D9' }}>
      <ScrollView
        style={{ paddingHorizontal: 16, height: '80%' }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ backgroundColor: '#FFFFFF', padding: 12, borderRadius: 8 }}>
          <FlatList
            data={cart.filter((item) => item.selected === true)}
            numColumns={1}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ index, item }) => (<CheckoutItem item={item} index={index} />)}
            style={{ flex: 1 }}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            keyExtractor={item => item.id}
          />
        </View>

        <View style={{ backgroundColor: '#FFFFFF', padding: 12, borderRadius: 8, marginTop: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: 800 }}>Rincian Pembayaran</Text>

          <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 8 }}
          />

          {
            cart.map((item) => {
              return (
                <View key={item.id} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                  <Text style={{ fontSize: 14, fontWeight: 600 }}>{item.name}</Text>
                  <Text style={{ fontSize: 14, fontWeight: 600 }}>{formatCurrencyRp(item.quantity * 100000)}</Text>
                </View>
              )
            })
          }

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text style={{ fontSize: 14, fontWeight: 600, color: '#199B57' }}>Total Pembayaran:</Text>
            <Text style={{ fontSize: 14, fontWeight: 600, color: '#199B57' }}>{formatCurrencyRp(sumTotalHarga())}</Text>
          </View>
        </View>

        <View style={{ backgroundColor: '#FFFFFF', padding: 12, borderRadius: 8, marginTop: 12 }}>
          <Text style={{ fontSize: 16, fontWeight: 800, marginBottom: 8 }}>Metode Pembayaran</Text>
          <Text style={{ fontSize: 14, fontWeight: 600 }}>Saldo Dompet Digital ({formatCurrencyRp(profile?.sumAmount)})</Text>
        </View>

      </ScrollView>

      <View style={{ height: '20%', flex: 1, backgroundColor: '#FFFFFF', flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ flex: 8, paddingHorizontal: 16, paddingVertical: 8 }}>
          <Text style={{ fontSize: 12, fontWeight: 500 }}>Total Pembayaran:</Text>
          <Text style={{ fontSize: 20, fontWeight: 700, color: '#199B57' }}>{formatCurrencyRp(sumTotalHarga())}</Text>
        </View>
        <View style={{ flex: 4 }}>
          <Pressable onPress={onButtonPayPressed} style={{ width: '100%', height: '100%', backgroundColor: '#076E5B', justifyContent: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#FFFFFF', fontWeight: 700 }}>Bayar</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView >

  )
}

export default CheckoutPage