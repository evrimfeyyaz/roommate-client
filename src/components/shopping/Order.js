// @flow
import React, { Component } from 'react'
import { View, ScrollView, StyleSheet, Text, KeyboardAvoidingView, ViewPropTypes } from 'react-native'
import type { LayoutEvent } from 'react-native/Libraries/Types/CoreEventTypes'
import _ from 'lodash'

import { Heading, Body, TextField, Heading3, OptionGroup, PrimaryButton, ValidationError } from '../.'
import type { ShoppingCart, ShoppingCartItem } from '../../types/shopping'
import colors from '../../config/colors'
import type { Option } from '../controls/OptionGroup'
import { getCartItemsArray, getCartItemTotal, getCartTotal } from '../../utils/shopping/cartHelpers'
import { selectedOptionNamesString } from '../../utils/shopping/choiceAndOptionHelpers'
import { validateItemsAvailability, getErrorMessages } from '../../utils/shopping/cartValidationHelpers'
import type { ValidatingContainerState } from '../../types/validation'
import { hasValidationErrors } from '../../utils/validationHelpers'

type Props = {
  cart: ShoppingCart,
  onChangeSpecialRequest: (value: string) => void,
  onPaymentOptionPress: (option: Option<string>) => void,
  paymentOptions: Option<string>[],
  selectedPaymentOptionValue: string,
  onPlaceOrderButtonPress: () => void,
  style?: ?ViewPropTypes.style
}

type State = ValidatingContainerState

class Order extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      validationErrors: {},
      hasScrolledToValidationError: true
    }
  }

  onPlaceOrderButtonPress = () => {
    this.setState({
      ...this.state,
      validationErrors: validateItemsAvailability(this.props.cart),
      hasScrolledToValidationError: false
    }, () => {
      if (hasValidationErrors(this.state.validationErrors)) {
        return
      }

      this.props.onPlaceOrderButtonPress()
    })
  }

  scrollToValidationError = (e: LayoutEvent, cartItem: ShoppingCartItem) => {
    if (this.state.hasScrolledToValidationError) {
      return
    }

    if (!_.has(this.state.validationErrors, cartItem.id)) {
      return
    }

    const { y } = e.nativeEvent.layout

    this.setState({
      ...this.state,
      hasScrolledToValidationError: true
    }, () => {
      if (this.cartItemsContainer == null) {
        return
      }

      this.cartItemsContainer.measure((_, cartItemsY) => {
        if (this.scrollView == null) {
          return
        }

        this.scrollView.scrollTo({ x: 0, y: cartItemsY + y, animated: true })
      })
    })
  }

  scrollView: ?ScrollView
  cartItemsContainer: ?View

  saveScrollViewRef = (scrollView: ScrollView) => {
    this.scrollView = scrollView
  }

  saveCartItemsContainerRef = (cartItemsContainer: ?View) => {
    this.cartItemsContainer = cartItemsContainer
  }

  renderCartItem(cartItem: ShoppingCartItem) {
    const { validationErrors } = this.state
    const { id, quantity, item: { title } } = cartItem
    const total = getCartItemTotal(cartItem)
    const errors = validationErrors[cartItem.id]

    return (
      <View style={styles.itemContainer} key={id} onLayout={e => this.scrollToValidationError(e, cartItem)}>
        <View style={styles.itemTopRowContainer}>
          <View style={styles.titleAndOptionsContainer}>
            <Body style={styles.itemTitle}>
              <Text style={styles.quantity}>{quantity}x</Text>&nbsp;&nbsp;&nbsp;{title}
            </Body>
            <Heading3>
              {selectedOptionNamesString(cartItem)}
            </Heading3>
          </View>
          <Body style={styles.itemPrice}>{total}</Body>
        </View>

        <ValidationError
          validationErrors={errors}
          errorObject={cartItem}
          getErrorMessages={getErrorMessages}
        />

        <View style={styles.itemSeparator} />
      </View>
    )
  }

  renderCartItems() {
    const cartItemsArray = getCartItemsArray(this.props.cart)

    return cartItemsArray.map(cartItem => this.renderCartItem(cartItem))
  }

  render() {
    const {
      onChangeSpecialRequest,
      onPaymentOptionPress,
      paymentOptions,
      selectedPaymentOptionValue,
      cart,
      cart: { specialRequest },
      style
    } = this.props
    const cartTotal = getCartTotal(cart)

    return (
      <KeyboardAvoidingView behavior="padding">
        <ScrollView centerContent contentContainerStyle={[styles.container, style]} ref={this.saveScrollViewRef}>
          <Heading style={styles.title}>Order</Heading>

          <View style={styles.cartItemsContainer} ref={this.saveCartItemsContainerRef}>
            {this.renderCartItems()}
          </View>

          <View style={styles.specialRequestContainer}>
            <TextField
              label="Special request"
              onChangeText={onChangeSpecialRequest}
              value={specialRequest}
              multiline
            />
          </View>

          <Heading3 style={styles.paymentMethodHeading}>Payment method</Heading3>
          <OptionGroup
            options={paymentOptions}
            allowsMultipleSelection={false}
            selectedOptionIds={[selectedPaymentOptionValue]}
            onOptionPress={onPaymentOptionPress}
            style={styles.paymentOptions}
          />

          <View style={styles.totalContainer}>
            <Heading>Total</Heading>
            <Heading>{cartTotal}</Heading>
          </View>

          <PrimaryButton
            title="Place Order"
            onPress={this.onPlaceOrderButtonPress}
            style={styles.placeOrderButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

// TODO: This won't be needed after the update to RN 0.54.
// $FlowFixMe
const styles = StyleSheet.create({
  container: {
    paddingBottom: 5
  },
  title: {
    marginBottom: 20
  },
  itemContainer: {
    marginBottom: 12
  },
  itemTopRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  itemTitle: {
    fontSize: 14,
    lineHeight: 19
  },
  itemPrice: {
    fontSize: 14,
    lineHeight: 19
  },
  itemSeparator: {
    borderBottomColor: colors.cartItemSeparator,
    borderBottomWidth: 1,
    marginHorizontal: -5,
    marginTop: 20
  },
  quantity: {
    opacity: 0.6
  },
  cartItemsContainer: {
    marginBottom: 10
  },
  specialRequestContainer: {
    marginBottom: 40
  },
  paymentMethodHeading: {
    marginBottom: 22
  },
  paymentOptions: {
    marginBottom: 45
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20
  },
  placeOrderButton: {
    marginTop: 20,
    alignSelf: 'center'
  },
  titleAndOptionsContainer: {
    marginEnd: 15,
    flexShrink: 1
  }
})

export default Order