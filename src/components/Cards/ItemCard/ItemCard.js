import React from 'react'
import { ViewPropTypes, TouchableWithoutFeedback, Platform, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import FastImage from 'react-native-fast-image'

import { Heading2, Heading3, BackgroundCard } from '../../.'

const ItemCard = ({ item, style, onPress }) => (
  <TouchableWithoutFeedback onPress={() => onPress(item)}>
    <BackgroundCard style={[styles.container, style]}>
      <Heading2 style={styles.title}>{item.title}</Heading2>
      <Heading3 style={styles.description} numberOfLines={2}>{item.description}</Heading3>
      <Heading2 style={styles.price}>{item.price}</Heading2>
    </BackgroundCard>
  </TouchableWithoutFeedback>
)

const styles = StyleSheet.create({
  container: {
    height: 240,
    width: 200,
    borderRadius: 10,
    padding: 15,
    paddingTop: 135,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowRadius: 14,
    shadowOpacity: 0.2,
    elevation: 18,
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