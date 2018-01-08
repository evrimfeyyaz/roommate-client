// @flow
import React from 'react'
import { ViewPropTypes, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'

import { Heading2, Heading3, Card } from '../index'
import type { ShoppingItem } from '../../types/shopping'

type Props = {
  item: ShoppingItem,
  onPress: (item: ShoppingItem) => void,
  style?: ViewPropTypes.style,
}

// TODO: Add back the FastImage component.
const ItemCard = ({ item, style, onPress }: Props) => (
  <TouchableOpacity onPress={() => onPress(item)}>
    <Card style={[styles.container, style]}>
      <Heading2 style={styles.title}>{item.title}</Heading2>
      <Heading3 style={styles.description} numberOfLines={2}>{item.description}</Heading3>
      <Heading2 style={styles.price}>{item.price}</Heading2>
    </Card>
  </TouchableOpacity>
)

ItemCard.defaultProps = {
  style: null
}

const styles = StyleSheet.create({
  container: {
    height: 240,
    width: 200,
    borderRadius: 10,
    padding: 15,
    paddingTop: 135,
    // Following is required because the FastImage component overflows on Android,
    // and hiding the overflow on iOS also hides the shadow.
    // FIXME: This should be fixed in a newer version of RN, check this again after updating.
    overflow: Platform.OS === 'ios' ? 'visible' : 'hidden'
  },
  title: {
    marginBottom: 3
  },
  description: {
    marginBottom: 5,
    flex: 1
  },
  price: {
    textAlign: 'right'
  },
  image: {
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
})

export default ItemCard