// @flow
import React from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'

import { Cart } from '../../components/index'
import type { ShoppingCart, ShoppingCartItem } from '../../types/shopping'
import * as RoomServiceCartRedux from '../../redux/roomService/roomServiceCart'

type DispatchProps = {
  clearCart: () => void,
  adjustCartItemQuantity: (cartItem: ShoppingCartItem, quantity: number) => void,
  removeCartItem: (cartItem: ShoppingCartItem) => void,
  navigateToReviewOrderScreen: () => void
}

type Props = {
  roomServiceCart: ShoppingCart
} & DispatchProps

const RoomServiceCart = (props: Props) => {
  const {
    roomServiceCart,
    clearCart,
    adjustCartItemQuantity,
    removeCartItem,
    navigateToReviewOrderScreen
  } = props

  return (
    <Cart
      cart={roomServiceCart}
      onClearButtonPress={clearCart}
      onQuantityStepperPress={adjustCartItemQuantity}
      onRemoveButtonPress={removeCartItem}
      onReviewButtonPress={navigateToReviewOrderScreen}
      style={styles.cart}
    />
  )
}

// TODO: This won't be needed after the update to RN 0.54.
// $FlowFixMe
const styles = StyleSheet.create({
  cart: {
    marginStart: 15
  }
})

const mapStateToProps = state => ({
  roomServiceCart: state.roomServiceCart
})

const mapDispatchToProps = dispatch => ({
  clearCart: () => dispatch(RoomServiceCartRedux.clearCart()),
  adjustCartItemQuantity: (
    cartItem: ShoppingCartItem,
    quantity: number
  ) => dispatch(RoomServiceCartRedux.adjustCartItemQuantity(cartItem, quantity)),
  removeCartItem: (
    cartItem: ShoppingCartItem
  ) => dispatch(RoomServiceCartRedux.removeCartItem(cartItem)),
  navigateToReviewOrderScreen: () => dispatch(NavigationActions.navigate({ routeName: 'ReviewRoomServiceOrder' }))
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomServiceCart)