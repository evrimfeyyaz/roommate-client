import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import PropTypes from 'prop-types'

import { SvgIcon, Heading } from '../.'
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
      this.updateDecrementState()
    })
  }

  decrementValue() {
    this.setState({ value: this.state.value - 1 }, () => {
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
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={this.decrementValue}
          disabled={this.state.disableDecrementButton}
        >
          <SvgIcon iconData={iconData.minus} fill={this.minusIconFillColor()} width={18} height={18} />
        </TouchableOpacity>

        <Heading style={styles.value}>{this.state.value}</Heading>

        <TouchableOpacity style={styles.button} onPress={this.incrementValue}>
          <SvgIcon iconData={iconData.plus} fill="#fff" width={18} height={18} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  button: {
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderRadius: 999,
    padding: 10
  },
  value: {
    paddingHorizontal: 14
  }
})

Stepper.propTypes = {
  initialValue: PropTypes.number,
  minValue: PropTypes.number
}

Stepper.defaultProps = {
  initialValue: 1,
  minValue: null
}

export default Stepper