import { NavigationActions } from 'react-navigation'

import MainNavigator from '../../navigators/MainNavigator'

const initialState = MainNavigator.router.getStateForAction(NavigationActions.init())

export default function reducer(state = initialState, action) {
  const nextState = MainNavigator.router.getStateForAction(action, state)

  return nextState || state
}