// @flow
import React from 'react'
import { StyleSheet, Text } from 'react-native'

import colors from '../../config/colors'
import fonts from '../../config/fonts'

type Props = {
  style?: Text.propTypes.style
}

const Body = (props: Props) => (
  <Text {...props} style={[styles.body, props.style]} />
)

Body.defaultProps = {
  style: null
}

const styles = StyleSheet.create({
  body: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    color: colors.bodyColor,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  }
})

export default Body