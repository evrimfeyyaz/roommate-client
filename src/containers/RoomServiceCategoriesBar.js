// @flow
import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import type { OperationComponent } from 'react-apollo'

import { TabBar } from '../components/index'

const getRoomServiceCategories = gql`
  {
    roomServiceCategories {
      id
      title
    }
  }
`

type ShoppingCategory = {
  id: string,
  title: string
}

type Response = {
  categories: ShoppingCategory[]
}

type InputProps = {
  onCategoryPress: (categoryId: string) => void
}

const withRoomServiceCategories: OperationComponent<Response, InputProps> = graphql(getRoomServiceCategories)

/**
 * This container shows a small tab bar populated with all the
 * room service categories fetched from the GraphQL API.
 */
export default withRoomServiceCategories(({ data: { categories, loading }, onCategoryPress }) => {
  // TODO: Use a global activity indicator.
  if (loading) {
    return <ActivityIndicator />
  }

  return <TabBar onTabPress={onCategoryPress} data={categories} small />
})