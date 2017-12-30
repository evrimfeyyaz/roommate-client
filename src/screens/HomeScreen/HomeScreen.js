import React, { Component } from 'react'
import { View } from 'react-native'
import { Title } from '../../components'
import styles from './styles'

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Home'
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

export default HomeScreen