import React, { Component } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { connect } from 'react-redux'

import { ItemCard } from '../../.'

class ItemsInCategory extends Component {
  constructor(props) {
    super(props)

    this.renderItem = this.renderItem.bind(this)
  }

  renderItem({ item }) {
    return <ItemCard item={item} style={styles.item} onPress={this.props.onItemPress} />
  }

  renderCart() {
    console.log(this.props.roomServiceCart)
  }

  render() {
    // TODO: Explain what the below code does better.
    if (this.props.data.networkStatus === 1) {
      return <ActivityIndicator />
    }

    const { items } = this.props.data.roomServiceCategory

    return (
      <View>
        <FlatList
          data={items}
          renderItem={this.renderItem}
          keyExtractor={item => item.id}
          numColumns={3}
        />
        {this.renderCart()}
      </View>
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
  }).isRequired,
  onItemPress: PropTypes.func,
  roomServiceCart: PropTypes.shape({
    cartItems: PropTypes.arrayOf(
      PropTypes.shape({
        item: PropTypes.shape({
          id: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          description: PropTypes.string,
          price: PropTypes.string
        }),
        quantity: PropTypes.number
      })
    )
  }).isRequired
}

ItemsInCategory.defaultProps = {
  onItemPress: null
}

// TODO: Refactor the GraphQL and Redux functions out into a separate component.
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

const mapStateToProps = state => ({
  roomServiceCart: state.roomServiceCart
})

const connectedItemsInCategory = connect(mapStateToProps, null)(ItemsInCategory)

export default graphql(getRoomServiceCategoryWithItems, {
  options: ({ id }) => ({ variables: { id } })
})(connectedItemsInCategory)