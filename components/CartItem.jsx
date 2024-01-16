import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { formatCurrencyRp } from '../helpers/formatNumber';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useCart } from '../context/cart';
import { getDetailMitra } from '../services/publicService';

const CartItem = ({ item, index }) => {
  console.log(item);
  const { updateCart, removeCartItem } = useCart()
  const [funding, setFunding] = useState()

  const onButtonRemovePressed = () => {
    const quantity = item.quantity - 1
    if (quantity < 1) {
      removeCartItem(item.id)
    } else {
      updateCart(item.id, item.quantity - 1, item.selected)
    }
  }

  const onButtonAddPressed = () => {
    if (item.quantity < funding.sisa_unit) {
      updateCart(item.id, item.quantity + 1, item.selected)
    }
  }

  const onTrashButtonPressed = () => {
    removeCartItem(item.id)
  }

  const onToggleSelectPressed = () => {
    updateCart(item.id, item.quantity, !item.selected)
  }

  const getFundingDetail = async (id) => {
    try {
      const response = await getDetailMitra(id)
      setFunding(response.data.payload.funding)
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }

  useEffect(() => {
    getFundingDetail(item.id)
  }, [item.id])

  return (
    <View style={{ flexDirection: 'row', gap: 16, justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 8, padding: 12 }}>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 12, fontWeight: 600 }} numberOfLines={1}>{item.name} - {item.borrower_name}</Text>
        <Text style={{ fontSize: 12, fontWeight: 700 }}>Total Biaya: {formatCurrencyRp(item.price * item.quantity)}</Text>
        <View style={{ marginTop: 12, flexDirection: 'row', alignItems: 'center', gap: 20 }}>
          <View>
            <View style={{ padding: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#FFFFFF', width: 92, borderRadius: 20, marginBottom: 4 }}>
              <Entypo onPress={onButtonRemovePressed} name="circle-with-minus" size={24} color="#076E5B" />
              <Text style={{ fontSize: 12 }}>{item.quantity}</Text>
              <Entypo onPress={onButtonAddPressed} name="circle-with-plus" size={24} color="#076E5B" style={{ opacity: item.quantity === funding?.sisa_unit ? 0.3 : 1 }} />
            </View>
          </View>
          <FontAwesome onPress={onTrashButtonPressed} name="trash-o" size={24} color="black" />
        </View>
        <Text>Sisa Unit: {funding?.sisa_unit}</Text>
      </View>

      <View>
        <Checkbox
          style={{ width: 24, height: 24 }}
          value={item.selected}
          onTouchEnd={onToggleSelectPressed}
          color={item.selected ? '#4630EB' : undefined}
        />
      </View>
    </View>
  )
}

export default CartItem