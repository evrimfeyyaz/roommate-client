import React, { Component } from 'react'
import {
  Text,
  TouchableWithoutFeedback,
  View,
  ViewPropTypes
} from 'react-native'

import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'

import {
  SvgIcon
} from '../.'
import colors from '../../../config/colors'
import styles from './styles'

class Button extends Component {
  renderGradientBackground() {
    if (this.props.gradientColors === null) {
      return null
    }

    return <LinearGradient colors={this.props.gradientColors} style={styles.gradientContainer} />
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={[styles.container, this.props.style]}>
          {this.renderGradientBackground()}

          <SvgIcon
            style={styles.icon}
            height={15}
            width={15}
            fill={colors.icon}
            iconSvgPath={this.props.iconSvgPath}
          />
          <Text style={[styles.title, this.props.titleStyle]}>{this.props.title}</Text>

          <View style={[styles.borderContainer, this.props.borderStyle]} />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

Button.propTypes = {
  title: PropTypes.string,
  onPress: PropTypes.func,
  gradientColors: PropTypes.arrayOf(PropTypes.string),
  style: ViewPropTypes.style,
  titleStyle: Text.propTypes.style,
  borderStyle: ViewPropTypes.style,
  iconSvgPath: PropTypes.string
}

Button.defaultProps = {
  title: '',
  onPress: null,
  style: null,
  titleStyle: null,
  borderStyle: null,
  gradientColors: null,
  iconSvgPath: null
}

export default Button