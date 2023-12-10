import React from 'react';
import { useStorageState } from './userStorageState';

interface CartItem {
  id: number;
  borrower_id: number;
  borrower_user_id: number;
  name: string;
  borrower_name: string;
  image: string;
  price: number;
  quantity: number;
  selected: boolean;
}

const CartContext = React.createContext<{
  addToCart: (item: CartItem) => void; updateCart: (id: number, quantity: number, selected: boolean) => void; removeCartItem: (id: number) => void; removeAllCartItem: () => void; cart?: any | null, isLoading: boolean
} | null>(null);

// This hook can be used to access the user info.
export function useCart() {
  const value = React.useContext(CartContext);
  return value;
}

export function CartProvider(props) {
  const [[isLoading, cart], setCart] = useStorageState('cart');

  return (
    <CartContext.Provider
      value={{
        addToCart: (item: CartItem) => {
          const oldCart = JSON.parse(cart) || []

          let newCart = []
          if (oldCart.find((it: CartItem) => it.id === item.id)) {
            newCart = oldCart.map((it: CartItem) => {
              if (it.id === item.id) {
                return {
                  ...it,
                  quantity: it.quantity + item.quantity
                }
              }

              return it
            })
          } else {
            newCart = [
              ...oldCart,
              item
            ]
          }


          setCart(JSON.stringify(newCart))
        },
        updateCart: (id: number, quantity: number, selected: boolean) => {
          let newCart = JSON.parse(cart) || []

          newCart = newCart.map((item: CartItem) => {
            if (item.id === id) {
              return {
                ...item,
                quantity,
                selected
              }
            }

            return item
          })
          setCart(JSON.stringify(newCart))
        },
        removeCartItem: (id: number) => {
          let newCart = JSON.parse(cart) || []

          newCart = newCart.filter((item: CartItem) => {
            return item.id !== id
          })
          setCart(JSON.stringify(newCart))
        },
        removeAllCartItem: () => {
          setCart(null)
        },
        cart: cart ? JSON.parse(cart) : [],
        isLoading
      }}>
      {props.children}
    </CartContext.Provider >
  );
}
