// @flow
import React, { Component } from 'react'
import { View, StyleSheet, ViewPropTypes } from 'react-native'
import type { LayoutEvent } from 'react-native/Libraries/Types/CoreEventTypes'
import _ from 'lodash'

import { Heading3, OptionGroup, ValidationError } from '../.'
import {
  choiceLabel, isChoiceMultipleSelection,
  optionsArrayFromChoice
} from '../../utils/shopping/choiceAndOptionHelpers'
import type {
  ShoppingItemChoiceOption, ShoppingItem, ShoppingItemChoice
} from '../../types/shopping'
import type { Option } from '../controls/OptionGroup'
import type { ValidationErrorsByObjectId } from '../../types/validation'
import { getErrorMessages } from '../../utils/shopping/cartItemHelpers'

type Props = {
  item: ShoppingItem,
  selectedOptions: ShoppingItemChoiceOption[],
  onOptionPress: (option: Option<ShoppingItemChoiceOption>) => void,
  validationErrors: ValidationErrorsByObjectId,
  /**
   * Fired when a choice element which has a validation error is laid out.
   */
  onValidationErrorElementLayout: (LayoutEvent) => void,
  style?: ViewPropTypes.style
}

class ItemChoices extends Component<Props> {
  onValidationErrorElementLayout(e: LayoutEvent, id: string) {
    if (_.has(this.props.validationErrors, id)) {
      this.props.onValidationErrorElementLayout(e)
    }
  }

  renderChoice(choice: ShoppingItemChoice) {
    const { selectedOptions, onOptionPress, validationErrors } = this.props
    const allowMultipleSelection = isChoiceMultipleSelection(choice)
    const options = optionsArrayFromChoice(choice)
    const errors = validationErrors[choice.id]

    return (
      <View
        key={choice.id}
        style={styles.container}
        onLayout={e => this.onValidationErrorElementLayout(e, choice.id)}
      >
        <Heading3 style={styles.title}>{choiceLabel(choice)}</Heading3>

        <ValidationError
          validationErrors={errors}
          errorObject={choice}
          getErrorMessages={getErrorMessages}
          style={styles.validationErrorsContainer}
        />

        <OptionGroup
          allowMultipleSelection={allowMultipleSelection}
          options={options}
          selectedOptionIds={selectedOptions.map(o => o.id)}
          onOptionPress={onOptionPress}
        />
      </View>
    )
  }

  render() {
    const { item, style } = this.props

    if (item.choices == null) return null

    return (
      <View style={style}>
        {item.choices.map(choice => (this.renderChoice(choice)))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20
  },
  title: {
    marginBottom: 10
  },
  validationErrorsContainer: {
    marginBottom: 15
  }
})

export default ItemChoices