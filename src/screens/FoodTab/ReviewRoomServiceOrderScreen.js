// @flow
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import { Title } from '../../components/index'
import type { StackScreenOptions } from '../../types/navigation'

class ReviewOrderScreen extends Component<void> {
  static navigationOptions: StackScreenOptions = {
    title: 'Review Order'
  }

  render() {
    return (
      <View style={styles.container}>
        <Title>
          Coming Soon
        </Title>
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