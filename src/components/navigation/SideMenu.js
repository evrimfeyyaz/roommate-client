// @flow
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import SideMenuItem from './SideMenuItem'
import colors from '../../config/colors'
import type { MainTabScreenOptions } from '../../types/navigation'

export type Tab = {
  routeName: string
} & MainTabScreenOptions

type Props = {
  tabs: Tab[],
  activeTabTitle: string,
  sideMenuItemTapped: Function
}

class SideMenu extends Component<Props> {
  renderItems() {
    const { tabs, sideMenuItemTapped, activeTabTitle } = this.props

    return tabs.map(tab => (
      <SideMenuItem
        key={tab.routeName}
        tab={tab}
        onPress={sideMenuItemTapped}
        selected={activeTabTitle === tab.title}
      />
    ))
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
    backgroundColor: colors.sideMenuBackground
  }
})

export default SideMenu