import React from 'react'
import { Stack } from "expo-router";

const PublicLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerBackVisible: false }} />
      <Stack.Screen name="auth" options={{
        headerShown: false
      }} />
    </Stack>
  )
}

export default PublicLayout