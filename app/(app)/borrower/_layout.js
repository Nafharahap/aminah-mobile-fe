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

const BorrowerRootLayout = () => {
  const router = useRouter()

  return (
    <Stack
      initialRouteName='(drawer)'
    >
      <Stack.Screen
        name='(drawer)'
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='pengajuan/index'
        options={{
          headerLeft: () => {
            return (
              <Pressable onPress={router.back}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </Pressable>
            )
          },
          headerBackground: () => <HeaderBg />,
          headerTitle: 'Pengajuan Mitra',
          headerTitleAlign: 'center',
        }}
      />

      <Stack.Screen
        name='pengembalian-dana/[id]'
        options={{
          headerLeft: () => {
            return (
              <Pressable onPress={router.back}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </Pressable>
            )
          },
          headerBackground: () => <HeaderBg />,
          headerTitle: 'Detail Pengembalian',
          headerTitleAlign: 'center',
        }}
      />

      <Stack.Screen
        name='pengembalian-dana/detail/[id]'
        options={{
          headerLeft: () => {
            return (
              <Pressable onPress={router.back}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </Pressable>
            )
          },
          headerBackground: () => <HeaderBg />,
          headerTitle: 'Rincian Pengembalian',
          headerTitleAlign: 'center',
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
          headerTitle: 'Tarik Saldo',
          headerTitleAlign: 'center',
        }}
      />
    </Stack>
  )
}

export default BorrowerRootLayout