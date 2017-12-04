import React, { Component } from 'react'
import {
  View
} from 'react-native'

import PropTypes from 'prop-types'

import style from './Item/style'

class SideMenu extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    value: this.props.value
  }

  render() {
    return (
      <View></View>
    )
  }
}

SideMenu.propTypes = {
}

SideMenu.defaultProps = {
}

export default SideMenu