import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'
import { SvgIcon } from "../../../index"

class SideMenuItem extends Component {
  titleStyle() {
    return this.props.isSelected ?
      [styles.title, styles.selectedTitle] :
      styles.title
  }

  fillColor() {
    return this.props.isSelected ? '#CDB58E' : '#FFF'
  }

  renderSelectedIndicator() {
    if (this.props.isSelected) {
      return <View style={styles.selectedIndicator} />
    }

    return null
  }

  render() {
    const { onPress, iconData, index, title } = this.props

    return (
      <TouchableWithoutFeedback onPress={() => onPress(index)}>
        <View style={styles.container}>
          {this.renderSelectedIndicator()}

          <SvgIcon fill={this.fillColor()} height={24} width={24} iconData={iconData} />

          <Text style={this.titleStyle()}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

SideMenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  iconData: PropTypes.shape({
    shape: PropTypes.node.isRequired,
    viewBox: PropTypes.string.isRequired
  }).isRequired,
  isSelected: PropTypes.bool,
  index: PropTypes.number,
  onPress: PropTypes.func
}

SideMenuItem.defaultProps = {
  isSelected: false,
  index: null,
  onPress: null
}

export default SideMenuItem