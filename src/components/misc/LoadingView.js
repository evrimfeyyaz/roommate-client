import React from 'react'
import { View, ActivityIndicator, StyleSheet } from 'react-native'

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

const styles = StyleSheet.create({
  activityIndicator: {
    marginBottom: 30
  }
})

export default LoadingView