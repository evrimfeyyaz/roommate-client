export type ShoppingCategory = {
  id: string,
  title: string,
  items?: ShoppingItem[]
}

export type ShoppingItem = {
  id: string,
  title: string,
  description?: ?string,
  price: ?string,
  image1x?: ?string,
  image2x?: ?string,
  thumbnail1x?: ?string,
  thumbnail2x?: ?string,
  choices?: ?ShoppingItemChoice[]
}

export type ShoppingItemChoice = {
  id: string,
  title: string,
  minimumNumberOfSelections?: ?number,
  maximumNumberOfSelections?: ?number,
  defaultOptionId?: ?string,
  options: ShoppingItemChoiceOption[]
}

export type ShoppingItemChoiceOption = {
  id: string,
  title: string,
  price?: ?string
}

export type ShoppingCartItem = {
  id: string,
  item: ShoppingItem,
  quantity: number,
  selectedOptions: ?ShoppingItemChoiceOption[]
}

export type ShoppingCart = {
  cartItems: {
    [id: string]: ShoppingCartItem
  },
  specialRequest: ?string,
  // The values below use underscores, because these are the values
  // we use in our Rails back-end. It's probably a better idea to
  // define these payment options as dynamic items in the database
  // at one point.
  paymentOption: 'room_bill' | 'credit_card_on_delivery' | 'cash_on_delivery'
}