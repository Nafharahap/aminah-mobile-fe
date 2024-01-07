import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { FlatList } from 'react-native-gesture-handler'
import { Link, useFocusEffect, useRouter } from 'expo-router'
import { getListPembayaran } from '../../../../services/dompetService'
import { TRANSACTION_STATUS, TRANSACTION_STATUS_LABEL, TRANSACTION_STATUS_LABEL_COLOR, TRANSACTION_TYPE, TRANSACTION_TYPE_LABEL } from '../../../../constants/general'
import { formatCurrencyRp } from '../../../../helpers/formatNumber'
import { getListTransaksiLender } from '../../../../services/lenderService'
import { AntDesign } from '@expo/vector-icons';

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
      const response = await getListTransaksiLender({ page: page, type: type })
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
        const response = await getListTransaksiLender({ page: nextPage, type: type })
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

  const onRefresh = useCallback(() => {
    getPayment();
    getTransaction();
  }, []);

  const onTransactionItemClicked = (trx_hash) => {
    router.push(`/(app)/lender/transaction/${trx_hash}`)
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
          <Text style={{ fontSize: 14, fontWeight: 600 }}>{(item.transaction_type == TRANSACTION_TYPE.PEMBAYARAN_PENDANAAN_LENDER || item.transaction_type == TRANSACTION_TYPE.PENARIKAN_SALDO_LENDER) ? '-' : ''}{formatCurrencyRp(item.transaction_amount)}</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
          <Text>Status Transaksi:</Text>
          <Text style={{ color: TRANSACTION_STATUS_LABEL_COLOR[item.status], fontSize: 12, fontWeight: 500 }}>{TRANSACTION_STATUS_LABEL[item.status]}</Text>
        </View>
      </View>
    )
  }

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
            keyExtractor={(item) => item}
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
              backgroundColor: '#FFFFFF',
              padding: 16,
              borderRadius: 8,
              marginBottom: 16,
              borderColor: 'yellow',
              borderWidth: 1,
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%'
            }}>
            <Text style={{ marginRight: 12 }}>Ada item yang menuggu pembayaran!!</Text>
            <AntDesign name="doubleright" size={16} color="black" />
          </View>
        </View>
      )
    } else {
      return (
        <FlatList
          data={[0, 1, 3, 6]}
          horizontal={true}
          style={{ marginBottom: 16 }}
          keyExtractor={(item) => item}
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
        renderItem={({ index, item }) => (<TransactionItem item={item} index={item.id} />)}
        style={{ flex: 1, marginTop: -12 }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        keyExtractor={(item) => item.trx_hash}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onEndReached={getMoreData}
        onEndReachedThreshold={0.1}
        contentContainerStyle={{ paddingBottom: 40 }}
        ListHeaderComponent={() => (<PembayaranHeader />)}
      />
    </SafeAreaView >
  )
}

export default TransactionsPage