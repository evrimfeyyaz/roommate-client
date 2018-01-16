// @flow
import React, { Component } from 'react'
import { addNavigationHelpers, StackRouter } from 'react-navigation'
import { connect } from 'react-redux'
import type { Dispatch } from 'redux'
import type { NavigationState } from 'react-navigation'

import StackView from '../../components/navigation/StackView'
import FoodTabHomeNavigator from './FoodTabHomeNavigator'
import type { MainTabScreenOptions } from '../../types/navigation'
import * as icons from '../../../assets/iconData'
import ReviewRoomServiceOrderScreen from '../../screens/FoodTab/ReviewRoomServiceOrderScreen'

const FoodTabRouter = StackRouter({
  FoodTabHome: { screen: FoodTabHomeNavigator },
  ReviewRoomServiceOrder: { screen: ReviewRoomServiceOrderScreen }
}, {
  initialRouteName: 'FoodTabHome'
})

type Props = {
  dispatch: Dispatch,
  foodTabNavigation: NavigationState
}

/**
 * This is the navigator for the main "Food" tab.
 */
class FoodTabNavigator extends Component<Props> {
  static router = FoodTabRouter

  static navigationOptions: MainTabScreenOptions = {
    title: 'Food',
    iconData: icons.food
  }

  render() {
    const navigation = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.foodTabNavigation
    })

    return <StackView router={FoodTabRouter} navigation={navigation} />
  }
}

const mapStateToProps = state => ({
  foodTabNavigation: state.foodTabNavigator
})

export default connect(mapStateToProps)(FoodTabNavigator)