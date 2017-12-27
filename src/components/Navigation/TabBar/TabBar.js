import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import { TabBarItem } from '../../.'
import styles from './styles'

class TabBar extends Component {
  renderItem(item, isActive = false) {
    return (
      <TabBarItem
        key={item.key}
        index={item.index}
        title={item.title}
        onPress={item.onPress}
        isActive={isActive}
        small={this.props.small}
      />
    )
  }

  renderActiveItem(item) {
    return (
      <View key="active-item">
        <View style={styles.activeItemIndicatorContainer}>
          <View style={styles.activeItemIndicator} />
        </View>

        {this.renderItem(item, true)}
      </View>
    )
  }

  renderItems() {
    const { items, activeIndex } = this.props

    return items.map((item) => {
      if (item.index === activeIndex) {
        return this.renderActiveItem(item)
      }

      return this.renderItem(item)
    })
  }

  renderBorderContainer() {
    if (this.props.small) {
      return null
    }

    return <View style={styles.borderContainer} />
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderBorderContainer()}

        {this.renderItems()}
      </View>
    )
  }
}

TabBar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      index: PropTypes.number.isRequired,
      key: PropTypes.string.isRequired,
      onPress: PropTypes.func.isRequired
    })
  ).isRequired,
  activeIndex: PropTypes.number,
  small: PropTypes.bool
}

TabBar.defaultProps = {
  activeIndex: 0,
  small: false
}

export default TabBar