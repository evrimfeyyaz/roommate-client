import React from 'react'
import {
  Text
} from 'react-native'

import PropTypes from 'prop-types'

import styles from './styles'

const TextComponentFactory = (componentStyle) => {
  const TextComponent = ({ children, style }) => (
    <Text style={[styles.text, componentStyle, style]}>
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

export default TextComponentFactory