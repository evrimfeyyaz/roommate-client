/**
 * The navigation state for the home page of the main food tab.
 */

import { NavigationActions } from 'react-navigation'

import FoodTabHomeNavigator from '../../../navigators/FoodTab/FoodTabHomeNavigator'

const initialState = FoodTabHomeNavigator.router.getStateForAction(NavigationActions.init())

export default function reducer(state = initialState, action) {
  const nextState = FoodTabHomeNavigator.router.getStateForAction(action, state)

  return nextState || state
}