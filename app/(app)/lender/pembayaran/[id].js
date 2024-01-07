import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useState, useCallback } from 'react'
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { getDetailPembayaran, postBayar } from '../../../../services/dompetService';
import { formatCurrencyRp } from '../../../../helpers/formatNumber';
import * as ImagePicker from 'expo-image-picker';

const DetailPembayaran = () => {
  const params = useLocalSearchParams();
  const { id } = params
  const router = useRouter()
  const [data, setData] = useState(null)
  const [refreshing, setRefreshing] = useState(false)
  const [fileTrx, setFileTrx] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: false,
      quality: 1,
    });

    let file = undefined
    if (Platform.OS === 'web') {
      const res = await fetch(`data:image/png;base64,${result.assets[0].base64}`);
      const blob = await res.blob();
      const type = blob.type.split('/').pop()
      file = new File([blob], `file.${type}`);
    } else {
      let localUri = result.assets[0].uri;
      let filename = localUri.split('/').pop();

      // Infer the type of the image
      let match = /\.(\w+)$/.exec(filename);
      let type = match ? `image/${match[1]}` : `image`;
      file = { uri: localUri, name: filename, type }
    }

    if (!result.canceled) {
      setFileTrx(file)
    } else {
      alert('File belum dipilih')
    }
  };

  const getData = async () => {
    setRefreshing(true)
    try {
      const response = await getDetailPembayaran(id)
      if (response) {
        setData(response.data.payload)
      }
      setRefreshing(false)
    } catch (error) {
      setRefreshing(false)
      alert(error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getData();
    }, [id])
  );

  const onBayarPressed = async () => {
    try {
      const data = new FormData();
      data.append('trx_hash', id)
      data.append('file_trx', fileTrx)

      const response = await postBayar(data)

      console.log('Item Berhasil Dibayar')
      alert('Item Berhasil Dibayar')
      router.back()
    } catch (error) {
      console.log('Request Gagal', error)
      alert('Request Gagal')
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 16, backgroundColor: '#D9D9D9' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, paddingVertical: 16 }}>
          <View style={{ padding: 16, backgroundColor: 'white', borderRadius: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: 700 }}>Rincian Nomor Rekening</Text>

            <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 8 }}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
                <FontAwesome name="bank" size={24} color="black" />
                <Text style={{ fontSize: 16, fontWeight: 700 }}>{data?.bankAccounts[0].bank_name}</Text>
              </View>
              <View>
                <Text style={{ textAlign: 'right' }}>a.n. {data?.bankAccounts[0].account_name}</Text>
                <Text style={{ textAlign: 'right' }}>{data?.bankAccounts[0].account_number}</Text>
              </View>
            </View>
          </View>

          <View style={{ marginTop: 16, padding: 16, backgroundColor: 'white', borderRadius: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: 700 }}>Rincian Pembayaran</Text>

            <View style={{ borderBottomColor: '#D9D9D9', borderBottomWidth: StyleSheet.hairlineWidth, marginVertical: 8 }}
            />

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                <Text>Total Pembayaran:</Text>
                <Text>{formatCurrencyRp(data?.transaction.transaction_amount)}</Text>
              </View>
            </View>

            <View style={{ marginTop: 12 }}>
              <Text style={{
                color: '#000000',
                fontSize: 14,
                fontWeight: 'bold',
                marginBottom: 12
              }}
              >
                Bukti Bayar
              </Text>
              <Pressable
                style={{
                  borderRadius: 5,
                  backgroundColor: '#D9D9D9',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                }}
                onPress={() => pickImage()}>
                {fileTrx
                  ? <Text style={{ textAlign: 'center', fontWeight: 700 }}>Gambar Terpilih</Text>
                  : <Text style={{ textAlign: 'center', color: '#6C6C6C' }}>Pilih Gambar...</Text>
                }
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={{ padding: 16 }}>
        <Pressable onPress={onBayarPressed} style={{ backgroundColor: '#198754', justifyContent: 'center', alignItems: 'center', borderRadius: 20, paddingVertical: 8 }}>
          <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>Upload Bukti Bayar!</Text>
        </Pressable>
      </View>
    </SafeAreaView >
  )
}

export default DetailPembayaran