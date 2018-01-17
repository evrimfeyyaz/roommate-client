// @flow
import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

import { Body } from '../.'
import colors from '../../config/colors'

export type RadioOption = {
  value: string,
  label: string
}

type Props = {
  options: RadioOption[],
  /**
   * Selected option value.
   */
  value: string
}

class RadioGroup extends Component<Props> {
  static renderUnselectedOptionButton() {
    return <View style={styles.unselectedOptionButton} />
  }

  static renderSelectedOptionButton() {
    return (
      <View style={styles.selectedOptionButton}>
        <View style={styles.selectedOptionButtonInnerCircle} />
      </View>
    )
  }

  renderItems() {
    const { options } = this.props

    return options.map(option => this.renderOption(option))
  }

  renderOption(option: RadioOption) {
    const { value: selectedValue } = this.props

    let button
    if (option.value === selectedValue) {
      button = RadioGroup.renderSelectedOptionButton()
    } else {
      button = RadioGroup.renderUnselectedOptionButton()
    }

    return (
      <View style={styles.optionContainer} key={option.value}>
        {button}

        <Body style={styles.optionLabel}>{option.label}</Body>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderItems()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row'
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginEnd: 38
  },
  unselectedOptionButton: {
    width: 18,
    height: 18,
    borderRadius: 18,
    borderColor: colors.radioGroupUnselectedOptionButtonBorder,
    borderWidth: 1
  },
  optionLabel: {
    marginStart: 10
  },
  selectedOptionButton: {
    width: 18,
    height: 18,
    borderRadius: 18,
    backgroundColor: colors.radioGroupSelectedOptionButton,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedOptionButtonInnerCircle: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: colors.radioGroupSelectedOptionButtonInnerCircle
  }
})

export default RadioGroup