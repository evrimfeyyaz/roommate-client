// @flow
import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'

import { ItemsInCategory, ItemDetails } from '../../components/index'
import * as RoomServiceScreenRedux from '../../redux/roomService/roomServiceScreen'
import * as RoomServiceCartRedux from '../../redux/roomService/roomServiceCart'
import type { ShoppingCartItem, ShoppingCategory, ShoppingItem } from '../../types/shopping'
import type { ApolloDataObject } from '../../types/apollo'
import { isCartEmpty } from '../../utils/shopping/cartHelpers'

type DispatchProps = {
  showRoomServiceItem: (item: ShoppingItem) => void,
  hideRoomServiceItem: () => void,
  addCartItemToRoomServiceCart: (cartItem: ShoppingCartItem) => void
}

type Props = {
  data?: {
    ...ApolloDataObject,
    roomServiceCategory: ShoppingCategory
  }
} & RoomServiceScreenRedux.State & RoomServiceCartRedux.State & DispatchProps

class RoomServiceItemsInCategory extends Component<Props> {
  addButtonPress = (cartItem: ShoppingCartItem) => {
    this.props.addCartItemToRoomServiceCart(cartItem)
    this.props.hideRoomServiceItem()
  }

  calculateNumOfColumns() {
    if (isCartEmpty(this.props.cart)) {
      return 4
    }

    return 3
  }

  render() {
    // Means query was skipped.
    if (this.props.data == null) {
      return null
    }

    const {
      data,
      showRoomServiceItem,
      hideRoomServiceItem,
      isSelectedRoomServiceItemVisible,
      selectedRoomServiceItem
    } = this.props
    const { loading, roomServiceCategory } = data
    const numOfColumns = this.calculateNumOfColumns()

    // TODO: Use a global activity indicator.
    if (loading) {
      return <ActivityIndicator />
    }

    return (
      <View style={styles.container}>
        <ItemsInCategory
          items={roomServiceCategory.items}
          onItemPress={showRoomServiceItem}
          numOfColumns={numOfColumns}
          key={`room-service-items-${numOfColumns}`} // This is needed to force re-render when changing `numOfColumns`.
        />

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
            onAddButtonPress={this.addButtonPress}
          />
        </Modal>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  modal: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemDetails: {
    width: '85%'
  }
})

const mapStateToProps = state => ({
  ...state.roomServiceScreen,
  cart: { ...state.roomServiceCart }
})

const mapDispatchToProps = dispatch => ({
  showRoomServiceItem: item => dispatch(RoomServiceScreenRedux.showItem(item)),
  hideRoomServiceItem: () => dispatch(RoomServiceScreenRedux.hideItem()),
  addCartItemToRoomServiceCart: cartItem => dispatch(RoomServiceCartRedux.addCartItem(cartItem))
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
        image1x
        image2x
        thumbnail1x
        thumbnail2x
        choices {
          id
          title
          minimumNumberOfSelections
          maximumNumberOfSelections
          defaultOptionId
          options {
            id
            title
            price
          }
        }
      }
    }
  }
`

const graphQlContainer = graphql(getRoomServiceCategoryWithItems, {
  skip: ownProps => ownProps.selectedRoomServiceCategoryId == null
})(RoomServiceItemsInCategory)

export default connect(mapStateToProps, mapDispatchToProps)(graphQlContainer)
