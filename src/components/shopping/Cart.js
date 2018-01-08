import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import {
  BackgroundCard,
  Heading,
  Heading2,
  CircularButton,
  Stepper,
  PrimaryButton,
  SecondaryButton
} from '../.'
import * as iconData from '../../../assets/iconData'

class Cart extends Component {
  totalPrice(cartItem) {
    const { price } = cartItem.item
    const { quantity } = cartItem

    return price * quantity
  }

  // FIXME: Implement this properly.
  priceWithCurrency(price) {
    const currency = '$'

    return `${currency}${price}`
  }

  uniqueKeyForCartItem(cartItem) {
    // FIXME: Change this to use options and choices when they are added.
    return cartItem.item.id
  }

  cartTotal() {
    return this.props.cartItems.reduce((sum, cartItem) => sum + this.totalPrice(cartItem), 0)
  }

  renderCartItem(cartItem) {
    const { quantity, item } = cartItem
    const totalPriceWithCurrency = this.priceWithCurrency(this.totalPrice(cartItem))
    const key = this.uniqueKeyForCartItem(cartItem)

    return (
      <View style={styles.itemContainer} key={key}>
        <View style={styles.itemTopRowContainer}>
          <Heading2 style={styles.itemTitle}>{item.title}</Heading2>
          <Heading2 style={styles.itemPrice}>{totalPriceWithCurrency}</Heading2>
        </View>
        <View style={styles.itemBottomRowContainer}>
          <Stepper initialValue={quantity} small />

          <CircularButton iconFill="#fff" iconData={iconData.cross} small />
        </View>

        <View style={styles.itemSeparator} />
      </View>
    )
  }

  renderCartItems() {
    return this.props.cartItems.map(cartItem => this.renderCartItem(cartItem))
  }

  render() {
    const totalWithCurrency = this.priceWithCurrency(this.cartTotal())

    return (
      <BackgroundCard style={styles.container}>
        <View style={styles.headingContainer}>
          <Heading style={styles.heading}>Order</Heading>
          <SecondaryButton title="Clear All" />
        </View>

        {this.renderCartItems()}

        <View style={styles.totalContainer}>
          <Heading style={styles.heading}>Total</Heading>
          <Heading style={styles.heading}>{totalWithCurrency}</Heading>
        </View>

        <PrimaryButton title="Review Order" />
      </BackgroundCard>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: 200,
    borderRadius: 10,
    padding: 15
  },
  heading: {
    fontSize: 18,
    lineHeight: 24
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
    marginRight: 15
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
    borderBottomColor: '#979797',
    borderBottomWidth: 1,
    opacity: 0.1,
    marginHorizontal: -5
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 20
  }
})

Cart.propTypes = {
  cartItems: PropTypes.arrayOf(
    PropTypes.shape({
      item: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string,
        price: PropTypes.string
      }),
      quantity: PropTypes.number
    })
  ).isRequired
}

export default Cart