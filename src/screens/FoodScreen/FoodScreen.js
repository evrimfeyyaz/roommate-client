import React, { Component } from 'react'
import { View } from 'react-native'
import { Title } from '../../components'
import styles from './styles'

class FoodScreen extends Component {
  static navigationOptions = {
    title: 'Food'
  }

  render() {
    return (
      <View style={styles.container}>
        <Title>
          Food Screen
        </Title>
      </View>
    )
  }
}

export default FoodScreen