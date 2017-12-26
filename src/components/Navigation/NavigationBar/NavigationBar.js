import React, { Component } from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'

import { SvgIcon, Heading } from '../../.'
import { leftArrow } from '../../../../assets/iconData'
import styles from './styles'

class NavigationBar extends Component {
  renderBackButton() {
    return (
      <TouchableWithoutFeedback
        onPress={this.props.onBackButtonPress}
        hitSlop={{ top: 45, left: 45, bottom: 45, right: 45 }}
      >
        <View style={styles.backButton}>
          <SvgIcon
            height={21}
            width={36}
            fill="#fff"
            stroke="#fff"
            strokeWidth={1}
            iconData={leftArrow}
            opacity={0.4}
            style={styles.backArrow}
          />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderBackButton()}
        <Heading>{this.props.title}</Heading>
      </View>
    )
  }
}

NavigationBar.propTypes = {
  onBackButtonPress: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export default NavigationBar