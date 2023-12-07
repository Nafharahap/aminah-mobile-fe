import { View, Text } from 'react-native'
import React from 'react'
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const Modal = () => {
  const isPresented = router.canGoBack();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {!isPresented && <Link href="../">Dismiss</Link>}
      <StatusBar style="light" />
    </View>
  )
}

export default Modal