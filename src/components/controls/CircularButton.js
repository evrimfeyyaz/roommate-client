// @flow
import React, { Component } from 'react'
import { TouchableOpacity, StyleSheet, ViewPropTypes } from 'react-native'

import { SvgIcon } from '../index'
import type { IconData } from '../../../assets/iconData'
import getHitSlop from '../../utils/hitSlop'
import colors from '../../config/colors'

const PADDING_REGULAR = 10
const PADDING_SMALL = 5
const ICON_SIZE_REGULAR = 18
const ICON_SIZE_SMALL = 10

type Props = {
  onPress: Function,
  iconData: IconData,
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

  render() {
    const { onPress, disabled, iconData } = this.props
    const hitSlop = getHitSlop(this.iconSize(), this.padding())

    return (
      <TouchableOpacity
        style={this.containerStyle()}
        onPress={onPress}
        disabled={disabled}
        hitSlop={hitSlop}
      >
        <SvgIcon
          iconData={iconData}
          fill={colors.circularButtonIcon}
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
    borderColor: colors.circularButtonBorder,
    borderWidth: 1,
    borderRadius: 999
  }
})

export default CircularButton