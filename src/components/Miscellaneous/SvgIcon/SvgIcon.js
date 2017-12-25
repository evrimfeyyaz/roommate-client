import React from 'react'
import {
  ViewPropTypes
} from 'react-native'

import PropTypes from 'prop-types'
import Svg, { G } from 'react-native-svg'

const SvgIcon = ({ iconData, style, height, width, fill }) => (
  <Svg height={height} width={width} style={style} viewBox={iconData.viewBox}>
    <G fill={fill}>
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
  width: PropTypes.number.isRequired
}

SvgIcon.defaultProps = {
  style: null
}

export default SvgIcon