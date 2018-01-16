// @flow
import React, { Component } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import { ItemCard } from '../.'
import type { ShoppingItem } from '../../types/shopping'

type Props = {
  items: ShoppingItem[],
  onItemPress: (ShoppingItem) => void,
  numOfColumns: number
}

class ItemsInCategory extends Component<Props> {
// eslint-disable-next-line react/no-unused-prop-types
  renderItem = ({ item }: { item: ShoppingItem }) => (
    <ItemCard item={item} style={styles.item} onPress={this.props.onItemPress} />
  )

  render() {
    const { items, numOfColumns } = this.props

    return (
      <FlatList
        data={items}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
        numColumns={numOfColumns}
        contentContainerStyle={styles.contentContainer}
      />
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 24
  },
  item: {
    marginBottom: 15,
    marginRight: 15
  }
})

export default ItemsInCategory