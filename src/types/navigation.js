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
 * These are the screens in `...TabNavigator`s which use `TabView`.
 */
export type SubTabScreenOptions = {
  title: string
}