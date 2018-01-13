// @flow
import type { ShoppingCartItem } from '../../types/shopping'

const ADD_CART_ITEM = 'roommate/roomServiceCart/ADD_CART_ITEM'

export type State = {
  +cartItems: ShoppingCartItem[],
  +specialRequest: ?string
}

type AddCartItemToRoomServiceCartAction = { type: typeof ADD_CART_ITEM, cartItem: ShoppingCartItem }

export type Action =
  | AddCartItemToRoomServiceCartAction

const initialState: State = {
  cartItems: [],
  specialRequest: null
}

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case ADD_CART_ITEM:
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          action.cartItem
        ]
      }
    default:
      return state
  }
}

export function addCartItemToRoomServiceCart(cartItem: ShoppingCartItem): AddCartItemToRoomServiceCartAction {
  return { type: ADD_CART_ITEM, cartItem }
}