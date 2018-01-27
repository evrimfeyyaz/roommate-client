import React from 'react'
import { StyleSheet, View } from 'react-native'

import { Heading } from '../.'

type Props = {
  message: string
}

const Flash = ({ message }: Props) => (
  <View style={styles.container}>
    <Heading>{message}</Heading>
  </View>
)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 60,
    paddingVertical: 20,
    paddingHorizontal: 64,
    backgroundColor: 'rgba(0, 207, 104, 0.31)',
    borderRadius: 10,
    justifyContent: 'center'
  }
})

export default Flash