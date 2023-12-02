import { View, SafeAreaView, Text, Pressable, Image } from "react-native"
import styles from './register.style'
import { Link, Stack } from "expo-router";

const logoUrl = require('../../../assets/images/Logo-Aminah-Logomark-03.png')

export default function Register() {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
      <Stack.Screen
        options={{
          headerShown: false
        }}
      />
      <View style={styles.container}>
        <Image
          style={styles.logo}
          source={logoUrl}
        />
        <Text style={styles.logoText}>Register</Text>

        <View style={{ gap: 8, marginTop: 24 }}>
          <Link href={'/auth/register-borrower'} asChild>
            <Pressable style={{ ...styles.buttonRegister, minWidth: 220 }}>
              <Text style={{ textAlign: 'center', color: '#FFFFFF' }}>Daftar Jadi Mitra</Text>
            </Pressable>
          </Link>
          <Text style={{ textAlign: 'center', color: '#076E5B' }}>atau</Text>
          <Link href={'/auth/register-lender'} asChild>
            <Pressable style={{ ...styles.buttonRegister, minWidth: 220 }}>
              <Text style={{ textAlign: 'center', color: '#FFFFFF' }}>Daftar Sebagai Pemodal</Text>
            </Pressable>
          </Link>
        </View>

        <Text style={{ textAlign: 'center', color: '#076E5B', marginTop: 40 }}>
          Sudah punya akun? <Link href={'/auth/login'} style={{ fontWeight: 'bold' }}>Login Disini!</Link>
        </Text>
      </View>
    </SafeAreaView >
  );
}