import { View, Text, Pressable, SafeAreaView, FlatList, ActivityIndicator } from 'react-native'
import React, { useCallback, useState } from 'react'
import { formatCurrencyRp } from '../../../../helpers/formatNumber'
import { useFocusEffect, useRouter } from 'expo-router'
import { postIsiDompet } from '../../../../services/dompetService'
import { getProfileLender } from '../../../../services/lenderService'

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
  const [profile, setProfile] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const router = useRouter()

  const onPressed = (item) => {
    setNominal(item)
  }

  const NominalItem = ({ item, index, onClick }) => {
    return (
      <Pressable onPress={() => onClick(item)} style={[
        { backgroundColor: item === nominal ? 'rgb(180, 255, 159)' : 'whitesmoke', paddingVertical: 16, borderRadius: 20, justifyContent: 'center', alignItems: 'center', flex: 1 },
        index % 2 === 0
          ? {
            marginRight: 6,
          } : {
            marginLeft: 6
          }
      ]}>
        <Text style={{ fontSize: 16 }}>{formatCurrencyRp(item)}</Text>
      </Pressable>
    )
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

  const isProfileCompleted = () => {
    return profile?.checkProfile
  }

  const onTopupPressed = async () => {
    setRefreshing(true)
    try {
      if (!isProfileCompleted()) {
        throw Error('Silahkan Lengkapi Profil Terlebih Dahulu')
      }

      const data = new FormData();
      data.append('product', nominal)

      const response = await postIsiDompet(data)

      setRefreshing(false)
      alert('Segera Lakukan Pembayaran')
      router.back()
    } catch (error) {
      setRefreshing(false)
      alert(error.message)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 16, backgroundColor: '#FFFFFF' }}>
      <FlatList
        data={DATA}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ index, item }) => (<NominalItem item={item} index={index} onClick={onPressed} />)}
        contentContainerStyle={{ paddingVertical: 20 }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        keyExtractor={(item, index) => index}
        ListHeaderComponent={() => (
          <View style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 20 }}>Pilih Nominal</Text>
          </View>
        )}
      />

      <View style={{ padding: 16 }}>
        <Pressable onPress={onTopupPressed} style={{ flexDirection: 'row', backgroundColor: '#076E5B', justifyContent: 'center', alignItems: 'center', borderRadius: 20, paddingVertical: 8, opacity: refreshing ? 0.5 : 1 }} disabled={refreshing}>
          <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Isi Saldo!</Text>
          <ActivityIndicator animating={refreshing} size="small" color={'#FFFFFF'} style={{ marginLeft: 12, display: refreshing ? 'flex' : 'none' }} />
        </Pressable>
      </View>
    </SafeAreaView >
  )
}

export default TopUpPage