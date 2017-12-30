import React from 'react'
import { TouchableOpacity, StyleSheet, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import { SvgIcon } from '../.'

const CircularButton = ({ style, onPress, disabled, iconFill, iconData }) => (
  <TouchableOpacity
    style={[styles.button, style]}
    onPress={onPress}
    disabled={disabled}
    hitSlop={{ top: 7, bottom: 7, left: 7, right: 7 }}
  >
    <SvgIcon iconData={iconData} fill={iconFill} width={18} height={18} />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  button: {
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderRadius: 999,
    padding: 10
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
  }).isRequired
}

CircularButton.defaultProps = {
  style: null,
  onPress: null,
  disabled: false
}

export default CircularButton