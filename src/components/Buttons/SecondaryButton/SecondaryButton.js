import React from 'react'
import {
  ViewPropTypes
} from 'react-native'
import PropTypes from 'prop-types'
import { Button } from '../../.'
import styles from './styles'

const SecondaryButton = ({ title, onPress, style, iconData }) => (
  <Button
    title={title}
    onPress={onPress}
    style={[styles.container, style]}
    borderStyle={styles.border}
    iconData={iconData}
  />
)

SecondaryButton.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  style: ViewPropTypes.style,
  iconData: PropTypes.shape({
    shape: PropTypes.node.isRequired,
    viewBox: PropTypes.string.isRequired
  })
}

SecondaryButton.defaultProps = {
  title: '',
  onPress: null,
  style: null,
  iconData: null
}

export default SecondaryButton