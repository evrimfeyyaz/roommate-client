// @flow
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import type { FlashNotificationData } from './FlashNotification'
import { FlashNotification } from '../.'

type Props = {
  notifications: FlashNotificationData[]
}

class FlashNotificationList extends Component<Props> {
  static renderFlashNotification(notification: FlashNotificationData) {
    return (
      <FlashNotification
        {...notification}
        key={notification.id}
        style={styles.flashNotification}
      />
    )
  }

  renderFlashNotifications() {
    return this.props.notifications.map(notification =>
      FlashNotificationList.renderFlashNotification(notification)
    )
  }

  render() {
    return (
      <View>
        {this.renderFlashNotifications()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  flashNotification: {
    marginBottom: 10
  }
})

export default FlashNotificationList