// @flow
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'

import { ItemDetails } from '../components/index'
import RoomServiceCategoriesBar from '../containers/RoomServiceCategoriesBar'
import RoomServiceItemsInCategory from '../containers/RoomServiceItemsInCategory'
import type { SubTabScreenOptions } from '../types/navigation'
import * as Redux from '../redux/roomServiceScreen'
import type { ShoppingItem } from '../types/shopping'

type DispatchProps = {
  updateSelectedRoomServiceCategoryId: (categoryId: string) => void,
  showRoomServiceItem: (item: ShoppingItem) => void,
  hideRoomServiceItem: () => void
}

type Props = Redux.State & DispatchProps

class RoomServiceScreen extends Component<Props> {
  static navigationOptions: SubTabScreenOptions = {
    title: 'Room Service'
  }

  renderItemsInCategory() {
    const { selectedRoomServiceCategoryId, showRoomServiceItem } = this.props

    if (selectedRoomServiceCategoryId == null) {
      return null
    }

    return (
      <RoomServiceItemsInCategory
        categoryId={selectedRoomServiceCategoryId}
        onItemPress={showRoomServiceItem}
      />
    )
  }

  render() {
    const {
      updateSelectedRoomServiceCategoryId,
      hideRoomServiceItem,
      selectedRoomServiceItem,
      isSelectedRoomServiceItemVisible
    } = this.props

    return (
      <View style={styles.container}>
        <RoomServiceCategoriesBar onCategoryPress={updateSelectedRoomServiceCategoryId} />
        {this.renderItemsInCategory()}

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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
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
  updateSelectedRoomServiceCategoryId: categoryId => dispatch(Redux.updateSelectedRoomServiceCategoryId(categoryId)),
  showRoomServiceItem: item => dispatch(Redux.showRoomServiceItem(item)),
  hideRoomServiceItem: () => dispatch(Redux.hideRoomServiceItem())
})

export default connect(mapStateToProps, mapDispatchToProps)(RoomServiceScreen)