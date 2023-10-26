import { View, SafeAreaView, Text, Image } from "react-native"
import styles from './register.style'
import { Stack, useRouter } from "expo-router";
import { ScreenHeaderBtn } from "../../../components";
import { icons } from "../../../constants"

function LogoTitle() {
  const logoUrl = require('../../../assets/images/logo-aminah-01.png')
  return (
    <Image
      style={{ width: 200, height: 50 }}
      source={logoUrl}
    />
  )
}

export default function RegisterLender() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Stack.Screen
        options={{
          headerShadowVisible: false,
          headerBackVisible: false,
          headerLeft: () => (
            <ScreenHeaderBtn
              iconUrl={icons.leftArrow}
              dimension='60%'
              handlePress={() => router.back()}
            />
          ),
          headerTitle: () => <LogoTitle />,
          headerTitleAlign: 'center',
        }}
      />
      <View style={styles.container}>
        <Text style={styles.logoText}>Daftar Sebagai Lender</Text>
      </View>
    </SafeAreaView >
  );
}