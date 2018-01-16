import type { NavigationRouter, NavigationScreenProp, NavigationState, NavigationRoute } from 'react-navigation'

import type { IconData } from '../../assets/iconData'

/**
 * Screen options for the main tab screens, such as "Home," "Room Service," etc.
 *
 * These are the screens in the `MainRouter`.
 */
export type MainTabScreenOptions = {
  title: string,
  iconData: IconData
}

/**
 * Screen options for the sub-tabs, such as "Room Service" and "Restaurants" in
 * the "Food" section.
 *
 * These are the screens in `...Tab...Navigator`s which use `TabView`.
 */
export type SubTabScreenOptions = {
  title: string,
  /**
   * Whether or not the navigation bar inside the `StackView` should be hidden.
   *
   * This is useful when we don't want to show the navigation bar on the main page
   * where we already have tabs.
   *
   * For example, in the "Food" tab, there are two sub-tabs, "Room Service" and
   * "Restaurants." On the main page of the "Food" tab, we have a `TabView` inside a
   * `StackView`. We don't want to show both the tab bar and the stack navigation
   * bar, so we can hide the stack navigation bar using this flag.
   */
  hideStackNavigationBar: boolean
}

/**
 * Screen options for screens inside a navigator that uses `StackView`.
 *
 * For example, `FoodTabNavigator`.
 */
export type StackScreenOptions = {
  title: string
}

export type Navigation = NavigationScreenProp<NavigationState>
export type Router<T> = NavigationRouter<NavigationState, T>
export type Route = NavigationRoute