// @flow
import React from 'react'
import { ViewPropTypes } from 'react-native'
import Svg, { G } from 'react-native-svg'

import type { IconData } from '../../../assets/iconData'

type Props = {
  iconData: IconData,
  height: number,
  width: number,
  opacity: number,
  fill: string,
  strokeWidth: number,
  stroke: string,
  style?: ViewPropTypes.style
}

const SvgIcon = ({ height, width, style, fill, stroke, strokeWidth, opacity, iconData }: Props) => (
  <Svg height={height} width={width} style={style} opacity={opacity}>
    <G fill={fill} stroke={stroke} strokeWidth={strokeWidth}>
      {iconData.shape}
    </G>
  </Svg>
)

SvgIcon.defaultProps = {
  style: null
}

export default SvgIcon