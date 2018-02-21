import React from 'react'
import { View, ViewPropTypes, StyleSheet } from 'react-native'
import FastImage from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'

import type { ShoppingItem } from '../../types/shopping'
import { getImageUrlFromItem } from '../../utils/shopping/itemHelpers'
import colors from '../../config/colors'
import * as icons from '../../../assets/iconData'
import { SvgIcon } from '../.'

type Props = {
  item: ShoppingItem,
  style?: ViewPropTypes.style
}

const ItemImage = ({ item, style }: Props) => {
  const imageUrl = getImageUrlFromItem(item)

  if (imageUrl != null) {
    return (
      <View style={style}>
        <FastImage
          style={styles.image}
          source={{ uri: imageUrl }}
          resizeMode={FastImage.resizeMode.cover}
        />

        <LinearGradient
          style={styles.gradientOverlay}
          colors={colors.itemDetailImageGradientColors}
          locations={[0, 0.9, 1]}
        />
      </View>
    )
  }

  return (
    <View style={style}>
      <SvgIcon
        iconData={icons.food}
        fill={colors.primaryIcon}
        height={90}
        width={90}
        style={styles.foodIcon}
        opacity={0.3}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    bottom: 40
  },
  gradientOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 400
  },
  foodIcon: {
    marginTop: 120
  }
})

export default ItemImage