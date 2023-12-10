import { View, SafeAreaView, FlatList, Text, Pressable } from "react-native"
import { CartItem } from "../../../../components";
import { useCart } from "../../../../context/cart";
import { useRouter } from "expo-router";

const CartPage = () => {
  const { cart, removeAllCartItem } = useCart()
  const router = useRouter()

  const onDeleteAllPressed = () => {
    removeAllCartItem()
  }

  const onCheckoutPressed = () => {
    router.push('/(app)/lender/cart/checkout')
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 16, backgroundColor: '#D9D9D9' }}>
      <FlatList
        data={cart}
        numColumns={1}
        showsVerticalScrollIndicator={false}
        renderItem={({ index, item }) => (<CartItem item={item} index={index} />)}
        style={{ flex: 1, paddingTop: 12 }}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        keyExtractor={item => item.id}
      />

      <View style={{ flexDirection: 'row', gap: 8, padding: 16 }}>
        <Pressable style={{ flex: 1, paddingVertical: 8, justifyContent: 'center', alignItems: 'center', borderRadius: 50, backgroundColor: '#6C6C6C' }} onPress={onDeleteAllPressed}>
          <Text style={{ fontSize: 12, color: '#FFFFFF', fontWeight: 500 }}>Hapus Semua Item</Text>
        </Pressable>
        <Pressable style={{ flex: 1, paddingVertical: 8, justifyContent: 'center', alignItems: 'center', borderRadius: 50, backgroundColor: '#076E5B' }} onPress={onCheckoutPressed}>
          <Text style={{ fontSize: 12, color: '#FFFFFF', fontWeight: 500 }}>Checkout</Text>
        </Pressable>
      </View>
    </SafeAreaView >
  )
}

export default CartPage