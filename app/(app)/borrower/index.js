import { View, SafeAreaView, Text, Pressable, Image, ScrollView } from "react-native"
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { getProfileBorrower } from "../../../services/borrowerService";
import styles from "./index.style";

export default function BorrowerDashboard() {
  const [data, setData] = useState(null)

  const getData = async () => {
    try {
      const response = await getProfileBorrower()
      console.log(response);
      if (response) {
        setData(response.data.payload)
      }
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    getData()
  }, [])

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: 16 }}>
          <Image
            style={{ width: 100, height: 100 }}
            source={`http://127.0.0.1/pendaftaran/${data?.pengajuan?.business_image}`}
          />
          <Text>{`http://127.0.0.1/pendaftaran/${data?.pengajuan?.business_image}`}</Text>
          <Text style={{ color: '#000000', fontSize: 16, fontWeight: 'bold' }}>
            {data?.user.latest_borrower ? data?.user.latest_borrower?.business_name : 'Belum ada nama usaha'}
          </Text>

          <Text>Nama Pemilik: {data?.user.name}</Text>
          <Text>Email: {data?.user.email}</Text>
          <Text>Nomor HP: {data?.user.latest_borrower?.phone_number}</Text>
          <Text>Nama Rekening: {data?.user.latest_borrower?.account_name}</Text>
          <Text>Nama Bank: {data?.user.latest_borrower?.bank_name}</Text>
          <Text>No. Rek: {data?.user.latest_borrower?.account_number}</Text>
          <Text>Saldo: {data?.user.balance}</Text>
          <Text>Status Pengajuan: {data?.pengajuan?.status}</Text>
          <Text>Jangka Waktu Pengajuan: {data?.pengajuan?.duration}</Text>
          <Text>Estimasi Bagi Hasil: {data?.pengajuan?.profit_sharing_estimate}</Text>
          <Text>Dana Pengajuan Awal: {data?.pengajuan?.borrower_first_submission}</Text>
          <Text>Dana Disetujui: {data?.funding?.accepted_fund}</Text>
          <Text>Pengembalian Lunas: {calculateReturnPaid(data?.transactions)}</Text>
          <Text>Pengembalian Belum Lunas: {calculateReturnNotPaid(data?.transactions)}</Text>
          <Text>Tujuan Pengajuan: {data?.pengajuan?.purpose}</Text>
          <Text>Status Pendanaan: {data?.funding?.status}</Text>
          <Text>Tanggal Jatuh Tempo: {data?.funding?.due_date}</Text>
          <Text>Jumlah Lender Terkumpul: {data?.funding?.fundinglenders.length}</Text>
        </View>
      </ScrollView>

      <View style={{ flexDirection: 'row', gap: 8, padding: 4 }}>
        <Link href={'/borrower/pengajuan'} asChild>
          <Pressable style={{ ...styles.button, backgroundColor: '#6C6C6C', flex: 1 }}>
            <Text style={styles.buttonText}>Ajukan Pendanaan</Text>
          </Pressable>
        </Link>
        <Pressable style={{ ...styles.button, backgroundColor: '#076E5B', flex: 1 }}>
          <Text style={styles.buttonText}>Tarik Dana</Text>
        </Pressable>
        <Pressable style={{ ...styles.button, backgroundColor: '#199B57', flex: 1 }}>
          <Text style={styles.buttonText}>Pengembalian Dana</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  )
}