import { View, Text, StyleSheet, SafeAreaView, FlatList, Pressable } from 'react-native'
import React, { useState, useCallback } from 'react'
import { Link, useFocusEffect, useRouter } from 'expo-router'
import { getListPembayaran } from '../../../../services/dompetService'
import { TRANSACTION_STATUS, TRANSACTION_STATUS_LABEL, TRANSACTION_STATUS_LABEL_COLOR, TRANSACTION_TYPE, TRANSACTION_TYPE_LABEL } from '../../../../constants/general'
import { formatCurrencyRp } from '../../../../helpers/formatNumber'
import { getListTransaksi } from '../../../../services/lenderService'
import { AntDesign } from '@expo/vector-icons';
import TransactionItem from '../../../../components/TransactionItem'

const TransactionsPage = () => {
  const [payment, setPayment] = useState()
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(null)
  const [transactions, setTransactions] = useState()
  const [refreshing, setRefreshing] = useState(false)
  const [type, setType] = useState(0)

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
      const response = await getListTransaksi({ page: page, type: type })
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
        const response = await getListTransaksi({ page: nextPage, type: type })
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
    }, [type])
  );

  const onTransactionItemClicked = (trx_hash) => {
    router.push(`/(app)/lender/transaction/receipt/${trx_hash}`)
  }

  const onTransactionItemPengembalianClicked = (trx_hash) => {
    router.push(`/(app)/lender/transaction/pengembalian-pendanaan/${trx_hash}`)
  }

  const onRefresh = useCallback(() => {
    getPayment();
    getTransaction();
  }, []);

  const PembayaranHeader = () => {
    const onPembayaranHeaderClick = () => {
      router.push('/(app)/lender/pembayaran')
    }

    const onFilterClick = (id) => {
      setRefreshing(true)
      setType(id)
    }

    if (payment && payment.length > 0) {
      return (
        <View>
          <FlatList
            data={[0, 1, 3, 6]}
            horizontal={true}
            style={{ marginBottom: 16 }}
            keyExtractor={(item) => item.trx_hash}
            ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
            renderItem={({ index, item }) => (
              <View onTouchEnd={() => onFilterClick(item)} style={{ borderRadius: 12, paddingHorizontal: 20, paddingVertical: 8, backgroundColor: type == item ? '#6C6C6C' : '#FFFFFF', borderWidth: 1, borderColor: type == item ? '#6C6C6C' : '#000000' }}>
                <Text style={{ textAlign: 'center', color: type == item ? '#FFFFFF' : '#000000' }}>{TRANSACTION_TYPE_LABEL[item]}</Text>
              </View>
            )}
          />

          <View
            onTouchEnd={onPembayaranHeaderClick}
            style={{
              backgroundColor: '#F00000',
              padding: 16,
              borderRadius: 8,
              marginBottom: 16,
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%'
            }}>
            <Text style={{ marginRight: 12, color: '#FFFFFF' }}>Ada item yang menuggu pembayaran!!</Text>
            <AntDesign name="doubleright" size={16} color="white" />
          </View>
        </View>
      )
    } else {
      return (
        <FlatList
          data={[0, 1, 3, 6]}
          horizontal={true}
          style={{ marginBottom: 16 }}
          keyExtractor={(item) => item.trx_hash}
          ItemSeparatorComponent={() => <View style={{ width: 8 }} />}
          renderItem={({ index, item }) => (
            <View onTouchEnd={() => onFilterClick(item)} style={{ borderRadius: 12, paddingHorizontal: 20, paddingVertical: 8, backgroundColor: type == item ? '#6C6C6C' : '#FFFFFF', borderWidth: 1, borderColor: type == item ? '#6C6C6C' : '#000000' }}>
              <Text style={{ textAlign: 'center', color: type == item ? '#FFFFFF' : '#000000' }}>{TRANSACTION_TYPE_LABEL[item]}</Text>
            </View>
          )}
        />
      )
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 16, backgroundColor: '#D9D9D9' }}>
      <FlatList
        data={transactions}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        renderItem={({ index, item }) => (<TransactionItem item={item} index={item.id} onTransactionItemClicked={onTransactionItemClicked} onTransactionItemPengembalianClicked={onTransactionItemPengembalianClicked} />)}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        keyExtractor={(item) => item.trx_hash}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={getMoreData}
        onEndReachedThreshold={0.1}
        contentContainerStyle={{ paddingVertical: 16 }}
        ListHeaderComponent={() => (<PembayaranHeader />)}
      />
    </SafeAreaView >
  )
}

export default TransactionsPage