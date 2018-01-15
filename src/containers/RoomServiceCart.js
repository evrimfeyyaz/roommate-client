// @flow
import React from 'react'
import { connect } from 'react-redux'

import { Cart } from '../components'
import type { ShoppingCart } from '../types/shopping'

type Props = {
  roomServiceCart: ShoppingCart
}

const RoomServiceCart = ({ roomServiceCart }: Props) => (
  <Cart cart={roomServiceCart} />
)

const mapStateToProps = state => ({
  roomServiceCart: state.roomServiceCart
})

export default connect(mapStateToProps)(RoomServiceCart)