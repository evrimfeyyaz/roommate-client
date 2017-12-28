import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'

import { TabBarItem } from '../../.'

class TabBar extends Component {
  constructor(props) {
    super(props)

    this.onTabChange = this.onTabChange.bind(this)
  }

  state = {
    activeId: this.props.data[0].id
  }

  onTabChange(id) {
    this.setState({ activeId: id })

    this.props.onTabChange(id)
  }

  containerStyle() {
    return this.props.small ? styles.containerSmall : styles.container
  }

  renderItem(item, isActive = false) {
    return (
      <TabBarItem
        key={item.id}
        id={item.id}
        title={item.title}
        onPress={this.onTabChange}
        isActive={isActive}
        small={this.props.small}
      />
    )
  }

  renderActiveItem(item) {
    return (
      <View key="active-tab">
        <View style={styles.activeItemIndicatorContainer}>
          <View style={styles.activeItemIndicator} />
        </View>

        {this.renderItem(item, true)}
      </View>
    )
  }

  renderItems() {
    return this.props.data.map((item) => {
      if (item.id === this.state.activeId) {
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
      <View style={this.containerStyle()}>
        {this.renderBorderContainer()}

        {this.renderItems()}
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
    borderColor: 'rgba(151, 151, 151, 0.1)',
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
    backgroundColor: '#CDB58E'
  }
})

TabBar.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    })
  ).isRequired,
  onTabChange: PropTypes.func,
  small: PropTypes.bool
}

TabBar.defaultProps = {
  small: false,
  onTabChange: null
}

export default TabBar