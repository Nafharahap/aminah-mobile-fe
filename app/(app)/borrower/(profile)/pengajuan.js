import { useRouter } from "expo-router";
import { Pressable, SafeAreaView, ScrollView, Text, TextInput, View, StyleSheet } from "react-native";
import Checkbox from "expo-checkbox";
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { useState } from "react";
import { postBorrowerSubmission } from "../../../../services/borrowerService";
import CurrencyInput from 'react-native-currency-input';

export default function BorrowerPengajuan() {
  const router = useRouter()

  const [fullName, setFullName] = useState('');
  const [ownerNoHp, setOwnerNoHp] = useState('');
  const [ownerNik, setOwnerNik] = useState('');
  const [ownerAdress, setOwnerAdress] = useState('');
  const [umkmName, setUmkmName] = useState('');
  const [umkmType, setUmkmType] = useState(1);
  const [umkmAddress, setUmkmAddress] = useState('');
  const [umkmIncome, setUmkmIncome] = useState('');
  const [ownerBankAccountName, setOwnerBankAccountName] = useState('');
  const [ownerBankAccountNumber, setOwnerBankAccountNumber] = useState('');
  const [ownerBankName, setOwnerBankName] = useState('');
  const [amount, setAmount] = useState('');
  const [period, setPeriod] = useState(1);
  const [purpose, setPurpose] = useState('');
  const [estimateReturn, setEstimateReturn] = useState('');
  const [imageKtp, setImageKtp] = useState(null);
  const [imageSiu, setImageSiu] = useState(null);
  const [imageProduct, setImageProduct] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const pickImage = async (typeInput) => {
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

    console.log(result);

    const res = await fetch(`data:image/png;base64,${result.assets[0].base64}`);
    const blob = await res.blob();
    const type = blob.type.split('/').pop()
    const file = new File([blob], `file.${type}`);

    if (!result.canceled) {
      if (typeInput === 'ktp') {
        setImageKtp(file);
      } else if (typeInput === 'siu') {
        setImageSiu(file);
      } else if (typeInput === 'product') {
        setImageProduct(file);
      }
    }
  };

  const onRegisterUmkmButtonPressed = async () => {
    try {
      const data = new FormData();
      data.append('pemilikName', fullName)
      data.append('noHp', ownerNoHp)
      data.append('nik', ownerNik)
      data.append('alamat', ownerAdress)
      data.append('umkmName', umkmName)
      data.append('jenisUmkm', umkmType)
      data.append('umkmAddress', umkmAddress)
      data.append('income', umkmIncome)
      data.append('pemilikRekeningName', ownerBankAccountName)
      data.append('nomorRekening', ownerBankAccountNumber)
      data.append('bankName', ownerBankName)
      data.append('amount', amount)
      data.append('duration', period)
      data.append('purpose', purpose)
      data.append('estimate', estimateReturn)
      data.append('approvedCheck', isChecked)

      data.append('file-ktp', imageKtp)
      data.append('file-siu', imageSiu)
      data.append('file-foto-umkm', imageProduct)

      const response = await postBorrowerSubmission(data)

      console.log('Registrasi Berhasil')
      alert('Registrasi Berhasil')
      router.back()
    } catch (error) {
      console.log('Pengajuan Gagal', error)
      alert('Pengajuan Gagal')
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: 16 }}>
          <Text style={styles.textHeader}>Pengajuan Pendanaan</Text>
          <Text style={styles.textSubHeader}>
            Lengkapi informasi mengenai pemilik usaha dan usaha yang dijalankan.
          </Text>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Nama Lengkap (Sesuai KTP)</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setFullName}
              value={fullName}
              placeholder='Nama Lenkap'
              placeholderTextColor="#6C6C6C"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Nomor HP Pemilik UMKM</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setOwnerNoHp}
              value={ownerNoHp}
              placeholder='Nomor HP Pemilik UMKM'
              placeholderTextColor="#6C6C6C"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>NIK Pemilik UMKM</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setOwnerNik}
              value={ownerNik}
              placeholder='NIK Pemilik UMKM'
              placeholderTextColor="#6C6C6C"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Alamat Pemilik UMKM</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setOwnerAdress}
              value={ownerAdress}
              placeholder='Alamat Pemilik UMKM'
              placeholderTextColor="#6C6C6C"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Nama UMKM</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setUmkmName}
              value={umkmName}
              placeholder='Nama UMKM'
              placeholderTextColor="#6C6C6C"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Jenis UMKM</Text>
            <Picker
              style={styles.pickerInput}
              selectedValue={umkmType}
              onValueChange={(itemValue, itemIndex) =>
                setUmkmType(itemValue)
              }>
              <Picker.Item label="Makanan" value="1" />
              <Picker.Item label="Minuman" value="2" />
              <Picker.Item label="Jasa" value="3" />
              <Picker.Item label="Sembako" value="4" />
              <Picker.Item label="Jajanan" value="5" />
              <Picker.Item label="Elektronik" value="6" />
              <Picker.Item label="Material" value="7" />
              <Picker.Item label="Lainnya" value="8" />
            </Picker>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Alamat UMKM</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setUmkmAddress}
              value={umkmAddress}
              placeholder='Alamat UMKM'
              placeholderTextColor="#6C6C6C"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Pendapatan UMKM Per Bulan</Text>
            <CurrencyInput
              style={styles.textInput}
              onChangeValue={setUmkmIncome}
              value={umkmIncome}
              prefix="Rp"
              delimiter=","
              separator="."
              precision={0}
              placeholder='Pendapatan UMKM Per Bulan'
              placeholderTextColor="#6C6C6C"
              minValue={0}
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Nama Pemilik Rekening</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setOwnerBankAccountName}
              value={ownerBankAccountName}
              placeholder='Nama Pemilik Rekening'
              placeholderTextColor="#6C6C6C"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Nomor Rekening</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setOwnerBankAccountNumber}
              value={ownerBankAccountNumber}
              placeholder='Nomor Rekening'
              placeholderTextColor="#6C6C6C"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Nama Bank</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setOwnerBankName}
              value={ownerBankName}
              placeholder='Nama Bank'
              placeholderTextColor="#6C6C6C"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Jumlah Pengajuan Pendanaan</Text>
            <CurrencyInput
              style={styles.textInput}
              onChangeValue={setAmount}
              value={amount}
              prefix="Rp"
              delimiter=","
              separator="."
              precision={0}
              placeholder='Jumlah Pengajuan Pendanaan'
              placeholderTextColor="#6C6C6C"
              minValue={0}
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Jangka Waktu Pendanaan</Text>
            <Picker
              style={styles.pickerInput}
              selectedValue={period}
              onValueChange={(itemValue, itemIndex) => setPeriod(itemValue)}
            >
              {
                Array.from({ length: 12 }, (_, index) => index + 1).map((number) => {
                  return (<Picker.Item key={number} label={`${number} Bulan`} value={number} />)
                })
              }
            </Picker>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Tujuan Pengajuan</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setPurpose}
              value={purpose}
              placeholder='Tujuan Pengajuan'
              placeholderTextColor="#6C6C6C"
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Estimasi Bagi Hasil</Text>
            <Picker
              style={styles.pickerInput}
              selectedValue={estimateReturn}
              onValueChange={(itemValue, itemIndex) => setEstimateReturn(itemValue)}
            >
              {
                Array.from({ length: 30 }, (_, index) => index + 1).map((number) => {
                  if (number > 1) {
                    return (<Picker.Item key={number} label={`${number}%`} value={number} />)
                  }
                })
              }
            </Picker>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Foto KTP Pemilik UMKM</Text>
            <Pressable
              style={styles.textInput}
              onPress={() => pickImage('ktp')}>
              {imageKtp
                ? <Text style={{ textAlign: 'center', fontWeight: 700 }}>Gambar Terpilih</Text>
                : <Text style={{ textAlign: 'center', color: '#6C6C6C' }}>Pilih Gambar...</Text>
              }
            </Pressable>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Foto Surat Izin Usaha (SIU)</Text>
            <Pressable
              style={styles.textInput}
              onPress={() => pickImage('siu')}>
              {imageSiu
                ? <Text style={{ textAlign: 'center', fontWeight: 700 }}>Gambar Terpilih</Text>
                : <Text style={{ textAlign: 'center', color: '#6C6C6C' }}>Pilih Gambar...</Text>
              }
            </Pressable>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Foto Produk UMKM</Text>
            <Pressable
              style={styles.textInput}
              onPress={() => pickImage('product')}>
              {imageProduct
                ? <Text style={{ textAlign: 'center', fontWeight: 700 }}>Gambar Terpilih</Text>
                : <Text style={{ textAlign: 'center', color: '#6C6C6C' }}>Pilih Gambar...</Text>
              }
            </Pressable>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 20 }}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked}
              onValueChange={setIsChecked}
              color={isChecked ? '#4630EB' : undefined}
            />
            <Text>Saya menyatakan bahwa data yang saya masukkan adalah benar.</Text>
          </View>

          <Pressable style={styles.buttonRegister} onPress={onRegisterUmkmButtonPressed}>
            <Text style={{ textAlign: 'center', color: '#FFFFFF' }}>Daftarkan Usaha Saya Sekarang</Text>
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