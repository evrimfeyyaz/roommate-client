import React, { Component } from 'react'
import { StyleSheet, Text, TouchableWithoutFeedback, View, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'

import { SvgIcon } from '../../.'
import colors from '../../../config/colors'

// TODO: Give this a better name or make it a HOC.
class Button extends Component {
  renderGradientBackground() {
    if (this.props.gradientColors === null) {
      return null
    }

    return <LinearGradient colors={this.props.gradientColors} style={styles.gradientContainer} />
  }

  renderIcon() {
    const { iconData } = this.props

    if (iconData === null) {
      return null
    }

    return (<SvgIcon
      style={styles.icon}
      height={15}
      width={15}
      fill={colors.icon}
      iconData={iconData}
    />)
  }

  render() {
    const { onPress, style, titleStyle, title, borderStyle } = this.props

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={[styles.container, style]}>
          {this.renderGradientBackground()}

          {this.renderIcon()}
          <Text style={[styles.title, titleStyle]}>{title}</Text>

          <View style={[styles.borderContainer, borderStyle]} />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 999,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  icon: {
    marginRight: 10
  },
  title: {
    textAlign: 'center',
    color: '#fff',
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  gradientContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 999
  },
  borderContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 999
  }
})

Button.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  gradientColors: PropTypes.arrayOf(PropTypes.string),
  style: ViewPropTypes.style,
  titleStyle: Text.propTypes.style,
  borderStyle: ViewPropTypes.style,
  iconData: PropTypes.shape({
    shape: PropTypes.node.isRequired,
    viewBox: PropTypes.string.isRequired
  })
}

Button.defaultProps = {
  title: '',
  onPress: null,
  style: null,
  titleStyle: null,
  borderStyle: null,
  gradientColors: null,
  iconData: null
}

export default Button