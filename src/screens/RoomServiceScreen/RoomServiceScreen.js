import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import { ItemsInCategory, Categories } from '../../components'

class RoomServiceScreen extends Component {
  static navigationOptions = {
    title: 'Room Service'
  }

  constructor(props) {
    super(props)

    this.onCategoryChange = this.onCategoryChange.bind(this)
  }

  state = {
    currentCategoryId: null
  }

  onCategoryChange(id) {
    this.setState({ currentCategoryId: id })
  }

  renderItemsInCategory() {
    const { currentCategoryId } = this.state

    if (currentCategoryId === null) {
      return null
    }

    return <ItemsInCategory id={currentCategoryId} />
  }

  render() {
    return (
      <View style={styles.container}>
        <Categories onCategoryChange={this.onCategoryChange} />
        {this.renderItemsInCategory()}
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