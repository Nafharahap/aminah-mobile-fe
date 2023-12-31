import { View, Text, SafeAreaView, ImageBackground, Image, Pressable, StyleSheet, TextInput } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter, useFocusEffect, useLocalSearchParams, useNavigation } from 'expo-router';
import { getDetailMitra } from '../../../../services/publicService';
import { FlatList, RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { API_BASE_URL } from '@env'
import { Entypo, Ionicons } from '@expo/vector-icons';
import { useSession } from '../../../../context/auth';
import { formatCurrencyRp } from '../../../../helpers/formatNumber';
import { StackProfilePicture } from '../../../../components';
import { BUSINESS_TYPE_LABEL, PENDANAAN_TYPE_LABEL, PENDANAAN_TYPE_LABEL_COLOR, TRANSACTION_STATUS, TRANSACTION_STATUS_LABEL, TRANSACTION_STATUS_LABEL_COLOR, TRANSACTION_TYPE, TRANSACTION_TYPE_LABEL } from '../../../../constants/general';
import { getDetailTransaksiLender, getPendanaanListLender } from '../../../../services/lenderService';
import { diffForHumans, formateDateTime } from '../../../../helpers/time';

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

const DetailFundingComponent = (({ funding, detailTrx, returnFundingList }) => {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 16, marginBottom: 36 }}>

        <Image
          source={{ uri: `${API_BASE_URL}/pendaftaran/${funding?.borrower.business_image}` }}
          style={{ width: 92, height: 92, borderRadius: 92 / 2 }}
          resizeMode="cover"
          defaultSource={require('../../../../assets/images/profile-placeholder.jpeg')}
        />

        <Text style={{ color: '#199B57', fontSize: 32, fontWeight: 700 }}>{funding?.borrower.business_name}</Text>
      </View>

      <View>
        <Text style={{ fontSize: 12 }}>{formateDateTime(detailTrx?.transaction_datetime, 'DD MMMM YYYY HH:mm:ss')}</Text>
      </View>

      <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 12 }}
      />

      <View style={{ marginBottom: 8, paddingVertical: 8, paddingHorizontal: 16, backgroundColor: '#076E5B', borderRadius: 8, alignSelf: 'flex-start' }}>
        <Text style={{ fontSize: 12, color: '#FFFFFF', fontWeight: 600 }}>{TRANSACTION_TYPE_LABEL[detailTrx?.transaction_type]}</Text>
      </View>

      <Text style={{ fontSize: 20, color: '#000000', fontWeight: 700 }}>{formatCurrencyRp(100000)} / Unit</Text>

      <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 12 }}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: 600 }}>Periode Imbal Hasil: </Text>
        <Text style={{ fontSize: 14, fontWeight: 600 }}>{funding?.borrower.duration} Bulan</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: 600 }}>Presentase Imbal Hasil: </Text>
        <Text style={{ fontSize: 14, fontWeight: 600 }}>{funding?.borrower.profit_sharing_estimate}%</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: 600 }}>Waktu Jatuh Tempo: </Text>
        <Text style={{ fontSize: 14, fontWeight: 600 }}>{formateDateTime(funding?.due_date, 'DD MMMM YYYY')}</Text>
      </View>

      <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 12 }}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <Text style={{ fontSize: 14, fontWeight: 600 }}>Jumlah Pembelian Unit: </Text>
        <Text style={{ fontSize: 14, fontWeight: 600 }}>{detailTrx?.transaction_amount / 100000} Unit</Text>
      </View>

      <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 12 }}
      />

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 }}>
        <Text style={{ fontSize: 14, fontWeight: 600 }}>Status Pendanaan: </Text>
        <Text style={{ color: PENDANAAN_TYPE_LABEL_COLOR[funding?.status], fontSize: 14, fontWeight: 700 }}>{PENDANAAN_TYPE_LABEL[funding?.status]}</Text>
      </View>

      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
        <Text style={{ fontSize: 14 }}>Dana Diterima Pelaku Usaha: </Text>
        <Text style={{ fontSize: 14 }}>{formatCurrencyRp(detailTrx?.transaction_amount)}</Text>
      </View>

      <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 12 }}
      />

      <Text style={{ fontSize: 16, color: '#000000', fontWeight: 700 }}>Laporan Pengembalian Pendanaan</Text>

      <FlatList
        data={returnFundingList}
        numColumns={1}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
        renderItem={({ index, item }) => {
          const hpu = 100000
          const dnb = item?.transaction_amount
          const pb = funding?.accepted_fund
          const ut = pb / hpu
          const vpu = dnb / ut

          const tpl = detailTrx?.transaction_amount
          const jpu = tpl / hpu
          const ppl = jpu * vpu

          return (
            <View style={{
              backgroundColor: '#FFFFFF',
              padding: 16,
              borderRadius: 5,
              borderWidth: 1
            }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ fontSize: 12 }}>Status Pengembalian:</Text>
                <Text style={{ color: TRANSACTION_STATUS_LABEL_COLOR[item.status], fontSize: 12, fontWeight: 600 }}>{TRANSACTION_STATUS_LABEL[item.status]} {item.status === TRANSACTION_STATUS.WAITING ? 'Mitra' : ''}</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ fontSize: 12, fontWeight: 700 }}>Jumlah Pengembalian:</Text>
                <Text style={{ fontSize: 12, fontWeight: 700 }}>{formatCurrencyRp(ppl)}</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                <Text style={{ fontSize: 12, fontWeight: 700 }}>Keterangan:</Text>
                <Text style={{ fontSize: 12, fontWeight: 700 }}>{diffForHumans(item.transaction_date)}</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Tanggal Jatuh Tempo:</Text>
                <Text>{item.transaction_date}</Text>
              </View>
            </View>
          )
        }}
        style={{ flex: 1, marginTop: 24 }}
        ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
})

const BusinessDetailPage = () => {
  const router = useRouter()
  const navigation = useNavigation()
  const params = useLocalSearchParams();
  const { trx_hash } = params
  const [detail, setDetail] = useState(null)
  const [funding, setFunding] = useState(null)
  const [returnFundingList, setReturnFundingList] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [unitCount, setUnitCount] = useState(1)
  const { session } = useSession()

  const getDetailTransaction = async () => {
    try {
      const response = await getDetailTransaksiLender(trx_hash)
      setDetail(response.data.payload.detailTransaction)
      const fundingId = response.data.payload.detailTransaction.funding_id
      if (fundingId) {
        geDetailFunding(fundingId)
      }
    } catch (error) {
      alert(error.message)
    }
  }

  const geDetailFunding = async (fundingId) => {
    try {
      const response = await getDetailMitra(fundingId)
      setFunding(response.data.payload.funding)
      const borrowerId = response.data.payload.funding.borrower.user.id
      if (borrowerId) {
        geReturnFundingList(borrowerId)
      }
    } catch (error) {
      console.log(error);
      alert(error)
    }
  }

  const geReturnFundingList = async (borrowerId) => {
    try {
      const response = await getPendanaanListLender(borrowerId)
      setReturnFundingList(response.data.payload.transactions)
    } catch (error) {
      console.log(error);
      alert(error)
    }
  }

  useEffect(() => {
    getDetailTransaction()
  }, [trx_hash])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
      // refreshControl={
      //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      // }
      >
        {detail?.transaction_type == TRANSACTION_TYPE.PENARIKAN_SALDO_LENDER || detail?.transaction_type == TRANSACTION_TYPE.PENGISIAN_SALDO_LENDER ? (<DetailComponentSaldo detail={detail} />) : null}
        {detail?.transaction_type == TRANSACTION_TYPE.PEMBAYARAN_PENDANAAN_LENDER ? (<DetailFundingComponent funding={funding} detailTrx={detail} returnFundingList={returnFundingList} />) : null}
      </ScrollView>
    </SafeAreaView >
  )
}

export default BusinessDetailPage