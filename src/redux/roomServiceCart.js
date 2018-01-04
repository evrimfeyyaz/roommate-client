const LOAD = 'roommate/roomServiceCart/LOAD'
const ADD_CART_ITEM = 'roommate/roomServiceCart/ADD_CART_ITEM'

const initialState = {
  cartItems: [],
  specialRequest: null
}

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return state
    case ADD_CART_ITEM:
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          action.cartItem
        ]
      }
    default:
      return state
  }
}

export function loadRoomServiceCart() {
  return { type: LOAD }
}

export function addCartItemToRoomServiceCart(cartItem) {
  return { type: ADD_CART_ITEM, cartItem }
}