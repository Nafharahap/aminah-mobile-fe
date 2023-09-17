import { Stack } from 'expo-router';
import { SessionProvider } from '../context/auth';

export const unstable_settings = {
  // Ensure any route can link back to `/`
  initialRouteName: "home",
};

const RootLayout = () => {
  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <Stack></Stack>
    </SessionProvider>
  );
};

export default RootLayout;
