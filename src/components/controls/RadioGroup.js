// @flow
import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, ViewPropTypes } from 'react-native'

import { Body } from '../.'
import colors from '../../config/colors'
import getHitSlop from '../../utils/hitSlop'

const OPTION_CIRCLE_SIZE = 18

export type RadioOption = {
  value: string,
  label: string
}

type Props = {
  options: RadioOption[],
  /**
   * Selected option selectedOptionValue.
   */
  selectedOptionValue: string,
  onOptionPress: (option: RadioOption) => void,
  style?: ?ViewPropTypes.style
}

class RadioGroup extends Component<Props> {
  static renderUnselectedOptionCircle() {
    return <View style={styles.unselectedOptionCircle} />
  }

  static renderSelectedOptionCircle() {
    return (
      <View style={styles.selectedOptionCircle}>
        <View style={styles.selectedOptionButtonInnerCircle} />
      </View>
    )
  }

  renderItems() {
    const { options } = this.props

    return options.map(option => this.renderOption(option))
  }

  renderOption(option: RadioOption) {
    const { selectedOptionValue: selectedValue, onOptionPress } = this.props
    const hitSlop = getHitSlop(OPTION_CIRCLE_SIZE, 0, true)

    let button
    if (option.value === selectedValue) {
      button = RadioGroup.renderSelectedOptionCircle()
    } else {
      button = RadioGroup.renderUnselectedOptionCircle()
    }

    return (
      <TouchableOpacity onPress={() => onOptionPress(option.value)} hitSlop={hitSlop} key={option.value}>
        <View style={styles.optionContainer}>
          {button}

          <Body style={styles.optionLabel}>{option.label}</Body>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    const { style } = this.props

    return (
      <View style={[styles.container, style]}>
        {this.renderItems()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginEnd: 38,
    marginBottom: 24
  },
  unselectedOptionCircle: {
    width: OPTION_CIRCLE_SIZE,
    height: OPTION_CIRCLE_SIZE,
    borderRadius: OPTION_CIRCLE_SIZE,
    borderColor: colors.radioGroupUnselectedOptionCircleBorder,
    borderWidth: 1
  },
  optionLabel: {
    marginStart: 10
  },
  selectedOptionCircle: {
    width: OPTION_CIRCLE_SIZE,
    height: OPTION_CIRCLE_SIZE,
    borderRadius: OPTION_CIRCLE_SIZE,
    backgroundColor: colors.radioGroupSelectedOptionCircle,
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