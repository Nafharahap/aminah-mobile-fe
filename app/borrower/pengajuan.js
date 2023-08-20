import { Stack, useRouter } from "expo-router";
import { Image, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import styles from "./index.style";
import Checkbox from "expo-checkbox";
import { ScreenHeaderBtn } from "../../components";
import { icons } from "../../constants";

function LogoTitle() {
  const logoUrl = require('../../assets/images/Logo-Aminah-02.png')
  return (
    <Image
      style={{ width: 200, height: 50 }}
      source={logoUrl}
    />
  )
}

export default function BorrowerPengajuan() {
  const router = useRouter()

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
              placeholder='Nama Lenkap'
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Nomor HP Pemilik UMKM</Text>
            <TextInput
              style={styles.textInput}
              placeholder='Nomor HP Pemilik UMKM'
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>NIK Pemilik UMKM</Text>
            <TextInput
              style={styles.textInput}
              placeholder='NIK Pemilik UMKM'
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Alamat Pemilik UMKM</Text>
            <TextInput
              style={styles.textInput}
              placeholder='Alamat Pemilik UMKM'
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Nama UMKM</Text>
            <TextInput
              style={styles.textInput}
              placeholder='Nama UMKM'
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Jenis UMKM</Text>
            <TextInput
              style={styles.textInput}
              placeholder='Jenis UMKM'
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Alamat UMKM</Text>
            <TextInput
              style={styles.textInput}
              placeholder='Alamat UMKM'
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Pendapatan UMKM Per Bulan</Text>
            <TextInput
              style={styles.textInput}
              placeholder='Pendapatan UMKM Per Bulan'
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Nama Pemilik Rekening</Text>
            <TextInput
              style={styles.textInput}
              placeholder='Nama Pemilik Rekening'
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Nomor Rekening</Text>
            <TextInput
              style={styles.textInput}
              placeholder='Nomor Rekening'
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Nama Bank</Text>
            <TextInput
              style={styles.textInput}
              placeholder='Nama Bank'
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Jumlah Pengajuan Pendanaan</Text>
            <TextInput
              style={styles.textInput}
              placeholder='Jumlah Pengajuan Pendanaan'
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Jangka Waktu Pendanaan</Text>
            <TextInput
              style={styles.textInput}
              placeholder='Jangka Waktu Pendanaan'
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Tujuan Pengajuan</Text>
            <TextInput
              style={styles.textInput}
              placeholder='Tujuan Pengajuan'
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Estimasi Bagi Hasil</Text>
            <TextInput
              style={styles.textInput}
              placeholder='Estimasi Bagi Hasil'
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Foto KTP Pemilik UMKM</Text>
            <TextInput
              style={styles.textInput}
              placeholder='Foto KTP Pemilik UMKM'
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Foto Surat Izin Usaha (SIU)</Text>
            <TextInput
              style={styles.textInput}
              placeholder='Foto Surat Izin Usaha (SIU)'
            />
          </View>

          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Foto Produk UMKM</Text>
            <TextInput
              style={styles.textInput}
              placeholder='Foto Produk UMKM'
            />
          </View>

          <Checkbox
            style={styles.checkbox}
          />
          <Text>Saya menyatakan bahwa yang saya masukkan adalah benar.</Text>

          <Pressable style={styles.buttonRegister} >
            <Text style={{ textAlign: 'center', color: '#FFFFFF' }}>Daftarkan Usaha Saya Sekarang</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}