import { View, Text, Pressable, FlatList, SafeAreaView } from 'react-native'
import React, { useState, useCallback } from 'react'
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router'
import { TRANSACTION_STATUS, TRANSACTION_STATUS_LABEL, TRANSACTION_STATUS_LABEL_COLOR, TRANSACTION_TYPE_LABEL } from '../../../../constants/general'
import { formatCurrencyRp } from '../../../../helpers/formatNumber'
import { getPendanaanList } from '../../../../services/borrowerService'
import { diffForHumans } from '../../../../helpers/time'

const ReturnProfitPage = () => {
  const router = useRouter()
  const params = useLocalSearchParams();
  const { id } = params
  const [data, setData] = useState()
  const [refreshing, setRefreshing] = useState(false)

  const getData = async () => {
    setRefreshing(true)
    try {
      const response = await getPendanaanList(id)
      if (response) {
        setData(response.data.payload.transactions)
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
      router.push({ pathname: '/(app)/borrower/pengembalian-dana/detail/[:id]', params: { id: item.trx_hash } })
    }

    return (
      <View style={{
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 5
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
          <Text style={{ fontSize: 12 }}>Status Pengembalian:</Text>
          <Text style={{ color: TRANSACTION_STATUS_LABEL_COLOR[item.status], fontSize: 12, fontWeight: 500 }}>{TRANSACTION_STATUS_LABEL[item.status]}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
          <Text style={{ fontSize: 12, fontWeight: 700 }}>Jumlah Pengembalian:</Text>
          <Text style={{ fontSize: 12, fontWeight: 700 }}>{formatCurrencyRp(item.transaction_amount)}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
          <Text style={{ fontSize: 12, fontWeight: 700 }}>Keterangan:</Text>
          <Text style={{ fontSize: 12, fontWeight: 700 }}>{diffForHumans(item.transaction_date)}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
          <Text>Tanggal Jatuh Tempo:</Text>
          <Text>{item.transaction_date}</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 }}>
          <Pressable onPress={onPembayaranItemPressed} style={{ borderRadius: 20, backgroundColor: '#076E5B', opacity: item.status === TRANSACTION_STATUS.SUCCESS ? 0.3 : 1, paddingHorizontal: 16, paddingVertical: 4 }} disabled={item.status === TRANSACTION_STATUS.SUCCESS}>
            <Text style={{ color: 'white' }}>Bayar</Text>
          </Pressable>
        </View>
      </View>
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
        contentContainerStyle={{ paddingVertical: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        keyExtractor={(item) => item.trx_hash}
      />
    </SafeAreaView >
  )
}

export default ReturnProfitPage