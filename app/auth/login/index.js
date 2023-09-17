import { Text, View, SafeAreaView, Image, TextInput, Pressable } from 'react-native'
import styles from './index.style'
import { Stack, Link, useRouter } from "expo-router";
import { useState } from 'react';
import { useSession } from '../../../context/auth';

const logoUrl = require('../../../assets/images/Logo-Aminah-Logomark-03.png')

export default function Login() {
  const router = useRouter()
  const { signIn } = useSession();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onButtonLoginPressed = async () => {
    try {
      signIn(email, password);
      console.log('Login Berhasil');
      alert('Login Berhasil')
      router.replace('/home');
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
      </View>
    </SafeAreaView >
  );
}