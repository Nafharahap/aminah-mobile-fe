import React from 'react'
import { Stack } from "expo-router";

const PublicLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="home" />
      <Stack.Screen name="auth" options={{
        headerShown: false
      }} />
    </Stack>
  )
}

export default PublicLayout