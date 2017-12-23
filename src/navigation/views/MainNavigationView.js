import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { PropTypes } from 'prop-types'
import { addNavigationHelpers, NavigationActions } from 'react-navigation'

import styles from './styles'
import { SideMenu, TopBar } from '../../components'

class MainNavigationView extends Component {
  constructor(props) {
    super(props)

    this.navigateTo = this.navigateTo.bind(this)
  }

  componentDidMount() {
    StatusBar.setHidden(true)
  }

  navigateTo(index) {
    const { dispatch, state } = this.props.navigation

    const navigateAction = NavigationActions.navigate({
      routeName: state.routes[index].routeName
    })

    dispatch(navigateAction)
  }

  render() {
    // From https://reactnavigation.org/docs/navigators/custom
    const { navigation, router } = this.props
    const { routes, index } = navigation.state

    const CurrentTab = router.getComponentForState(navigation.state)

    // The state of the active child screen can be found at routes[index]
    let childNavigation = { dispatch: navigation.dispatch, state: routes[index] }

    childNavigation = addNavigationHelpers(childNavigation)

    return (
      <View style={styles.mainContainer}>
        <SideMenu currentRouteIndex={index} sideMenuItemTapped={this.navigateTo} />
        <View style={styles.subContainer}>
          <TopBar />

          <View style={{ flex: 1 }}>
            <CurrentTab navigation={childNavigation} />
          </View>
        </View>
      </View>
    )
  }
}

export default MainNavigationView