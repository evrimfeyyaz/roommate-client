// @flow
import type { ShoppingCart, ShoppingCartItem, ShoppingItem } from '../types/shopping'

export function getCartItemTotal(cartItem: ShoppingCartItem) {
  return cartItem.item.price * cartItem.quantity
}

export function getCartTotal(cart: ShoppingCart) {
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
  // TODO: Change this to include choices and options when they are added.
  const itemId = cartItem.item.id

  return itemId
}

export function getCartItemsArray(cart: ShoppingCart) {
  return Object.values(cart.cartItems)
}

export function isCartEmpty(cart: ShoppingCart) {
  const cartItemsCount = Object.keys(cart.cartItems).length

  return cartItemsCount === 0
}

/**
 * Converts a cart object to a format that can be used as a variable
 * in the GraphQL mutation that creates an order.
 *
 * @param cart
 * @returns {{cartItems: *, specialRequest, paymentOption}}
 */
export function cartToOrderArgument(cart: ShoppingCart) {
  const cartItemArguments = getCartItemsArray(cart).map(cartItem => ({
    itemId: cartItem.item.id,
    quantity: cartItem.quantity
  }))

  return {
    cartItems: cartItemArguments,
    specialRequest: cart.specialRequest,
    paymentOption: cart.paymentOption
  }
}

/**
 * Returns the thumbnail URL of a given item. Automatically picks the
 * right scale (1x, 2x, etc.) depending on the device pixel density.
 *
 * @param item
 */
export function getThumbnailUrlFromItem(item: ShoppingItem) {
  // TODO: This should depend on the device's pixel density.
  return item.thumbnail2x
}

/**
 * Returns the image URL of a given item. Automatically picks the
 * right scale (1x, 2x, etc.) depending on the device pixel density.
 *
 * @param item
 */
export function getImageUrlFromItem(item: ShoppingItem) {
  // TODO: This should depend on the device's pixel density.
  return item.image2x
}