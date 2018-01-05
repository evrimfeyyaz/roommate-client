// @flow
import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, ViewPropTypes } from 'react-native'

import { SvgIcon } from '../index'
import type { IconData } from '../../../assets/iconData'

const PADDING_REGULAR = 10
const PADDING_SMALL = 5
const ICON_SIZE_REGULAR = 18
const ICON_SIZE_SMALL = 10

type Props = {
  onPress: Function,
  iconData: IconData,
  iconFill: string,
  disabled?: boolean,
  small?: boolean,
  style?: ViewPropTypes.style
}

class CircularButton extends Component<Props> {
  static defaultProps = {
    disabled: false,
    small: false,
    style: null
  }

  containerStyle() {
    return [styles.container, { padding: this.padding() }, this.props.style]
  }

  padding() {
    return this.props.small ? PADDING_SMALL : PADDING_REGULAR
  }

  iconSize() {
    return this.props.small ? ICON_SIZE_SMALL : ICON_SIZE_REGULAR
  }

  iconOpacity() {
    return this.props.disabled ? 0.1 : 1
  }

  /**
   * Calculates the required hit slop to have a clickable area of at least 45x45.
   *
   * @returns {{top: number, bottom: number, left: number, right: number}}
   */
  hitSlop() {
    let value = 45 - this.iconSize() - (2 * this.padding())
    value = Math.max(0, value) // Avoid negative hit slop.

    return { top: value, bottom: value, left: value, right: value }
  }

  render() {
    const { onPress, disabled, iconFill, iconData } = this.props

    return (
      <TouchableOpacity
        style={this.containerStyle()}
        onPress={onPress}
        disabled={disabled}
        hitSlop={this.hitSlop()}
      >
        <SvgIcon
          iconData={iconData}
          fill={iconFill}
          width={this.iconSize()}
          height={this.iconSize()}
          opacity={this.iconOpacity()}
        />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderRadius: 999
  }
})

export default CircularButton