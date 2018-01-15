// @flow
import React from 'react'
import { addNavigationHelpers, NavigationActions } from 'react-navigation'

import type { Navigation, Router, Route } from '../types/navigation'

/**
 * Commonly used navigation functions for the 'react-navigation' library.
 *
 * More information: https://reactnavigation.org/docs/navigators/custom
 */


export function getActiveRoute(navigation: Navigation) {
  const { routes, index } = navigation.state

  return routes[index]
}

/**
 * Creates a navigation object for a given route.
 */
export function getNavigationForRoute(navigation: Navigation, route: Route) {
  const { dispatch } = navigation

  let routeNavigation = { dispatch, state: route }
  routeNavigation = addNavigationHelpers(routeNavigation)

  return routeNavigation
}

export function getScreenOptionsForRoute(navigation: Navigation, router: Router, route: Route) {
  // https://github.com/react-community/react-navigation/blob/6af770d6449bc450ed42378dd91e5a7015d1710b/src/views/TabView/TabView.js#L91
  // https://stackoverflow.com/questions/46278399/use-of-getscreenoptions-from-the-root-navigator-to-get-the-title-of-nested-activ
  const routeNavigation = this.getNavigationForRoute(navigation, route)

  return router.getScreenOptions(routeNavigation)
}

export function navigateTo(navigation: Navigation, routeName: string) {
  const { dispatch } = navigation

  const navigateAction = NavigationActions.navigate({ routeName })

  dispatch(navigateAction)
}

export function goBack(navigation: Navigation) {
  // You need the `null` argument below for some reason.
  // This is a well-known issue in react-navigation.
  navigation.goBack(null)
}

export function renderActiveScreen(navigation: Navigation, router: Router) {
  const activeRoute = this.getActiveRoute(navigation)
  const ActiveScreen = router.getComponentForRouteName(activeRoute.routeName)

  // $FlowFixMe
  return <ActiveScreen />
}