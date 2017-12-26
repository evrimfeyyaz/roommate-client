import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { addNavigationHelpers } from 'react-navigation'

import styles from './styles'
import { BackgroundCard, TabBar } from '../../../components'

class SubSectionsView extends Component {
  constructor(props) {
    super(props)

    const childNavigation = this.getChildNavigation()
    const screenOptions = this.getCurrentScreenOptions(childNavigation)

    this.state = {
      childNavigation,
      screenOptions
    }
  }

  getChildNavigation() {
    // From https://reactnavigation.org/docs/navigators/custom
    const { navigation } = this.props
    const { routes, index } = navigation.state

    // The state of the active child screen can be found at routes[index]
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

  renderActiveScreen() {
    const { navigation, router } = this.props

    const ActiveScreen = router.getComponentForState(navigation.state)

    return <ActiveScreen navigation={this.state.childNavigation} />
  }

  renderTabBar() {
    // Each sub-section has one or more tabs. For example, the food section has
    // two tabs, in-room dining and restaurants. When we're on the main page of
    // one of these tabs, we should be able to switch between tabs. But after we
    // pick a certain action, let's say placing an in-room service order, the tabs
    // should be hidden, and we should see a back page.
    //
    // The following is used for that decision, if this is a main tab page, it
    // will show the tab bar, if not it will show a stack navigation bar.
    const { isMainTabScreen } = this.state.screenOptions
    const { routes } = this.props.navigation.state
    const activeIndex = this.props.navigation.state.index

    const items = routes.map((route, index) => {
      const title = this.getScreenOptions(route).title

      return { title, key: route.key, index, onPress: () => {}
      }
    })

    if (!isMainTabScreen) {
      return null
    }

    return (
      <TabBar items={items} activeIndex={activeIndex} />
    )
  }

  render() {
    return (
      <BackgroundCard>
        {this.renderTabBar()}
        {this.renderActiveScreen()}
      </BackgroundCard>
    )
  }
}

export default SubSectionsView