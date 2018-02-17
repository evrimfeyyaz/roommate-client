// @flow
import _ from 'lodash'

import type { ShoppingCartItem, ShoppingItemChoice } from '../../types/shopping'

const LESS_THAN_MINIMUM = 'less-than-minimum'
const MORE_THAN_MAXIMUM = 'more-than-maximum'

export type ValidationErrorsByChoiceId = {
  [choiceId: string]: string[]
}

export function validateSelectedOptions(cartItem: ShoppingCartItem): ValidationErrorsByChoiceId {
  const { item, selectedOptions } = cartItem
  const selectedOptionsByChoiceId = _.groupBy(selectedOptions, o => o.choiceId)

  const errors = {}
  item.choices.forEach((choice) => {
    if (!_.has(selectedOptionsByChoiceId, choice.id)) {
      selectedOptionsByChoiceId[choice.id] = []
    }

    const { minimumNumberOfSelections: minimum, maximumNumberOfSelections: maximum } = choice

    errors[choice.id] = []
    const numOfSelections = selectedOptionsByChoiceId[choice.id].length

    if (minimum != null && numOfSelections < minimum) {
      errors[choice.id].push(LESS_THAN_MINIMUM)
    }

    if (maximum != null && numOfSelections > maximum) {
      errors[choice.id].push(MORE_THAN_MAXIMUM)
    }
  })

  return _.pickBy(errors, choiceErrors => choiceErrors.length > 0)
}

export function getErrorMessages(errors: string[], choice: ShoppingItemChoice): string[] {
  return errors.map((error) => {
    switch (error) {
      case LESS_THAN_MINIMUM:
        return `Please choose at least ${choice.minimumNumberOfSelections}.`
      case MORE_THAN_MAXIMUM:
        return `Please choose at most ${choice.maximumNumberOfSelections}.`
      default:
        return null
    }
  }).filter(Boolean) // Removes `null` values.
}