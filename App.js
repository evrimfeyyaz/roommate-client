/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'

import MainNavigator from './src/navigation/navigators/MainNavigator'

export default class App extends Component {
  client = new ApolloClient({
    link: new HttpLink({ uri: 'http://localhost:3000/graphql' }),
    cache: new InMemoryCache()
  })

  render() {
    return (
      <ApolloProvider client={this.client}>
        <MainNavigator />
      </ApolloProvider>
    )
  }
}