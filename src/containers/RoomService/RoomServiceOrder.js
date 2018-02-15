// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { NavigationActions } from 'react-navigation'

import type { ShoppingCart } from '../../types/shopping'
import { Order } from '../../components/index'
import type { Option } from '../../components/controls/OptionGroup'
import * as RoomServiceCartRedux from '../../redux/roomService/roomServiceCart'
import * as GlobalActivityIndicatorRedux from '../../redux/globalActivityIndicator'
import * as FlashNotificationsRedux from '../../redux/flashNotifications'
import { cartToOrderArgument } from '../../utils/shoppingHelpers'
import type { FlashNotificationData } from '../../components/misc/FlashNotification'
import { getCurrentTimestampString } from '../../utils/timeUtils'

type DispatchProps = {
  updatePaymentOption: (option: string) => void,
  updateSpecialRequest: (value: string) => void,
  clearRoomServiceCart: () => void,
  showActivityIndicator: (message: string) => void,
  hideActivityIndicatorWithDelay: () => void,
  flashNotification: (notification: FlashNotificationData) => void,
  navigateToRoomServiceScreen: () => void
}

type Props = {
  roomServiceCart: ShoppingCart,
  mutate: Function
} & DispatchProps

const paymentOptions: Option[] = [
  {
    id: 'room_bill',
    label: 'Room bill'
  },
  {
    id: 'credit_card_on_delivery',
    label: 'Credit card on delivery'
  },
  {
    id: 'cash_on_delivery',
    label: 'Cash on delivery'
  }
]

class RoomServiceOrder extends Component<Props> {
  createRoomServiceOrder = () => {
    const {
      roomServiceCart,
      mutate,
      showActivityIndicator,
      hideActivityIndicatorWithDelay,
      flashNotification,
      navigateToRoomServiceScreen,
      clearRoomServiceCart
    } = this.props
    const orderArgument = cartToOrderArgument(roomServiceCart)

    showActivityIndicator('We are sending your order.')
    mutate({
      variables: { order: orderArgument }
    })
      .then(() => {
        hideActivityIndicatorWithDelay().then(() => {
          clearRoomServiceCart()
          navigateToRoomServiceScreen()

          flashNotification({
            id: getCurrentTimestampString(),
            message: 'We received your order!',
            type: 'success'
          })
        })
      })
      .catch((response) => {
        hideActivityIndicatorWithDelay().then(() => {
          flashNotification({
            id: getCurrentTimestampString(),
            message: response,
            type: 'error'
          })
        })
      })
  }

  render() {
    const {
      updatePaymentOption,
      updateSpecialRequest,
      roomServiceCart: cart,
      roomServiceCart: {
        paymentOption
      }
    } = this.props

    return (
      <Order
        cart={cart}
        paymentOptions={paymentOptions}
        selectedPaymentOptionValue={paymentOption}
        onPaymentOptionPress={updatePaymentOption}
        onChangeSpecialRequest={updateSpecialRequest}
        placeOrderButtonPress={this.createRoomServiceOrder}
      />
    )
  }
}

const mapStateToProps = state => ({
  roomServiceCart: state.roomServiceCart,
  globalActivityIndicator: state.globalActivityIndicator
})

const mapDispatchToProps = dispatch => ({
  updatePaymentOption: (option: string) => dispatch(RoomServiceCartRedux.updatePaymentOption(option)),
  updateSpecialRequest: (value: string) => dispatch(RoomServiceCartRedux.updateSpecialRequest(value)),
  clearRoomServiceCart: () => dispatch(RoomServiceCartRedux.clearCart()),
  showActivityIndicator: (message: string) => dispatch(GlobalActivityIndicatorRedux.showActivityIndicator(message)),
  hideActivityIndicatorWithDelay: () => dispatch(GlobalActivityIndicatorRedux.hideActivityIndicatorWithDelay()),
  flashNotification: (notification: FlashNotificationData) =>
    dispatch(FlashNotificationsRedux.flashNotification(notification)),
  navigateToRoomServiceScreen: () => dispatch(NavigationActions.navigate({ routeName: 'RoomService' }))
})

const createRoomServiceOrder = gql`
  mutation createRoomServiceOrder($order: RoomServiceOrderInputType!) {
    createRoomServiceOrder(order: $order) {
      id
      specialRequest
      paymentOption
      cartItems {
        id
        quantity
        selectedOptions {
          id
          title
          price
        }
        item {
          id
        }
      }
    }
  }
`

const graphQlContainer = graphql(createRoomServiceOrder)(RoomServiceOrder)

export default connect(mapStateToProps, mapDispatchToProps)(graphQlContainer)