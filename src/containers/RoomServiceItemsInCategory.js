// @flow
import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'

import { ItemsInCategory, ItemDetails } from '../components'
import * as Redux from '../redux/roomServiceScreen'
import type { ShoppingCategory, ShoppingItem } from '../types/shopping'
import type { ApolloDataObject } from '../types/apollo'

type DispatchProps = {
  showRoomServiceItem: (item: ShoppingItem) => void,
  hideRoomServiceItem: () => void
}

type Props = {
  data?: {
    ...ApolloDataObject,
    roomServiceCategory: ShoppingCategory
  }
} & Redux.State & DispatchProps

const RoomServiceItemsInCategory = (props: Props) => {
  // Means query was skipped.
  if (props.data == null) {
    return null
  }

  const {
    data,
    showRoomServiceItem,
    hideRoomServiceItem,
    isSelectedRoomServiceItemVisible,
    selectedRoomServiceItem
  } = props
  const { loading, roomServiceCategory } = data

  // TODO: Use a global activity indicator.
  if (loading) {
    return <ActivityIndicator />
  }

  return (
    <View style={styles.container}>
      <ItemsInCategory items={roomServiceCategory.items} onItemPress={showRoomServiceItem} />

      <Modal
        isVisible={isSelectedRoomServiceItemVisible}
        animationInTiming={150}
        animationOutTiming={150}
        backdropTransitionInTiming={150}
        backdropTransitionOutTiming={150}
        onBackdropPress={hideRoomServiceItem}
        backdropColor="#131519"
        backdropOpacity={0.9}
        style={styles.modal}
      >
        <ItemDetails
          item={selectedRoomServiceItem}
          onCloseButtonPress={hideRoomServiceItem}
          style={styles.itemDetails}
        />
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemDetails: {
    width: '85%'
  }
})

const mapStateToProps = state => ({
  ...state.roomServiceScreen
})

const mapDispatchToProps = dispatch => ({
  showRoomServiceItem: item => dispatch(Redux.showRoomServiceItem(item)),
  hideRoomServiceItem: () => dispatch(Redux.hideRoomServiceItem())
})

const getRoomServiceCategoryWithItems = gql`
  query getRoomServiceCategoryWithItems($selectedRoomServiceCategoryId: ID!) {
    roomServiceCategory(id: $selectedRoomServiceCategoryId) {
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

const graphQlContainer = graphql(getRoomServiceCategoryWithItems, {
  skip: ownProps => ownProps.selectedRoomServiceCategoryId == null
})(RoomServiceItemsInCategory)

export default connect(mapStateToProps, mapDispatchToProps)(graphQlContainer)
