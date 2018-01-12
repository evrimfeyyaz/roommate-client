// @flow
import React from 'react'
import { addNavigationHelpers, TabRouter } from 'react-navigation'
import { connect } from 'react-redux'
import type { Dispatch } from 'redux'
import type { NavigationState } from 'react-navigation'

import MainNavigationView from '../components/navigation/MainNavigationView'
import HomeScreen from '../screens/HomeScreen'
import FoodTabNavigator from './FoodTab/FoodTabNavigator'

const MainRouter = TabRouter({
  Home: { screen: HomeScreen },
  Food: { screen: FoodTabNavigator }
}, {
  initialRouteName: 'Home'
})

type Props = {
  dispatch: Dispatch,
  mainNavigation: NavigationState
}

const MainNavigator = (props: Props) => {
  const navigation = addNavigationHelpers({
    dispatch: props.dispatch,
    state: props.mainNavigation
  })

  return <MainNavigationView router={MainRouter} navigation={navigation} />
}
MainNavigator.router = MainRouter

const mapStateToProps = state => ({
  mainNavigation: state.mainNavigator
})

export default connect(mapStateToProps)(MainNavigator)