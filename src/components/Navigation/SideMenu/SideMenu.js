import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import SideMenuItem from './Item/SideMenuItem'
import styles from './styles'
import icons from '../../../../assets/icons'

class SideMenu extends Component {
  constructor(props) {
    super(props)

    this.setActiveItem = this.setActiveItem.bind(this)
  }

  state = {
    selectedItemIndex: null
  }

  setActiveItem(index) {
    this.setState({ selectedItemIndex: index })
  }

  renderItem(title, index, unselectedIcon, selectedIcon) {
    return (
      <SideMenuItem
        title={title}
        index={index}
        unselectedIcon={unselectedIcon}
        selectedIcon={selectedIcon}
        onPress={this.setActiveItem}
        isSelected={this.state.selectedItemIndex === index}
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

SideMenu.propTypes = {}

SideMenu.defaultProps = {}

export default SideMenu