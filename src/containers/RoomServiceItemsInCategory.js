// @flow
import React from 'react'
import { ActivityIndicator } from 'react-native'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import type { OperationComponent } from 'react-apollo'

import { ItemsInCategory } from '../components'
import type { ShoppingCategory, ShoppingItem } from '../types/shopping'

const getRoomServiceCategoryWithItems = gql`
  query getRoomServiceCategoryWithItems($categoryId: ID!) {
    roomServiceCategory(id: $categoryId) {
      id
      items {
        id
        title
        description
        price
      }
    }
  }
`

type Response = {
  roomServiceCategory: ShoppingCategory
}

type InputProps = {
  categoryId: string,
  onItemPress: (ShoppingItem) => void
}

const withRoomServiceItems: OperationComponent<Response, InputProps> = graphql(getRoomServiceCategoryWithItems)

export default withRoomServiceItems(({ data: { roomServiceCategory, loading }, onItemPress }) => {
  // TODO: Use a global activity indicator.
  if (loading) {
    return <ActivityIndicator />
  }

  return <ItemsInCategory items={roomServiceCategory.items} onItemPress={onItemPress} />
})