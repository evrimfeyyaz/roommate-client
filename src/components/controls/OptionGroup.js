// @flow
import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity, ViewPropTypes } from 'react-native'

import { Body, SvgIcon } from '../.'
import colors from '../../config/colors'
import getHitSlop from '../../utils/hitSlop'
import * as icons from '../../../assets/iconData'

const OPTION_SIZE = 18

export type Option<T> = {
  id: string,
  label: string,
  /**
   * Contains the actual option object. For example,
   * a shopping item choice option.
   */
  value: T
}

type Props<T> = {
  allowMultipleSelection?: boolean,
  options: Option<T>[],
  selectedOptionIds: [string],
  onOptionPress: (option: Option<T>) => void,
  style?: ?ViewPropTypes.style
}

class OptionGroup<T> extends Component<Props<T>> {
  static defaultProps = {
    allowMultipleSelection: false
  }

  renderUnselectedOptionFrame() {
    if (this.props.allowMultipleSelection) {
      return <View style={styles.unselectedMultipleSelectionOptionFrame} />
    }

    return <View style={styles.unselectedSingleSelectionOptionFrame} />
  }

  renderSelectedOptionFrame() {
    if (this.props.allowMultipleSelection) {
      return (
        <View style={styles.selectedMultipleSelectionOptionFrame}>
          <SvgIcon
            height={15}
            width={15}
            fill={colors.optionGroupSelectedIcon}
            iconData={icons.check}
          />
        </View>
      )
    }

    return (
      <View style={styles.selectedSingleSelectionOptionFrame}>
        <View style={styles.selectedSingleSelectionOptionFill} />
      </View>
    )
  }

  renderItems() {
    const { options } = this.props

    return options.map(option => this.renderOption(option))
  }

  renderOption(option: Option<T>) {
    const { selectedOptionIds, onOptionPress } = this.props
    const hitSlop = getHitSlop(OPTION_SIZE, 0, true)

    let button
    if (selectedOptionIds != null && selectedOptionIds.includes(option.id)) {
      button = this.renderSelectedOptionFrame()
    } else {
      button = this.renderUnselectedOptionFrame()
    }

    return (
      <TouchableOpacity onPress={() => onOptionPress(option)} hitSlop={hitSlop} key={option.id}>
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

// TODO: This won't be needed after the update to RN 0.54.
// $FlowFixMe
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
  unselectedSingleSelectionOptionFrame: {
    width: OPTION_SIZE,
    height: OPTION_SIZE,
    borderRadius: OPTION_SIZE,
    borderColor: colors.optionGroupUnselectedCircleBorder,
    borderWidth: 1
  },
  unselectedMultipleSelectionOptionFrame: {
    width: OPTION_SIZE,
    height: OPTION_SIZE,
    borderRadius: 4,
    borderColor: colors.optionGroupUnselectedCircleBorder,
    borderWidth: 1
  },
  optionLabel: {
    marginStart: 10
  },
  selectedSingleSelectionOptionFrame: {
    width: OPTION_SIZE,
    height: OPTION_SIZE,
    borderRadius: OPTION_SIZE,
    backgroundColor: colors.optionGroupSelectedOuterCircle,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedSingleSelectionOptionFill: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: colors.optionGroupSelectedInnerCircle
  },
  selectedMultipleSelectionOptionFrame: {
    width: OPTION_SIZE,
    height: OPTION_SIZE,
    borderRadius: 4,
    backgroundColor: colors.optionGroupSquareBackground,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 2,
    paddingTop: 1
  }
})

export default OptionGroup