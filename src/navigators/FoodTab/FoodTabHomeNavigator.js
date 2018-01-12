// @flow
import React, { Component } from 'react'
import { addNavigationHelpers, TabRouter } from 'react-navigation'
import { connect } from 'react-redux'
import type { Dispatch } from 'redux'
import type { NavigationState } from 'react-navigation'

import RoomServiceScreen from '../../screens/FoodTab/RoomServiceScreen'
import TabView from '../../navigation/views/TabView/TabView'
import RestaurantsScreen from '../../screens/FoodTab/RestaurantsScreen'

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
const FoodTabHomeNavigator = (props: Props) => {
  const navigation = addNavigationHelpers({
    dispatch: props.dispatch,
    state: props.foodTabHomeNavigation
  })

  return <TabView router={FoodTabHomeRouter} navigation={navigation} />
}
FoodTabHomeNavigator.router = FoodTabHomeRouter

const mapStateToProps = state => ({
  foodTabHomeNavigation: state.foodTabHomeNavigator
})

export default connect(mapStateToProps)(FoodTabHomeNavigator)