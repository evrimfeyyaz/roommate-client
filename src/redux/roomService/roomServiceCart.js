// @flow
import type { ShoppingCart, ShoppingCartItem } from '../../types/shopping'
import { generateTemporaryIdForCartItem } from '../../utils/shoppingHelpers'

const ADD_CART_ITEM = 'roommate/roomServiceCart/ADD_CART_ITEM'
const REMOVE_CART_ITEM = 'roommate/roomServiceCart/REMOVE_CART_ITEM'
const CLEAR_CART = 'roommate/roomServiceCart/CLEAR_CART'
const ADJUST_CART_ITEM_QUANTITY = 'roommate/roomServiceCart/ADJUST_CART_ITEM_QUANTITY'

export type State = ShoppingCart

type AddCartItemAction = { type: typeof ADD_CART_ITEM, cartItem: ShoppingCartItem }
type RemoveCartItemAction = { type: typeof REMOVE_CART_ITEM, cartItem: ShoppingCartItem }
type ClearCartAction = { type: typeof CLEAR_CART }
type AdjustCartItemQuantity = { type: typeof ADJUST_CART_ITEM_QUANTITY, cartItem: ShoppingCartItem, quantity: number }

export type Action =
  | AddCartItemAction
  | RemoveCartItemAction
  | ClearCartAction
  | AdjustCartItemQuantity

const initialState: State = {
  cartItems: {},
  specialRequest: null
}

// REDUCERS

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case ADD_CART_ITEM:
      return addCartItemReducer(state, action)
    case CLEAR_CART:
      return initialState
    case ADJUST_CART_ITEM_QUANTITY:
      return adjustQuantityReducer(state, action)
    case REMOVE_CART_ITEM:
      return removeCartItemReducer(state, action)
    default:
      return state
  }
}

function addCartItemReducer(state: State, action: AddCartItemAction) {
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

function adjustQuantityReducer(state: State, action: AdjustCartItemQuantity) {
  const { cartItem, quantity } = action

  return {
    ...state,
    cartItems: {
      ...state.cartItems,
      [cartItem.id]: { ...cartItem, quantity }
    }
  }
}

function removeCartItemReducer(state: State, action: RemoveCartItemAction) {
  const idToRemove = action.cartItem.id

  const cartItems = { ...state.cartItems }
  delete cartItems[idToRemove]

  return { ...state, cartItems }
}

// ACTION CREATORS

export function addCartItem(cartItem: ShoppingCartItem): AddCartItemAction {
  return { type: ADD_CART_ITEM, cartItem }
}

export function clearCart() {
  return { type: CLEAR_CART }
}

export function adjustCartItemQuantity(cartItem: ShoppingCartItem, quantity: number) {
  return { type: ADJUST_CART_ITEM_QUANTITY, cartItem, quantity }
}

export function removeCartItem(cartItem: ShoppingCartItem): RemoveCartItemAction {
  return { type: REMOVE_CART_ITEM, cartItem }
}

// UTILITY FUNCTIONS

function includesCartItem(cart: ShoppingCart, cartItem: ShoppingCartItem) {
  return Object.hasOwnProperty.call(cart.cartItems, cartItem.id)
}

/**
 * Returns a copy of a given cart item with a temporary ID.
 */
function getCartItemWithTemporaryId(cartItem: ShoppingCartItem) {
  const id = generateTemporaryIdForCartItem(cartItem)

  return { ...cartItem, id }
}