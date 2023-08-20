import { Link } from 'expo-router'
import { Text, View, SafeAreaView } from 'react-native'
import { Stack } from "expo-router";
import { ScreenHeaderBtn } from '../components';
import { icons } from '../constants';
import { useEffect, useState } from 'react';
import { getToken } from '../services/tokenService';

export default function Home() {
  const [token, setToken] = useState(null)

  const isUserAuth = async () => {
    const token = await getToken()
    if (token) {
      setToken(token)
    }
    return false
  }

  useEffect(() => {
    isUserAuth()
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerBackVisible: false,
          headerRight: () => (
            <ScreenHeaderBtn
              iconUrl={icons.notification}
              dimension={30}
            />
          ),
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.burgerNav}
              dimension={30}
            />
          ),
          headerTitle: ''
        }}
      />
      <View>
        <Text>Home Page {token ? 'LOGIN' : 'GK LOGIN'}</Text>
        <Link href={'/auth/login'}>Login</Link>
        <Link href={'/auth/register'}>Daftar</Link>
        <Link href="/modal-user">Present modal</Link>
      </View>
    </SafeAreaView >
  );
}