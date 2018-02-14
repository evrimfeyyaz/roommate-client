// @flow
import type { ShoppingCart, ShoppingCartItem, ShoppingItem, ShoppingItemChoice } from '../types/shopping'
import type { Option } from '../components/controls/OptionGroup'

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

export function isChoiceMultipleSelection(choice: ShoppingItemChoice) {
  return choice.maximumNumberOfSelections !== 1
}

export function isChoiceOptional(choice: ShoppingItemChoice) {
  return choice.minimumNumberOfSelections == null
}

/**
 * Returns a string like "Sauce (choose three to five)" that explains the choice
 * and how many selections the user can make, and whether or not the choice is optional.
 *
 * @param choice
 */
export function choiceLabel(choice: ShoppingItemChoice) {
  const { minimumNumberOfSelections: minimum, maximumNumberOfSelections: maximum } = choice

  if (minimum == null && maximum != null) { // No minimum, maximum
    return `${choice.title} (choose up to ${maximum}, optional)`
  }

  if (minimum == null && maximum == null) { // No minimum, no maximum
    return `${choice.title} (optional)`
  }

  if (minimum != null && maximum == null) { // Minimum, no maximum
    return `${choice.title} (hoose at least ${minimum})`
  }

  if (minimum !== maximum) { // Minimum, maximum, minimum = maximum
    return `${choice.title} (choose ${minimum} to ${maximum})`
  }

  return `${choice.title} (choose ${minimum})` // Minimum, maximum, minimum != maximum
}

/**
 * Returns an array of `Option`s from a `ShoppingItemChoice` that is suitable
 * for use in `OptionGroup`s.
 *
 * @param choice
 * @returns {{id: string, label: string}[]}
 */
export function optionsArrayFromChoice(choice: ShoppingItemChoice): Option[] {
  return choice.options.map((option) => {
    let label = option.title

    if (option.price != null) {
      label += ` (+${option.price})`
    }

    return {
      id: option.id,
      choiceId: choice.id,
      label
    }
  })
}

export function arrayOfDefaultOptionIdsFromItem(item: ShoppingItem) {
  return item.choices.reduce((arrayOfIds, choice) => {
    if (choice.defaultOptionId != null) {
      arrayOfIds.push(choice.defaultOptionId)
    }

    return arrayOfIds
  }, [])
}