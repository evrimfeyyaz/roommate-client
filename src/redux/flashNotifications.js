// @flow
import wait from '../utils/wait'
import type { FlashNotificationData } from '../components/misc/FlashNotification'

/**
 * The amount of time in milliseconds the flash notification
 * will stay on screen unless the user closes it.
 */
const FLASH_DURATION = 5000

const ADD_NOTIFICATION = 'roommate/flashNotifications/ADD_NOTIFICATION'
const REMOVE_NOTIFICATION = 'roommate/flashNotifications/REMOVE_NOTIFICATION'
const FLASH_NOTIFICATION = 'roommate/flashNotifications/FLASH_NOTIFICATION'

export type State = {
  +notifications: {
    [id: string]: FlashNotificationData
  }
}

type AddNotificationAction = { type: typeof ADD_NOTIFICATION, notification: FlashNotificationData }
type RemoveNotificationAction = { type: typeof REMOVE_NOTIFICATION, id: string }
type FlashNotificationAction = { type: typeof FLASH_NOTIFICATION, notification: FlashNotificationData }

export type Action =
  | AddNotificationAction
  | RemoveNotificationAction
  | FlashNotificationAction

type GetState = () => State
type PromiseAction = Promise<Action>
type ThunkAction = (dispatch: Dispatch, getState: GetState) => any
type Dispatch = (action: Action | ThunkAction | PromiseAction | Array<Action>) => any

const initialState: State = {
  notifications: {}
}

// REDUCERS

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case ADD_NOTIFICATION:
      return {
        ...state,
        notifications: {
          ...state.notifications,
          [action.notification.id]: action.notification
        }
      }
    case REMOVE_NOTIFICATION: {
      const idToRemove = action.id

      const notifications = { ...state.notifications }
      delete notifications[idToRemove]

      return { ...state, notifications }
    }
    default:
      return state
  }
}

// ACTION CREATORS

export function addNotification(notification: FlashNotificationData): AddNotificationAction {
  return { type: ADD_NOTIFICATION, notification }
}

export function removeNotification(id: string): RemoveNotificationAction {
  return { type: REMOVE_NOTIFICATION, id }
}

/**
 * Puts a notification in the store for a certain period of time, then removes it.
 */
export function flashNotification(notification: FlashNotificationData): ThunkAction {
  return (dispatch) => {
    dispatch(addNotification(notification))

    return wait(FLASH_DURATION).then(() => {
      dispatch(removeNotification(notification.id))
    })
  }
}