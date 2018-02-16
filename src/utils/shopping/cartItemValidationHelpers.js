// @flow
import _ from 'lodash'

import type { ShoppingCartItem, ShoppingItemChoice } from '../../types/shopping'

const LESS_THAN_MINIMUM = 'less-than-minimum'
const MORE_THAN_MAXIMUM = 'more-than-maximum'

export type ValidationErrorsByChoiceId = {
  [choiceId: string]: (LESS_THAN_MINIMUM | MORE_THAN_MAXIMUM)[]
}

export function validateSelectedOptions(cartItem: ShoppingCartItem): ValidationErrorsByChoiceId {
  const { item, selectedOptions } = cartItem
  const selectedOptionsByChoiceId = _.groupBy(selectedOptions, o => o.choiceId)

  const errors = {}
  item.choices.forEach((choice) => {
    if (!_.has(selectedOptionsByChoiceId, choice.id)) {
      selectedOptionsByChoiceId[choice.id] = []
    }

    errors[choice.id] = []
    const numOfSelections = selectedOptionsByChoiceId[choice.id].length

    if (numOfSelections < choice.minimumNumberOfSelections) {
      errors[choice.id].push(LESS_THAN_MINIMUM)
    }

    if (numOfSelections > choice.maximumNumberOfSelections) {
      errors[choice.id].push(MORE_THAN_MAXIMUM)
    }
  })

  return _.pickBy(errors, choiceErrors => choiceErrors.length > 0)
}

export function getErrorMessages(errors: string[], choice: ShoppingItemChoice): ?string {
  return errors.map((error) => {
    switch (error) {
      case LESS_THAN_MINIMUM:
        return `Please choose at least ${choice.minimumNumberOfSelections}.`
      case MORE_THAN_MAXIMUM:
        return `Please choose at most ${choice.maximumNumberOfSelections}.`
      default:
        return null
    }
  })
}