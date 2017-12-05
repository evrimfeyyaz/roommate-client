import React from 'react'

import PropTypes from 'prop-types'
import { Button } from '../common'

import style from './style'
import icons from '../../../assets/icons'

const SecondaryButton = ({ title, onPress }) => (
  <Button
    title={title}
    onPress={onPress}
    style={style}
    iconSvgPath={icons.test}
  />
)

SecondaryButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
}

export default SecondaryButton