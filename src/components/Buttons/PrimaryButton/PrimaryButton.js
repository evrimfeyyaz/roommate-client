import React from 'react'
import { StyleSheet, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import { Button } from '../../.'

const PrimaryButton = ({ title, onPress, style }) => (
  <Button
    title={title}
    onPress={onPress}
    style={[styles.container, style]}
    gradientColors={['#c1b296', '#998263']}
  />
)

const styles = StyleSheet.create({
  container: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.3,
    elevation: 4
  }
})

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