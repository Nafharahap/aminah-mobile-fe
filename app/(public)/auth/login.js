import { Text, View, SafeAreaView, Image, TextInput, Pressable, StyleSheet } from 'react-native'
import { Stack, Link, useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import { useSession } from '../../../context/auth';

const logoUrl = require('../../../assets/images/Logo-Aminah-Logomark-03.png')

export default function Login() {
  const { signIn } = useSession();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onButtonLoginPressed = async () => {
    try {
      signIn(email, password);
      console.log('Login Berhasil');
      alert('Login Berhasil')
    } catch (error) {
      console.log('Login Gagal');
      alert('Login Gagal')
    }
  }

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
        <Text style={styles.logoText}>Login</Text>

        <View style={styles.containerForm}>
          <TextInput
            style={styles.textInputEmail}
            onChangeText={setEmail}
            value={email}
            placeholder='Email'
          />
          <TextInput
            style={styles.textInputPassword}
            onChangeText={setPassword}
            value={password}
            placeholder='Password'
            secureTextEntry={true}
          />

          <Pressable style={styles.buttonLogin} onPress={onButtonLoginPressed}>
            <Text style={{ textAlign: 'center', color: '#FFFFFF' }}>Masuk</Text>
          </Pressable>
        </View>

        <Text style={{ textAlign: 'center', color: '#076E5B', marginTop: 40 }}>
          Belum punya akun? <Link href={'/auth/register'} style={{ fontWeight: 'bold' }}>Daftar Disini!</Link>
        </Text>
        <Text style={{ textAlign: 'center', color: '#076E5B', marginTop: 4 }}>
          <Link href={'/home'} replace>Beranda</Link>
        </Text>
      </View>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 28,
    alignItems: 'center',
    flexDirection: 'column'
  },
  containerForm: {
    width: '100%',
    marginTop: 36,
    flexDirection: 'column',
    paddingHorizontal: 40,
    gap: 16
  },
  logo: {
    height: 120,
    width: 132,
  },
  logoText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600'
  },
  textInputEmail: {
    borderWidth: 2,
    textAlign: 'center',
    borderRadius: 24,
    borderColor: '#199B57',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  textInputPassword: {
    borderWidth: 2,
    textAlign: 'center',
    borderRadius: 24,
    borderColor: '#199B57',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonLogin: {
    alignSelf: 'center',
    marginTop: '16',
    paddingHorizontal: 36,
    paddingVertical: 10,
    borderWidth: 2,
    textAlign: 'center',
    borderRadius: 32,
    backgroundColor: '#076E5B',
    borderColor: '#076E5B',
  }
});