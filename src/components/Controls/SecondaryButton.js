// @flow
import React from 'react'
import { StyleSheet, ViewPropTypes, TouchableOpacity, View, Text } from 'react-native'

import { SvgIcon } from '../index'
import type { IconData } from '../../../assets/iconData'
import colors from '../../config/colors'
import fonts from '../../config/fonts'

type Props = {
  title: string,
  onPress: Function,
  style?: ViewPropTypes.style,
  iconData: IconData
}

// TODO: Refactor out the text component below, as it's shared with the primary button component as well.
const SecondaryButton = ({ title, onPress, style, iconData }: Props) => (
  <TouchableOpacity onPress={onPress}>
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

SecondaryButton.defaultProps = {
  style: null
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    paddingVertical: 8,
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
    fontSize: 12,
    textAlign: 'center',
    color: colors.secondaryButtonTitle,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  icon: {
    marginRight: 12
  }
})

export default SecondaryButton