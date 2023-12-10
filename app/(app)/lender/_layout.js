import { Stack, useRouter } from 'expo-router'
import { Pressable, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import React from 'react'

const HeaderBg = () => {
  const logoUrl = require('../../../assets/images/headerBg.png')
  return (
    <Image
      style={{ ...StyleSheet.absoluteFill, height: '100%', width: '100%', resizeMode: 'stretch' }}
      source={logoUrl}
    />
  )
}

const LenderRootLayout = () => {
  const router = useRouter()

  return (
    <Stack
      initialRouteName='(drawer)'
      screenOptions={{
        headerLeft: () => {
          return (
            <Pressable style={{ marginLeft: 16 }} onPress={router.back}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>
          )
        },
        headerBackground: () => <HeaderBg />
      }}>

      <Stack.Screen
        name='(drawer)'
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='cart/index'
        options={{
          headerTitle: 'Keranjang',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name='cart/checkout'
        options={{
          headerTitle: 'Checkout Keranjang',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name='fill/index'
        options={{
          headerTitle: 'Lengkapi Profil',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name='mitra/[id]'
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='mitra/modalCartDetails'
        options={{
          presentation: 'modal',
          headerTitle: 'Detail Keranjang',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name='pembayaran/index'
        options={{
          headerTitle: 'Pembayaran',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name='pembayaran/[id]'
        options={{
          headerTitle: 'Detail Pembayaran',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name='topup/index'
        options={{
          headerTitle: 'Isi Dompet',
          headerTitleAlign: 'center'
        }}
      />
    </Stack>
  )
}

export default LenderRootLayout