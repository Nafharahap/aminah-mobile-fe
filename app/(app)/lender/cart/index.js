import { View, SafeAreaView, FlatList, Text, Pressable } from "react-native"
import React, { useMemo } from 'react'
import { CartItem } from "../../../../components";
import { useCart } from "../../../../context/cart";
import { useRouter } from "expo-router";
import { FontAwesome5 } from '@expo/vector-icons';

const CartPage = () => {
  const { cart, removeAllCartItem } = useCart()
  const router = useRouter()

  const onDeleteAllPressed = () => {
    removeAllCartItem()
  }

  const onCheckoutPressed = () => {
    router.push('/(app)/lender/cart/checkout')
  }

  const checkedCartItem = useMemo(() => {
    return cart.filter((item) => item.selected === true)
  }, [cart]);

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 16, backgroundColor: '#D9D9D9' }}>
      {
        cart.length > 0
          ? (
            <View style={{ flex: 1 }}>
              <FlatList
                data={cart}
                numColumns={1}
                showsVerticalScrollIndicator={false}
                renderItem={({ index, item }) => (<CartItem item={item} index={index} />)}
                contentContainerStyle={{ paddingVertical: 16 }}
                ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
                keyExtractor={item => item.id}
              />

              <View style={{ flexDirection: 'row', gap: 8, padding: 16 }}>
                <Pressable style={{ flex: 1, paddingVertical: 8, justifyContent: 'center', alignItems: 'center', borderRadius: 50, backgroundColor: '#6C6C6C' }} onPress={onDeleteAllPressed}>
                  <Text style={{ fontSize: 12, color: '#FFFFFF', fontWeight: 500 }}>Hapus Semua Item</Text>
                </Pressable>
                <Pressable style={{ flex: 1, paddingVertical: 8, justifyContent: 'center', alignItems: 'center', borderRadius: 50, backgroundColor: '#076E5B', opacity: checkedCartItem.length === 0 ? 0.3 : 1 }} onPress={onCheckoutPressed} disabled={checkedCartItem.length === 0}>
                  <Text style={{ fontSize: 12, color: '#FFFFFF', fontWeight: 500 }}>Checkout</Text>
                </Pressable>
              </View>
            </View>
          )
          : (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <FontAwesome5 name="shopping-cart" size={200} color="#199B57" />
              <Text style={{ fontSize: 20, fontWeight: 600, marginTop: 32, marginBottom: 8 }}>Keranjang belanja masih kosong</Text>
              <Text style={{ fontSize: 16 }}>Yuk, danai lagi!</Text>
              <Pressable
                onPress={router.back}
                style={{ marginTop: 60, borderWidth: 2, borderRadius: 52, borderColor: '#199B57', paddingHorizontal: 32, paddingVertical: 16 }}>
                <Text style={{ color: '#199B57' }}>DANAI SEKARANG</Text>
              </Pressable>
            </View>
          )
      }

    </SafeAreaView >
  )
}

export default CartPage