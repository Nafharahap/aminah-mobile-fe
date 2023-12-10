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

const BorrowerRootLayout = () => {
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
        name='pengajuan'
        options={{
          headerTitle: 'Pengajuan Mitra',
          headerTitleAlign: 'center',
        }}
      />
    </Stack>
  )
}

export default BorrowerRootLayout