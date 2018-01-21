// @flow
import React from 'react'
import { connect } from 'react-redux'

import type { ShoppingCart } from '../types/shopping'
import { Order } from '../components'
import type { RadioOption } from '../components/controls/RadioGroup'
import * as RoomServiceCartRedux from '../redux/roomService/roomServiceCart'

type DispatchProps = {
  updatePaymentOption: (optionValue: string) => void,
  updateSpecialRequest: (value: string) => void
}

type Props = {
  roomServiceCart: ShoppingCart
} & DispatchProps

const paymentOptions: RadioOption[] = [
  {
    value: 'room-bill',
    label: 'Room bill'
  },
  {
    value: 'credit-card-on-delivery',
    label: 'Credit card on delivery'
  },
  {
    value: 'cash-on-delivery',
    label: 'Cash on delivery'
  }
]

const RoomServiceOrder = (props: Props) => {
  const {
    updatePaymentOption,
    updateSpecialRequest,
    roomServiceCart: cart,
    roomServiceCart: {
      paymentOption
    }
  } = props

  return (
    <Order
      cart={cart}
      paymentOptions={paymentOptions}
      selectedPaymentOptionValue={paymentOption}
      onPaymentOptionPress={updatePaymentOption}
      onChangeSpecialRequest={updateSpecialRequest}
    />
  )
}

const mapStateToProps = state => ({
  roomServiceCart: state.roomServiceCart
})

const mapDispatchToProps = dispatch => ({
  updatePaymentOption: (optionValue: string) => dispatch(RoomServiceCartRedux.updatePaymentOption(optionValue)),
  updateSpecialRequest: (value: string) => dispatch(RoomServiceCartRedux.updateSpecialRequest(value))
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomServiceOrder)