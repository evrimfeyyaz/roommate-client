import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native'
import PropTypes from 'prop-types'

import styles from './styles'

class SideMenuItem extends Component {
  titleStyle() {
    return this.props.isSelected ?
      [styles.title, styles.selectedTitle] :
      styles.title
  }

  iconUri() {
    const { isSelected, unselectedIcon, selectedIcon } = this.props

    return isSelected ? selectedIcon : unselectedIcon
  }

  renderSelectedIndicator() {
    if (this.props.isSelected) {
      return <View style={styles.selectedIndicator} />
    }

    return null
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => this.props.onPress(this.props.index)}>
        <View style={styles.container}>
          {this.renderSelectedIndicator()}

          <Image source={this.iconUri()} />

          <Text style={this.titleStyle()}>{this.props.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

SideMenuItem.propTypes = {
  title: PropTypes.string.isRequired,
  // Icons below are passed as `require(...)`. That's why they are "numbers."
  unselectedIcon: PropTypes.number.isRequired,
  selectedIcon: PropTypes.number.isRequired,
  isSelected: PropTypes.bool,
  index: PropTypes.number.isRequired,
  onPress: PropTypes.func
}

SideMenuItem.defaultProps = {
  isSelected: false,
  onPress: null
}

export default SideMenuItem