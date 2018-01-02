import React, { Component } from 'react'
import { StyleSheet, View, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'

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

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowRadius: 14,
    shadowOpacity: 0.2,
    elevation: 18
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10
  }
})

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