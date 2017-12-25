import React from 'react'
import { Svg, G } from 'react-native-svg'
import PropTypes from 'prop-types'

function createIcon(shape) {
  const Icon = ({ height, width, fill }) => (
    <Svg height={height} width={width}>
      <G fill={fill}>
        {shape}
      </G>
    </Svg>
  )

  Icon.propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    fill: PropTypes.string.isRequired
  }

  return Icon
}

export default createIcon

