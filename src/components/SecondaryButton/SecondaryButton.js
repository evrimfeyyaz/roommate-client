import React from 'react'

import PropTypes from 'prop-types'
import { Button } from '../common'

import style from './style'

const SecondaryButton = ({ title, onPress }) => (
  <Button
    title={title}
    onPress={onPress}
    style={style}
  />
)

SecondaryButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}

export default SecondaryButton