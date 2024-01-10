import { useFocusEffect, useRouter } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, Text, TextInput, View, StyleSheet, ActivityIndicator } from "react-native";
import { useCallback, useState } from "react";
import { getTarikBorrowerSaldoInvoice, postBorrowerWithdrawBallance } from "../../../../services/borrowerService";
import CurrencyInput from 'react-native-currency-input';
import { formatCurrencyRp } from "../../../../helpers/formatNumber";

export default function BorrowerTarikPendanaan() {
  const router = useRouter()

  const [bankName, setBankName] = useState('');
  const [pemilikRekeningName, setpPemilikRekeningName] = useState('');
  const [nomorRekening, setpNomorRekening] = useState('');
  const [jumlahSaldo, setpJumlahSaldo] = useState(0);
  const [jumlahMaksimalSaldo, setpJumlahMaksimalSaldo] = useState(0);

  const [refreshing, setRefreshing] = useState(false);

  const getData = async () => {
    try {
      const response = await getTarikBorrowerSaldoInvoice()
      if (response) {
        const data = response.data.payload
        setBankName(data?.latestBorrower.bank_name)
        setpPemilikRekeningName(data?.latestBorrower.account_name)
        setpNomorRekening(data?.latestBorrower.account_number)
        setpJumlahMaksimalSaldo(data?.borrowerAmount)
      }
    } catch (error) {
      alert(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [])
  );

  const onWithdrawButtonPressed = async () => {
    setRefreshing(true)
    try {
      if (jumlahMaksimalSaldo === 0) {
        throw Error('Saldo Anda Kosong')
      }

      if (jumlahSaldo > jumlahMaksimalSaldo) {
        throw Error('Saldo Anda Kurang')
      }

      const data = new FormData();
      data.append('bankName', bankName)
      data.append('pemilikRekeningName', pemilikRekeningName)
      data.append('nomorRekening', nomorRekening)
      data.append('jumlahSaldo', jumlahSaldo)

      const response = await postBorrowerWithdrawBallance(data)

      setRefreshing(false)
      alert('Penarikan Saldo Berhasil')
      router.back()
    } catch (error) {
      setRefreshing(false)
      alert(error.message)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: 16 }}>
          <Text style={styles.textHeader}>Invoice Penarikan Saldo</Text>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Nama Bank*</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setBankName}
              value={bankName}
              placeholder='Nama Lenkap'
              placeholderTextColor="#6C6C6C"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Nama Pemilik Rekening*</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setpPemilikRekeningName}
              value={pemilikRekeningName}
              placeholder='Nomor HP Pemilik UMKM'
              placeholderTextColor="#6C6C6C"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Nomor Rekening*</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setpNomorRekening}
              value={nomorRekening}
              placeholder='NIK Pemilik UMKM'
              placeholderTextColor="#6C6C6C"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Jumlah Saldo Ditarik (Saldo anda: {formatCurrencyRp(jumlahMaksimalSaldo ? jumlahMaksimalSaldo : 0)})</Text>
            <CurrencyInput
              style={styles.textInput}
              onChangeValue={setpJumlahSaldo}
              value={jumlahSaldo}
              prefix="Rp"
              delimiter=","
              separator="."
              precision={0}
              placeholder='Jumlah Pengajuan Pendanaan'
              placeholderTextColor="#6C6C6C"
              minValue={0}
            />
          </View>

          <Pressable style={{ ...styles.buttonRegister, flexDirection: 'row', opacity: refreshing ? 0.5 : 1 }} onPress={onWithdrawButtonPressed}>
            <Text style={{ textAlign: 'center', color: '#FFFFFF' }}>Tarik Dana Sekarang!</Text>
            <ActivityIndicator animating={refreshing} size="small" color={'#FFFFFF'} style={{ marginLeft: 12, display: refreshing ? 'flex' : 'none' }} />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView >
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
    marginTop: 20,
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
    borderRadius: 5,
    borderWidth: 1,
    width: 24,
    height: 24,
    borderColor: '#076E5B',
    backgroundColor: '#D9D9D9'
  },
})