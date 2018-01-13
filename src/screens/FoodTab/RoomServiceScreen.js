// @flow
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import RoomServiceCategoriesBar from '../../containers/RoomServiceCategoriesBar'
import RoomServiceItemsInCategory from '../../containers/RoomServiceItemsInCategory'
import type { SubTabScreenOptions } from '../../types/navigation'

class RoomServiceScreen extends Component<void> {
  static navigationOptions: SubTabScreenOptions = {
    title: 'Room Service',
    hideStackNavigationBar: true
  }

  render() {
    return (
      <View style={styles.container}>
        <RoomServiceCategoriesBar />
        <RoomServiceItemsInCategory />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  }
})

export default RoomServiceScreen