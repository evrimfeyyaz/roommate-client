// @flow
import React from 'react'
import { StyleSheet, Text, ViewPropTypes, TouchableOpacity, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import colors from '../../config/colors'
import fonts from '../../config/fonts'

type Props = {
  title: string,
  onPress: Function,
  style?: ViewPropTypes.style
}

const PrimaryButton = ({ title, onPress, style }: Props) => (
  <TouchableOpacity onPress={onPress}>
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
    paddingVertical: 8,
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
    fontSize: 12,
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