// @flow
import React, { Component } from 'react'
import { ViewPropTypes, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'

import { Heading2, Heading3, Card } from '../index'
import type { ShoppingItem } from '../../types/shopping'

type Props = {
  item: ShoppingItem,
  onPress: (item: ShoppingItem) => void,
  style?: ViewPropTypes.style,
}

class ItemCard extends Component<Props> {
  getThumbnailUrl() {
    // TODO: This should depend on the device's pixel density.
    return this.props.item.thumbnail2x
  }

  render() {
    const { item, style, onPress } = this.props

    return (
      <TouchableOpacity onPress={() => onPress(item)}>
        <Card style={[styles.container, style]}>
          <FastImage
            style={styles.image}
            source={{ uri: this.getThumbnailUrl() }}
          />

          <LinearGradient
            colors={['rgba(36, 43, 55, 0)', 'rgba(37, 37, 42, 1)']}
            style={styles.gradientOverlay}
          />

          <Heading2 style={styles.title}>{item.title}</Heading2>
          <Heading3 style={styles.description} numberOfLines={2}>{item.description}</Heading3>
          <Heading2 style={styles.price}>{item.price}</Heading2>
        </Card>
      </TouchableOpacity>
    )
  }
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
    ...StyleSheet.absoluteFillObject
  },
  gradientOverlay: {
    borderRadius: 10,
    ...StyleSheet.absoluteFillObject
  }
})

export default ItemCard