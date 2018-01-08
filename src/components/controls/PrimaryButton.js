// @flow
import React, { Component } from 'react'
import { StyleSheet, Text, ViewPropTypes, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import colors from '../../config/colors'
import fonts from '../../config/fonts'
import getHitSlop from '../utils/hitSlop'

const PADDING_VERTICAL = 8
const FONT_SIZE = 12

type Props = {
  title: string,
  onPress: Function,
  style?: ViewPropTypes.style
}

const PrimaryButton = ({ title, onPress, style }: Props) => (
  <TouchableOpacity onPress={onPress} hitSlop={getHitSlop(FONT_SIZE, PADDING_VERTICAL, true)}>
    <View style={[styles.container, style]}>
      <LinearGradient colors={colors.primaryButtonGradient} style={styles.gradientContainer} />

      <Text style={styles.title}>{title}</Text>
    </View>
  </TouchableOpacity>
)

PrimaryButton.defaultProps = {
  style: null
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