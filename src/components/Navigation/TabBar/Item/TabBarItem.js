import React, { Component } from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'

import { Heading } from '../../../.'
import styles from './styles'

class TabBarItem extends Component {
  headingStyle() {
    return this.props.isActive ? null : styles.inactiveHeading
  }

  render() {
    const { title, index, onPress } = this.props
    console.log(onPress)

    return (
      <TouchableWithoutFeedback onPress={onPress} index={index}>
        <View style={styles.container}>
          <Heading style={this.headingStyle()}>{title}</Heading>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

TabBarItem.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  isActive: PropTypes.bool
}

TabBarItem.defaultProps = {
  isActive: false
}

export default TabBarItem