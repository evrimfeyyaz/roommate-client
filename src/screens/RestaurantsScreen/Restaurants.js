import React, { Component } from 'react'
import { View } from 'react-native'
import { Title } from '../../components'
import styles from './styles'

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

export default RestaurantsScreen