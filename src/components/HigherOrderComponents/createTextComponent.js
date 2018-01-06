import React from 'react'
import {
  Text
} from 'react-native'

import PropTypes from 'prop-types'

function createTextComponent(defaultStyle) {
  const TextComponent = (props) => (
    <Text {...props} style={[defaultStyle, props.style]} />
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