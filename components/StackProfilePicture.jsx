import { Image, View, Text, Pressable } from "react-native";
import React, { useMemo } from 'react'
import { API_BASE_URL } from '@env'

const StackProfilePicture = ({ fundingLenders }) => {
  const filteredLenders = useMemo(() => {
    return fundingLenders?.filter((value, index, self) =>
      index === self.findIndex((t) => (t.lender.id === value.lender.id))
    )
  }, [fundingLenders])

  return (
    <View style={{ position: 'relative', flexDirection: 'row' }}>
      {
        filteredLenders?.map((fundingLender, index) => {
          if (index < 4) {
            return (
              <Image
                style={{ marginLeft: index !== 0 ? -16 : 0, width: 40, height: 40, borderRadius: 40 / 2, borderWidth: 1 }}
                source={{ uri: `${API_BASE_URL}/profile/${fundingLender.lender.lender_image}` }}
                defaultSource={require('../assets/images/profile-placeholder.jpeg')}
                key={index}
              />
            )
          }
        })
      }

      {
        filteredLenders?.length > 4
          ? (
            <View
              style={{ marginLeft: -16, width: 40, height: 40, borderRadius: 40 / 2, backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', borderWidth: 1 }}
            >
              <Text style={{ fontSize: 12, fontWeight: 600, textAlign: 'center' }}>{filteredLenders?.length - 4}+</Text>
            </View>
          )
          : null
      }

    </View>
  )
}

export default StackProfilePicture