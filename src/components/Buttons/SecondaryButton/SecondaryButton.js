import React from 'react'
import {
  ViewPropTypes
} from 'react-native'
import PropTypes from 'prop-types'
import { Button } from '../../.'
import styles from './styles'

const SecondaryButton = ({ title, onPress, style, iconSvgPath }) => (
  <Button
    title={title}
    onPress={onPress}
    style={[styles.container, style]}
    borderStyle={styles.border}
    iconSvgPath={iconSvgPath}
  />
)

SecondaryButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  style: ViewPropTypes.style,
  iconSvgPath: PropTypes.string
}

SecondaryButton.defaultProps = {
  title: '',
  onPress: null,
  style: null,
  iconSvgPath: null
}

export default SecondaryButton