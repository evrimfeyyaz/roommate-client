import React, { Component } from 'react'
import { View } from 'react-native'
import { NavigationActions } from 'react-navigation'

import { Title, PrimaryButton } from '../../components'
import styles from './styles'

class FoodHomeScreen extends Component {
  static navigationOptions = {
    title: 'Food Home',
    isMainTabScreen: true
  }

  go() {
    const navigateAction = NavigationActions.navigate({ routeName: 'NextInStack' })

    this.props.navigation.dispatch(navigateAction)
  }

  render() {
    return (
      <View style={styles.container}>
        <Title>
          Food Home Content
        </Title>
        <PrimaryButton title="Go to next in stack" onPress={this.go.bind(this)} />
      </View>
    )
  }
}

export default FoodHomeScreen