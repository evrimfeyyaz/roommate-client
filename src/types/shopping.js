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