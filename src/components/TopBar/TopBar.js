import React from 'react'
import {
  View
} from 'react-native'

import PropTypes from 'prop-types'

import {
  SecondaryButton
} from '../.'
import {
  Title,
  Heading3,
  SvgIcon
} from '../common'
import icons from '../../../assets/icons'
import styles from './styles'
import colors from '../../config/colors'

const TopBar = ({ title }) => (
  <View style={styles.container}>
    <Title style={styles.title}>{title}</Title>

    <View style={styles.timeAndDayContainer}>
      <Title>4:00PM</Title>
      <Heading3 style={styles.dayOfWeek}>Fri</Heading3>
    </View>

    <SecondaryButton style={styles.wakeUpAlarmButton} title="Wake-Up Alarm" iconSvgPath={icons.test} />

    <SvgIcon
      width={25}
      height={25}
      fill={colors.icon}
      iconSvgPath={icons.test}
      style={styles.weatherIcon}
    />
    <Title>12°</Title>
  </View>
)

TopBar.propTypes = {
  title: PropTypes.string.isRequired
}

export default TopBar