import React from 'react'
import { StyleSheet, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import { Button } from '../../.'

const SecondaryButton = ({ title, onPress, style, iconData }) => (
  <Button
    title={title}
    onPress={onPress}
    style={[styles.container, style]}
    borderStyle={styles.border}
    iconData={iconData}
  />
)

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  border: {
    borderColor: '#fff',
    borderWidth: 1,
    opacity: 0.1
  }
})

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