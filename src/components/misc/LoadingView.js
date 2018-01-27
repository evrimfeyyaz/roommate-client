import React from 'react'
import { View, ActivityIndicator } from 'react-native'

import { Heading } from '../.'

type Props = {
  message: string
}

const LoadingView = ({ message }: Props) => (
  <View>
    <ActivityIndicator size="large" style={styles.activityIndicator} />
    <Heading>{message}</Heading>
  </View>
)

const styles = {
  activityIndicator: {
    marginBottom: 30
  }
}

export default LoadingView