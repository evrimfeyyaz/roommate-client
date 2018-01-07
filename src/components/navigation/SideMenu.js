// @flow
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import SideMenuItem from './SideMenuItem'
import colors from '../../config/colors'
import type { IconData } from '../../../assets/iconData'

export type SideMenuRoute = {
  title: string,
  routeKey: string,
  iconData: IconData
}

type Props = {
  routes: SideMenuRoute[],
  activeRouteKey: string,
  sideMenuItemTapped: Function
}

class SideMenu extends Component<Props> {
  renderItems() {
    const { routes, sideMenuItemTapped, activeRouteKey } = this.props

    return routes.map(route => (
      <SideMenuItem
        title={route.title}
        routeKey={route.routeKey}
        key={route.routeKey}
        iconData={route.iconData}
        onPress={sideMenuItemTapped}
        selected={activeRouteKey === route.routeKey}
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