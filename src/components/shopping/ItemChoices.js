// @flow
import React, { Component } from 'react'
import { View, StyleSheet, ViewPropTypes } from 'react-native'
import type { Layout, LayoutEvent } from 'react-native/Libraries/Types/CoreEventTypes'
import _ from 'lodash'

import { Body, Heading3, OptionGroup } from '../.'
import {
  choiceLabel, isChoiceMultipleSelection,
  optionsArrayFromChoice
} from '../../utils/shopping/choiceAndOptionHelpers'
import type {
  ShoppingItemChoiceOption, ShoppingItem, ShoppingItemChoice
} from '../../types/shopping'
import { getErrorMessages } from '../../utils/shopping/cartItemValidationHelpers'
import colors from '../../config/colors'
import type { Option } from '../controls/OptionGroup'
import type { ValidationErrorsByObjectId } from '../../types/validation'

type Props = {
  item: ShoppingItem,
  selectedOptions: ShoppingItemChoiceOption[],
  onOptionPress: (option: Option<ShoppingItemChoiceOption>) => void,
  validationErrors: ValidationErrorsByObjectId,
  onValidationErrorElementLayout: (LayoutEvent) => void,
  style?: ViewPropTypes.style
}

class ItemChoices extends Component<Props> {
  static renderErrorMessage(errorMessage: string, choice: ShoppingItemChoice) {
    const key = `${choice.id}_${errorMessage}`

    return (
      <Body style={styles.validationErrorMessage} key={key}>
        {errorMessage}
      </Body>
    )
  }

  onValidationErrorElementLayout(e: LayoutEvent, id: string) {
    if (_.has(this.props.validationErrors, id)) {
      this.props.onValidationErrorElementLayout(e)
    }
  }

  renderValidationErrorMessage(choice: ShoppingItemChoice) {
    const { validationErrors } = this.props

    if (validationErrors[choice.id] == null) {
      return null
    }

    const errorMessages = getErrorMessages(validationErrors[choice.id], choice)

    return (
      <View style={styles.validationErrorContainer}>
        {errorMessages.map(m => ItemChoices.renderErrorMessage(m, choice))}
      </View>
    )
  }

  renderChoice(choice: ShoppingItemChoice) {
    const { selectedOptions, onOptionPress } = this.props
    const allowMultipleSelection = isChoiceMultipleSelection(choice)
    const options = optionsArrayFromChoice(choice)

    return (
      <View
        key={choice.id}
        style={styles.container}
        onLayout={e => this.onValidationErrorElementLayout(e, choice.id)}
      >
        <Heading3 style={styles.title}>{choiceLabel(choice)}</Heading3>
        {this.renderValidationErrorMessage(choice)}
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
  validationErrorContainer: {
    marginBottom: 15
  },
  validationErrorMessage: {
    color: colors.validationErrorMessage
  }
})

export default ItemChoices