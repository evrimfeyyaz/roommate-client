// @flow
import React, { Component } from 'react'
import { View, StyleSheet, ViewPropTypes } from 'react-native'

import { Heading, CircularButton } from '../.'
import * as iconData from '../../../assets/iconData'

type Props = {
  /**
   * Current value of the stepper.
   */
  value: number,
  /**
   * Fired when the user presses either the increment or the decrement
   * button.
   *
   * Takes two arguments:
   * - currentValue: Equals to the `value` prop.
   * - newValue: New value that the stepper should have after button press.
   */
  onButtonPress: (currentValue: number, newValue: number) => void,
  /**
   * Minimum value this stepper accepts. When the value is below
   * this number, the decrement button is disabled.
   *
   * Default is `null`, meaning no minimum value.
   */
  minValue?: ?number,
  style?: ViewPropTypes.style,
  /**
   * Toggles the alternative "small" style.
   *
   * Default is `false`.
   */
  small?: boolean
}

class Stepper extends Component<Props> {
  static defaultProps = {
    minValue: null,
    style: null,
    small: false
  }

  incrementPressed = () => {
    const { onButtonPress, value } = this.props

    onButtonPress(value, value + 1)
  }

  decrementPressed = () => {
    const { onButtonPress, value } = this.props

    onButtonPress(value, value - 1)
  }

  shouldDisableDecrementButton = () => {
    const { value, minValue } = this.props

    return typeof minValue === 'number' && value <= minValue
  }

  valueStyle() {
    return this.props.small ? styles.valueSmall : styles.value
  }

  render() {
    const { style, small, value } = this.props

    return (
      <View style={[styles.container, style]}>
        <CircularButton
          iconData={iconData.minus}
          onPress={this.decrementPressed}
          disabled={this.shouldDisableDecrementButton()}
          small={small}
        />

        <Heading style={this.valueStyle()}>{value}</Heading>

        <CircularButton
          iconData={iconData.plus}
          onPress={this.incrementPressed}
          small={small}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  value: {
    paddingHorizontal: 14
  },
  valueSmall: {
    fontSize: 11,
    lineHeight: 15,
    paddingHorizontal: 18
  }
})

export default Stepper