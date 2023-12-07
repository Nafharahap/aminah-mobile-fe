import React from 'react'
import { Link } from 'expo-router'
import { Drawer } from 'expo-router/drawer';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
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

function HeaderRight(props) {
  if (props.session) {
    return (
      <Pressable style={{ marginRight: 12 }}>
        <FontAwesome5 name="shopping-cart" size={24} color="#076E5B" />
      </Pressable>
    )
  }
  else {
    return (
      <Pressable style={{
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: '#076E5B',
        borderRadius: 20,
        marginRight: 12
      }}>
        <Link href={'/auth/login'} style={{ color: '#FFFFFF' }}>Masuk</Link>
      </ Pressable>
    )
  }
}

const LenderDrawerLayout = () => {
  const { session } = useSession()

  return (
    <Drawer screenOptions={({ navigation }) => ({
      drawerStyle: { backgroundColor: '#199B57' },
      drawerActiveBackgroundColor: '#076E5B',
      drawerActiveTintColor: 'white',
      drawerInactiveTintColor: 'white',
      headerRight: () => <HeaderRight session={session} />,
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
          headerBackground: () => <HeaderBg />
        }}
      />
    </Drawer>
  )
}

export default LenderDrawerLayout