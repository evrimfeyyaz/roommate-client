// @flow
import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'

import { SvgIcon, Heading } from '../index'
import { leftArrow } from '../../../assets/iconData'

type Props = {
  onBackButtonPress: () => void,
  title: string
}

/**
 * This is the navigation bar that is used for stack navigation.
 */
class NavigationBar extends Component<Props> {
  // TODO: Refactor this out if it makes sense at one point.
  renderBackButton() {
    return (
      <TouchableOpacity
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
      </TouchableOpacity>
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

// TODO: This won't be needed after the update to RN 0.54.
// $FlowFixMe
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 28,
    paddingVertical: 24,
    flexDirection: 'row',
    alignItems: 'center'
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd: 30
  },
  backArrow: {
    marginTop: 2
  }
})

export default NavigationBar