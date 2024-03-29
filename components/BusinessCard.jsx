import { useState } from "react";
import { Image, View, Text, Pressable } from "react-native";
import { formatNumber } from "react-native-currency-input";
import * as Progress from 'react-native-progress';
import { API_BASE_URL } from '@env'
import { useRouter } from "expo-router";
import { BUSINESS_TYPE_LABEL } from "../constants/general";

const Business = ({ business, index }) => {
  const router = useRouter()

  const formatCurrency = (number) => {
    return formatNumber(number, {
      separator: ',',
      prefix: 'Rp ',
      precision: 0,
      delimiter: '.',
      signPosition: 'beforePrefix',
    })
  }

  const onPressCard = () => {
    router.push({ pathname: '/(app)/lender/mitra/[:id]', params: { id: business.id } })
  }

  return (
    <Pressable style={{ flex: 1 }} onPress={onPressCard}>
      <View style={[
        {
          flex: 1,
        },
        index % 2 === 0
          ? {
            paddingRight: 6,
          } : {
            paddingLeft: 6
          }
        ,
      ]}>
        <Image
          source={{ uri: `${API_BASE_URL}/pendaftaran/${business.borrower?.business_image}` }}
          defaultSource={require('../assets/images/product-image-placeholder.png')}
          style={{
            width: '100%',
            minHeight: 108,
            maxHeight: 108,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}

        />
        <View style={{ justifyContent: 'space-between', minHeight: 120, maxHeight: 120, paddingBottom: 16, paddingHorizontal: 8, paddingTop: 4, backgroundColor: 'white', borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}>
          <Text style={{ fontWeight: 500, fontSize: 12 }}>{business.borrower?.business_name}</Text>

          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
              <Text style={{ fontWeight: 500, fontSize: 12, color: '#199B57', flex: 3 }}>{formatCurrency(100000)}</Text>
              <Text style={{
                color: 'white',
                fontSize: 8,
                flex: 1,
                backgroundColor: '#076E5B',
                borderRadius: 10,
                paddingHorizontal: 4,
                paddingVertical: 2,
                textAlign: 'center'
              }}>
                {BUSINESS_TYPE_LABEL[Number.isInteger(Number(business?.borrower?.business_type)) ? Number(business?.borrower?.business_type) : 8]}
              </Text>
            </View>
            <Text style={{ fontWeight: 500, fontSize: 10 }}>Terkumpul <Text style={{ color: '#199B57' }}>{formatCurrency(business.dana_terkumpul)}</Text></Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 6 }}>
              <Text style={{ color: '#199B57', fontWeight: 500, fontSize: 10, marginBottom: 2 }}>{+business.dana_terkumpul_persen.toFixed(2)} %</Text>
              <Text style={{ fontWeight: 500, fontSize: 10 }}>Dari <Text style={{ color: '#199B57', fontWeight: 500, fontSize: 10 }}>{formatCurrency(business.borrower?.borrower_first_submission)}</Text></Text>
            </View>
            <Progress.Bar progress={business.dana_terkumpul_persen / 100} color="#076E5B" unfilledColor="#D9D9D9" borderWidth={0} borderRadius={8} width={null} height={4} />
          </View>
        </View>
      </View>
    </Pressable>
  )
}

export default Business;
