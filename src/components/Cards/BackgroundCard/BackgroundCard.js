import React from 'react'
import { View, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'

import styles from './styles'

const BackgroundCard = ({ children, style }) => (
  <View style={[styles.container, style]}>
    <LinearGradient
      colors={['rgba(47, 56, 70, 1)', 'rgba(35, 42, 54, 1)']}
      style={styles.gradientBackground}
    />
    {children}
  </View>
)

BackgroundCard.propTypes = {
  style: ViewPropTypes.style,
  children: PropTypes.node
}

BackgroundCard.defaultProps = {
  style: null,
  children: null
}

export default BackgroundCard