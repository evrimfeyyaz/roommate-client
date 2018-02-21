// @flow
import React, { Component } from 'react'
import { View, StyleSheet, ViewPropTypes, ScrollView } from 'react-native'
import _ from 'lodash'
import type { LayoutEvent } from 'react-native/Libraries/Types/CoreEventTypes'

import {
  Title,
  PrimaryButton,
  Stepper,
  Heading3,
  Body,
  CircularButton,
  Card,
  ItemChoices,
  ItemTags,
  ItemImage
} from '../.'
import * as icons from '../../../assets/iconData'
import type {
  ShoppingCartItem,
  ShoppingCategory,
  ShoppingItem,
  ShoppingItemChoiceOption
} from '../../types/shopping'
import colors from '../../config/colors'
import type { Option } from '../controls/OptionGroup'
import { getCartItemTotal } from '../../utils/shopping/cartHelpers'
import {
  isChoiceMultipleSelection,
  arrayOfDefaultOptionsFromItem
} from '../../utils/shopping/choiceAndOptionHelpers'
import { validateSelectedOptions } from '../../utils/shopping/cartItemValidationHelpers'
import { availabilityTimesMessage, isCurrentlyAvailable } from '../../utils/shopping/categoryHelpers'
import { titleCase } from '../../utils/stringUtils'
import type { ValidationErrorsByObjectId } from '../../types/validation'

type Props = {
  item: ShoppingItem,
  category: ShoppingCategory,
  style?: ViewPropTypes.style,
  onCloseButtonPress: () => void,
  onAddButtonPress: (ShoppingCartItem) => void
}

type State = {
  cartItem: ShoppingCartItem,
  validationErrors: ValidationErrorsByObjectId,
  /**
   * After validation is done, we scroll to the validation
   * error to alert the user. This keeps track of whether
   * or not we have done it after validation, otherwise the
   * screen would scroll multiple times to different errors.
   */
  hasScrolledToValidationError: boolean
}

class ItemDetails extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    const selectedOptions = arrayOfDefaultOptionsFromItem(this.props.item)

    this.state = {
      cartItem: {
        item: this.props.item,
        quantity: 1,
        selectedOptions
      },
      validationErrors: {},
      hasScrolledToValidationError: true
    }
  }

  onOptionPress = (option: Option<ShoppingItemChoiceOption>) => {
    const choice = this.props.item.choices.find(c => c.id === option.value.choiceId)

    if (isChoiceMultipleSelection(choice)) {
      if (this.isOptionSelected(option)) {
        this.removeOptionFromSelectedOptions(option)
      } else {
        this.addOptionToSelectedOptions(option)
      }
    } else if (!this.isOptionSelected(option)) {
      this.changeSelectedOption(option)
    }
  }

  onQuantityStepperPress = (_: number, quantity: number) => {
    this.setState({
      ...this.state,
      cartItem: {
        ...this.state.cartItem,
        quantity
      }
    })
  }

  onAddButtonPress = () => {
    this.setState({
      ...this.state,
      validationErrors: validateSelectedOptions(this.state.cartItem),
      hasScrolledToValidationError: false
    }, () => {
      if (this.hasValidationErrors()) {
        return
      }

      this.props.onAddButtonPress(this.state.cartItem)
    })
  }

  indexOfOptionInSelectedOptions(option: ShoppingItemChoiceOption) {
    const { selectedOptions } = this.state.cartItem

    return selectedOptions.findIndex(o => o.id === option.id)
  }

  isOptionSelected(option: ShoppingItemChoiceOption) {
    return this.indexOfOptionInSelectedOptions(option) !== -1
  }

  mainScrollView: ?ScrollView
  choicesView: ?View

  addOptionToSelectedOptions(option: Option<ShoppingItemChoiceOption>) {
    const { selectedOptions } = this.state.cartItem

    this.setState({
      ...this.state,
      cartItem: {
        ...this.state.cartItem,
        selectedOptions: [...selectedOptions, option.value]
      }
    })
  }

  removeOptionFromSelectedOptions(option: ShoppingItemChoiceOption) {
    const { selectedOptions } = this.state.cartItem
    const optionIndex = this.indexOfOptionInSelectedOptions(option)

    this.setState({
      ...this.state,
      cartItem: {
        ...this.state.cartItem,
        selectedOptions: [
          ...selectedOptions.slice(0, optionIndex),
          ...selectedOptions.slice(optionIndex + 1)
        ]
      }
    })
  }

  changeSelectedOption(option: Option<ShoppingItemChoiceOption>) {
    const { selectedOptions } = this.state.cartItem

    // Remove the selected option for the choice.
    const newSelectedOptions = selectedOptions.filter(
      selectedOption => selectedOption.choiceId !== option.value.choiceId)

    // Push the new selection.
    newSelectedOptions.push(option.value)

    this.setState({
      ...this.state,
      cartItem: {
        ...this.state.cartItem,
        selectedOptions: newSelectedOptions
      }
    })
  }

  hasValidationErrors = () => _.keys(this.state.validationErrors).length > 0

  scrollToValidationError = (e: LayoutEvent) => {
    if (this.state.hasScrolledToValidationError) {
      return
    }

    const { y } = e.nativeEvent.layout

    this.setState({
      ...this.state,
      hasScrolledToValidationError: true
    }, () => {
      if (this.mainScrollView == null || this.choicesView == null) {
        return
      }

      this.choicesView.measure((_, choicesViewY) => {
        if (this.mainScrollView == null || this.choicesView == null) {
          return
        }

        this.mainScrollView.scrollTo({ x: 0, y: choicesViewY + y, animated: true })
      })
    })
  }

  saveScrollViewRef = (scrollView: ScrollView) => {
    this.mainScrollView = scrollView
  }

  /**
   * We save the reference to the choices view so that we can
   * calculate the position of an element that has a validation
   * error.
   *
   * @param choicesView
   */
  saveChoicesViewRef = (choicesView: ItemChoices) => {
    this.choicesView = choicesView
  }

  renderAddButton() {
    const { category } = this.props

    if (isCurrentlyAvailable(category)) {
      return <PrimaryButton title="Add to Order" onPress={this.onAddButtonPress} style={styles.addButton} />
    }

    const availabilityMessage = titleCase(availabilityTimesMessage(category))

    return <PrimaryButton title={availabilityMessage} style={styles.addButton} disabled />
  }

  render() {
    const {
      style,
      onCloseButtonPress,
      item,
      item: { title, price, description }
    } = this.props
    const { cartItem: { quantity, selectedOptions }, validationErrors } = this.state

    return (
      <Card style={[styles.container, style]}>
        <ScrollView
          ref={this.saveScrollViewRef}
        >
          <ItemImage item={item} style={styles.imageContainer} />

          <View style={styles.informationContainer}>
            <View style={styles.titleContainer}>
              <Title style={styles.title}>{title}</Title>
              <Title style={styles.price}>{price}</Title>
            </View>
            <ItemTags item={item} />
            <Body style={styles.description}>{description}</Body>

            <View ref={this.saveChoicesViewRef}>
              <ItemChoices
                item={item}
                selectedOptions={selectedOptions}
                validationErrors={validationErrors}
                onOptionPress={this.onOptionPress}
                onValidationErrorElementLayout={this.scrollToValidationError}
                style={styles.choices}
              />
            </View>

            <View style={styles.quantityContainer}>
              <Heading3>Quantity</Heading3>
              <Stepper
                value={quantity}
                minValue={1}
                onButtonPress={this.onQuantityStepperPress}
                style={styles.quantityStepper}
              />
            </View>

            <View style={styles.totalContainer}>
              <Heading3>Total: {getCartItemTotal(this.state.cartItem)}</Heading3>
            </View>

            {this.renderAddButton()}
          </View>
        </ScrollView>

        <CircularButton
          iconData={icons.cross}
          onPress={onCloseButtonPress}
          style={styles.closeButton}
        />
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden'
  },
  closeButton: {
    position: 'absolute',
    right: 30,
    top: 30,
    borderColor: colors.circularButtonBorderSolid
  },
  informationContainer: {
    paddingHorizontal: 38,
    paddingVertical: 30
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 260
  },
  title: {
    fontSize: 32,
    lineHeight: 43
  },
  price: {
    fontSize: 28,
    lineHeight: 38
  },
  description: {
    width: '100%',
    marginTop: 15,
    opacity: 0.7
  },
  quantityStepper: {
    marginTop: 7,
    marginBottom: 30
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 500,
    alignItems: 'center'
  },
  addButton: {
    alignSelf: 'center'
  },
  quantityContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  choices: {
    marginTop: 40
  },
  totalContainer: {
    alignItems: 'center',
    marginBottom: 15
  }
})

export default ItemDetails