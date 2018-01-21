// @flow
import React, { Component } from 'react'
import { View, ViewPropTypes, StyleSheet } from 'react-native'

import {
  Card,
  Heading,
  Heading2,
  CircularButton,
  Stepper,
  PrimaryButton,
  SecondaryButton
} from '../.'
import * as iconData from '../../../assets/iconData'
import type { ShoppingCart, ShoppingCartItem } from '../../types/shopping'
import colors from '../../config/colors'
import { getCartItemsArray, getCartItemTotal, getCartTotal, isCartEmpty } from '../../utils/shoppingHelpers'

type Props = {
  cart: ShoppingCart,
  /**
   * Fired when the user presses the "Clear All" button.
   */
  onClearButtonPress: () => void,
  /**
   * Fired when the user presses the "Review Order" button.
   */
  onReviewButtonPress: () => void,
  /**
   * Fired when the user presses either the increment or the decrement
   * button for a cart item.
   *
   * Takes three arguments:
   * - cartItem: Referenced ShoppingCartItem.
   * - newValue: New selectedOptionValue that the stepper should have after button press.
   */
  onQuantityStepperPress: (cartItem: ShoppingCartItem, newValue: number) => void,
  /**
   * Fired when the user presses the remove button for a specific cart item.
   */
  onRemoveButtonPress: (cartItem: ShoppingCartItem) => void,
  style?: ?ViewPropTypes.style
}

class Cart extends Component<Props> {
  renderCartItem(cartItem: ShoppingCartItem) {
    const { id, quantity, item: { title } } = cartItem
    const { onQuantityStepperPress, onRemoveButtonPress } = this.props
    const total = getCartItemTotal(cartItem)

    return (
      <View style={styles.itemContainer} key={id}>
        <View style={styles.itemTopRowContainer}>
          <Heading2 style={styles.itemTitle}>{title}</Heading2>
          <Heading2 style={styles.itemPrice}>{total}</Heading2>
        </View>
        <View style={styles.itemBottomRowContainer}>
          <Stepper
            value={quantity}
            minValue={1}
            onButtonPress={(_, newValue) => onQuantityStepperPress(cartItem, newValue)}
            small
          />

          <CircularButton
            iconData={iconData.cross}
            onPress={() => onRemoveButtonPress(cartItem)}
            small
          />
        </View>

        <View style={styles.itemSeparator} />
      </View>
    )
  }

  renderCartItems() {
    const cartItemsArray = getCartItemsArray(this.props.cart)

    return cartItemsArray.map(cartItem => this.renderCartItem(cartItem))
  }

  render() {
    const { onClearButtonPress, onReviewButtonPress, cart, style } = this.props
    const cartTotal = getCartTotal(cart)

    if (isCartEmpty(cart)) {
      return null
    }

    return (
      <Card style={[styles.container, style]}>
        <View style={styles.headingContainer}>
          <Heading style={styles.heading}>Order</Heading>
          <SecondaryButton title="Clear All" onPress={onClearButtonPress} />
        </View>

        {this.renderCartItems()}

        <View style={styles.totalContainer}>
          <Heading style={styles.heading}>Total</Heading>
          <Heading style={styles.heading}>{cartTotal}</Heading>
        </View>

        <PrimaryButton title="Review Order" onPress={onReviewButtonPress} />
      </Card>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 15,
    width: '25%'
  },
  heading: {
    fontSize: 18,
    lineHeight: 24,
    marginEnd: 10
  },
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18
  },
  itemContainer: {
    marginBottom: 13
  },
  itemTopRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemBottomRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8
  },
  itemTitle: {
    fontSize: 14,
    lineHeight: 19,
    marginEnd: 15,
    flexShrink: 1
  },
  itemPrice: {
    fontSize: 14,
    lineHeight: 19
  },
  itemQuantity: {
    fontSize: 11,
    lineHeight: 15
  },
  itemSeparator: {
    borderBottomColor: colors.cartItemSeparator,
    borderBottomWidth: 1,
    marginHorizontal: -5
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 20
  }
})

export default Cart