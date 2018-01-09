wimport React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import Modal from 'react-native-modal'

import { ItemsInCategory, Categories, ItemDetails } from '../../components'

class RoomServiceScreen extends Component {
  static navigationOptions = {
    title: 'Room Service'
  }

  constructor(props) {
    super(props)

    this.onCategoryChange = this.onCategoryChange.bind(this)
    this.onItemPress = this.onItemPress.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }

  state = {
    currentCategoryId: null,
    isItemDetailsVisible: false,
    currentItem: null
  }

  onCategoryChange(id) {
    this.setState({ currentCategoryId: id })
  }

  onItemPress(currentItem) {
    this.setState({ isItemDetailsVisible: true, currentItem })
  }

  hideModal() {
    this.setState({ isItemDetailsVisible: false })
  }

  renderItemsInCategory() {
    const { currentCategoryId } = this.state

    if (currentCategoryId === null) {
      return null
    }

    return <ItemsInCategory id={currentCategoryId} onItemPress={this.onItemPress} />
  }

  render() {
    return (
      <View style={styles.container}>
        <Categories onCategoryChange={this.onCategoryChange} />
        {this.renderItemsInCategory()}

        <Modal
          isVisible={this.state.isItemDetailsVisible}
          animationInTiming={150}
          animationOutTiming={150}
          backdropTransitionInTiming={150}
          backdropTransitionOutTiming={150}
          onBackdropPress={this.hideModal}
          backdropColor="#131519"
          backdropOpacity={0.9}
          style={styles.modal}
        >
          <ItemDetails item={this.state.currentItem} onCloseButtonPress={this.hideModal} style={styles.itemDetails} />
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

export default RoomServiceScreen