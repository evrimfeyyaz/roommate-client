import React from 'react'
import {
  ViewPropTypes
} from 'react-native'

import PropTypes from 'prop-types'
import Svg, { Path } from 'react-native-svg'

const SvgIcon = ({ iconSvgPath, style, height, width, fill }) => {
  if (iconSvgPath === null) {
    return null
  }

  return (
    <Svg height={height} width={width} viewBox="0 0 50 50" style={style}>
      <Path d={iconSvgPath} fill={fill} />
    </Svg>
  )
}

SvgIcon.propTypes = {
  iconSvgPath: PropTypes.string,
  fill: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired
}

SvgIcon.defaultProps = {
  iconSvgPath: null,
  style: null
}

export default SvgIcon