// @flow
import type { ShoppingCart, ShoppingCartItem } from '../../types/shopping'
import type { ValidationErrorsByObjectId } from '../../types/validation'
import { getCartItemsArray } from './cartHelpers'
import { availabilityTimesMessage, isCurrentlyAvailable } from '../timeUtils'

const UNAVAILABLE_AT_THE_MOMENT = 'UNAVAILABLE_AT_THE_MOMENT'

export function validateItemsAvailability(cart: ShoppingCart): ValidationErrorsByObjectId {
  const cartItems = getCartItemsArray(cart)

  const errors = {}
  cartItems.forEach((cartItem) => {
    if (isCurrentlyAvailable(cartItem)) {
      return
    }

    errors[cartItem.id] = [UNAVAILABLE_AT_THE_MOMENT]
  })

  return errors
}

export function getErrorMessages(errors: string[], cartItem: ShoppingCartItem): string[] {
  return errors.map((error) => {
    switch (error) {
      case UNAVAILABLE_AT_THE_MOMENT:
        return availabilityTimesMessage(cartItem, 'This is only')
      default:
        return null
    }
  }).filter(Boolean) // Removes `null` values.
}