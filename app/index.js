import { View, ActivityIndicator, Text } from 'react-native'
import React from 'react'
import { Redirect } from 'expo-router';
import { useSession } from '../context/auth';

const StartPage = () => {
  const { isLoading } = useSession();

  // You can keep the splash screen open, or render a loading screen like we do here.
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
        <Text>Silahkan Tunggu</Text>
      </View>
    )
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  return <Redirect href="/home" />
}

export default StartPage