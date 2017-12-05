import React from 'react'
import {
  Text,
  View
} from 'react-native'

import PropTypes from 'prop-types'
import {
  SecondaryButton
} from '../'

import styles from './styles'
import * as theme from '../../../theme'

const TopBar = ({ title }) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>

    <Text style={theme.textStyles.title}>4:00PM</Text>
    <Text style={theme.textStyles.heading2}>Fri</Text>

    <SecondaryButton title="Wake-Up Alarm" />
  </View>
)

TopBar.propTypes = {
  title: PropTypes.string.isRequired
}

export default TopBar