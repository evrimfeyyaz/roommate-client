// @flow
import React from 'react'
import { ViewPropTypes } from 'react-native'
import { connect } from 'react-redux'

import * as FlashNotificationsRedux from '../redux/flashNotifications'
import { FlashNotificationList } from '../components'

type Props = {
  ...FlashNotificationsRedux.State,
  style?: ?ViewPropTypes.style
}

const FlashNotificationsContainer = ({ notifications, style }: Props) => {
  const notificationsArray = Object.values(notifications)

  return <FlashNotificationList notifications={notificationsArray} style={style} />
}

FlashNotificationsContainer.defaultProps = {
  style: null
}

const mapStateToProps = state => ({
  ...state.flashNotifications
})

export default connect(mapStateToProps)(FlashNotificationsContainer)