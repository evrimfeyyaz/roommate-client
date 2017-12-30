import React from 'react'
import {
  ViewPropTypes
} from 'react-native'

import PropTypes from 'prop-types'
import Svg, { G } from 'react-native-svg'

const SvgIcon = ({ iconData, style, height, width, fill, strokeWidth, stroke, opacity }) => (
  <Svg height={height} width={width} style={style} viewBox={iconData.viewBox} opacity={opacity}>
    <G fill={fill} stroke={stroke} strokeWidth={strokeWidth}>
      {iconData.shape}
    </G>
  </Svg>
)


SvgIcon.propTypes = {
  iconData: PropTypes.shape({
    shape: PropTypes.node.isRequired,
    viewBox: PropTypes.string.isRequired
  }).isRequired,
  fill: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
  // TODO: Get the following two props directly from the style prop.
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  strokeWidth: PropTypes.number,
  stroke: PropTypes.string,
  opacity: PropTypes.number
}

SvgIcon.defaultProps = {
  style: null,
  strokeWidth: 0,
  stroke: null,
  opacity: 1
}

export default SvgIcon