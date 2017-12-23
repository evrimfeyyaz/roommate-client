import React, { Component } from 'react'
import { View, StatusBar } from 'react-native'
import { PropTypes } from 'prop-types'
import { addNavigationHelpers } from 'react-navigation'

import styles from './styles'
import { SideMenu, TopBar } from '../../components'

class MainNavigationView extends Component {
  componentDidMount() {
    StatusBar.setHidden(true)
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
        <SideMenu />
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