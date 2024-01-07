import { View, SafeAreaView, Text, Pressable, Image, ScrollView, StyleSheet, RefreshControl } from "react-native"
import { Link, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import { getProfileBorrower } from "../../../../services/borrowerService";
import { API_BASE_URL } from '@env'
import { formatCurrencyRp } from "../../../../helpers/formatNumber";
import { PENDANAAN_TYPE, PENDANAAN_TYPE_LABEL, PENDANAAN_TYPE_LABEL_COLOR } from "../../../../constants/general";

const LinkBorrower = ({ href, disabled, label, bgColor }) => {
  if (disabled) {
    return (
      <Pressable style={{ ...styles.button, backgroundColor: bgColor, opacity: 0.3, flex: 1 }} disabled={disabled}>
        <Text style={styles.buttonText}>{label}</Text>
      </Pressable>
    )
  } else {
    return (
      <Link href={href} asChild>
        <Pressable style={{ ...styles.button, backgroundColor: bgColor, flex: 1 }}>
          <Text style={styles.buttonText}>{label}</Text>
        </Pressable>
      </Link>
    )
  }

}

export default function BorrowerProfile() {
  const [data, setData] = useState(null)
  const [refreshing, setRefreshing] = useState(false)

  const getData = async () => {
    try {
      const response = await getProfileBorrower()
      if (response) {
        setData(response.data.payload)
      }
    } catch (error) {
      alert(error)
    } finally {
      setRefreshing(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getData();
  }, []);


  const calculateReturnPaid = (transactions) => {
    if (transactions) {
      const paidTransactions = transactions.filter((transaction) => {
        return transaction.status === 'success'
      })

      if (paidTransactions.length > 0) {
        return paidTransactions
          .map(paidTransaction => paidTransaction.transaction_amount)
          .reduce((prev, next) => prev + next);
      }
    }
    return 0
  }

  const calculateReturnNotPaid = (transactions) => {
    if (transactions) {
      const unPaidTransactions = transactions.filter((transaction) => {
        return transaction.status !== 'success'
      })

      if (unPaidTransactions.length > 0) {
        return unPaidTransactions
          .map(unPaidTransaction => unPaidTransaction.transaction_amount)
          .reduce((prev, next) => prev + next);
      }
    }
    return 0
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ flex: 1, padding: 16 }}>
          <Text style={{ color: '#000000', fontSize: 20, fontWeight: 'bold' }}>{data?.user.name}</Text>

          <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 8 }}
          />

          <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center' }}>
            <Image
              style={{ width: 60, height: 60, borderRadius: 60 / 2 }}
              source={{ uri: `${API_BASE_URL}/pendaftaran/${data?.pengajuan?.business_image}` }}
              defaultSource={require('../../../../assets/images/profile-placeholder.jpeg')}
            />
            <View>
              <Text style={{ color: '#000000', fontSize: 16, fontWeight: 'bold' }}>
                {data?.user.latest_borrower ? data?.user.latest_borrower?.business_name : 'Belum ada nama usaha'}
              </Text>
              <Text style={{ color: '#199B57', fontSize: 14, fontWeight: 700 }}>{formatCurrencyRp(data?.user.balance)}</Text>
            </View>
          </View>

          <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 8 }}
          />

          <Text style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Detail Informasi</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text>Nomor HP:</Text>
            <Text>{data?.user.latest_borrower?.phone_number || '-'}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text>Nama Pemilik Rekening:</Text>
            <Text>{data?.user.latest_borrower?.account_name || '-'}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text>Nama Bank:</Text>
            <Text>{data?.user.latest_borrower?.bank_name || '-'}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text>No. Rek:</Text>
            <Text>{data?.user.latest_borrower?.account_number || '-'}</Text>
          </View>

          <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 8 }}
          />

          <Text style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Status Pengajuan</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text>Status:</Text>
            <Text>{data?.pengajuan?.status || '-'}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text>Jangka Waktu Pengajuan:</Text>
            <Text>{data?.pengajuan?.duration || '-'}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text>Estimasi Bagi Hasil:</Text>
            <Text>{data?.pengajuan?.profit_sharing_estimate || '0'}%</Text>
          </View>

          <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 8 }}
          />

          <Text style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Ringkasan Pengajuan</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text>Dana Pengajuan Awal:</Text>
            <Text>{formatCurrencyRp(data?.pengajuan?.borrower_first_submission)}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text>Dana Disetujui:</Text>
            <Text>{formatCurrencyRp(data?.funding?.accepted_fund)}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text>Pengembalian Lunas:</Text>
            <Text>{formatCurrencyRp(calculateReturnPaid(data?.transactions))}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text>Pengembalian Belum Lunas:</Text>
            <Text>{formatCurrencyRp(calculateReturnNotPaid(data?.transactions))}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text>Tujuan Pengajuan:</Text>
            <Text>{data?.pengajuan?.purpose || '-'}</Text>
          </View>

          <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 8 }}
          />

          <Text style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Status Pendanaan</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text>Status: { }</Text>
            <Text style={{
              color: 'white',
              fontSize: 8,
              backgroundColor: PENDANAAN_TYPE_LABEL_COLOR[data?.funding?.status],
              borderRadius: 10,
              paddingHorizontal: 8,
              paddingVertical: 2,
              textAlign: 'center'
            }}>
              {PENDANAAN_TYPE_LABEL[data?.funding?.status] || '-'}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text>Tanggal Jatuh Tempo: { }</Text>
            <Text>{data?.funding?.due_date || '-'}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text>Jumlah Lender Terkumpul: { }</Text>
            <Text>{data?.funding?.fundinglenders.length || '-'}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text>Jumlah Dana Terkumpul: { }</Text>
            <Text>{formatCurrencyRp(data?.funding?.dana_terkumpul)}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
            <Text>Jumlah Dana Terkumpul (%): { }</Text>
            <Text>{data?.funding?.dana_terkumpul_persen}%</Text>
          </View>
        </View>
      </ScrollView>

      <View style={{ flexDirection: 'row', gap: 8, padding: 12 }}>
        <LinkBorrower href="/borrower/pengajuan" label="Ajukan Pendanaan" bgColor="#6C6C6C" disabled={data?.pengajuan !== null} />
        <LinkBorrower href="/borrower/tarik-dana" label="Tarik Dana" bgColor="#076E5B" disabled={data?.funding?.status != PENDANAAN_TYPE.FUNDING_COMPLETED || data?.user.balance === 0} />
        <LinkBorrower href={{
          pathname: 'borrower/pengembalian-dana/[id]',
          params: { id: data?.funding?.id }
        }} label="Pengembalian Dana" bgColor="#199B57" disabled={data?.funding?.status != PENDANAAN_TYPE.FUNDING_COMPLETED} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: '16',
    textAlign: 'center',
    paddingVertical: 12,
    borderRadius: 32,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 12
  },
  buttonRegister: {
    alignSelf: 'center',
    paddingHorizontal: 36,
    paddingVertical: 10,
    borderWidth: 2,
    textAlign: 'center',
    borderRadius: 32,
    backgroundColor: '#076E5B',
    borderColor: '#076E5B',
  },
  textHeader: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12
  },
  textSubHeader: {
    color: '#6C6C6C',
    fontSize: 12,
    fontWeight: '400',
    marginBottom: 12
  },
  textLabel: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 12
  },
  textInput: {
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  pickerInput: {
    borderRadius: 5,
    backgroundColor: '#D9D9D9',
    paddingLeft: 16,
    paddingRight: 16,
    paddingVertical: 10,
  },
  checkbox: {
    marginTop: 12,
    borderRadius: 5,
    borderWidth: 1,
    width: 24,
    height: 24,
    borderColor: '#076E5B',
    backgroundColor: '#D9D9D9'
  },
});