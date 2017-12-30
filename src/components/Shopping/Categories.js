import React, { Component } from 'react'
import { ActivityIndicator } from 'react-native'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import { TabBar } from '../.'

class Categories extends Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading) {
      const firstCategoryId = nextProps.data.roomServiceCategories[0].id

      this.props.onCategoryChange(firstCategoryId)
    }
  }

  render() {
    const { data, onCategoryChange } = this.props

    if (data.networkStatus === 1) {
      return <ActivityIndicator />
    }

    const { roomServiceCategories } = data

    return <TabBar data={roomServiceCategories} onTabChange={onCategoryChange} small />
  }
}

Categories.propTypes = {
  data: PropTypes.shape({
    roomServiceCategories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
      })
    ),
    loading: PropTypes.bool,
    error: PropTypes.any,
    networkStatus: PropTypes.number
  }).isRequired,
  onCategoryChange: PropTypes.func.isRequired
}

const getRoomServiceCategories = gql`
  {
    roomServiceCategories {
      id
      title
    }
  }
`

export default graphql(getRoomServiceCategories)(Categories)