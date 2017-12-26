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
} from '../../.'
import colors from '../../../config/colors'
import styles from './styles'

// TODO: Give this a better name or make it a HOC.
class Button extends Component {
  renderGradientBackground() {
    if (this.props.gradientColors === null) {
      return null
    }

    return <LinearGradient colors={this.props.gradientColors} style={styles.gradientContainer} />
  }

  renderIcon() {
    const { iconData } = this.props

    if (iconData === null) {
      return null
    }

    return (<SvgIcon
      style={styles.icon}
      height={15}
      width={15}
      fill={colors.icon}
      iconData={iconData}
    />)
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View style={[styles.container, this.props.style]}>
          {this.renderGradientBackground()}

          {this.renderIcon()}
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
  iconData: PropTypes.shape({
    shape: PropTypes.node.isRequired,
    viewBox: PropTypes.string.isRequired
  })
}

Button.defaultProps = {
  title: '',
  onPress: null,
  style: null,
  titleStyle: null,
  borderStyle: null,
  gradientColors: null,
  iconData: null
}

export default Button