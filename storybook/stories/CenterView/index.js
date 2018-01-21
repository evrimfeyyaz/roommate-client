import React from 'react'
import PropTypes from 'prop-types'
import { ScrollView, ViewPropTypes, StyleSheet, KeyboardAvoidingView } from 'react-native'

export default function CenterView(props) {
  return (
    <KeyboardAvoidingView style={styles.main} behavior="padding">
      <ScrollView centerContent>
        {props.children}
      </ScrollView>
    </KeyboardAvoidingView>
  )
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
