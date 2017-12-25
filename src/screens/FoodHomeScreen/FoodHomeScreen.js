import React, { Component } from 'react'
import { View } from 'react-native'
import { Title } from '../../components'
import styles from './styles'

class FoodHomeScreen extends Component {
  static navigationOptions = {
    title: 'Food Home'
  }

  render() {
    return (
      <View style={styles.container}>
        <Title>
          Food Home Content
        </Title>
      </View>
    )
  }
}

export default FoodHomeScreen