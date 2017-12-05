import React, { Component } from 'react'
import {
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'

import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'
import Svg, { Path } from 'react-native-svg'

import style from './style'

class Button extends Component {
  renderGradientBackground() {
    if (this.props.gradientColors === null) {
      return null
    }

    return <LinearGradient colors={this.props.gradientColors} style={style.gradientContainer} />
  }

  renderIcon() {
    if (this.props.iconSvgPath === null) {
      return null
    }

    return (
      <Svg height={15} width={15} viewBox="0 0 50 50" style={style.icon}>
        <Path d={this.props.iconSvgPath} fill="#d2b994" />
      </Svg>
    )
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={[style.container, this.props.style.container]}>
          {this.renderGradientBackground()}

          {this.renderIcon()}
          <Text style={[style.title, this.props.style.title]}>{this.props.title}</Text>

          <View style={[style.borderContainer, this.props.style.borderContainer]} />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

Button.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  gradientColors: PropTypes.arrayOf(PropTypes.string),
  style: PropTypes.shape({
    container: View.propTypes.style,
    title: Text.propTypes.style,
    borderContainer: View.propTypes.style
  }),
  iconSvgPath: PropTypes.string
}

Button.defaultProps = {
  title: '',
  onPress: null,
  style: {},
  gradientColors: null,
  iconSvgPath: null
}

export default Button