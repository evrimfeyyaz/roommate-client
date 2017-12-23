import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import { Title, Heading3 } from '../../.'
import styles from './styles'

class TopBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Title style={styles.title}>{this.props.title}</Title>

        <View style={styles.timeAndDayContainer}>
          <Title>4:00 PM</Title>
          <Heading3 style={styles.dayOfWeek}>Fri</Heading3>
        </View>
      </View>
    )
  }
}

TopBar.propTypes = {
  title: PropTypes.string.isRequired
}

export default TopBar