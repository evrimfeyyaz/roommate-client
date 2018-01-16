// @flow
import React from 'react'
import { connect } from 'react-redux'

import { Cart } from '../components'
import type { ShoppingCart, ShoppingCartItem } from '../types/shopping'
import * as RoomServiceCartRedux from '../redux/roomService/roomServiceCart'

type DispatchProps = {
  clearRoomServiceCart: () => void,
  adjustCartItemQuantity: (cartItem: ShoppingCartItem, quantity: number) => void
}

type Props = {
  roomServiceCart: ShoppingCart
} & DispatchProps

const RoomServiceCart = (props: Props) => {
  const { roomServiceCart, clearRoomServiceCart, adjustCartItemQuantity } = props

  return (
    <Cart
      cart={roomServiceCart}
      onClearButtonPress={clearRoomServiceCart}
      onQuantityStepperPress={adjustCartItemQuantity}
    />
  )
}

const mapStateToProps = state => ({
  roomServiceCart: state.roomServiceCart
})

const mapDispatchToProps = dispatch => ({
  clearRoomServiceCart: () => dispatch(RoomServiceCartRedux.clearRoomServiceCart()),
  adjustCartItemQuantity: (
    cartItem: ShoppingCartItem,
    quantity: number) => dispatch(RoomServiceCartRedux.adjustCartItemQuantity(cartItem, quantity))
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomServiceCart)