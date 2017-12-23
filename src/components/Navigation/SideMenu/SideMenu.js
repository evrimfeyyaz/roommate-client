import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import SideMenuItem from './Item/SideMenuItem'
import styles from './styles'

class SideMenu extends Component {
  renderItem(title, index, unselectedIcon, selectedIcon) {
    return (
      <SideMenuItem
        title={title}
        index={index}
        unselectedIcon={unselectedIcon}
        selectedIcon={selectedIcon}
        onPress={this.props.sideMenuItemTapped}
        isSelected={this.props.currentRouteIndex === index}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderItem(
          'Home', 0,
          require('../../../../assets/images/home-icon.png'),
          require('../../../../assets/images/home-icon-selected.png')
        )}
        {this.renderItem(
          'Food', 1,
          require('../../../../assets/images/food-icon.png'),
          require('../../../../assets/images/food-icon-selected.png')
        )}
      </View>
    )
  }
}

SideMenu.propTypes = {
  currentRouteIndex: PropTypes.number.isRequired,
  sideMenuItemTapped: PropTypes.func.isRequired
}

export default SideMenu