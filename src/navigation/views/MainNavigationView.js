// @flow
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { addNavigationHelpers, NavigationActions } from 'react-navigation'
import type { NavigationScreenProp, NavigationRouter, NavigationState, NavigationRoute } from 'react-navigation'

import { SideMenu, TopBar, Card } from '../../components/index'
import type { MainTabScreenOptions } from '../../types/navigation'
import type { Tab } from '../../components/navigation/SideMenu'

type Props = {
  navigation: NavigationScreenProp<NavigationState>,
  router: NavigationRouter<NavigationState, MainTabScreenOptions>
}

class MainNavigationView extends Component<Props> {
  getActiveRoute() {
    const { routes, index } = this.props.navigation.state

    return routes[index]
  }

  /**
   * Creates a navigation object for a given route.
   */
  getChildNavigationForRoute(route: NavigationRoute) {
    const { navigation } = this.props

    // The state of the active child screen can be found at `tabs[index]`.
    let childNavigation = { dispatch: navigation.dispatch, state: route }
    childNavigation = addNavigationHelpers(childNavigation)

    return childNavigation
  }

  getScreenOptionsForRoute(route: NavigationRoute) {
    // https://github.com/react-community/react-navigation/blob/6af770d6449bc450ed42378dd91e5a7015d1710b/src/views/TabView/TabView.js#L91
    // https://stackoverflow.com/questions/46278399/use-of-getscreenoptions-from-the-root-navigator-to-get-the-title-of-nested-activ
    const navigation = this.getChildNavigationForRoute(route)

    return this.props.router.getScreenOptions(navigation)
  }

  getTabObjectForAllChildRoutes(): Tab[] {
    const { routes } = this.props.navigation.state

    // eslint-disable-next-line arrow-body-style
    return routes.map((route) => {
      return { ...this.getScreenOptionsForRoute(route), routeName: route.routeName }
    })
  }

  navigateTo = (routeName: string) => {
    const { dispatch } = this.props.navigation

    const navigateAction = NavigationActions.navigate({ routeName })

    dispatch(navigateAction)
  }

  renderActiveChild() {
    const { router } = this.props
    const activeRoute = this.getActiveRoute()

    const ActiveChild = router.getComponentForRouteName(activeRoute.routeName)
    const childNavigation = this.getChildNavigationForRoute(activeRoute)

    // $FlowFixMe
    return <ActiveChild navigation={childNavigation} />
  }

  render() {
    // More information: https://reactnavigation.org/docs/navigators/custom
    const activeRoute = this.getActiveRoute()
    const currentTitle = this.getScreenOptionsForRoute(activeRoute).title
    const tabs = this.getTabObjectForAllChildRoutes()

    return (
      <View style={styles.mainContainer}>
        <SideMenu tabs={tabs} activeTabTitle={currentTitle} sideMenuItemTapped={this.navigateTo} />
        <View style={styles.subContainer}>
          <TopBar title={currentTitle} />

          <Card style={styles.contentContainer} backgroundOpacity={0.6}>
            {this.renderActiveChild()}
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
    backgroundColor: '#1E222C'
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