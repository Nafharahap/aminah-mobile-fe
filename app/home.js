import { Link, useRouter } from 'expo-router'
import { Text, View, SafeAreaView, Pressable, Image, StyleSheet } from 'react-native'
import { Stack } from "expo-router";
import { ScreenHeaderBtn } from '../components';
import { icons } from '../constants';
import { useSession } from '../context/auth';

function HeaderRight(props) {
  if (props.session) {
    return (
      <ScreenHeaderBtn
        iconUrl={icons.notification}
        dimension={30}
      />
    )
  }
  else {
    return (
      <Pressable style={{
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: '#076E5B',
        borderRadius: 20
      }}>
        <Link href={'/auth/login'} style={{ color: '#FFFFFF' }}>Masuk</Link>
      </ Pressable>
    )
  }
}

export default function Home() {
  const { session, signOut } = useSession();
  const router = useRouter()

  function onButtonProfilePressed() {
    console.log('PROFILE BUTTON PRESSED');
    router.push('/borrower')
  }

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.burgerNav}
              dimension={30}
            />
          ),
          headerRight: () => <HeaderRight session={session} />,
          headerTitle: 'Beranda',
          headerTitleAlign: 'center',
          headerBackground: () => {
            const logoUrl = require('../assets/images/headerBg.png')
            return (
              <Image
                style={{ ...StyleSheet.absoluteFill, height: '100%', width: '100%', resizeMode: 'stretch' }}
                source={logoUrl}
              />
            )
          }
        }}
      />
      <View style={{ gap: 8 }}>
        <Text>Home Page {session ? 'LOGIN' : 'GK LOGIN'}</Text>
        {
          (session) ?
            <Pressable
              style={{
                paddingHorizontal: 12,
                paddingVertical: 4,
                backgroundColor: '#076E5B',
                borderRadius: 20
              }}
              onPress={() => {
                onButtonProfilePressed()
              }}
            >
              <Text style={{ textAlign: 'center', color: '#FFFFFF' }}>Profil</Text>
            </ Pressable>
            : ''
        }

        {
          (session) ?
            <Pressable
              style={{
                paddingHorizontal: 12,
                paddingVertical: 4,
                backgroundColor: '#076E5B',
                borderRadius: 20
              }}
              onPress={() => {
                signOut();
              }}
            >
              <Text style={{ textAlign: 'center', color: '#FFFFFF' }}>Keluar</Text>
            </ Pressable>
            : ''
        }
      </View>
    </SafeAreaView >
  );
}