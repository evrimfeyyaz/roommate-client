// @flow
import React from 'react'
import { StyleSheet, Text } from 'react-native'

import colors from '../../config/colors'
import fonts from '../../config/fonts'

type Props = {
  style?: Text.propTypes.style
}

const Heading2 = (props: Props) => (
  <Text {...props} style={[styles.heading2, props.style]} />
)

Heading2.defaultProps = {
  style: null
}

const styles = StyleSheet.create({
  heading2: {
    fontFamily: fonts.regular,
    fontSize: 16,
    lineHeight: 23,
    color: colors.heading2Color,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  }
})

export default Heading2