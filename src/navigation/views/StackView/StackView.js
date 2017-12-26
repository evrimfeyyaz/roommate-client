import React, { Component } from 'react'
import { View } from 'react-native'
import { PropTypes } from 'prop-types'
import { addNavigationHelpers, NavigationActions } from 'react-navigation'

import { NavigationBar } from '../../../components'

class StackView extends Component {
  constructor(props) {
    super(props)

    this.goBack = this.goBack.bind(this)
  }

  renderActiveScreen() {
    const { navigation, router } = this.props
    const { routes, index } = navigation.state

    let childNavigation = { dispatch: navigation.dispatch, state: routes[index] }
    childNavigation = addNavigationHelpers(childNavigation)

    const ActiveScreen = router.getComponentForRouteName(routes[index].routeName)

    return <ActiveScreen navigation={childNavigation} />
  }

  goBack() {
    this.props.navigation.goBack(null)
  }

  renderNavigationBar() {
    return <NavigationBar title="Test" onBackButtonPress={this.goBack} />
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