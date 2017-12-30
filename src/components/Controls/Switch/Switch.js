import React, { Component } from 'react'
import {
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewPropTypes
} from 'react-native'

import PropTypes from 'prop-types'
import LinearGradient from 'react-native-linear-gradient'

import styles from './styles'

class Switch extends Component {
  constructor(props) {
    super(props)

    this.toggleSwitch = this.toggleSwitch.bind(this)
  }

  state = {
    value: this.props.value
  }

  toggleSwitch() {
    LayoutAnimation.configureNext(LayoutAnimation.create(
      200,
      LayoutAnimation.Types.easeOut,
      LayoutAnimation.Properties.scaleXY
    ), null)

    this.setState({ value: !this.state.value })
  }

  styleForContainer() {
    const { height, width } = this.props.style

    // We need to add this pseudo-padding by increasing the height of the
    // item to be able to show the shadow on Android (Android can't render
    // outside the bounds of an item). Increasing the user supplied height
    // is a hacky solution, but that's the only one I could come up with.
    const paddingForShadow = 8

    return StyleSheet.flatten([
      styles.container,
      {
        height: height + paddingForShadow,
        width,
        // As there is an invisible pseudo-padding at the bottom now,
        // we need to add more actual padding to the bottom, so that the
        // titles will visually look centered.
        paddingBottom: 10 + paddingForShadow
      }
    ])
  }

  styleForBorderContainer() {
    const { height, width, borderWidth } = this.props.style

    return StyleSheet.flatten([
      styles.borderContainer,
      {
        height,
        width,
        borderWidth,
        borderRadius: height / 2
      }
    ])
  }

  styleForThumb() {
    const { height, width } = this.props.style

    return StyleSheet.flatten([
      styles.thumb,
      {
        height,
        width: width / 2,
        borderRadius: height / 2
      },
      this.thumbPosition()
    ])
  }

  thumbPosition() {
    if (this.state.value) {
      return { left: 0 } // Align left when "on."
    }

    return { right: 0 } // Align right when "off."
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.toggleSwitch}>
        <View style={this.styleForContainer()}>
          <LinearGradient
            style={this.styleForThumb()}
            colors={this.props.backgroundColors}
          />

          <Text style={[styles.title, this.props.titleStyle]}>{this.props.onTitle}</Text>
          <Text style={[styles.title, this.props.titleStyle]}>{this.props.offTitle}</Text>
          <View style={this.styleForBorderContainer()} />
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

Switch.propTypes = {
  style: ViewPropTypes.style,
  titleStyle: Text.propTypes.style,
  backgroundColors: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.bool,
  onTitle: PropTypes.string,
  offTitle: PropTypes.string
}

Switch.defaultProps = {
  style: {
    height: 45,
    width: 200,
    borderWidth: 1
  },
  titleStyle: {
    fontSize: 16
  },
  value: false,
  onTitle: 'On',
  offTitle: 'Off'
}

export default Switch