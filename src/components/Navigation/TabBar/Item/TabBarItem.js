import React, { Component } from 'react'
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import { Heading, Heading2 } from '../../../.'

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
    const { id, onPress } = this.props

    return (
      <TouchableWithoutFeedback onPress={() => onPress(id)} id={id}>
        <View style={this.containerStyle()}>
          {this.renderTitle()}
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 28,
    paddingVertical: 24
  },
  containerSmall: {
    paddingHorizontal: 28,
    paddingVertical: 14
  },
  inactiveHeading: {
    opacity: 0.6
  }
})

TabBarItem.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  isActive: PropTypes.bool,
  small: PropTypes.bool
}

TabBarItem.defaultProps = {
  isActive: false,
  small: false
}

export default TabBarItem