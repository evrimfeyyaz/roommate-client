// @flow
import * as React from 'react'
import { StyleSheet, View, ViewPropTypes } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import colors from '../../config/colors'

type Props = {
  children?: React.Node,
  style?: ViewPropTypes.style,
}

const Card = ({ children, style }: Props) => (
  <View style={[styles.container, style]}>
    <LinearGradient
      colors={colors.cardBackgroundGradient}
      style={styles.gradientBackground}
    />
    {children}
  </View>
)

Card.defaultProps = {
  style: null,
  children: null
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10
    },
    shadowRadius: 14,
    shadowOpacity: 0.2,
    elevation: 18
  },
  gradientBackground: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10
  }
})

export default Card