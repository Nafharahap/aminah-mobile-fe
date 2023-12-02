import { useState } from "react"
import { View, SafeAreaView, Text, ScrollView, TextInput, Pressable, Image } from "react-native"
import Checkbox from 'expo-checkbox'
import { Stack, useRouter } from "expo-router"
import styles from './register.style'
import { postRegisterBorrower } from "../../../services/authService"
import { icons } from "../../../constants"
import { ScreenHeaderBtn } from "../../../components"

function LogoImage() {
  const logoUrl = require('../../../assets/images/logo-aminah-01.png')
  return (
    <Image
      style={{ width: 200, height: 50 }}
      source={logoUrl}
    />
  )
}

export default function RegisterBorrower() {
  const router = useRouter()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [isChecked, setChecked] = useState(false)

  const onButtonRegisterPressed = async () => {
    try {
      const response = await postRegisterBorrower({
        fullName,
        email,
        password,
        password_confirmation: passwordConfirm,
        approvedCheck: isChecked
      })

      console.log('Registrasi Berhasil')
      router.replace('/(public)/auth/login')
      alert('Registrasi Berhasil')
    } catch (error) {
      console.log('Registrasi Gagal', error)
      alert('Registrasi Gagal')
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
          headerTitle: () => <LogoImage />,
          headerTitleAlign: 'center',
        }}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, padding: 16 }}>
          <Text style={styles.textHeader}>Daftar Sebagai Mitra</Text>
          <Text style={styles.textSubHeader}>Lengkapi informasi mengenai akun dan kontak yang bisa dihubungi.</Text>
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
            <Text style={styles.textLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setEmail}
              value={email}
              placeholder='Email'
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Kata Sandi</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setPassword}
              value={password}
              placeholder='Kata Sandi'
              secureTextEntry={true}
            />
          </View>
          <View style={{ marginTop: 10 }}>
            <Text style={styles.textLabel}>Konfirmasi Kata Sandi</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
              placeholder='Konfirmasi Kata Sandi'
              secureTextEntry={true}
            />
          </View>

          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? '#4630EB' : undefined}
          />
          <Text>Saya menyetujui ketentuan layanan dan kebijakan privasi.</Text>

          <Pressable style={styles.buttonRegister} onPress={onButtonRegisterPressed}>
            <Text style={{ textAlign: 'center', color: '#FFFFFF' }}>Daftar</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView >
  )
}