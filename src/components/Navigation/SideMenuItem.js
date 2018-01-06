// @flow
import React, { Component } from 'react'
import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'

import { SvgIcon } from '../index'
import type { IconData } from '../../../assets/iconData'
import colors from '../../config/colors'
import fonts from '../../config/fonts'

type Props = {
  title: string,
  iconData: IconData,
  /**
   * Index of the route within the side menu.
   */
  index: number,
  onPress: Function,
  selected?: boolean,
}

class SideMenuItem extends Component<Props> {
  static defaultProps = {
    selected: false
  }

  titleStyle() {
    return this.props.selected ?
      [styles.title, styles.selectedTitle] :
      styles.title
  }

  fillColor() {
    return this.props.selected ?
      colors.sideMenuItemSelected :
      colors.sideMenuItemUnselected
  }

  renderSelectedIndicator() {
    if (this.props.selected) {
      return <View style={styles.selectedIndicator} />
    }

    return null
  }

  render() {
    const { onPress, iconData, index, title } = this.props

    return (
      <TouchableWithoutFeedback onPress={() => onPress(index)}>
        <View style={styles.container}>
          {this.renderSelectedIndicator()}

          <SvgIcon fill={this.fillColor()} height={24} width={24} iconData={iconData} />

          <Text style={this.titleStyle()}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 28,
    alignItems: 'center'
  },
  selectedIndicator: {
    backgroundColor: colors.sideMenuItemSelected,
    width: 2,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0
  },
  title: {
    fontFamily: fonts.regular,
    marginTop: 6,
    fontSize: 9,
    color: colors.sideMenuUnselectedItemTitle
  },
  selectedTitle: {
    color: colors.sideMenuItemSelected
  }
})

export default SideMenuItem