import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import { SvgIcon } from '../.'

class CircularButton extends Component {
  buttonStyle() {
    return [styles.button, { padding: this.padding() }, this.props.style]
  }

  padding() {
    return this.props.small ? 5 : 10
  }

  iconSize() {
    return this.props.small ? 10 : 18
  }

  hitSlop() {
    // Make sure the clickable area is at least 45x45.
    const value = 45 - this.iconSize() - (2 * this.padding())

    return { top: value, bottom: value, left: value, right: value }
  }

  render() {
    const { onPress, disabled, iconFill, iconData } = this.props

    return (
      <TouchableOpacity
        style={this.buttonStyle()}
        onPress={onPress}
        disabled={disabled}
        hitSlop={this.hitSlop()}
      >
        <SvgIcon iconData={iconData} fill={iconFill} width={this.iconSize()} height={this.iconSize()} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderRadius: 999
  }
})

CircularButton.propTypes = {
  style: ViewPropTypes.style,
  onPress: PropTypes.func,
  disabled: PropTypes.bool,
  iconFill: PropTypes.string.isRequired,
  iconData: PropTypes.shape({
    shape: PropTypes.node,
    viewBox: PropTypes.string
  }).isRequired,
  small: PropTypes.bool
}

CircularButton.defaultProps = {
  style: null,
  onPress: null,
  disabled: false,
  small: false
}

export default CircularButton