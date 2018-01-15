// @flow
import React from 'react'
import { connect } from 'react-redux'

import { Cart } from '../components'
import type { ShoppingCart } from '../types/shopping'
import * as RoomServiceCartRedux from '../redux/roomService/roomServiceCart'

type DispatchProps = {
  clearRoomServiceCart: () => void
}

type Props = {
  roomServiceCart: ShoppingCart
} & DispatchProps

const RoomServiceCart = ({ roomServiceCart, clearRoomServiceCart }: Props) => {
  const cartItemsCount = Object.keys(roomServiceCart.cartItems).length

  if (cartItemsCount === 0) {
    return null
  }

  return (
    <Cart
      cart={roomServiceCart}
      onClearButtonPress={clearRoomServiceCart}
    />
  )
}

const mapStateToProps = state => ({
  roomServiceCart: state.roomServiceCart
})

const mapDispatchToProps = dispatch => ({
  clearRoomServiceCart: () => dispatch(RoomServiceCartRedux.clearRoomServiceCart())
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomServiceCart)