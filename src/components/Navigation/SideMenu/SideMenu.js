import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import SideMenuItem from './Item/SideMenuItem'
import styles from './styles'
import * as iconData from '../../../../assets/iconData'

class SideMenu extends Component {
  constructor(props) {
    super(props)
  }

  // TODO: Remove this, and add items using children in the screen.
  // This shouldn't decide what items show on the menu.
  renderItem(title, index, data) {
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
        {this.renderItem('Home', 0, iconData.home)}
        {this.renderItem('Food', 1, iconData.food)}
      </View>
    )
  }
}

SideMenu.propTypes = {
  currentRouteIndex: PropTypes.number.isRequired,
  sideMenuItemTapped: PropTypes.func.isRequired
}

export default SideMenu