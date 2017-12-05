import React, { Component } from 'react'
import {
  Text,
  TouchableWithoutFeedback
} from 'react-native'

import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'

import style from './style'

class Button extends Component {
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <LinearGradient colors={['#c1b296', '#998263']} style={style.container}>
          <Text style={style.title}>{this.props.title}</Text>
        </LinearGradient>
      </TouchableWithoutFeedback>
    )
  }
}

Button.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func
}

Button.defaultProps = {
  title: '',
  onPress: null
}

export default Button