export type ShoppingCategory = {
  id: string,
  title: string,
  items?: ShoppingItem[]
}

export type ShoppingItem = {
  id: string,
  title: string,
  description?: ?string,
  price?: ?string
}

export type ShoppingCartItem = {
  id: string,
  item: ShoppingItem,
  quantity: number
}

export type ShoppingCart = {
  cartItems: {
    [string]: ShoppingCartItem
  },
  specialRequest: ?string,
  paymentOption: 'room-bill' | 'credit-card-on-deliver' | 'cash-on-delivery'
}