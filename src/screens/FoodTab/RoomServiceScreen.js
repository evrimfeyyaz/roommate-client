// @flow
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import RoomServiceCategoriesBar from '../../containers/RoomServiceCategoriesBar'
import RoomServiceItemsInCategory from '../../containers/RoomServiceItemsInCategory'
import type { SubTabScreenOptions } from '../../types/navigation'
import RoomServiceCart from '../../containers/RoomServiceCart'

class RoomServiceScreen extends Component<void> {
  static navigationOptions: SubTabScreenOptions = {
    title: 'Room Service',
    hideStackNavigationBar: true
  }

  render() {
    return (
      <View style={styles.container}>
        <RoomServiceCategoriesBar />
        <View style={styles.itemsAndCartContainer}>
          <RoomServiceItemsInCategory />
          <RoomServiceCart />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  itemsAndCartContainer: {
    flexDirection: 'row',
    flex: 1
  }
})

export default RoomServiceScreen