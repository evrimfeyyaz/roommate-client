// @flow
import type { ShoppingItem } from '../../types/shopping'

const UPDATE_SELECTED_CATEGORY_ID = 'roommate/roomServiceScreen/UPDATE_SELECTED_CATEGORY_ID'
const SHOW_ITEM = 'roommate/roomServiceScreen/SHOW_ITEM'
const HIDE_ITEM = 'roommate/roomServiceScreen/HIDE_ITEM'

export type State = {
  +selectedRoomServiceCategoryId: ?string,
  +selectedRoomServiceItem: ?ShoppingItem,
  +isSelectedRoomServiceItemVisible: boolean
}

type UpdateSelectedCategoryIdAction = { type: typeof UPDATE_SELECTED_CATEGORY_ID, categoryId: string }
type ShowItemAction = { type: typeof SHOW_ITEM, item: ShoppingItem }
type HideItemAction = { type: typeof HIDE_ITEM }

export type Action =
  | UpdateSelectedCategoryIdAction
  | ShowItemAction
  | HideItemAction

const initialState: State = {
  selectedRoomServiceCategoryId: null,
  selectedRoomServiceItem: null,
  isSelectedRoomServiceItemVisible: false
}

export default function reducer(state: State = initialState, action: Action) {
  switch (action.type) {
    case UPDATE_SELECTED_CATEGORY_ID:
      return {
        ...state,
        selectedRoomServiceCategoryId: action.categoryId
      }
    case SHOW_ITEM:
      return {
        ...state,
        selectedRoomServiceItem: action.item,
        isSelectedRoomServiceItemVisible: true
      }
    case HIDE_ITEM:
      return {
        ...state,
        isSelectedRoomServiceItemVisible: false
        // Don't set the `selectedRoomServiceItem` to `null` here.
        // The modal that shows the selected item disappears with an
        // animation, and setting the item to `null` before the end
        // of the animation causes issues.
      }
    default:
      return state
  }
}

/**
 * Updates the currently selected room service category on the room service screen.
 * @param categoryId
 */
export function updateSelectedCategoryId(categoryId: string): UpdateSelectedCategoryIdAction {
  return { type: UPDATE_SELECTED_CATEGORY_ID, categoryId }
}

export function showItem(item: ShoppingItem): ShowItemAction {
  return { type: SHOW_ITEM, item }
}

export function hideItem(): HideItemAction {
  return { type: HIDE_ITEM }
}