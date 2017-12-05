import React from 'react'

import PropTypes from 'prop-types'
import { Button } from '../common'

import style from './style'

const PrimaryButton = ({ title, onPress }) => (
  <Button title={title} onPress={onPress} />
)

PrimaryButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}

export default PrimaryButton