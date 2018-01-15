// @flow
import type { ShoppingCart, ShoppingCartItem } from '../types/shopping'

export function getCartItemTotal(cartItem: ShoppingCartItem) {
  return cartItem.item.price * cartItem.quantity
}

export function getTotalOfCart(cart: ShoppingCart) {
  const cartItemsArray = getCartItemsArray(cart)

  return cartItemsArray.reduce((sum, cartItem) => sum + getCartItemTotal(cartItem), 0)
}

/**
 * Generates a temporary, client-only ID for a cart item.
 *
 * This ID uses the parameters of the cart item, and allows us to
 * uniquely track it. For example, two of the same items that has
 * different options selected by the guest shouldn't be the same,
 * but two items that have the same options, but different quantities
 * should be the same.
 *
 * This way, if the guest tries to add the same
 * item to the cart, we will only increase the quantity of that
 * cart item, instead of adding a new one of the same.
 *
 * @param cartItem
 */
export function generateTemporaryIdForCartItem(cartItem: ShoppingCartItem) {
  const itemId = cartItem.item.id

  return itemId
}

export function getCartItemsArray(cart: ShoppingCart) {
  return Object.values(cart.cartItems)
}