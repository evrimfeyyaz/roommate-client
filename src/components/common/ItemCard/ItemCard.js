import React from 'react'
import {
  View
} from 'react-native'

import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image'

import {
  Heading2,
  Heading3
} from '../.'
import styles from './styles'

const ItemCard = ({ imageUri, title, description, price }) => (
  <View style={styles.container}>
    <FastImage
      style={styles.image}
      source={{ uri: imageUri }}
      resizeMode={FastImage.resizeMode.cover}
    />

    <LinearGradient
      colors={['rgba(36, 43, 55, 0)', 'rgba(37, 37, 42, 1)']}
      style={styles.gradientOverlay}
    />

    <Heading2 style={styles.title}>{title}</Heading2>
    <Heading3 style={styles.description} numberOfLines={2}>{description}</Heading3>
    <Heading2 style={styles.price}>{price}</Heading2>
  </View>
)

ItemCard.propTypes = {
  imageUri: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  price: PropTypes.string
}

ItemCard.defaultProps = {
  imageUri: null,
  description: null,
  price: '0'
}

export default ItemCard