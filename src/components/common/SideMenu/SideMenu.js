import React, { Component } from 'react'
import {
  LayoutAnimation,
  View
} from 'react-native'

import PropTypes from 'prop-types'
import { SideMenuItem } from '../'

import style from './style'
import icons from '../../../../assets/icons'

class SideMenu extends Component {
  constructor(props) {
    super(props)

    this.setActiveItem = this.setActiveItem.bind(this)
  }

  state = {
    selectedItemId: null
  }

  setActiveItem(id) {
    this.setState({ selectedItemId: id })
  }

  renderItem(title, id, iconSvgPath) {
    return (
      <SideMenuItem
        title={title}
        id={id}
        iconSvgPath={iconSvgPath}
        onPress={this.setActiveItem}
        isSelected={this.state.selectedItemId === id}
      />
    )
  }

  render() {
    return (
      <View style={style.container}>
        {this.renderItem('Home', 'home', icons.test)}
        {this.renderItem('My Stay', 'my-stay', icons.test)}
        {this.renderItem('Food', 'food', icons.test)}
        {this.renderItem('Room Controls', 'room-controls', icons.test)}
        {this.renderItem('Transportation', 'transportation', icons.test)}
        {this.renderItem('Housekeeping', 'housekeeping', icons.test)}
        {this.renderItem('Massage', 'massage', icons.test)}
        {this.renderItem('Hotel', 'hotel', icons.test)}
      </View>
    )
  }
}

SideMenu.propTypes = {}

SideMenu.defaultProps = {}

export default SideMenu