// @flow
import React from 'react'
import { ActivityIndicator } from 'react-native'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'

import { TabBar } from '../components/index'
import type { ShoppingCategory } from '../types/shopping'
import * as Redux from '../redux/roomServiceScreen'
import type { ApolloDataObject } from '../types/apollo'

type DispatchProps = {
  updateSelectedRoomServiceCategoryId: (categoryId: string) => void
}

type Props = {
  data: {
    ...ApolloDataObject,
    roomServiceCategories: ShoppingCategory[]
  }
} & DispatchProps & Redux.State


/**
 * This container shows a small tab bar populated with all the
 * room service categories fetched from the GraphQL API.
 */
const RoomServiceCategoriesBar = (props: Props) => {
  const { data, updateSelectedRoomServiceCategoryId, selectedRoomServiceCategoryId } = props
  const { loading, roomServiceCategories } = data

  // TODO: Use a global activity indicator.
  if (loading) {
    return <ActivityIndicator />
  }

  return (
    <TabBar
      onTabPress={updateSelectedRoomServiceCategoryId}
      data={roomServiceCategories}
      activeTabId={selectedRoomServiceCategoryId}
      small
    />
  )
}

const mapStateToProps = state => ({
  ...state.roomServiceScreen
})

const mapDispatchToProps = dispatch => ({
  updateSelectedRoomServiceCategoryId: categoryId => dispatch(Redux.updateSelectedRoomServiceCategoryId(categoryId))
})

const getRoomServiceCategories = gql`
  {
    roomServiceCategories {
      id
      title
    }
  }
`

const graphQlContainer = graphql(getRoomServiceCategories)(RoomServiceCategoriesBar)

export default connect(mapStateToProps, mapDispatchToProps)(graphQlContainer)