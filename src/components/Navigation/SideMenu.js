import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import SideMenuItem from './SideMenuItem'
import * as icons from '../../../assets/iconData'
import colors from '../../config/colors'
import type { IconData } from '../../../assets/iconData'

type SideMenuRoute = {
  title: string,
  index: number,
  iconData: IconData
}

type Props = {
  routes: SideMenuRoute[],
  currentRouteIndex: number,
  sideMenuItemTapped: Function
}

class SideMenu extends Component<Props> {
  // TODO: Remove this, and add items using children in the screen.
  // This shouldn't decide what items show on the menu.
  renderItems(title, index, data) {
    return (
      <SideMenuItem
        title={title}
        index={index}
        iconData={data}
        onPress={this.props.sideMenuItemTapped}
        isSelected={this.props.currentRouteIndex === index}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderItem('Home', 0, icons.home)}
        {this.renderItem('Food', 1, icons.food)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.sideMenuBackground
  }
})

export default SideMenu