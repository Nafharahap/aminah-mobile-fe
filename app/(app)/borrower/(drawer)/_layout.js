import React from 'react'
import { Link } from 'expo-router'
import { Drawer } from 'expo-router/drawer';
import { Ionicons } from '@expo/vector-icons';
import { Image, Pressable } from 'react-native';
import { icons } from '../../../../constants'
import { useSession } from '../../../../context/auth';
import { MaterialIcons } from '@expo/vector-icons';

const HeaderBg = () => {
  const logoUrl = require('../../../../assets/images/headerBg.png')
  return (
    <Image
      style={{ ...StyleSheet.absoluteFill, height: '100%', width: '100%', resizeMode: 'stretch' }}
      source={logoUrl}
    />
  )
}

const BorrowerDrawerLayout = () => {
  const { session, signOut } = useSession()

  const onLogoutPressed = () => {
    signOut()
  }

  return (
    <Drawer initialRouteName='home' screenOptions={({ navigation }) => ({
      drawerStyle: { backgroundColor: '#199B57' },
      drawerActiveBackgroundColor: '#076E5B',
      drawerActiveTintColor: 'white',
      drawerInactiveTintColor: 'white',
      headerLeft: () => {
        return (
          <Pressable style={{ marginLeft: 12 }} onPress={navigation.toggleDrawer}>
            <Image source={icons.burgerNav} />
          </Pressable>
        )
      }
    })}>
      <Drawer.Screen
        name="home"
        options={{
          drawerLabel: "Beranda",
          title: "Beranda",
          headerTitleAlign: 'center',
          drawerIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
          headerBackground: () => <HeaderBg />
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: "Profil Keuangan",
          title: "Profil",
          headerTitleAlign: 'center',
          drawerIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
          headerRight: () => {
            return (
              <Pressable style={{ marginRight: 16 }} onPress={onLogoutPressed}>
                <MaterialIcons name="logout" size={24} color="black" />
              </Pressable>
            )
          },
          headerBackground: () => <HeaderBg />
        }}
      />
    </Drawer>
  )
}

export default BorrowerDrawerLayout