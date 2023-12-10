import { Stack } from 'expo-router'
import { Pressable, Image } from 'react-native'
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import React from 'react'

const HeaderBg = () => {
  const logoUrl = require('../../../../assets/images/headerBg.png')
  return (
    <Image
      style={{ ...StyleSheet.absoluteFill, height: '100%', width: '100%', resizeMode: 'stretch' }}
      source={logoUrl}
    />
  )
}

const CartPageLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name='list'
        options={({ navigation }) => ({
          headerTitle: 'Keranjang',
          headerTitleAlign: 'center',
          headerLeft: () => {
            return (
              <Pressable style={{ marginLeft: 16 }} onPress={navigation.goBack}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </Pressable>
            )
          },
          headerBackground: () => <HeaderBg />
        })}
      />
      <Stack.Screen
        name='checkout'
        options={({ navigation }) => ({
          headerTitle: 'Checkout',
          headerTitleAlign: 'center',
          headerLeft: () => {
            return (
              <Pressable style={{ marginLeft: 16 }} onPress={navigation.goBack}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </Pressable>
            )
          },
          headerBackground: () => <HeaderBg />
        })}
      />
    </Stack>
  )
}

export default CartPageLayout