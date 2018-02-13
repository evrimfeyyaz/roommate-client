// @flow
import React, { Component, Fragment } from 'react'
import { View, StyleSheet, ViewPropTypes, ScrollView } from 'react-native'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'

import { Title, PrimaryButton, Stepper, Heading3, Body, SvgIcon, CircularButton, Card, OptionGroup } from '../.'
import * as icons from '../../../assets/iconData'
import type { ShoppingCartItem, ShoppingItem, ShoppingItemChoice } from '../../types/shopping'
import colors from '../../config/colors'
import {
  arrayOfDefaultOptionIdsFromItem, choiceLabel,
  getImageUrlFromItem, isChoiceMultipleSelection,
  optionsArrayFromChoice
} from '../../utils/shoppingHelpers'
import type { Option } from '../controls/OptionGroup'

type Props = {
  item: ShoppingItem,
  style?: ?ViewPropTypes.style,
  onCloseButtonPress: () => void,
  onAddButtonPress: (ShoppingCartItem) => void
}

type State = {
  cartItem: ShoppingCartItem
}

class ItemDetails extends Component<Props, State> {
  static defaultProps = {
    style: null
  }

  constructor(props: Props) {
    super(props)

    const selectedOptionIds = arrayOfDefaultOptionIdsFromItem(this.props.item)

    this.state = {
      cartItem: {
        item: this.props.item,
        quantity: 1,
        selectedOptionIds
      }
    }
  }

  onOptionPress = (option: Option) => {
    const { selectedOptionIds } = this.state.cartItem
    const choice = this.props.item.choices.find(c => c.id === option.choiceId)
    const indexOfOptionInSelectedOptions = selectedOptionIds.indexOf(option.id)

    if (isChoiceMultipleSelection(choice)) {
      if (indexOfOptionInSelectedOptions === -1) { // Not selected.
        return this.addOptionToSelectedOptions(option)
      }

      return this.removeIndexFromSelectedOptions(indexOfOptionInSelectedOptions)
    }

    if (indexOfOptionInSelectedOptions === -1) {
      return this.changeSelectedOption(option)
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
    this.props.onAddButtonPress(this.state.cartItem)
  }

  addOptionToSelectedOptions(option: Option) {
    const { selectedOptionIds } = this.state.cartItem

    this.setState({
      ...this.state,
      cartItem: {
        ...this.state.cartItem,
        selectedOptionIds: [...selectedOptionIds, option.id]
      }
    })
  }

  removeIndexFromSelectedOptions(optionIndex) {
    const { selectedOptionIds } = this.state.cartItem

    this.setState({
      ...this.state,
      cartItem: {
        ...this.state.cartItem,
        selectedOptionIds: [
          ...selectedOptionIds.slice(0, optionIndex),
          ...selectedOptionIds.slice(optionIndex + 1)
        ]
      }
    })
  }

  changeSelectedOption(option: Option) {
    const { selectedOptionIds } = this.state.cartItem
    const { options: allOptionsForChoice } = this.props.item.choices.find(choice => choice.id === option.choiceId)
    const optionIdsForChoice = allOptionsForChoice.map(o => o.id)

    // Remove the selected option for the choice.
    const newSelectedOptionIds = selectedOptionIds.filter(selectedOptionId =>
      !optionIdsForChoice.includes(selectedOptionId))

    // Push the new selection.
    newSelectedOptionIds.push(option.id)

    this.setState({
      ...this.state,
      cartItem: {
        ...this.state.cartItem,
        selectedOptionIds: newSelectedOptionIds
      }
    })
  }

  renderChoice(choice: ShoppingItemChoice) {
    const allowMultipleSelection = isChoiceMultipleSelection(choice)
    const options = optionsArrayFromChoice(choice)

    // We can get away with supplying all selected option IDs
    // for the cart item instead of the ones that are relevant
    // to this specific choice, because the rest of the options
    // are ignored by the `OptionGroup` control.
    const { selectedOptionIds } = this.state.cartItem

    return (
      <View key={choice.id} style={styles.choiceContainer}>
        <Heading3 style={styles.choiceTitle}>{choiceLabel(choice)}</Heading3>
        <OptionGroup
          allowMultipleSelection={allowMultipleSelection}
          options={options}
          selectedOptionIds={selectedOptionIds}
          onOptionPress={this.onOptionPress}
          style={styles.optionGroup}
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
        <ScrollView centerContent>
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
              <Heading3 style={styles.quantityHeading}>Quantity</Heading3>
              <Stepper
                value={quantity}
                minValue={1}
                onButtonPress={this.onQuantityStepperPress}
                style={styles.quantityStepper}
              />
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
  quantityHeading: {
    marginTop: 70
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
    alignItems: 'center'
  },
  choicesContainer: {
    marginTop: 40
  },
  choiceContainer: {
    marginBottom: 20
  },
  choiceTitle: {
    marginBottom: 10
  }
})

export default ItemDetails