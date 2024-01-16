import { View, Text, SafeAreaView, Image, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router';
import { formatCurrencyRp } from '../../../../helpers/formatNumber';
import { TRANSACTION_STATUS_LABEL, TRANSACTION_STATUS_LABEL_COLOR, TRANSACTION_TYPE_LABEL } from '../../../../constants/general';
import { getDetailTransaksiLender } from '../../../../services/lenderService';
import { formateDateTime } from '../../../../helpers/time';

const DetailComponentSaldo = ({ detail }) => {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Image
        source={require('../../../../assets/images/logo-aminah-01.png')}
        style={{ width: 'auto', height: 120, paddingVertical: 100 }}
      />

      <View>
        <Text style={{ fontSize: 12 }}>{formateDateTime(detail?.transaction_datetime, 'DD MMMM YYYY HH:mm:ss')}</Text>
      </View>

      <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 16 }}
      />

      <View style={{ marginBottom: 8, paddingVertical: 8, paddingHorizontal: 16, backgroundColor: '#076E5B', borderRadius: 8, alignSelf: 'flex-start' }}>
        <Text style={{ fontSize: 12, color: '#FFFFFF', fontWeight: 600 }}>{TRANSACTION_TYPE_LABEL[detail?.transaction_type]}</Text>
      </View>

      <Text style={{ fontSize: 20, color: '#000000', fontWeight: 700 }}>{formatCurrencyRp(detail?.transaction_amount)}</Text>

      <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 16 }}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
        <Text style={{ fontSize: 16 }}>Status: </Text>
        <Text style={{ fontSize: 16, color: TRANSACTION_STATUS_LABEL_COLOR[detail?.status] }}>{TRANSACTION_STATUS_LABEL[detail?.status]}</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 20, color: '#076E5B', fontWeight: 600 }}>Total: </Text>
        <Text style={{ fontSize: 20, color: '#076E5B', fontWeight: 600 }}>{formatCurrencyRp(detail?.transaction_amount)}</Text>
      </View>

      <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 16 }}
      />

      <Text style={{ fontSize: 20, color: '#000000', fontWeight: 700, marginBottom: 12 }}>Rincian Transaksi</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 14, color: '#000000', fontWeight: 400 }}>ID Transaksi </Text>
        <Text style={{ fontSize: 14, color: '#000000', fontWeight: 400 }}>{detail?.trx_hash}</Text>
      </View>
    </View>
  )
}

const TransactionDetailPage = () => {
  const params = useLocalSearchParams();
  const { trx_hash } = params
  const [detail, setDetail] = useState(null)

  const getDetailTransaction = async () => {
    try {
      const response = await getDetailTransaksiLender(trx_hash)
      setDetail(response.data.payload.detailTransaction)
    } catch (error) {
      alert(error.message)
    }
  }

  useEffect(() => {
    getDetailTransaction()
  }, [trx_hash])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <DetailComponentSaldo detail={detail} />
      </ScrollView>
    </SafeAreaView >
  )
}

export default TransactionDetailPage