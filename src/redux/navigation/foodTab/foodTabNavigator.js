/**
 * The navigation state inside the main food tab.
 */

import { NavigationActions } from 'react-navigation'

import FoodTabNavigator from '../../../navigators/FoodTab/FoodTabNavigator'

const initialState = FoodTabNavigator.router.getStateForAction(NavigationActions.init())

export default function reducer(state = initialState, action) {
  const nextState = FoodTabNavigator.router.getStateForAction(action, state)

  return nextState || state
}