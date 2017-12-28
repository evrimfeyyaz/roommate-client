import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import { ItemsInCategory, Categories } from '../../components'

class RoomServiceScreen extends Component {
  static navigationOptions = {
    title: 'Room Service'
  }

  render() {
    return (
      <View style={styles.container}>
        <Categories onCategoryChange={() => {}} />
        {/*<ItemsInCategory id="962967c5-dcd2-4eff-b4a9-0bc17707c0f0" />*/}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default RoomServiceScreen