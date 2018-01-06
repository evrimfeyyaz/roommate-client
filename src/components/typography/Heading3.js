import React from 'react'
import { StyleSheet, Text } from 'react-native'

import colors from '../../config/colors'
import fonts from '../../config/fonts'

type Props = {
  style?: Text.propTypes.style
}

const Heading3 = (props: Props) => (
  <Text {...props} style={[styles.heading3, props.style]} />
)

Heading3.defaultProps = {
  style: null
}

const styles = StyleSheet.create({
  heading3: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 17,
    color: colors.heading3Color,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  }
})

export default Heading3