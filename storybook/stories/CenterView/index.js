import React from 'react'
import PropTypes from 'prop-types'
import { View, ViewPropTypes, StyleSheet } from 'react-native'

export default function CenterView(props) {
  return <View style={styles.main}>{props.children}</View>
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2d3642'
  }
})

CenterView.defaultProps = {
  children: null,
  style: null
}

CenterView.propTypes = {
  children: PropTypes.node,
  style: ViewPropTypes.style
}
