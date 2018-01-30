// @flow
import React from 'react'
import { StyleSheet, View, ViewPropTypes } from 'react-native'

import { Heading } from '../.'
import colors from '../../config/colors'

export type FlashNotificationData = {
  id: string,
  message: string,
  type: 'success' | 'warning' | 'error'
}

type Props = {
  ...FlashNotificationData,
  style?: ?ViewPropTypes.style
}

const FlashNotification = ({ message, style, type }: Props) => {
  let backgroundColor = null
  switch (type) {
    case 'success':
      backgroundColor = colors.flashNotificationSuccessBackground
      break
    case 'warning':
      backgroundColor = colors.flashNotificationWarningBackground
      break
    case 'error':
      backgroundColor = colors.flashNotificationErrorBackground
      break
    default:
      backgroundColor = colors.flashNotificationWarningBackground
  }

  return (
    <View style={[styles.container, { backgroundColor }, style]}>
      <Heading>{message}</Heading>
    </View>
  )
}

FlashNotification.defaultProps = {
  style: null
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingVertical: 20,
    paddingHorizontal: 64,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default FlashNotification