import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import React, { useState, useCallback } from 'react'
import { useFocusEffect, useRouter } from 'expo-router'
import { TRANSACTION_STATUS_LABEL, TRANSACTION_STATUS_LABEL_COLOR, TRANSACTION_TYPE, TRANSACTION_TYPE_LABEL } from '../../../../constants/general'
import { formatCurrencyRp } from '../../../../helpers/formatNumber'
import { getListTransaksi } from '../../../../services/lenderService'
import TransactionItem from '../../../../components/TransactionItem'

const TransactionsBorrowerPage = () => {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [lastPage, setLastPage] = useState(null)
  const [transactions, setTransactions] = useState()
  const [refreshing, setRefreshing] = useState(false)

  const getTransaction = async () => {
    setRefreshing(true)
    try {
      const response = await getListTransaksi({ page: page, type: 4 })
      console.log(response.data.payload.lenderTransactions.data);
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
        const response = await getListTransaksi({ page: nextPage, type: 4 })
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

  const onTransactionItemClicked = (trx_hash) => {
    router.push(`/(app)/borrower/transaction/${trx_hash}`)
  }

  const onRefresh = useCallback(() => {
    getTransaction();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 16, backgroundColor: '#D9D9D9' }}>
      <FlatList
        data={transactions}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        renderItem={({ index, item }) => (<TransactionItem item={item} index={item.id} onTransactionItemClicked={onTransactionItemClicked} />)}
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