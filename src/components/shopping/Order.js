// @flow
import React, { Component } from 'react'
import { View, ScrollView, StyleSheet, Text, KeyboardAvoidingView } from 'react-native'

import { Heading, Body, TextField } from '../.'
import type { ShoppingCart, ShoppingCartItem } from '../../types/shopping'
import { getCartItemsArray, getCartItemTotal } from '../../utils/shoppingHelpers'
import colors from '../../config/colors'

type Props = {
  cart: ShoppingCart,
  onChangeSpecialRequest: (value: string) => void
}

class Order extends Component<Props> {
  renderCartItem(cartItem: ShoppingCartItem) {
    const { id, quantity, item: { title } } = cartItem
    const total = getCartItemTotal(cartItem)

    return (
      <View style={styles.itemContainer} key={id}>
        <View style={styles.itemTopRowContainer}>
          <Body style={styles.itemTitle}>
            <Text style={styles.quantity}>{quantity}x</Text>&nbsp;&nbsp;&nbsp;{title}
          </Body>
          <Body style={styles.itemPrice}>{total}</Body>
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
    const { onChangeSpecialRequest, cart: { specialRequest } } = this.props

    return (
      <KeyboardAvoidingView behavior="padding">
        <ScrollView centerContent>
          <Heading style={styles.title}>Order</Heading>

          <View style={styles.cartItemsContainer}>
            {this.renderCartItems()}
          </View>

          <TextField
            label="Special Request"
            onChangeText={onChangeSpecialRequest}
            value={specialRequest}
            multiline
          />
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
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
    lineHeight: 19,
    marginEnd: 15,
    flexShrink: 1
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
    marginBottom: 38
  }
})

export default Order