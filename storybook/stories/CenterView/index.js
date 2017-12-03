import React from 'react'
import PropTypes from 'prop-types'
import { View, ViewPropTypes } from 'react-native'
import style from './style'

export default function CenterView(props) {
  return <View style={[style.main, props.style]}>{props.children}</View>
}

CenterView.defaultProps = {
  children: null,
  style: null
}

CenterView.propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style
}
