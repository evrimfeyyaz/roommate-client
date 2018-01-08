// @flow
import React, { Component } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import { ItemCard } from '../.'
import type { ShoppingItem } from '../../types/shopping'

type Props = {
  items: ShoppingItem[],
  onItemPress: (ShoppingItem) => void
}

class ShoppingItemsInCategory extends Component<Props> {
// eslint-disable-next-line react/no-unused-prop-types
  renderItem = ({ item }: { item: ShoppingItem }) => (
    <ItemCard item={item} style={styles.item} onPress={this.props.onItemPress} />
  )

  render() {
    const { items } = this.props

    return (
      <View>
        <FlatList
          data={items}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          numColumns={3}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  item: {
    margin: 8
  }
})

export default ShoppingItemsInCategory