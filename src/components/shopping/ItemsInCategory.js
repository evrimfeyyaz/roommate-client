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
  renderItem = ({ item, index }: { item: ShoppingItem, index: number }) => {
    let style

    if ((index + 1) % this.props.numOfColumns === 0) { // If this is the last column.
      style = [styles.item, styles.lastColumn]
    } else {
      style = [styles.item]
    }

    return <ItemCard item={item} style={style} onPress={this.props.onItemPress} />
  }

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

// TODO: This won't be needed after the update to RN 0.54.
// $FlowFixMe
const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 24
  },
  item: {
    marginBottom: 15,
    marginEnd: 15
  },
  lastColumn: {
    marginEnd: 0
  }
})

export default ItemsInCategory