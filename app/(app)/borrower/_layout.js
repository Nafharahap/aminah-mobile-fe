import React from 'react'
import { Drawer } from 'expo-router/drawer';
import { Ionicons, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { Image, Pressable } from 'react-native';
import { icons } from '../../../constants'
import { useSession } from '../../../context/auth';

const HeaderBg = () => {
  const logoUrl = require('../../../assets/images/headerBg.png')
  return (
    <Image
      style={{ ...StyleSheet.absoluteFill, height: '100%', width: '100%', resizeMode: 'stretch' }}
      source={logoUrl}
    />
  )
}

const BorrowerDrawerLayout = () => {
  const { signOut } = useSession();

  const onLogoutPress = () => {
    signOut()
  }

  return (
    <Drawer screenOptions={({ navigation }) => ({
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
        name="index"
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
          title: "Profil Keuangan",
          headerTitleAlign: 'center',
          drawerIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
          headerRight: () => {
            return (
              <Pressable style={{ marginRight: 12 }} onPress={() => onLogoutPress()}>
                <Entypo name="log-out" size={24} color="#076E5B" />
              </Pressable>
            )
          },
          headerBackground: () => <HeaderBg />
        }}
      />
      <Drawer.Screen
        name="pengajuan"
        options={{
          drawerLabel: "Pengajuan Pendanaan",
          title: "Pengajuan Pendanaan",
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          drawerIcon: ({ color }) => <MaterialCommunityIcons name="cash-multiple" size={24} color={color} />
        }}
      />
    </Drawer>
  )
}

export default BorrowerDrawerLayout