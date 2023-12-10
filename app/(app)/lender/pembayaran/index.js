import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'
import { useFocusEffect, useRouter } from 'expo-router'
import { getListPembayaran } from '../../../../services/dompetService'
import { TRANSACTION_STATUS, TRANSACTION_STATUS_LABEL, TRANSACTION_TYPE_LABEL } from '../../../../constants/general'
import { formatCurrencyRp } from '../../../../helpers/formatNumber'

const TopUpPage = () => {
  const router = useRouter()
  const [data, setData] = useState()
  const [refreshing, setRefreshing] = useState(false)

  const getData = async () => {
    setRefreshing(true)
    try {
      const response = await getListPembayaran()
      if (response) {
        console.log(response);
        setData(response.data.payload.lenderRecharge)
      }
      setRefreshing(false)
    } catch (error) {
      setRefreshing(false)
      alert(error)
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

  const PembayaranItem = ({ item, index }) => {
    const onPembayaranItemPressed = () => {
      if (item.status === TRANSACTION_STATUS.WAITING) {
        router.push({ pathname: '/(app)/lender/pembayaran/[:id]', params: { id: item.trx_hash } })
      }
    }

    return (
      <Pressable onPress={onPembayaranItemPressed}>
        <View style={{
          backgroundColor: '#FFFFFF',
          padding: 16,
          borderRadius: 20
        }}>
          <Text style={{ fontSize: 14, fontWeight: 700 }}>AMNH - {item.trx_hash}</Text>

          <View style={{ borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 8 }}
          />

          <Text style={{ fontSize: 14, fontWeight: 400 }}>{TRANSACTION_TYPE_LABEL[Number(item.transaction_type)]}</Text>
          <Text style={{ fontSize: 14, fontWeight: 400 }}>{TRANSACTION_STATUS_LABEL[item.status]}</Text>
          <Text style={{ fontSize: 14, fontWeight: 400 }}>{item.transaction_date}</Text>
          <Text style={{ fontSize: 14, fontWeight: 400 }}>{item.transaction_datetime}</Text>
          <Text style={{ fontSize: 14, fontWeight: 400 }}>{formatCurrencyRp(item.transaction_amount)}</Text>
        </View>
      </Pressable>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 16, backgroundColor: '#D9D9D9' }}>
      <FlatList
        data={data}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        renderItem={({ index, item }) => (<PembayaranItem item={item} index={index} />)}
        refreshing={refreshing}
        onRefresh={onRefresh}
        style={{ flex: 1, paddingVertical: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        keyExtractor={(item) => item.trx_hash}
      />
    </SafeAreaView >
  )
}

export default TopUpPage