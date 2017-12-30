import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import { Title } from '../../components'

class RestaurantsScreen extends Component {
  static navigationOptions = {
    title: 'Restaurants'
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