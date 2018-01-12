// @flow
import React, { Component } from 'react'
import { addNavigationHelpers, TabRouter } from 'react-navigation'
import { connect } from 'react-redux'
import type { Dispatch } from 'redux'
import type { NavigationState } from 'react-navigation'

import RoomServiceScreen from '../../screens/RoomServiceScreen'
import TabView from '../../navigation/views/TabView/TabView'
import RestaurantsScreen from '../../screens/RestaurantsScreen'

const FoodTabHomeRouter = TabRouter({
  RoomService: { screen: RoomServiceScreen },
  Restaurants: { screen: RestaurantsScreen }
}, {
  initialRouteName: 'RoomService'
})

type Props = {
  dispatch: Dispatch,
  foodTabHomeNavigation: NavigationState
}

/**
 * This is the navigator for the home page of the "Food" tab.
 */
class FoodTabHomeNavigator extends Component<Props> {
  static router = FoodTabHomeRouter

  static navigationOptions: {
    hideNavigationBar: true
  }

  render() {
    const navigation = addNavigationHelpers({
      dispatch: this.props.dispatch,
      state: this.props.foodTabHomeNavigation
    })

    return <TabView router={FoodTabHomeRouter} navigation={navigation} />
  }
}

const mapStateToProps = state => ({
  foodTabHomeNavigation: state.foodTabHomeNavigator
})

export default connect(mapStateToProps)(FoodTabHomeNavigator)