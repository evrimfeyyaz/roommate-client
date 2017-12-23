import React from 'react'
import {
  Text
} from 'react-native'

import PropTypes from 'prop-types'

function createTextComponent(defaultStyle) {
  const TextComponent = ({ children, style, numberOfLines }) => (
    <Text style={[defaultStyle, style]} numberOfLines={numberOfLines}>
      {children}
    </Text>
  )

  TextComponent.propTypes = {
    children: PropTypes.node,
    style: Text.propTypes.style,
    numberOfLines: PropTypes.number
  }

  TextComponent.defaultProps = {
    children: null,
    style: null,
    numberOfLines: null
  }

  return TextComponent
}

export default createTextComponent