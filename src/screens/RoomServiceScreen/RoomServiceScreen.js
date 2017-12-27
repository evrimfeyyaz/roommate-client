import React, { Component } from 'react'
import { View } from 'react-native'
import { NavigationActions } from 'react-navigation'

import { Title, PrimaryButton } from '../../components'
import styles from './styles'

class RoomServiceScreen extends Component {
  static navigationOptions = {
    title: 'Room Service'
  }

  go() {
    const navigateAction = NavigationActions.navigate({ routeName: 'NextInStack' })

    this.props.navigation.dispatch(navigateAction)
  }

  render() {
    return (
      <View style={styles.container}>
        <Title>
          Room Service
        </Title>
      </View>
    )
  }
}

export default RoomServiceScreen