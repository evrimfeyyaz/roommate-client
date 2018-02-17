// @flow
import wait from '../utils/wait'

/**
 * The amount of time in milliseconds the loading view will
 * still show after we receive the "hide" command.
 */
const HIDE_DELAY = 500

const SHOW_ACTIVITY_INDICATOR = 'roommate/globalActivityIndicator/SHOW_ACTIVITY_SCREEN'
const HIDE_ACTIVITY_INDICATOR = 'roommate/globalActivityIndicator/HIDE_ACTIVITY_SCREEN'

export type State = {
  +visible: boolean,
  +message: ?string
}

type ShowActivityIndicatorAction = { type: typeof SHOW_ACTIVITY_INDICATOR, message: string }
type HideActivityIndicatorAction = { type: typeof HIDE_ACTIVITY_INDICATOR }

export type Action =
  | ShowActivityIndicatorAction
  | HideActivityIndicatorAction

type GetState = () => State
type PromiseAction = Promise<Action>
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any
type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any

const initialState: State = {
  visible: false,
  message: null
}

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case SHOW_ACTIVITY_INDICATOR:
      return {
        ...state,
        visible: true,
        message: action.message
      }
    case HIDE_ACTIVITY_INDICATOR:
      return {
        ...state,
        visible: false,
        message: null
      }
    default:
      return state
  }
}

/**
 * Shows the loading view with the given message.
 * @param message
 */
export function showActivityIndicator(message: string): ShowActivityIndicatorAction {
  return { type: SHOW_ACTIVITY_INDICATOR, message }
}

/**
 * Hides the loading view.
 */
export function hideActivityIndicator(): HideActivityIndicatorAction {
  return { type: HIDE_ACTIVITY_INDICATOR }
}

/**
 * Hides the loading view after a short delay to avoid flickering.
 */
export function hideActivityIndicatorWithDelay(): ThunkAction {
  return dispatch => (
    wait(HIDE_DELAY).then(() => {
      dispatch(hideActivityIndicator())
    })
  )
}