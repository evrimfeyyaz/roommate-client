// @flow
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { addNavigationHelpers, NavigationActions } from 'react-navigation'
import type { NavigationRoute, NavigationRouter, NavigationScreenProp, NavigationState } from 'react-navigation'

import { TabBar } from '../index'
import type { MainTabScreenOptions } from '../../types/navigation'
import type { TabData } from './TabBar'

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  router: NavigationRouter<NavigationState, MainTabScreenOptions>
}

class TabView extends Component<Props> {
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

  getTabDataForAllChildRoutes(): TabData[] {
    const { routes } = this.props.navigation.state

    // eslint-disable-next-line arrow-body-style
    return routes.map(route => {
      const { title } = this.getScreenOptionsForRoute(route)

      return { id: route.routeName, title }
    })
  }

  navigateTo = (routeName: string) => {
    const { dispatch } = this.props.navigation

    const navigateAction = NavigationActions.navigate({ routeName })

    dispatch(navigateAction)
  }

  renderActiveScreen() {
    const { router } = this.props
    const activeRoute = this.getActiveRoute()

    const ActiveScreen = router.getComponentForRouteName(activeRoute.routeName)

    // $FlowFixMe
    return <ActiveScreen />
  }

  render() {
    const tabs = this.getTabDataForAllChildRoutes()
    const activeRouteName = this.getActiveRoute().routeName

    return (
      <View style={styles.container}>
        <TabBar data={tabs} activeTabId={activeRouteName} onTabPress={this.navigateTo} />
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

export default TabView