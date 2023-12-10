import { Slot, useRouter, useSegments } from 'expo-router';
import { SessionProvider, useSession } from '../context/auth';
import { useEffect } from 'react';
import { CartProvider } from '../context/cart';

const InitialLayout = () => {
  const { session } = useSession()
  const segments = useSegments()
  const router = useRouter()

  useEffect(() => {
    const inAuthGroup = segments[0] === '(app)'

    if (session) {
      if (session.role === 'borrower') {
        router.replace('/borrower')
      } else if (session.role === 'lender') {
        router.replace('/lender')
      }
    }
    else if (!session && inAuthGroup) {
      router.replace('/home')
    }
  }, [session])

  return <Slot />
}

const RootLayout = () => {

  // Set up the auth context and render our layout inside of it.
  return (
    <SessionProvider>
      <CartProvider>
        <InitialLayout />
      </CartProvider>
    </SessionProvider>
  );
};

export default RootLayout;
