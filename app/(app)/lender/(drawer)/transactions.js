import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'
import { Link, useFocusEffect, useRouter } from 'expo-router'
import { getListPembayaran } from '../../../../services/dompetService'
import { TRANSACTION_STATUS, TRANSACTION_STATUS_LABEL, TRANSACTION_STATUS_LABEL_COLOR, TRANSACTION_TYPE_LABEL } from '../../../../constants/general'
import { formatCurrencyRp } from '../../../../helpers/formatNumber'
import { getListTransaksiLender } from '../../../../services/lenderService'
import { AntDesign } from '@expo/vector-icons';

const TransactionsPage = () => {
  const [payment, setPayment] = useState()
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(null)
  const [transactions, setTransactions] = useState()
  const [refreshing, setRefreshing] = useState(false)

  const getPayment = async () => {
    setRefreshing(true)
    try {
      const response = await getListPembayaran()
      if (response) {

        setPayment(response.data.payload.lenderRecharge)
      }
      setRefreshing(false)
    } catch (error) {
      setRefreshing(false)
      alert(error)
    }
  }

  const getTransaction = async () => {
    setRefreshing(true)
    try {
      const response = await getListTransaksiLender()
      if (response) {
        setPage(response.data.payload.lenderTransactions.current_page)
        setLastPage(response.data.payload.lenderTransactions.last_page)
        setTransactions(response.data.payload.lenderTransactions.data)
      }
      setRefreshing(false)
    } catch (error) {
      setRefreshing(false)
      alert(error)
    }
  }

  const getMoreData = async () => {
    setRefreshing(true);
    try {
      if (page < lastPage) {
        const nextPage = page + 1
        const response = await getListTransaksiLender({ page: nextPage })
        if (response) {
          setPage(response.data.payload.mitra.current_page)
          setTransactions((prevData) => [...prevData, ...response.data.payload.lenderTransactions.data])
        }
      }
    } catch (error) {
      alert(error)
    } finally {
      setRefreshing(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getPayment();
      getTransaction();
    }, [])
  );

  const onRefresh = useCallback(() => {
    getPayment();
    getTransaction();
  }, []);

  const TransactionItem = ({ item, index }) => {
    return (
      <View style={{
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 8
      }}>
        <Text style={{ fontSize: 14, fontWeight: 700 }}>{TRANSACTION_TYPE_LABEL[Number(item.transaction_type)]}</Text>

        <View style={{ borderBottomColor: 'black', borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 8 }}
        />

        <Text style={{ fontSize: 14, fontWeight: 500, marginBottom: 8, color: '#949795' }}>{`AMNH-${item.trx_hash}`}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
          <Text>Waktu:</Text>
          <Text>{item.transaction_datetime}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
          <Text>Jumlah:</Text>
          <Text style={{ fontSize: 14, fontWeight: 400 }}>{formatCurrencyRp(item.transaction_amount)}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
          <Text>Status Transaksi:</Text>
          <Text style={{ color: TRANSACTION_STATUS_LABEL_COLOR[item.status], fontSize: 12, fontWeight: 500 }}>{TRANSACTION_STATUS_LABEL[item.status]}</Text>
        </View>
      </View>
    )
  }

  const PembayaranHeader = () => {
    if (payment && payment.length > 0) {
      return (
        <Link href="/(app)/lender/pembayaran">
          <View style={{
            backgroundColor: '#FFFFFF',
            padding: 16,
            borderRadius: 8,
            marginBottom: 16,
            borderColor: 'yellow',
            borderWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignContent: 'center',
            width: '100%'
          }}>
            <Text>Ada item yang menuggu pembayaran!!</Text>
            <AntDesign name="doubleright" size={16} color="black" />
          </View>
        </Link>
      )
    } else {
      return null
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 16, backgroundColor: '#D9D9D9' }}>
      <FlatList
        data={transactions}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        renderItem={({ index, item }) => (<TransactionItem item={item} index={index} />)}
        refreshing={refreshing}
        onRefresh={onRefresh}
        style={{ flex: 1, paddingVertical: 16 }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        keyExtractor={(item) => item.trx_hash}
        onEndReached={getMoreData}
        onEndReachedThreshold={0.1}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListHeaderComponent={() => (<PembayaranHeader />)}
      />
    </SafeAreaView >
  )
}

export default TransactionsPage