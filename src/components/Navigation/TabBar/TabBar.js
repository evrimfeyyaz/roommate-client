import React, { Component } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'

import { TabBarItem } from '../../.'
import styles from './styles'

class TabBar extends Component {
  renderItem(item) {
    return (
      <TabBarItem
        key={item.key}
        index={item.index}
        title={item.title}
        onPress={item.onPress}
      />
    )
  }

  renderActiveItem(item) {
    return (
      <View key="active-item">
        {this.renderItem(item)}

        <View style={styles.activeItemIndicatorContainer}>
          <View style={styles.activeItemIndicator} />
        </View>
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

  render() {
    return (
      <View style={styles.container}>
        {this.renderItems()}

        <View style={styles.borderContainer} />
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
  activeIndex: PropTypes.number
}

TabBar.defaultProps = {
  activeIndex: 0
}

export default TabBar