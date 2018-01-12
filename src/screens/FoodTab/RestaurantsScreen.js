// @flow
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import { Title } from '../../components/index'
import type { SubScreenOptions } from '../../types/navigation'

class RestaurantsScreen extends Component<void> {
  static navigationOptions: SubScreenOptions = {
    title: 'Restaurants',
    hideStackNavigationBar: true
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

export default RestaurantsScreen