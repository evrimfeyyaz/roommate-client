import React from 'react'
import {
  View
} from 'react-native'

import PropTypes from 'prop-types'

import {
  SecondaryButton
} from '../'
import {
  Title,
  Heading3
} from '../common'
import styles from './styles'

const TopBar = ({ title }) => (
  <View style={styles.container}>
    <Title style={styles.title}>{title}</Title>

    <Title style={styles.time}>4:00PM</Title>
    <Heading3 style={styles.dayOfWeek}>Fri</Heading3>

    <SecondaryButton style={styles.wakeUpAlarmButton} title="Wake-Up Alarm" />
  </View>
)

TopBar.propTypes = {
  title: PropTypes.string.isRequired
}

export default TopBar