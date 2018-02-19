// @flow
import React, { Component } from 'react'
import { FlatList, StyleSheet, ViewPropTypes, View } from 'react-native'

import { ItemCard, Heading2 } from '../.'
import type { ShoppingCategory, ShoppingItem } from '../../types/shopping'
import {
  availabilityTimesMessage, isCurrentlyAvailable,
  utcHoursAndMinutesToLocaleTimeString
} from '../../utils/shopping/categoryHelpers'
import colors from '../../config/colors'

type Props = {
  category: ShoppingCategory,
  onItemPress: (ShoppingItem) => void,
  numOfColumns: number,
  style?: ?ViewPropTypes.style
}

class ItemsInCategory extends Component<Props> {
  static isLastColumn(index: number, numOfColumns: number) {
    return (index + 1) % numOfColumns === 0
  }

  // eslint-disable-next-line react/no-unused-prop-types
  renderItem = ({ item, index }: { item: ShoppingItem, index: number }) => {
    let style

    if (ItemsInCategory.isLastColumn(index, this.props.numOfColumns)) {
      style = [styles.item, styles.lastColumn]
    } else {
      style = [styles.item]
    }

    return <ItemCard item={item} style={style} onPress={this.props.onItemPress} />
  }

  renderUnavailableMessage() {
    const { category } = this.props

    if (isCurrentlyAvailable(category)) {
      return null
    }

    const message = availabilityTimesMessage(category, 'This category is only')

    return (
      <View style={styles.unavailableContainer}>
        <Heading2>{message}</Heading2>
      </View>
    )
  }

  render() {
    const { category: { items }, numOfColumns, style } = this.props

    return (
      <View>
        {this.renderUnavailableMessage()}

        <FlatList
          data={items}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          numColumns={numOfColumns}
          contentContainerStyle={styles.contentContainer}
          style={style}
        />
      </View>
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
  },
  unavailableContainer: {
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: colors.unavailableCategoryMessageBackground,
    borderRadius: 20,
    alignSelf: 'center'
  }
})

export default ItemsInCategory