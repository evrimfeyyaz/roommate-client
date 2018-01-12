// @flow
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { addNavigationHelpers } from 'react-navigation'
import type { NavigationRoute, NavigationRouter, NavigationScreenProp, NavigationState } from 'react-navigation'

import { NavigationBar } from '../index'
import type { MainTabScreenOptions } from '../../types/navigation'

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  router: NavigationRouter<NavigationState, MainTabScreenOptions>
}

class StackView extends Component<Props> {
  getActiveRoute() {
    const { routes, index } = this.props.navigation.state

    return routes[index]
  }

  /**
   * Creates a navigation object for a given route.
   */
  getNavigationForRoute(route: NavigationRoute) {
    const { dispatch } = this.props.navigation

    let navigation = { dispatch, state: route }
    navigation = addNavigationHelpers(navigation)

    return navigation
  }

  getScreenOptionsForRoute(route: NavigationRoute) {
    // https://github.com/react-community/react-navigation/blob/6af770d6449bc450ed42378dd91e5a7015d1710b/src/views/TabView/TabView.js#L91
    // https://stackoverflow.com/questions/46278399/use-of-getscreenoptions-from-the-root-navigator-to-get-the-title-of-nested-activ
    const navigation = this.getNavigationForRoute(route)

    return this.props.router.getScreenOptions(navigation)
  }

  goBack = () => {
    // You need the `null` argument below for some reason.
    // This is a well-known issue in react-navigation.
    this.props.navigation.goBack(null)
  }

  renderNavigationBar() {
    const activeRoute = this.getActiveRoute()
    const screenOptions = this.getScreenOptionsForRoute(activeRoute)

    if (screenOptions.hideStackNavigationBar) {
      return null
    }

    return <NavigationBar title={screenOptions.title} onBackButtonPress={this.goBack} />
  }

  renderActiveScreen() {
    const { router } = this.props
    const activeRoute = this.getActiveRoute()

    const ActiveScreen = router.getComponentForRouteName(activeRoute.routeName)

    // $FlowFixMe
    return <ActiveScreen />
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavigationBar()}
        {this.renderActiveScreen()}
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