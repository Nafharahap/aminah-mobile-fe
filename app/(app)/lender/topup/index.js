import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'
import { formatCurrencyRp } from '../../../../helpers/formatNumber'
import { useRouter } from 'expo-router'
import { postIsiDompet } from '../../../../services/dompetService'

const DATA = [
  100000,
  200000,
  300000,
  400000,
  500000,
  1000000,
  2000000,
  3000000,
  4000000,
  5000000
]

const TopUpPage = () => {
  const [nominal, setNominal] = useState(null)
  const router = useRouter()

  const onPressed = (item) => {
    setNominal(item)
  }

  const NominalItem = ({ item, index, onClick }) => {
    return (
      <Pressable onPress={() => onClick(item)} style={{ backgroundColor: item === nominal ? 'rgb(180, 255, 159)' : 'whitesmoke', paddingVertical: 16, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 16 }}>{formatCurrencyRp(item)}</Text>
      </Pressable>
    )
  }

  const onTopupPressed = async () => {
    try {
      const data = new FormData();
      data.append('product', nominal)

      const response = await postIsiDompet(data)

      console.log('Segera Lakukan Pembayaran')
      alert('Segera Lakukan Pembayaran')
      router.back()
    } catch (error) {
      console.log('Request Gagal', error)
      alert('Request Gagal')
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 16, backgroundColor: '#FFFFFF' }}>
      <FlatList
        data={DATA}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        renderItem={({ index, item }) => (<NominalItem item={item} index={index} onClick={onPressed} />)}
        style={{ flex: 1, paddingVertical: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        keyExtractor={(item, index) => index}
        ListHeaderComponent={() => (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 20 }}>Pilih Nominal</Text>
          </View>
        )}
      />

      <View style={{ padding: 16 }}>
        <Pressable onPress={onTopupPressed} style={{ backgroundColor: 'blue', justifyContent: 'center', alignItems: 'center', borderRadius: 20, paddingVertical: 8 }}>
          <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Isi Dompet</Text>
        </Pressable>
      </View>
    </SafeAreaView >
  )
}

export default TopUpPage