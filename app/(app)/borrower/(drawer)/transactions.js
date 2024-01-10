import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import React, { useState, useCallback } from 'react'
import { useFocusEffect, useRouter } from 'expo-router'
import { TRANSACTION_STATUS_LABEL, TRANSACTION_STATUS_LABEL_COLOR, TRANSACTION_TYPE, TRANSACTION_TYPE_LABEL } from '../../../../constants/general'
import { formatCurrencyRp } from '../../../../helpers/formatNumber'
import { getListTransaksiLender } from '../../../../services/lenderService'

const TransactionsBorrowerPage = () => {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(null)
  const [transactions, setTransactions] = useState()
  const [refreshing, setRefreshing] = useState(false)

  const getTransaction = async () => {
    setRefreshing(true)
    try {
      const response = await getListTransaksiLender({ page: page, type: 4 })
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
        const response = await getListTransaksiLender({ page: nextPage, type: 4 })
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
      getTransaction();
    }, [])
  );

  const onRefresh = useCallback(() => {
    getTransaction();
  }, []);

  const onTransactionItemClicked = (trx_hash) => {
    router.push(`/(app)/borrower/transaction/${trx_hash}`)
  }

  const TransactionItem = ({ item, index }) => {
    return (
      <View
        onTouchEnd={() => onTransactionItemClicked(item.trx_hash)}
        style={{
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
          <Text style={{ fontSize: 14, fontWeight: 600 }}>{(item.transaction_type == TRANSACTION_TYPE.PEMBAYARAN_PENDANAAN_LENDER || item.transaction_type == TRANSACTION_TYPE.PENARIKAN_SALDO_LENDER || item.transaction_type == TRANSACTION_TYPE.PENARIKAN_PENDANAAN) ? '-' : ''}{formatCurrencyRp(item.transaction_amount)}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
          <Text>Status Transaksi:</Text>
          <Text style={{ color: TRANSACTION_STATUS_LABEL_COLOR[item.status], fontSize: 12, fontWeight: 500 }}>{TRANSACTION_STATUS_LABEL[item.status]}</Text>
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 16, backgroundColor: '#D9D9D9' }}>
      <FlatList
        data={transactions}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        renderItem={({ index, item }) => (<TransactionItem item={item} index={item.id} />)}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        keyExtractor={(item) => item.trx_hash}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={getMoreData}
        onEndReachedThreshold={0.1}
        contentContainerStyle={{ paddingVertical: 16 }}
      />
    </SafeAreaView >
  )
}

export default TransactionsBorrowerPage