import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { addNavigationHelpers } from 'react-navigation'

import styles from './styles'
import { BackgroundCard, Title } from '../../../components'

class SubSectionsView extends Component {
  getScreenTitle(navigation) {
    // https://github.com/react-community/react-navigation/blob/6af770d6449bc450ed42378dd91e5a7015d1710b/src/views/TabView/TabView.js#L91
    // https://stackoverflow.com/questions/46278399/use-of-getscreenoptions-from-the-root-navigator-to-get-the-title-of-nested-activ
    return this.props.router.getScreenOptions(navigation).title
  }

  render() {
    // From https://reactnavigation.org/docs/navigators/custom
    const { navigation, router } = this.props
    const { routes, index } = navigation.state

    const CurrentTab = router.getComponentForState(navigation.state)

    // The state of the active child screen can be found at routes[index]
    let childNavigation = { dispatch: navigation.dispatch, state: routes[index] }
    childNavigation = addNavigationHelpers(childNavigation)

    const currentTitle = this.getScreenTitle(childNavigation)

    console.log(this.props)

    return (
      <BackgroundCard>
        <Title>{currentTitle}</Title>
        <CurrentTab navigation={childNavigation} />
      </BackgroundCard>
    )
  }
}

export default SubSectionsView