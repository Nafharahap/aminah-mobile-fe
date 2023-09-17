import { Stack, useRouter } from "expo-router";
import { Image, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import styles from "./index.style";
import Checkbox from "expo-checkbox";
import { ScreenHeaderBtn } from "../../../components";
import { icons } from "../../../constants";
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import { useState } from "react";
import { postBorrowerSubmission } from "../../../services/borrowerService";

function LogoTitle() {
  const logoUrl = require('../../../assets/images/Logo-Aminah-02.png')
  return (
    <Image
      style={{ width: 200, height: 50 }}
      source={logoUrl}
    />
  )
}

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
      allowsEditing: false,
      quality: 1,
    });

    const res = await fetch(result.assets[0].uri);
    const blob = await res.blob();
    const type = blob.type.split('/').pop()
    const file = new File([blob], `file.${type}`);

    console.log('BLOB', blob);
    console.log('FILE', file);

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
      router.replace('/borrower')
    } catch (error) {
      console.log('Pengajuan Gagal', error)
      alert('Pengajuan Gagal')
    }
  }

  const getBlobFile = async (result) => {
    if (Platform.OS === 'web') {
      const res = await fetch(result.assets[0].uri);
      const blob = await res.blob();

      console.log('BLOB', blob);

      return blob
    } else {
      const uri =
        Platform.OS === "android"
          ? selectedImage.uri
          : selectedImage.uri.replace("file://", "");
      const filename = selectedImage.uri.split("/").pop();
      const match = /\.(\w+)$/.exec(filename);
      const ext = match?.[1];
      const type = match ? `image/${match[1]}` : `image`;
      return {
        uri,
        name: `image.${ext}`,
        type,
      }
    }
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.leftArrow}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerTitle: () => <LogoTitle />,
          headerTitleAlign: 'center',
        }}
      />
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
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Nomor HP Pemilik UMKM</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setOwnerNoHp}
              value={ownerNoHp}
              placeholder='Nomor HP Pemilik UMKM'
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>NIK Pemilik UMKM</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setOwnerNik}
              value={ownerNik}
              placeholder='NIK Pemilik UMKM'
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Alamat Pemilik UMKM</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setOwnerAdress}
              value={ownerAdress}
              placeholder='Alamat Pemilik UMKM'
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Nama UMKM</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setUmkmName}
              value={umkmName}
              placeholder='Nama UMKM'
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
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Pendapatan UMKM Per Bulan</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setUmkmIncome}
              value={umkmIncome}
              placeholder='Pendapatan UMKM Per Bulan'
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Nama Pemilik Rekening</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setOwnerBankAccountName}
              value={ownerBankAccountName}
              placeholder='Nama Pemilik Rekening'
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Nomor Rekening</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setOwnerBankAccountNumber}
              value={ownerBankAccountNumber}
              placeholder='Nomor Rekening'
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Nama Bank</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setOwnerBankName}
              value={ownerBankName}
              placeholder='Nama Bank'
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Jumlah Pengajuan Pendanaan</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setAmount}
              value={amount}
              placeholder='Jumlah Pengajuan Pendanaan'
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
              <Text style={{ textAlign: 'center' }}>{imageKtp ? 'Gambar Terpilih' : 'Pilih Gambar...'}</Text>
            </Pressable>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Foto Surat Izin Usaha (SIU)</Text>
            <Pressable
              style={styles.textInput}
              onPress={() => pickImage('siu')}>
              <Text style={{ textAlign: 'center' }}>{imageSiu ? 'Gambar Terpilih' : 'Pilih Gambar...'}</Text>
            </Pressable>
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Foto Produk UMKM</Text>
            <Pressable
              style={styles.textInput}
              onPress={() => pickImage('product')}>
              <Text style={{ textAlign: 'center' }}>{imageProduct ? 'Gambar Terpilih' : 'Pilih Gambar...'}</Text>
            </Pressable>
          </View>

          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? '#4630EB' : undefined}
          />
          <Text>Saya menyatakan bahwa yang saya masukkan adalah benar.</Text>

          <Pressable style={styles.buttonRegister} onPress={onRegisterUmkmButtonPressed}>
            <Text style={{ textAlign: 'center', color: '#FFFFFF' }}>Daftarkan Usaha Saya Sekarang</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}