import MainNavigator from '../navigation/navigators/MainNavigator'

const initialState = MainNavigator.router.getStateForAction(MainNavigator.router.getActionForPathAndParams('Home'))

export default function reducer(state = initialState, action) {
  const nextState = MainNavigator.router.getStateForAction(action, state)

  return nextState || state
}