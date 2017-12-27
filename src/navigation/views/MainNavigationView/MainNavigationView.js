import React, { Component } from 'react'
import { View, StatusBar, ScrollView } from 'react-native'
import { PropTypes } from 'prop-types'
import { addNavigationHelpers, NavigationActions } from 'react-navigation'

import styles from './styles'
import { SideMenu, TopBar, BackgroundCard } from '../../../components'

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

  getScreenTitle(navigation) {
    // https://github.com/react-community/react-navigation/blob/6af770d6449bc450ed42378dd91e5a7015d1710b/src/views/TabView/TabView.js#L91
    // https://stackoverflow.com/questions/46278399/use-of-getscreenoptions-from-the-root-navigator-to-get-the-title-of-nested-activ
    return this.props.router.getScreenOptions(navigation).title
  }

  render() {
    // From https://reactnavigation.org/docs/navigators/custom
    const { navigation, router } = this.props
    const { routes, index } = navigation.state

    const ActiveTab = router.getComponentForRouteName(routes[index].routeName)

    // The state of the active child screen can be found at routes[index]
    let childNavigation = { dispatch: navigation.dispatch, state: routes[index] }
    childNavigation = addNavigationHelpers(childNavigation)

    const currentTitle = this.getScreenTitle(childNavigation)

    return (
      <View style={styles.mainContainer}>
        <SideMenu currentRouteIndex={index} sideMenuItemTapped={this.navigateTo} />
        <View style={styles.subContainer}>
          <TopBar title={currentTitle} />

          <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
            <BackgroundCard style={styles.contentContainer}>
              <ActiveTab navigation={childNavigation} />
            </BackgroundCard>
          </ScrollView>
        </View>
      </View>
    )
  }
}

export default MainNavigationView