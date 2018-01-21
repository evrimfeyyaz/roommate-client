// @flow
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import type { StackScreenOptions } from '../../types/navigation'
import RoomServiceOrder from '../../containers/RoomServiceOrder'

class ReviewOrderScreen extends Component<void> {
  static navigationOptions: StackScreenOptions = {
    title: 'Review Order'
  }

  render() {
    return (
      <View style={styles.container}>
        <RoomServiceOrder />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default ReviewOrderScreen