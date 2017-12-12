import React from 'react'
import {
  ViewPropTypes
} from 'react-native'

import PropTypes from 'prop-types'
import { Button } from '../common'

import styles from './styles'

const PrimaryButton = ({ title, onPress, style }) => (
  <Button
    title={title}
    onPress={onPress}
    style={[styles.container, style]}
    gradientColors={['#c1b296', '#998263']}
  />
)

PrimaryButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  style: ViewPropTypes.style
}

PrimaryButton.defaultProps = {
  title: '',
  onPress: null,
  style: null
}

export default PrimaryButton