import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { TRANSACTION_STATUS_LABEL, TRANSACTION_STATUS_LABEL_COLOR, TRANSACTION_TYPE, TRANSACTION_TYPE_LABEL } from '../constants/general'
import { formatCurrencyRp } from '../helpers/formatNumber'

const TransactionItem = ({ item, index, onTransactionItemClicked, onTransactionItemPengembalianClicked }) => {
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 8
      }}>
      <Text numberOfLines={1} style={{ fontSize: 14, fontWeight: 700 }}>{TRANSACTION_TYPE_LABEL[Number(item.transaction_type)]} {item.transaction_type == TRANSACTION_TYPE.PEMBAYARAN_PENDANAAN_LENDER ? ' | ' : ''} {item?.funding?.borrower?.business_name}</Text>

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
      <View style={{ marginTop: 8, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Pressable onPress={() => onTransactionItemPengembalianClicked(item.trx_hash)} style={{ display: item.transaction_type == TRANSACTION_TYPE.PEMBAYARAN_PENDANAAN_LENDER ? 'flex' : 'none', backgroundColor: '#199B57', borderRadius: 16, paddingVertical: 4, paddingHorizontal: 12 }}>
          <Text style={{ fontSize: 11, fontWeight: 600, color: '#FFFFFF' }}>Pengembalian Dana</Text>
        </Pressable>
        <Pressable onPress={() => onTransactionItemClicked(item.trx_hash)} style={{ marginLeft: 8, backgroundColor: '#6C6C6C', borderRadius: 16, paddingVertical: 4, paddingHorizontal: 12 }}>
          <Text style={{ fontSize: 11, fontWeight: 600, color: '#FFFFFF' }}>Detail</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default TransactionItem