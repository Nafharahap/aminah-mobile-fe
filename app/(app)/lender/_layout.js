import { Stack, useRouter } from 'expo-router'
import { Pressable, Image, StyleSheet } from 'react-native'
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
      initialRouteName='(drawer)'>

      <Stack.Screen
        name='(drawer)'
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='cart/index'
        options={{
          headerLeft: () => {
            return (
              <Pressable onPress={router.back}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </Pressable>
            )
          },
          headerBackground: () => <HeaderBg />,
          headerTitle: 'Keranjang',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name='cart/checkout'
        options={{
          headerLeft: () => {
            return (
              <Pressable onPress={router.back}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </Pressable>
            )
          },
          headerBackground: () => <HeaderBg />,
          headerTitle: 'Checkout Keranjang',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name='fill/index'
        options={{
          headerLeft: () => {
            return (
              <Pressable onPress={router.back}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </Pressable>
            )
          },
          headerBackground: () => <HeaderBg />,
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
          headerLeft: () => {
            return (
              <Pressable onPress={router.back}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </Pressable>
            )
          },
          headerBackground: () => <HeaderBg />,
          presentation: 'modal',
          headerTitle: 'Rincian Pembelian',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name='pembayaran/index'
        options={{
          headerLeft: () => {
            return (
              <Pressable onPress={router.back}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </Pressable>
            )
          },
          headerBackground: () => <HeaderBg />,
          headerTitle: 'Pembayaran',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name='pembayaran/[id]'
        options={{
          headerLeft: () => {
            return (
              <Pressable onPress={router.back}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </Pressable>
            )
          },
          headerBackground: () => <HeaderBg />,
          headerTitle: 'Rincian Pembayaran',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name='tarik-dana/index'
        options={{
          headerLeft: () => {
            return (
              <Pressable onPress={router.back}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </Pressable>
            )
          },
          headerBackground: () => <HeaderBg />,
          headerTitle: 'Tarik Dana',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name='topup/index'
        options={{
          headerLeft: () => {
            return (
              <Pressable onPress={router.back}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </Pressable>
            )
          },
          headerBackground: () => <HeaderBg />,
          headerTitle: 'Isi Saldo',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name='transaction/receipt/[trx_hash]'
        options={{
          headerLeft: () => {
            return (
              <Pressable onPress={router.back}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </Pressable>
            )
          },
          headerBackground: () => <HeaderBg />,
          headerTitle: 'Rincian Transaksi',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name='transaction/pengembalian-pendanaan/[trx_hash]'
        options={{
          headerLeft: () => {
            return (
              <Pressable onPress={router.back}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </Pressable>
            )
          },
          headerBackground: () => <HeaderBg />,
          headerTitle: 'Rincian Pengembalian Dana',
          headerTitleAlign: 'center'
        }}
      />
    </Stack>
  )
}

export default LenderRootLayout