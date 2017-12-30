import React from 'react'
import { View, ViewPropTypes, TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'
import FastImage from 'react-native-fast-image'

import { Heading2, Heading3 } from '../../.'
import styles from './styles'

const ItemCard = ({ item, style, onPress }) => (
  <TouchableWithoutFeedback onPress={() => onPress(item)}>
    <View style={[styles.container, style]}>
      {console.log(item)}

      {/*<FastImage*/}
      {/*style={styles.image}*/}
      {/*source={{ uri: imageUri }}*/}
      {/*resizeMode={FastImage.resizeMode.cover}*/}
      {/*/>*/}

      <LinearGradient
        colors={['rgba(36, 43, 55, 0)', 'rgba(37, 37, 42, 1)']}
        style={styles.gradientOverlay}
      />

      <Heading2 style={styles.title}>{item.title}</Heading2>
      <Heading3 style={styles.description} numberOfLines={2}>{item.description}</Heading3>
      <Heading2 style={styles.price}>{item.price}</Heading2>
    </View>
  </TouchableWithoutFeedback>
)

ItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.string
  }).isRequired,
  style: ViewPropTypes.style,
  onPress: PropTypes.func
}

ItemCard.defaultProps = {
  style: null,
  onPress: null
}

export default ItemCard