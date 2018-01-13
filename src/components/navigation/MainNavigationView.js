// @flow
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import { SideMenu, TopBar, Card } from '../index'
import type { MainTabScreenOptions, Navigation, Router } from '../../types/navigation'
import type { Tab } from './SideMenu'
import colors from '../../config/colors'
import * as NavigationHelpers from '../utils/navigationHelpers'

type Props = {
  navigation: Navigation,
  router: Router<MainTabScreenOptions>
}

class MainNavigationView extends Component<Props> {
  /**
   * Returns all main tabs from given routes, such as "Home," "Room Service," etc.
   */
  getTabObjectForAllChildRoutes(): Tab[] {
    const { navigation, router } = this.props
    const { routes } = navigation.state

    return routes.map(route => ({
      ...NavigationHelpers.getScreenOptionsForRoute(navigation, router, route),
      routeName: route.routeName
    }))
  }

  navigateTo = (routeName: string) => {
    NavigationHelpers.navigateTo(this.props.navigation, routeName)
  }

  render() {
    const { navigation, router } = this.props
    const activeRoute = NavigationHelpers.getActiveRoute(navigation)
    const currentTitle = NavigationHelpers.getScreenOptionsForRoute(navigation, router, activeRoute).title
    const tabs = this.getTabObjectForAllChildRoutes()

    return (
      <View style={styles.mainContainer}>
        <SideMenu tabs={tabs} activeTabTitle={currentTitle} sideMenuItemTapped={this.navigateTo} />
        <View style={styles.subContainer}>
          <TopBar title={currentTitle} />

          <Card style={styles.contentContainer} backgroundOpacity={0.6}>
            {NavigationHelpers.renderActiveScreen(navigation, router)}
          </Card>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: colors.mainNavigationBackground
  },
  subContainer: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 24,
    marginVertical: 15
  }
})

export default MainNavigationView