import React, { Component } from 'react'
import { ScrollView } from 'react-native'

import styles from './styles'
import FoodSectionNavigator from '../../navigation/navigators/FoodSectionNavigator'

class FoodScreen extends Component {
  static navigationOptions = {
    title: 'Food'
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <FoodSectionNavigator />
      </ScrollView>
    )
  }
}

export default FoodScreen