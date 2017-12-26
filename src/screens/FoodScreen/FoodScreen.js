import React, { Component } from 'react'
import { ScrollView } from 'react-native'

import FoodSectionNavigator from '../../navigation/navigators/FoodSectionNavigator'

class FoodScreen extends Component {
  static navigationOptions = {
    title: 'Food'
  }

  render() {
    return (
      <ScrollView>
        <FoodSectionNavigator />
      </ScrollView>
    )
  }
}

export default FoodScreen