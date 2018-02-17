// @flow
import React, { Component } from 'react'
import { StyleSheet, ViewPropTypes, TouchableOpacity, View } from 'react-native'

import { SvgIcon, Body } from '../index'
import type { IconData } from '../../../assets/iconData'
import colors from '../../config/colors'
import getHitSlop from '../../utils/hitSlop'

const PADDING_VERTICAL = 8
const FONT_SIZE = 12

type Props = {
  title: string,
  onPress: Function,
  iconData?: IconData,
  style?: ViewPropTypes.style
}

class SecondaryButton extends Component<Props> {
  static defaultProps = {
    style: null
  }

  renderIcon() {
    const { iconData } = this.props

    if (typeof iconData === 'undefined') {
      return null
    }

    return (
      <SvgIcon
        style={styles.icon}
        height={15}
        width={15}
        fill={colors.secondaryButtonIcon}
        iconData={iconData}
      />
    )
  }

  render() {
    const { title, onPress, style } = this.props

    return (
      <TouchableOpacity onPress={onPress} hitSlop={getHitSlop(FONT_SIZE, PADDING_VERTICAL)}>
        <View style={[styles.container, style]}>
          {this.renderIcon()}

          <Body style={styles.title}>{title}</Body>
        </View>
      </TouchableOpacity>
    )
  }
}

// TODO: This won't be needed after the update to RN 0.54.
// $FlowFixMe
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
    textAlign: 'center',
    color: colors.secondaryButtonTitle
  },
  icon: {
    marginEnd: 12
  }
})

export default SecondaryButton