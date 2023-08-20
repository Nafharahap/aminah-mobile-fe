import { View, SafeAreaView, Text, Pressable, Image, ScrollView } from "react-native"
import { Link, Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { getToken } from "../../services/tokenService";
import { getProfileBorrower } from "../../services/borrowerService";
import styles from "./index.style";

export default function BorrowerDashboard() {
  const router = useRouter()
  const [data, setData] = useState(null)

  const isUserAuth = async () => {
    const token = await getToken()
    if (token) {
      return true
    }
    return router.replace('/auth/login')
  }

  const getData = async () => {
    try {
      const response = await getProfileBorrower()
      if (response) {
        setData(response.data.payload)
        console.log(response.data.payload);
      }
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    isUserAuth()
    getData()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: 16 }}>
          <Text style={{ color: '#000000', fontSize: 16, fontWeight: 'bold' }}>
            {data?.user.latest_borrower ? data?.user.latest_borrower?.business_name : 'Belum ada nama usaha'}
          </Text>

          <Text>Nama Pemilik: {data?.user.name}</Text>
          <Text>Email: {data?.user.email}</Text>
          <Text>Nomor HP: {data?.user.latest_borrower?.phone_number}</Text>
          <Text>Nama Rekening: {data?.user.latest_borrower?.account_name}</Text>
          <Text>Nama Bank: {data?.user.latest_borrower?.bank_name}</Text>
          <Text>No. Rek: {data?.user.latest_borrower?.account_number}</Text>
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