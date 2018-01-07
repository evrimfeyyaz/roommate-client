import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'

import { TabBarItem } from '../.'
import colors from '../../config/colors'

export type TabData = {
  id: string,
  title: string
}

type Props = {
  data: TabData[],
  activeTabId?: TabData.id,
  onTabPress: (TabData.id) => void,
  /**
   * Toggles the alternative "small" style.
   *
   * Defaults to `false`.
   */
  small?: boolean
}

class TabBar extends Component<Props> {
  static defaultProps = {
    activeTabId: null,
    small: false
  }

  containerStyle() {
    return this.props.small ? styles.containerSmall : styles.container
  }

  renderTab(tabData: TabData, active = false) {
    const { small, onTabPress } = this.props

    return (
      <TabBarItem
        key={tabData.id}
        data={tabData}
        onPress={onTabPress}
        active={active}
        small={small}
      />
    )
  }

  renderActiveTab(tabData: TabData) {
    const activeTabKey = `${tabData.id}-active`

    return (
      <View key={activeTabKey}>
        <View style={styles.activeItemIndicatorContainer}>
          <View style={styles.activeItemIndicator} />
        </View>

        {this.renderTab(tabData, true)}
      </View>
    )
  }

  renderTabs() {
    const { data, activeTabId } = this.props

    return data.map((tabData) => {
      if (tabData.id === activeTabId) {
        return this.renderActiveTab(tabData)
      }

      return this.renderTab(tabData)
    })
  }

  // We are using this instead of `borderBottomWidth`, because in the design,
  // "selected item indicator" overflows the container, and Android can't deal
  // with that.
  renderBorderContainer() {
    if (this.props.small) {
      return null
    }

    return <View style={styles.borderContainer} />
  }

  render() {
    return (
      <View style={this.containerStyle()}>
        {this.renderBorderContainer()}

        {this.renderTabs()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  containerSmall: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  borderContainer: {
    ...StyleSheet.absoluteFillObject,
    bottom: 1,
    borderColor: colors.tabBarBorder,
    borderBottomWidth: 1
  },
  activeItemIndicatorContainer: {
    position: 'absolute',
    bottom: 0,
    left: 34,
    right: 34,
    height: 3,
    alignItems: 'stretch'
  },
  activeItemIndicator: {
    flex: 1,
    backgroundColor: colors.tabBarActiveItemIndicator
  }
})

export default TabBar