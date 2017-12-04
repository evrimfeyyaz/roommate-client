import React, { Component } from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback
} from 'react-native'

import PropTypes from 'prop-types'
import Svg, { Path } from 'react-native-svg'

import style from './style'

class SideMenuItem extends Component {
  styleForSelectedIndicator() {
    return this.props.isSelected ? style.selectedIndicator : null
  }

  styleForTitle() {
    return this.props.isSelected ?
      [style.title, style.selectedTitle] :
      style.title
  }

  iconFillColor() {
    return this.props.isSelected ? '#d2b994' : '#fff'
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.onPress(this.props.id)}>
        <View style={style.container}>
          <View style={this.styleForSelectedIndicator()} />

          <Svg height={30} width={30} viewBox="0 0 50 50">
            <Path d={this.props.iconSvgPath} fill={this.iconFillColor()} />
          </Svg>
          <Text style={this.styleForTitle()}>{this.props.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

SideMenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  iconSvgPath: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  id: PropTypes.string.isRequired,
  onPress: PropTypes.func
}

SideMenuItem.defaultProps = {
  isSelected: false,
  onPress: null
}

export default SideMenuItem