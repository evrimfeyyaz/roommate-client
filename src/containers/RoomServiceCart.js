// @flow
import React from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'

import { Cart } from '../components'
import type { ShoppingCart, ShoppingCartItem } from '../types/shopping'
import * as RoomServiceCartRedux from '../redux/roomService/roomServiceCart'

type DispatchProps = {
  clearCart: () => void,
  adjustCartItemQuantity: (cartItem: ShoppingCartItem, quantity: number) => void,
  removeCartItem: (cartItem: ShoppingCartItem) => void
}

type Props = {
  roomServiceCart: ShoppingCart
} & DispatchProps

const RoomServiceCart = (props: Props) => {
  const { roomServiceCart, clearCart, adjustCartItemQuantity, removeCartItem } = props

  return (
    <Cart
      cart={roomServiceCart}
      onClearButtonPress={clearCart}
      onQuantityStepperPress={adjustCartItemQuantity}
      onRemoveButtonPress={removeCartItem}
      style={styles.cart}
    />
  )
}

const styles = StyleSheet.create({
  cart: {
    marginStart: 15
  }
})

const mapStateToProps = state => ({
  roomServiceCart: state.roomServiceCart
})

const mapDispatchToProps = dispatch => ({
  clearCart: () => dispatch(RoomServiceCartRedux.clearRoomServiceCart()),
  adjustCartItemQuantity: (
    cartItem: ShoppingCartItem,
    quantity: number
  ) => dispatch(RoomServiceCartRedux.adjustCartItemQuantity(cartItem, quantity)),
  removeCartItem: (
    cartItem: ShoppingCartItem
  ) => dispatch(RoomServiceCartRedux.removeCartItemFromRoomServiceCart(cartItem))
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomServiceCart)