// @flow
import type { ShoppingCart, ShoppingCartItem } from '../../types/shopping'
import { generateTemporaryIdForCartItem } from '../../utils/shoppingHelpers'

const ADD_CART_ITEM = 'roommate/roomServiceCart/ADD_CART_ITEM'
const CLEAR_CART = 'roommate/roomServiceCart/CLEAR_CART'
const ADJUST_CART_ITEM_QUANTITY = 'roommate/roomServiceCart/ADJUST_CART_ITEM_QUANTITY'
const REMOVE_CART_ITEM = 'roommate/roomServiceCart/REMOVE_CART_ITEM'

export type State = ShoppingCart

type AddCartItemToRoomServiceCartAction = { type: typeof ADD_CART_ITEM, cartItem: ShoppingCartItem }
type ClearRoomServiceCartAction = { type: typeof CLEAR_CART }
type AdjustCartItemQuantity = { type: typeof ADJUST_CART_ITEM_QUANTITY, cartItem: ShoppingCartItem, quantity: number }
type RemoveCartItemFromRoomServiceCartAction = { type: typeof REMOVE_CART_ITEM, cartItem: ShoppingCartItem }

export type Action =
  | AddCartItemToRoomServiceCartAction
  | ClearRoomServiceCartAction
  | AdjustCartItemQuantity
  | RemoveCartItemFromRoomServiceCartAction

const initialState: State = {
  cartItems: {},
  specialRequest: null
}

// REDUCERS

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case ADD_CART_ITEM:
      return addCartItem(state, action)
    case CLEAR_CART:
      return initialState
    case ADJUST_CART_ITEM_QUANTITY:
      return adjustQuantity(state, action)
    case REMOVE_CART_ITEM:
      return removeCartItem(state, action)
    default:
      return state
  }
}

function addCartItem(state: State, action: AddCartItemToRoomServiceCartAction) {
  let cartItem = getCartItemWithTemporaryId(action.cartItem)
  const { id } = cartItem

  if (includesCartItem(state, cartItem)) {
    const existingCartItem = state.cartItems[id]
    const newQuantity = cartItem.quantity + existingCartItem.quantity

    cartItem = { ...cartItem, quantity: newQuantity }
  }

  return {
    ...state,
    cartItems: {
      ...state.cartItems,
      [cartItem.id]: cartItem
    }
  }
}

function adjustQuantity(state: State, action: AdjustCartItemQuantity) {
  const { cartItem, quantity } = action

  return {
    ...state,
    cartItems: {
      ...state.cartItems,
      [cartItem.id]: { ...cartItem, quantity }
    }
  }
}

function removeCartItem(state: State, action: RemoveCartItemFromRoomServiceCartAction) {
  const idToRemove = action.cartItem.id

  const cartItems = { ...state.cartItems }
  delete cartItems[idToRemove]

  return { ...state, cartItems }
}

// ACTION CREATORS

export function addCartItemToRoomServiceCart(cartItem: ShoppingCartItem): AddCartItemToRoomServiceCartAction {
  return { type: ADD_CART_ITEM, cartItem }
}

export function clearRoomServiceCart() {
  return { type: CLEAR_CART }
}

export function adjustCartItemQuantity(cartItem: ShoppingCartItem, quantity: number) {
  return { type: ADJUST_CART_ITEM_QUANTITY, cartItem, quantity }
}

export function removeCartItemFromRoomServiceCart(cartItem: ShoppingCartItem): RemoveCartItemFromRoomServiceCartAction {
  return { type: REMOVE_CART_ITEM, cartItem }
}

// UTILITY FUNCTIONS

function includesCartItem(cart: ShoppingCart, cartItem: ShoppingCartItem) {
  return Object.hasOwnProperty.call(cart.cartItems, cartItem.id)
}

/**
 * Returns a copy of the given cart item with a temporary ID.
 */
function getCartItemWithTemporaryId(cartItem: ShoppingCartItem) {
  const id = generateTemporaryIdForCartItem(cartItem)

  return { ...cartItem, id }
}