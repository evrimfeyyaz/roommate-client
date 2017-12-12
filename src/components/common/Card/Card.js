import React, { Component } from 'react'
import {
  Text,
  View,
  ViewPropTypes
} from 'react-native'

import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'

import styles from './styles'

const Card = ({ backgroundColors, style, children }) => {
  return (
    <LinearGradient
      colors={backgroundColors}
      style={[styles.container, style]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 1 }}
    >
      {children}
    </LinearGradient>
  )
}

Card.propTypes = {
  style: ViewPropTypes.style,
  backgroundColors: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node
}

Card.defaultProps = {
  style: null,
  backgroundColors: null,
  children: null
}

export default Card