// @flow
import type { ShoppingItem, ShoppingItemChoice } from '../../types/shopping'
import type { Option } from '../../components/controls/OptionGroup'

export function isChoiceMultipleSelection(choice: ShoppingItemChoice) {
  return choice.maximumNumberOfSelections !== 1
}

export function isChoiceOptional(choice: ShoppingItemChoice) {
  return (choice.minimumNumberOfSelections == null && isChoiceMultipleSelection(choice))
}

/**
 * Returns a string like "Sauce (choose three to five)" that explains the choice
 * and how many selections the user can make, and whether or not the choice is optional.
 *
 * @param choice
 */
export function choiceLabel(choice: ShoppingItemChoice) {
  const { minimumNumberOfSelections: minimum, maximumNumberOfSelections: maximum } = choice

  if (minimum == null && maximum != null && isChoiceMultipleSelection(choice)) { // No minimum, maximum, multiple choice
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
 * @returns {Option[]}
 */
export function optionsArrayFromChoice(choice: ShoppingItemChoice): Option[] {
  return choice.options.map((option) => {
    let label = option.title

    if (option.price != null) {
      label += ` (+${option.price})`
    }

    return {
      id: option.id,
      label,
      choiceId: choice.id,
      value: option
    }
  })
}

export function findOptionById(id: string, choice: ShoppingItemChoice) {
  return choice.options.find(option => option.id === id)
}

export function arrayOfDefaultOptionsFromItem(item: ShoppingItem) {
  if (item.choices == null) {
    return []
  }

  return item.choices.reduce((arrayOfOptions, choice) => {
    if (choice.defaultOptionId != null) {
      const defaultOption = findOptionById(choice.defaultOptionId, choice)

      arrayOfOptions.push(defaultOption)
    }

    return arrayOfOptions
  }, [])
}