import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { PropTypes } from 'prop-types'
import { addNavigationHelpers } from 'react-navigation'

import { NavigationBar } from '../../../components'

class StackView extends Component {
  constructor(props) {
    super(props)

    this.goBack = this.goBack.bind(this)
  }

  getChildNavigation() {
    const { navigation } = this.props
    const { routes, index } = navigation.state

    let childNavigation = { dispatch: navigation.dispatch, state: routes[index] }
    childNavigation = addNavigationHelpers(childNavigation)

    return childNavigation
  }

  getScreenOptionsForActiveScreen() {
    const { navigation, router } = this.props
    const { routes, index } = navigation.state

    console.log(navigation.state)
    console.log('route: ' + routes[index])

    return router.getScreenOptions({ state: routes[index] })
  }

  goBack() {
    this.props.navigation.goBack(null)
  }

  renderNavigationBar() {
    const screenOptions = this.getScreenOptionsForActiveScreen()

    console.log(screenOptions)

    if (screenOptions.hideNavigationBar) {
      return null
    }

    return <NavigationBar title={screenOptions.title} onBackButtonPress={this.goBack} />
  }

  renderActiveScreen() {
    const { navigation, router } = this.props
    const { routes, index } = navigation.state

    const ActiveScreen = router.getComponentForRouteName(routes[index].routeName)

    return <ActiveScreen />
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderNavigationBar()}
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

export default StackView