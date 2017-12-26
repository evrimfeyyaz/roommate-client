import React, { Component } from 'react'
import { View } from 'react-native'
import { PropTypes } from 'prop-types'
import { addNavigationHelpers, NavigationActions } from 'react-navigation'

class StackView extends Component {
  renderActiveScreen() {
    const { navigation, router } = this.props
    const { routes, index } = navigation.state

    let childNavigation = { dispatch: navigation.dispatch, state: routes[index] }
    childNavigation = addNavigationHelpers(childNavigation)

    const ActiveScreen = router.getComponentForRouteName(routes[index].routeName)

    return <ActiveScreen navigation={childNavigation} />
  }

  renderNavigationBar() {

  }

  render() {
    return (
      <View>
        {this.renderNavigationBar()}
        {this.renderActiveScreen()}
      </View>
    )
  }
}

export default StackView