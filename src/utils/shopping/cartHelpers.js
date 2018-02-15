// @flow
import type { ShoppingCart, ShoppingCartItem } from '../../types/shopping'

export function getCartItemTotal(cartItem: ShoppingCartItem) {
  // TODO: We need to use some kind of a decimal implementation for the price.
  const optionsTotal = cartItem.selectedOptions.reduce((total, option) => {
    if (option.price == null) {
      return total
    }

    return total + +option.price
  }, 0)

  return (+cartItem.item.price + optionsTotal) * cartItem.quantity
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
    quantity: cartItem.quantity,
    selectedOptionIds: cartItem.selectedOptions.map(o => o.id)
  }))

  return {
    cartItems: cartItemArguments,
    specialRequest: cart.specialRequest,
    paymentOption: cart.paymentOption
  }
}
