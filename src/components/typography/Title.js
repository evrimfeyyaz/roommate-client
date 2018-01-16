// @flow
import React from 'react'
import { StyleSheet, Text } from 'react-native'

import colors from '../../config/colors'
import fonts from '../../config/fonts'

type Props = {
  style?: Text.propTypes.style
}

const Title = (props: Props) => (
  <Text {...props} style={[styles.title, props.style]} />
)

Title.defaultProps = {
  style: null
}

const styles = StyleSheet.create({
  title: {
    fontFamily: fonts.regular,
    fontSize: 22,
    lineHeight: 30,
    color: colors.titleColor,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  }
})

export default Title