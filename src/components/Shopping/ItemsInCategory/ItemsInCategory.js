import React, { Component } from 'react'
import { ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import { ItemCard } from '../../.'

class ItemsInCategory extends Component {
  renderItem({ item }) {
    return <ItemCard item={item} style={styles.item} />
  }

  render() {
    if (this.props.data.networkStatus === 1) {
      return <ActivityIndicator />
    }

    const { items } = this.props.data.roomServiceCategory

    return (
      <FlatList
        data={items}
        renderItem={this.renderItem}
        keyExtractor={item => item.id}
        numColumns={4}
      />
    )
  }
}

const styles = StyleSheet.create({
  item: {
    margin: 8
  }
})

ItemsInCategory.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    roomServiceCategory: PropTypes.shape({
      id: PropTypes.string.isRequired,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          description: PropTypes.string,
          price: PropTypes.string
        })
      ).isRequired
    }),
    loading: PropTypes.bool,
    error: PropTypes.any,
    networkStatus: PropTypes.number,
    variables: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired
}

const getRoomServiceCategoryWithItems = gql`
  query getRoomServiceCategoryWithItems($id: ID!) {
    roomServiceCategory(id: $id) {
      id
      items {
        id
        title
        description
        price
      }
    }
  }
`

export default graphql(getRoomServiceCategoryWithItems, {
  options: ({ id }) => ({ variables: { id } })
})(ItemsInCategory)