import React, { Component } from 'react'
import { View, ViewPropTypes, StyleSheet } from 'react-native'

import { Body } from '../.'
import colors from '../../config/colors'

type Props<T> = {
  validationErrors: string[],
  errorObject: T,
  /**
   * The function to use to retrieve error messages for a given error.
   */
  getErrorMessages: (validationErrors: string[], errorObject: T) => string[],
  style?: ?ViewPropTypes.style
}

class ValidationError extends Component<Props> {
  renderErrorMessage = (errorMessage: string) => {
    const key = `${this.props.errorObject.id}_${errorMessage}`

    return (
      <Body style={styles.validationErrorMessage} key={key}>
        {errorMessage}
      </Body>
    )
  }

  render() {
    const { validationErrors, style, getErrorMessages, errorObject } = this.props

    const errorMessages = getErrorMessages(validationErrors, errorObject)

    return (
      <View style={style}>
        {errorMessages.map(m => this.renderErrorMessage(m, errorObject))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  validationErrorMessage: {
    color: colors.validationErrorMessage
  }
})

export default ValidationError