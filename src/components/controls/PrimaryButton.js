// @flow
import React, { Component } from 'react'
import { StyleSheet, Text, ViewPropTypes, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import colors from '../../config/colors'
import fonts from '../../config/fonts'

const PADDING_VERTICAL = 8
const FONT_SIZE = 12

type Props = {
  title: string,
  onPress: Function,
  style?: ViewPropTypes.style
}

class PrimaryButton extends Component<Props> {
  static defaultProps = {
    style: null
  }

  // TODO: Find a way to refactor out this function, other buttons also have this.
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
    const { title, onPress, style } = this.props

    return (
      <TouchableOpacity onPress={onPress} hitSlop={PrimaryButton.hitSlop()}>
        <View style={[styles.container, style]}>
          <LinearGradient colors={colors.primaryButtonGradient} style={styles.gradientContainer} />

          <Text style={styles.title}>{title}</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: PADDING_VERTICAL,
    paddingHorizontal: 20,
    borderRadius: 999,
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 3,
    shadowOpacity: 0.3,
    elevation: 4
  },
  title: {
    fontFamily: fonts.regular,
    fontSize: FONT_SIZE,
    textAlign: 'center',
    color: colors.primaryButtonTitle,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  gradientContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 999
  }
})

export default PrimaryButton