import React from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'

import { Heading } from '../../../.'
import styles from './styles'

const TabBarItem = ({ title, index, onPress }) => (
  <TouchableWithoutFeedback onPress={onPress} index={index}>
    <View style={styles.container}>
      <Heading>{title}</Heading>
    </View>
  </TouchableWithoutFeedback>
)

TabBarItem.propTypes = {
  title: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired
}

export default TabBarItem