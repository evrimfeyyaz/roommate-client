// @flow
import React, { Component } from 'react'
import { ActivityIndicator, LayoutAnimation } from 'react-native'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'

import { TabBar } from '../../components/index'
import type { ShoppingCategory } from '../../types/shopping'
import * as Redux from '../../redux/roomService/roomServiceScreen'
import type { ApolloDataObject } from '../../types/apollo'

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
class RoomServiceCategoriesBar extends Component<Props> {
  componentWillReceiveProps(nextProps) {
    const {
      data: { loading, roomServiceCategories },
      updateSelectedRoomServiceCategoryId,
      selectedRoomServiceCategoryId
    } = nextProps

    // Select the first category if no category is selected yet.
    if (!loading && selectedRoomServiceCategoryId == null) {
      updateSelectedRoomServiceCategoryId(roomServiceCategories[0].id)
    }
  }

  render() {
    const { data, updateSelectedRoomServiceCategoryId, selectedRoomServiceCategoryId } = this.props
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
}

const mapStateToProps = state => ({
  ...state.roomServiceScreen
})

const mapDispatchToProps = dispatch => ({
  updateSelectedRoomServiceCategoryId: categoryId => dispatch(Redux.updateSelectedCategoryId(categoryId))
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