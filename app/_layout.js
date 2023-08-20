import { Stack } from "expo-router";
import { Image } from "react-native";
import { ScreenHeaderBtn } from "../components";
import { icons } from "../constants";
// import * as SplashScreen from "expo-splash-screen";

// SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "home",
};

const RootLayout = () => {
  return (
    <Stack screenOptions={{
      headerRight: () => (
        <ScreenHeaderBtn
          iconUrl={icons.notification}
          dimension={30}
        />
      ),
      headerLeft: () => (
        <ScreenHeaderBtn
          iconUrl={icons.burgerNav}
          dimension={30}
        />
      ),
      headerTitle: ''
    }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen
        name="modal-user"
        options={{
          // Set the presentation mode to modal for our modal route.
          presentation: 'modal',
        }}
      />
    </Stack >
  )
};

export default RootLayout;
