// @flow
import React from 'react'
import { StyleSheet } from 'react-native'
import { TextField as MaterialTextField } from 'react-native-material-textfield'

import fonts from '../../config/fonts'
import colors from '../../config/colors'

// More information: https://github.com/n4kz/react-native-material-textfield
type Props = MaterialTextField.props

const TextField = (props: Props) => (
  <MaterialTextField
    {...props}
    labelTextStyle={styles.labelText}
    titleTextStyle={styles.titleText}
    tintColor={colors.textFieldTint}
    baseColor={colors.textFieldBase}
    textColor={colors.textFieldText}
    fontSize={14}
    labelHeight={14}
  />
)

const styles = StyleSheet.create({
  labelText: {
    fontFamily: fonts.regular
  },
  titleText: {
    fontFamily: fonts.regular
  }
})

export default TextField