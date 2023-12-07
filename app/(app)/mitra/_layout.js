import { Stack } from 'expo-router'
import React from 'react'

const MitraDetailLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='[id]' options={{ headerShown: false }} />
      <Stack.Screen
        name='modal'
        options={{
          presentation: 'modal',
        }}
      />
    </Stack>
  )
}

export default MitraDetailLayout