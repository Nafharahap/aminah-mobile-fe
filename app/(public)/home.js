import { Link } from 'expo-router'
import { View, SafeAreaView, Pressable, Image, StyleSheet, FlatList } from 'react-native'
import { Stack } from "expo-router";
import { useSession } from '../../context/auth';
import { BusinessCard } from "../../components"

function HeaderRight(props) {
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

function LogoImage() {
  const logoUrl = require('../../assets/images/logo-aminah-01.png')
  return (
    <Image
      style={{ width: 160, height: 40, marginLeft: -20 }}
      source={logoUrl}
    />
  )
}

export default function Home() {
  const { session } = useSession();

  let businesses = []
  for (let i = 0; i < 16; i++) {
    const businessesImageUrl = require('../../assets/images/product-image.png')
    businesses.push({
      id: i + 1,
      image: businessesImageUrl,
      businessesName: `Nama Usaha ${i + 1}`
    })

  }

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 12, backgroundColor: '#D9D9D9' }}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerBackVisible: false,
          headerRight: () => <HeaderRight session={session} />,
          headerTitle: () => <LogoImage />,
          headerBackground: () => {
            const logoUrl = require('../../assets/images/headerBg.png')
            return (
              <Image
                style={{ ...StyleSheet.absoluteFill, height: '100%', width: '100%', resizeMode: 'stretch' }}
                source={logoUrl}
              />
            )
          }
        }}
      />
      <FlatList
        data={businesses}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (<BusinessCard business={item} index={item.id - 1} />)}
        style={{ flex: 1, paddingVertical: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView >
  );
}