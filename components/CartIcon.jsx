import { View, Pressable, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCart } from '../context/cart';

const CartIcon = () => {
  const router = useRouter()
  const { cart } = useCart()
  const [total, setTotal] = useState()

  useEffect(() => {
    setTotal(cart.length < 100 ? cart.length : `${cart.length}+`)
  }, [cart])

  const onPressCart = () => {
    router.push({ pathname: '/(app)/lender/cart' })
  }

  return (
    <Pressable onPress={onPressCart} style={{ marginRight: 28, position: 'relative' }}>
      <FontAwesome5 name="shopping-cart" size={24} color="#076E5B" />
      <View style={{ position: 'absolute', right: -12, top: -12, backgroundColor: 'red', paddingVertical: 2, paddingHorizontal: 6, borderRadius: 8 }}>
        <Text style={{ fontSize: 12, textAlign: 'center', color: 'white' }}>{total}</Text>
      </View>
    </Pressable>
  )
}

export default CartIcon