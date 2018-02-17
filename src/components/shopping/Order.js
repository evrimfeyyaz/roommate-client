// @flow
import React, { Component } from 'react'
import { View, ScrollView, StyleSheet, Text, KeyboardAvoidingView, ViewPropTypes } from 'react-native'

import { Heading, Body, TextField, Heading3, OptionGroup, PrimaryButton } from '../.'
import type { ShoppingCart, ShoppingCartItem } from '../../types/shopping'
import colors from '../../config/colors'
import type { Option } from '../controls/OptionGroup'
import { getCartItemsArray, getCartItemTotal, getCartTotal } from '../../utils/shopping/cartHelpers'
import { selectedOptionNamesString } from '../../utils/shopping/choiceAndOptionHelpers'

type Props = {
  cart: ShoppingCart,
  onChangeSpecialRequest: (value: string) => void,
  onPaymentOptionPress: (option: Option) => void,
  paymentOptions: Option[],
  selectedPaymentOptionValue: string,
  placeOrderButtonPress: () => void,
  style?: ?ViewPropTypes.style
}

class Order extends Component<Props> {
  static renderCartItem(cartItem: ShoppingCartItem) {
    const { id, quantity, item: { title } } = cartItem
    const total = getCartItemTotal(cartItem)

    return (
      <View style={styles.itemContainer} key={id}>
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

        <View style={styles.itemSeparator} />
      </View>
    )
  }

  renderCartItems() {
    const cartItemsArray = getCartItemsArray(this.props.cart)

    return cartItemsArray.map(cartItem => Order.renderCartItem(cartItem))
  }

  render() {
    const {
      onChangeSpecialRequest,
      onPaymentOptionPress,
      paymentOptions,
      selectedPaymentOptionValue,
      cart,
      cart: { specialRequest },
      placeOrderButtonPress,
      style
    } = this.props
    const cartTotal = getCartTotal(cart)

    return (
      <KeyboardAvoidingView behavior="padding">
        <ScrollView centerContent contentContainerStyle={[styles.container, style]}>
          <Heading style={styles.title}>Order</Heading>

          <View style={styles.cartItemsContainer}>
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
            onPress={placeOrderButtonPress}
            style={styles.placeOrderButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

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
    alignSelf: 'center'
  },
  titleAndOptionsContainer: {
    marginEnd: 15,
    flexShrink: 1
  }
})

export default Order