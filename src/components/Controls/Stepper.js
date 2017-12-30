import React, { Component } from 'react'
import { View, StyleSheet, ViewPropTypes } from 'react-native'
import PropTypes from 'prop-types'

import { Heading, CircularButton } from '../.'
import * as iconData from '../../../assets/iconData'

// TODO: Extract the below button component into its own file.
class Stepper extends Component {
  constructor(props) {
    super(props)

    this.incrementValue = this.incrementValue.bind(this)
    this.decrementValue = this.decrementValue.bind(this)
  }

  state = {
    value: this.props.initialValue,
    disableDecrementButton: false
  }

  componentWillMount() {
    this.updateDecrementState()
  }

  incrementValue() {
    this.setState({ value: this.state.value + 1 }, () => {
      this.props.onValueChange(this.state.value)
      this.updateDecrementState()
    })
  }

  decrementValue() {
    this.setState({ value: this.state.value - 1 }, () => {
      this.props.onValueChange(this.state.value)
      this.updateDecrementState()
    })
  }

  updateDecrementState() {
    const { minValue } = this.props
    const { value } = this.state

    let disableDecrementButton = false
    if (minValue && value === minValue) {
      disableDecrementButton = true
    }

    this.setState({ disableDecrementButton })
  }

  minusIconFillColor() {
    return this.state.disableDecrementButton ? 'rgba(255, 255, 255, 0.1)' : '#fff'
  }

  render() {
    const { style } = this.props

    return (
      <View style={[styles.container, style]}>
        <CircularButton
          iconData={iconData.minus}
          iconFill={this.minusIconFillColor()}
          onPress={this.decrementValue}
          disabled={this.state.disableDecrementButton}
        />

        <Heading style={styles.value}>{this.state.value}</Heading>

        <CircularButton iconData={iconData.plus} iconFill="#fff" onPress={this.incrementValue}/>
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
  }
})

Stepper.propTypes = {
  initialValue: PropTypes.number,
  minValue: PropTypes.number,
  onValueChange: PropTypes.func,
  style: ViewPropTypes.style
}

Stepper.defaultProps = {
  initialValue: 1,
  minValue: null,
  onValueChange: null,
  style: null
}

export default Stepper