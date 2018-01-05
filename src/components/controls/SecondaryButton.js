// @flow
import React, { Component } from 'react'
import { StyleSheet, ViewPropTypes, TouchableOpacity, View, Text } from 'react-native'

import { SvgIcon } from '../index'
import type { IconData } from '../../../assets/iconData'
import colors from '../../config/colors'
import fonts from '../../config/fonts'

const PADDING_VERTICAL = 8
const FONT_SIZE = 12

type Props = {
  title: string,
  onPress: Function,
  iconData: IconData,
  style?: ViewPropTypes.style
}

class SecondaryButton extends Component<Props> {
  static defaultProps = {
    style: null
  }

  /**
   * Calculates the required vertical hit slop to have a clickable area of at least 45 pixels high.
   *
   * @returns {{top: number, bottom: number, left: number, right: number}}
   */
  static hitSlop() {
    let value = 45 - FONT_SIZE - (PADDING_VERTICAL * 2)
    value = Math.max(0, value) // Avoid negative hit slop.

    return { top: value, bottom: value, left: 0, right: 0 }
  }

  render() {
    const { title, onPress, style, iconData } = this.props

    return (
      <TouchableOpacity onPress={onPress} hitSlop={SecondaryButton.hitSlop()}>
        <View style={[styles.container, style]}>
          <SvgIcon
            style={styles.icon}
            height={15}
            width={15}
            fill={colors.secondaryButtonIcon}
            iconData={iconData}
          />

          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    paddingVertical: PADDING_VERTICAL,
    paddingHorizontal: 20,
    borderRadius: 999,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1
  },
  title: {
    fontFamily: fonts.regular,
    fontSize: FONT_SIZE,
    textAlign: 'center',
    color: colors.secondaryButtonTitle,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  icon: {
    marginRight: 12
  }
})

export default SecondaryButton