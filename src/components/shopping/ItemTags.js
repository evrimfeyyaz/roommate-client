// @flow
import React, { Component } from 'react'
import { View, StyleSheet, ViewPropTypes } from 'react-native'

import { Body } from '../.'
import colors from '../../config/colors'
import type { ShoppingItem, ShoppingItemTag } from '../../types/shopping'

type Props = {
  item: ShoppingItem,
  style?: ?ViewPropTypes.style
}

class ItemTags extends Component<Props> {
  static renderTag(tag: ShoppingItemTag) {
    return (
      <View style={styles.tagContainer} key={tag.id}>
        <Body style={styles.title}>{tag.title}</Body>
      </View>
    )
  }

  renderTags() {
    const { tags } = this.props.item

    return tags.map(tag => ItemTags.renderTag(tag))
  }

  render() {
    const { style } = this.props

    return (
      <View style={[styles.container, style]}>
        {this.renderTags()}
      </View>
    )
  }
}

// TODO: This won't be needed after the update to RN 0.54.
// $FlowFixMe
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  tagContainer: {
    borderRadius: 10,
    backgroundColor: colors.tag,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginEnd: 10
  },
  title: {
    fontSize: 10,
    lineHeight: 17
  }
})

export default ItemTags