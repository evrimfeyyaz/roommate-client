// @flow
import type { ShoppingCart, ShoppingCartItem } from '../../types/shopping'
import { generateTemporaryIdForCartItem } from '../../utils/shoppingHelpers'

const ADD_CART_ITEM = 'roommate/roomServiceCart/ADD_CART_ITEM'

export type State = ShoppingCart

type AddCartItemToRoomServiceCartAction = { type: typeof ADD_CART_ITEM, cartItem: ShoppingCartItem }

export type Action =
  | AddCartItemToRoomServiceCartAction

const initialState: State = {
  cartItems: {},
  specialRequest: null
}

// REDUCERS

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case ADD_CART_ITEM:
      return addCartItem(state, action)
    default:
      return state
  }
}

function addCartItem(state: State, action: AddCartItemToRoomServiceCartAction) {
  let cartItem = getCartItemWithTemporaryId(action.cartItem)
  const { id } = cartItem

  if (includesCartItem(state, cartItem)) {
    const existingCartItem = state.cartItems[id]

    cartItem = cartItemWithUpdatedQuantity(cartItem, existingCartItem)
  }

  return {
    ...state,
    cartItems: {
      ...state.cartItems,
      [cartItem.id]: cartItem
    }
  }
}

// ACTION CREATORS

export function addCartItemToRoomServiceCart(cartItem: ShoppingCartItem): AddCartItemToRoomServiceCartAction {
  return { type: ADD_CART_ITEM, cartItem }
}

// UTILITY FUNCTIONS

/**
 * Combines two cart items that have the same ID.
 *
 * Check out the `generateTemporaryIdForCartItem()` helper method for more
 * information on how cart IDs are generated.
 *
 * @param cartItem1
 * @param cartItem2
 * @returns New ShoppingCartItem instance with updated quantity.
 */
function cartItemWithUpdatedQuantity(cartItem1: ShoppingCartItem, cartItem2: ShoppingCartItem): ShoppingCartItem {
  if (cartItem1.id !== cartItem2.id) {
    throw ShoppingCartItemIdMismatch
  }

  const quantity = cartItem1.quantity + cartItem2.quantity

  return { ...cartItem1, quantity }
}

function includesCartItem(cart: ShoppingCart, cartItem: ShoppingCartItem) {
  return Object.hasOwnProperty.call(cart.cartItems, cartItem.id)
}

function getCartItemWithTemporaryId(cartItem: ShoppingCartItem) {
  const id = generateTemporaryIdForCartItem(cartItem)

  return { ...cartItem, id }
}

// ERROR OBJECTS

// More info: https://medium.com/@xjamundx/custom-javascript-errors-in-es6-aa891b173f87
class ShoppingCartItemIdMismatch extends Error {
  constructor(...args) {
    super(...args)
    Error.captureStackTrace(this, ShoppingCartItemIdMismatch)
  }
}