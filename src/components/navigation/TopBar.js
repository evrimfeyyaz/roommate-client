// @flow
import React from 'react'
import { StyleSheet, View } from 'react-native'

import { Title, Heading3 } from '../index'

type Props = {
  title: string
}

const TopBar = ({ title }: Props) => (
  <View style={styles.container}>
    <Title style={styles.title}>{title}</Title>

    <View style={styles.timeAndDayContainer}>
      <Title>4:00 PM</Title>
      <Heading3 style={styles.dayOfWeek}>Fri</Heading3>
    </View>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingTop: 20
  },
  title: {
    flex: 1
  },
  timeAndDayContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginEnd: 20
  },
  dayOfWeek: {
    marginStart: 5,
    marginBottom: 3
  },
  wakeUpAlarmButton: {
    marginEnd: 20
  },
  weatherIcon: {
    marginEnd: 5
  }
})

export default TopBar