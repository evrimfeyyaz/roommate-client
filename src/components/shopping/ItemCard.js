// @flow
import React, { Component, Fragment } from 'react'
import { View, ViewPropTypes, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'

import { Heading2, Heading3, Card, SvgIcon } from '../.'
import colors from '../../config/colors'
import * as icons from '../../../assets/iconData'
import type { ShoppingItem } from '../../types/shopping'
import { getThumbnailUrlFromItem } from '../../utils/shoppingHelpers'

type Props = {
  item: ShoppingItem,
  onPress: (item: ShoppingItem) => void,
  style?: ViewPropTypes.style,
}

class ItemCard extends Component<Props> {
  renderThumbnail() {
    const thumbnailUrl = getThumbnailUrlFromItem(this.props.item)

    if (thumbnailUrl != null) {
      return (
        <Fragment>
          <FastImage
            style={styles.image}
            source={{ uri: thumbnailUrl }}
            resizeMode={FastImage.resizeMode.cover}
          />

          <LinearGradient
            colors={colors.itemCardGradientColors}
            style={styles.gradientOverlay}
          />
        </Fragment>
      )
    }

    return (
      <SvgIcon
        iconData={icons.food}
        fill={colors.primaryIcon}
        height={50}
        width={50}
        style={styles.foodIcon}
        opacity={0.3}
      />
    )
  }

  render() {
    const { item, style, onPress } = this.props

    return (
      <TouchableOpacity onPress={() => onPress(item)}>
        <Card style={[styles.container, style]}>
          <View style={styles.thumbnailContainer}>
            {this.renderThumbnail()}
          </View>

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
  thumbnailContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center'
  },
  image: {
    ...StyleSheet.absoluteFillObject
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject
  },
  foodIcon: {
    marginTop: 50
  }
})

export default ItemCard