import React from 'react'
import {
  Text
} from 'react-native'

import PropTypes from 'prop-types'

function createTextComponent(defaultStyle) {
  const TextComponent = ({ children, style }) => (
    <Text style={[defaultStyle, style]}>
      {children}
    </Text>
  )

  TextComponent.propTypes = {
    children: PropTypes.node,
    style: Text.propTypes.style
  }

  TextComponent.defaultProps = {
    children: null,
    style: null
  }

  return TextComponent
}

export default createTextComponent