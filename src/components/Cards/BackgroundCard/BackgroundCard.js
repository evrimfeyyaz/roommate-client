import React, { Component } from 'react'
import { View, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'

import styles from './styles'

// TODO: Find a better name. Maybe ContainerCard?
class BackgroundCard extends Component {
  gradientBackgroundStyle() {
    return [styles.gradientBackground, { opacity: this.props.backgroundOpacity }]
  }

  render() {
    const { children, style } = this.props
    return (
      <View style={[styles.container, style]}>
        <LinearGradient
          colors={['rgba(47, 56, 70, 1)', 'rgba(35, 42, 54, 1)']}
          style={this.gradientBackgroundStyle()}
        />
        {children}
      </View>
    )
  }
}


BackgroundCard.propTypes = {
  style: ViewPropTypes.style,
  children: PropTypes.node,
  backgroundOpacity: PropTypes.number
}

BackgroundCard.defaultProps = {
  style: null,
  children: null,
  backgroundOpacity: 1
}

export default BackgroundCard