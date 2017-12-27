import React, { Component } from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'

import { Heading, Heading2 } from '../../../.'
import styles from './styles'

class TabBarItem extends Component {
  headingStyle() {
    return this.props.isActive ? null : styles.inactiveHeading
  }

  containerStyle() {
    return this.props.small ? styles.containerSmall : styles.container
  }

  renderTitle() {
    const { title, small } = this.props

    if (small) {
      return <Heading2 style={this.headingStyle()}>{title}</Heading2>
    }

    return <Heading style={this.headingStyle()}>{title}</Heading>
  }

  render() {
    const { index, onPress } = this.props

    return (
      <TouchableWithoutFeedback onPress={onPress} index={index}>
        <View style={this.containerStyle()}>
          {this.renderTitle()}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

TabBarItem.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  small: PropTypes.bool
}

TabBarItem.defaultProps = {
  isActive: false,
  small: false
}

export default TabBarItem