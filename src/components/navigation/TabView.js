// @flow
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import { TabBar } from '../index'
import type { MainTabScreenOptions, Navigation, Router } from '../../types/navigation'
import type { TabData } from './TabBar'
import * as NavigationHelpers from '../../utils/navigationHelpers'

type Props = {
  navigation: Navigation,
  router: Router<MainTabScreenOptions>
}

class TabView extends Component<Props> {
  getTabDataForAllChildRoutes(): TabData[] {
    const { navigation, router } = this.props
    const { routes } = navigation.state

    return routes.map((route) => {
      const { title } = NavigationHelpers.getScreenOptionsForRoute(navigation, router, route)

      return { id: route.routeName, title }
    })
  }

  navigateTo = (routeName: string) => {
    NavigationHelpers.navigateTo(this.props.navigation, routeName)
  }

  render() {
    const { navigation, router } = this.props
    const tabs = this.getTabDataForAllChildRoutes()
    const activeRouteName = NavigationHelpers.getActiveRoute(navigation).routeName

    return (
      <View style={styles.container}>
        <TabBar data={tabs} activeTabId={activeRouteName} onTabPress={this.navigateTo} />
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

export default TabView