import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { PropTypes } from 'prop-types'
import { addNavigationHelpers, NavigationActions } from 'react-navigation'

import { TabBar } from '../../../components'

class TabView extends Component {
  constructor(props) {
    super(props)

    const childNavigation = this.getChildNavigation()
    const screenOptions = this.getCurrentScreenOptions(childNavigation)

    this.state = {
      childNavigation,
      screenOptions
    }

    this.navigateTo = this.navigateTo.bind(this)
  }

  getChildNavigation() {
    // From https://reactnavigation.org/docs/navigators/custom
    const { navigation } = this.props
    const { routes, index } = navigation.state

    // The state of the active child screen can be found at routes[id]
    const childNavigation = { dispatch: navigation.dispatch, state: routes[index] }

    return addNavigationHelpers(childNavigation)
  }

  getCurrentScreenOptions(navigation) {
    // https://github.com/react-community/react-navigation/blob/6af770d6449bc450ed42378dd91e5a7015d1710b/src/views/TabView/TabView.js#L91
    // https://stackoverflow.com/questions/46278399/use-of-getscreenoptions-from-the-root-navigator-to-get-the-title-of-nested-activ
    return this.props.router.getScreenOptions(navigation)
  }

  getScreenOptions(route) {
    // The following method is not well-documented. Check out the source code to find out more.
    return this.props.router.getScreenOptions({ state: route })
  }

  navigateTo(routeName) {
    const { dispatch, state } = this.props.navigation

    const navigateAction = NavigationActions.navigate({
      routeName: routeName
    })

    dispatch(navigateAction)
  }

  renderActiveScreen() {
    const { navigation, router } = this.props

    const ActiveScreen = router.getComponentForState(navigation.state)

    return <ActiveScreen navigation={this.state.childNavigation} />
  }

  renderTabBar() {
    const { index: activeIndex, routes } = this.props.navigation.state

    const subScreens = routes.map((route, index) => {
      const { title } = this.getCurrentScreenOptions({ dispatch: this.props.navigation.dispatch, state: routes[index] })

      const tabItem = {
        title,
        id: route.routeName
      }

      return tabItem
    })

    return <TabBar data={subScreens} onTabChange={this.navigateTo} />
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderTabBar()}
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