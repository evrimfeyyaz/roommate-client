// @flow
import React, { Component, Fragment } from 'react'
import { View, StyleSheet, ViewPropTypes, ScrollView } from 'react-native'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import _ from 'lodash'

import { Title, PrimaryButton, Stepper, Heading3, Body, SvgIcon, CircularButton, Card, OptionGroup } from '../.'
import * as icons from '../../../assets/iconData'
import type { ShoppingCartItem, ShoppingItem, ShoppingItemChoice, ShoppingItemChoiceOption } from '../../types/shopping'
import colors from '../../config/colors'
import type { Option } from '../controls/OptionGroup'
import { getCartItemTotal } from '../../utils/shopping/cartHelpers'
import { getImageUrlFromItem } from '../../utils/shopping/itemHelpers'
import {
  choiceLabel,
  isChoiceMultipleSelection,
  optionsArrayFromChoice,
  arrayOfDefaultOptionsFromItem
} from '../../utils/shopping/choiceAndOptionHelpers'
import { getErrorMessages, validateSelectedOptions } from '../../utils/shopping/cartItemValidationHelpers'
import type { ValidationErrorsByChoiceId } from '../../utils/shopping/cartItemValidationHelpers'

type Props = {
  item: ShoppingItem,
  style?: ?ViewPropTypes.style,
  onCloseButtonPress: () => void,
  onAddButtonPress: (ShoppingCartItem) => void
}

type State = {
  cartItem: ShoppingCartItem,
  validationErrors: ValidationErrorsByChoiceId,
  /**
   * X and y coordinates of the top element with a validation error.
   * Used for scrolling to the top element with error for an improved
   * user experience.
   */
  topComponentWithErrorPosition: { x: number, y: number }
}

class ItemDetails extends Component<Props, State> {
  // TODO: This file has gotten too big. Take out stuff that are rendered, such as choices, into files of their own.

  static defaultProps = {
    style: null
  }

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
      topComponentWithErrorPosition: { x: 0, y: -Infinity }
    }
  }

  componentDidUpdate() {
    if (this.choiceContainersWithError.length > 0) {
      const topContainerWithError = this.choiceContainersWithError[0]

      topContainerWithError.measure((x, y) => {
        if (this.mainScrollView != null) {
          this.mainScrollView.scrollTo({ x, y, animated: true })
        }
      })
    }
  }

  onOptionPress = (option: Option<ShoppingItemChoiceOption>) => {
    const { selectedOptions } = this.state.cartItem
    const choice = this.props.item.choices.find(c => c.id === option.value.choiceId)
    const indexOfOptionInSelectedOptions = selectedOptions.findIndex(o => o.id === option.id)

    if (isChoiceMultipleSelection(choice)) {
      if (indexOfOptionInSelectedOptions === -1) { // Not selected.
        this.addOptionToSelectedOptions(option)
      } else {
        this.removeIndexFromSelectedOptions(indexOfOptionInSelectedOptions)
      }
    } else if (indexOfOptionInSelectedOptions === -1) {
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
    // TODO: Probably better as a part of the state.
    this.choiceContainersWithError = []

    this.setState({
      ...this.state,
      validationErrors: validateSelectedOptions(this.state.cartItem),
      topComponentWithErrorPosition: { x: 0, y: -Infinity }
    }, () => {
      if (this.hasValidationErrors()) {
        return
      }

      this.props.onAddButtonPress(this.state.cartItem)
    })
  }

  choiceContainersWithError: View[]
  mainScrollView: ?ScrollView

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

  removeIndexFromSelectedOptions(optionIndex: number) {
    const { selectedOptions } = this.state.cartItem

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
    const choice = this.props.item.choices.find(c => c.id === option.value.choiceId)

    // Remove the selected option for the choice.
    const newSelectedOptions = selectedOptions.filter(selectedOption =>
      !choice.options.some(o => o.id === selectedOption.id))

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

  saveRefToChoiceContainerWithError = (choiceContainer: ?View, choice: ShoppingItemChoice) => {
    if (!this.doesChoiceHaveError(choice)) {
      return
    }

    if (choiceContainer == null) {
      return
    }

    this.choiceContainersWithError.push(choiceContainer)
  }

  doesChoiceHaveError = (choice: ShoppingItemChoice) => _.has(this.state.validationErrors, choice.id)

  hasValidationErrors = () => _.keys(this.state.validationErrors).length > 0

  renderErrorMessage(errorMessage: string, choice: ShoppingItemChoice) {
    const key = `${choice.id}_${errorMessage}`

    return (
      <Body style={styles.validationErrorMessage} key={key}>
        {errorMessage}
      </Body>
    )
  }

  renderValidationErrorMessage(choice: ShoppingItemChoice) {
    if (this.doesChoiceHaveError(choice)) {
      const errorMessages = getErrorMessages(this.state.validationErrors[choice.id], choice)

      return (
        <View style={styles.validationErrorContainer}>
          {errorMessages.map(m => this.renderErrorMessage(m, choice))}
        </View>
      )
    }

    return null
  }

  renderChoice(choice: ShoppingItemChoice) {
    const allowMultipleSelection = isChoiceMultipleSelection(choice)
    const options = optionsArrayFromChoice(choice)

    // We can get away with supplying all selected option IDs
    // for the cart item instead of the ones that are relevant
    // to this specific choice, because the rest of the options
    // are ignored by the `OptionGroup` control.
    const { selectedOptions } = this.state.cartItem

    return (
      <View
        key={choice.id}
        style={styles.choiceContainer}
        ref={choiceContainer => this.saveRefToChoiceContainerWithError(choiceContainer, choice)}
      >
        <Heading3 style={styles.choiceTitle}>{choiceLabel(choice)}</Heading3>
        {this.renderValidationErrorMessage(choice)}
        <OptionGroup
          allowMultipleSelection={allowMultipleSelection}
          options={options}
          selectedOptionIds={selectedOptions.map(o => o.id)}
          onOptionPress={this.onOptionPress}
        />
      </View>
    )
  }

  renderImage() {
    const imageUrl = getImageUrlFromItem(this.props.item)

    if (imageUrl != null) {
      return (
        <Fragment>
          <FastImage
            style={styles.image}
            source={{ uri: imageUrl }}
            resizeMode={FastImage.resizeMode.cover}
          />

          <LinearGradient
            style={styles.gradientOverlay}
            colors={colors.itemDetailImageGradientColors}
            locations={[0, 0.9, 1]}
          />
        </Fragment>
      )
    }

    return (
      <SvgIcon
        iconData={icons.food}
        fill={colors.primaryIcon}
        height={90}
        width={90}
        style={styles.foodIcon}
        opacity={0.3}
      />
    )
  }

  renderChoices() {
    const { item } = this.props

    if (item.choices == null) return null

    this.choiceContainersWithError = []

    return item.choices.map(choice => this.renderChoice(choice))
  }

  render() {
    const {
      style,
      onCloseButtonPress,
      item: { title, price, description }
    } = this.props
    const { cartItem: { quantity } } = this.state

    return (
      <Card style={[styles.container, style]}>
        <ScrollView
          ref={(mainScrollView) => {
            this.mainScrollView = mainScrollView
          }}
        >
          <View style={styles.imageContainer}>
            {this.renderImage()}
          </View>

          <View style={styles.informationContainer}>
            <View style={styles.titleContainer}>
              <Title style={styles.title}>{title}</Title>
              <Title style={styles.price}>{price}</Title>
            </View>
            <Body style={styles.description}>{description}</Body>

            <View style={styles.choicesContainer}>
              {this.renderChoices()}
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

            <PrimaryButton title="Add to Order" onPress={this.onAddButtonPress} style={styles.addButton} />
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
  foodIcon: {
    marginTop: 120
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
    marginTop: 10,
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
  image: {
    ...StyleSheet.absoluteFillObject,
    bottom: 40
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 400
  },
  addButton: {
    alignSelf: 'center'
  },
  quantityContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  choicesContainer: {
    marginTop: 40
  },
  choiceContainer: {
    marginBottom: 20
  },
  choiceTitle: {
    marginBottom: 10
  },
  totalContainer: {
    alignItems: 'center',
    marginBottom: 15
  },
  validationErrorContainer: {
    marginBottom: 15
  },
  validationErrorMessage: {
    color: colors.validationErrorMessage
  }
})

export default ItemDetails