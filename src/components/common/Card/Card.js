import React, { Component } from 'react'
import {
  Text,
  View,
  ViewPropTypes
} from 'react-native'

import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'

import styles from './styles'

class Card extends Component {
  backgroundStyle() {
    return [
      styles.gradientBackground,
      { opacity: this.props.backgroundOpacity }
    ]
  }

  render() {
    const { backgroundColors, style, children } = this.props

    return (
      <View style={[styles.container, style]}>
        <LinearGradient
          colors={backgroundColors}
          style={styles.gradientBackground}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
        />
        {children}
      </View>
    )
  }
}

Card.propTypes = {
  style: ViewPropTypes.style,
  backgroundColors: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
  backgroundOpacity: PropTypes.number
}

Card.defaultProps = {
  style: null,
  backgroundColors: null,
  children: null,
  backgroundOpacity: 1
}

export default Card