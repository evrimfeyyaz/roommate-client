// @flow
import React from 'react'
import { StyleSheet, Text } from 'react-native'

import colors from '../../config/colors'
import fonts from '../../config/fonts'

type Props = {
  style?: Text.propTypes.style
}

const Heading = (props: Props) => (
  <Text {...props} style={[styles.heading, props.style]} />
)

Heading.defaultProps = {
  style: null
}

const styles = StyleSheet.create({
  heading: {
    fontFamily: fonts.regular,
    fontSize: 20,
    lineHeight: 27,
    color: colors.headingColor,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  }
})

export default Heading