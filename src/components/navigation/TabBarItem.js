// @flow
import React, { Component } from 'react'
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native'

import { Heading, Heading2 } from '../index'
import type { TabData } from './TabBar'

type Props = {
  data: TabData,
  onPress: (tabId: string) => void,
  /**
   * Toggles the "active" style.
   *
   * Defaults to `false`.
   */
  active?: boolean,
  /**
   * Toggles the alternative "small" style.
   *
   * Defaults to `false`.
   */
  small?: boolean
}

class TabBarItem extends Component<Props> {
  static defaultProps = {
    active: false,
    small: false
  }

  onPress = () => {
    const { data, onPress } = this.props

    onPress(data.id)
  }

  headingStyle() {
    return this.props.active ? null : styles.inactiveHeading
  }

  containerStyle() {
    return this.props.small ? styles.containerSmall : styles.container
  }

  renderTitle() {
    const { title } = this.props.data
    const { small } = this.props

    // TODO: Find a better way to deal with typography components.
    if (small) {
      return <Heading2 style={this.headingStyle()}>{title}</Heading2>
    }

    return <Heading style={this.headingStyle()}>{title}</Heading>
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
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

export default TabBarItem