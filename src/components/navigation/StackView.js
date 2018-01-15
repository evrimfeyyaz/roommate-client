// @flow
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import { NavigationBar } from '../index'
import type { Navigation, StackScreenOptions, Router } from '../../types/navigation'
import * as NavigationHelpers from '../../utils/navigationHelpers'

type Props = {
  navigation: Navigation,
  router: Router<StackScreenOptions>
}

class StackView extends Component<Props> {
  goBack = () => {
    NavigationHelpers.goBack(this.props.navigation)
  }

  renderNavigationBar() {
    const { navigation, router } = this.props
    const activeRoute = NavigationHelpers.getActiveRoute(navigation)
    const screenOptions = NavigationHelpers.getScreenOptionsForRoute(navigation, router, activeRoute)

    // Check out the `SubTabScreenOptions` type for more details.
    if (screenOptions.hideStackNavigationBar) {
      return null
    }

    return <NavigationBar title={screenOptions.title} onBackButtonPress={this.goBack} />
  }

  render() {
    const { navigation, router } = this.props

    return (
      <View style={styles.container}>
        {this.renderNavigationBar()}
        {NavigationHelpers.renderActiveScreen(navigation, router)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default StackView