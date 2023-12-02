import { Link } from 'expo-router'
import { Text, View, SafeAreaView, Pressable, Image, StyleSheet, ScrollView, FlatList } from 'react-native'
import { Stack } from "expo-router";
import { useSession } from '../../../context/auth';
import { FontAwesome5 } from '@expo/vector-icons';
import { BusinessCard } from "../../../components"

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

export default function LenderHomePage() {
  const { session } = useSession();

  let businesses = []
  for (let i = 0; i < 16; i++) {
    const businessesImageUrl = require('../../../assets/images/product-image.png')
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
          headerRight: () => <HeaderRight session={session} />
        }}
      />
      <FlatList
        data={businesses}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem={({ item }) => (<BusinessCard business={item} index={item.id - 1} />)}
        style={{ flex: 1, paddingVertical: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView >
  );
}